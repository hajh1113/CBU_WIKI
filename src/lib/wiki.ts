import { aliases, handbookPages, type HandbookPage } from "./handbook";
import { cohortRosters, unclassifiedMembers } from "./members";

export type WikiPage = { slug: string; title: string; excerpt: string; updatedAt: string; category?: string; body?: string };
export type WikiDocument = WikiPage & Partial<Pick<HandbookPage, "sections" | "related" | "template" | "tags">>;
type RemotePage = { slug: string; title: string; excerpt: string; body?: string; category?: string; updated_at: string };

async function remotePages(params: URLSearchParams): Promise<WikiPage[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];
  try {
    const response = await fetch(`${url}/rest/v1/wiki_pages?${params}`, {
      headers: { apikey: key }, next: { revalidate: 60 }, signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return [];
    const data: unknown = await response.json();
    if (!Array.isArray(data)) return [];
    return data.filter((row): row is RemotePage => row && typeof row.slug === "string" && typeof row.title === "string" && typeof row.excerpt === "string" && typeof row.updated_at === "string").map((row) => ({
      slug: row.slug, title: row.title, excerpt: row.excerpt,
      body: typeof row.body === "string" ? row.body : undefined,
      category: typeof row.category === "string" ? row.category : "문서",
      updatedAt: Number.isNaN(Date.parse(row.updated_at)) ? "날짜 미확인" : row.updated_at.slice(0, 10),
    }));
  } catch { return []; }
}

function mergePages(remote: WikiPage[], local: WikiPage[]) {
  // Curated local guides replace seed summaries, without modifying remote records.
  const pages = new Map(remote.map((page) => [aliases[page.slug] ?? page.slug, page]));
  local.forEach((page) => pages.set(page.slug, page));
  return [...pages.values()];
}

export async function getRecentPages(limit = 5): Promise<WikiPage[]> {
  const remote = await remotePages(new URLSearchParams({ select: "slug,title,excerpt,updated_at,category", order: "updated_at.desc", limit: String(limit) }));
  return mergePages(remote, handbookPages).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, limit);
}

export async function getWikiPage(slug: string): Promise<WikiDocument | null> {
  const canonical = aliases[slug] ?? slug;
  const local = handbookPages.find((page) => page.slug === canonical);
  if (local) return local;
  const pages = await remotePages(new URLSearchParams({ slug: `eq.${canonical}`, select: "slug,title,excerpt,body,category,updated_at", limit: "1" }));
  return pages[0] ?? null;
}

export async function searchWikiPages(query: string): Promise<WikiPage[]> {
  const normalized = query.trim().toLocaleLowerCase("ko-KR").slice(0, 100);
  if (!normalized) return [];
  const terms = normalized.split(/\s+/);
  const matches = (text: string) => terms.every((term) => text.toLocaleLowerCase("ko-KR").includes(term));
  const documents = handbookPages.filter((page) => matches([page.title, page.excerpt, page.category, ...page.tags, ...page.sections.map((s) => [s.title, s.text, ...(s.items ?? [])].join(" "))].join(" ")));
  const people: WikiPage[] = [
    ...cohortRosters.flatMap((roster) => roster.members.map((m) => ({ slug: `member/${m.slug}`, title: m.name, excerpt: `${m.cohort}기 멤버`, category: "멤버", updatedAt: "" }))),
    ...unclassifiedMembers.map((m) => ({ slug: `member/${m.slug}`, title: m.name, excerpt: "기수 미분류 멤버", category: "멤버", updatedAt: "" })),
    { slug: "운영진", title: "운영진", excerpt: "회장 · 부회장 · 운영 · 행사 · 홍보", category: "멤버", updatedAt: "" },
    ...Array.from({ length: 30 }, (_, i) => ({ slug: `${i + 1}기`, title: `${i + 1}기`, excerpt: "기수별 멤버 명단", category: "멤버", updatedAt: "" })),
  ].filter((page) => matches(`${page.title} ${page.excerpt}`));
  // Quote PostgREST filter values so punctuation cannot change the filter structure.
  const escaped = normalized.replace(/[\\%_*]/g, " ").replace(/"/g, '\\"');
  const remote = await remotePages(new URLSearchParams({
    or: `(title.ilike."*${escaped}*",excerpt.ilike."*${escaped}*")`,
    select: "slug,title,excerpt,category,updated_at", order: "updated_at.desc", limit: "50",
  }));
  return mergePages(remote, [...documents, ...people]);
}
