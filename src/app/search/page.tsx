import Link from "next/link";
import { searchWikiPages } from "@/lib/wiki";
import { WikiHeader } from "@/components/wiki-header";

export const metadata = { title: "검색 | 씨부엉 위키" };
export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const { q, category } = await searchParams;
  const query = typeof q === "string" ? q.trim().slice(0, 100) : "";
  const selected = typeof category === "string" ? category : "";
  const pages = await searchWikiPages(query);
  const categories = [...new Set(pages.map((p) => p.category ?? "문서"))];
  const visible = selected ? pages.filter((p) => (p.category ?? "문서") === selected) : pages;
  return <main className="article-shell"><WikiHeader /><section className="search-results"><p className="eyebrow"><Link href="/">대문</Link> / 검색</p><h1>{query ? `“${query}” 검색 결과` : "어떤 기록을 찾고 있나요?"}</h1>
    <form className="search-again" action="/search"><label className="sr-only" htmlFor="search-query">검색어</label><input id="search-query" name="q" defaultValue={query} maxLength={100} placeholder="Git, 스터디, 멤버 이름…" /><button type="submit">검색</button></form>
    {query && <p className="result-count">{visible.length}개의 결과 · 문서 내용과 멤버 이름으로 검색합니다.</p>}
    {categories.length > 0 && <nav className="category-pills" aria-label="검색 결과 분류"><Link aria-current={!selected ? "page" : undefined} href={`/search?q=${encodeURIComponent(query)}`}>전체 {pages.length}</Link>{categories.map((c) => <Link key={c} aria-current={selected === c ? "page" : undefined} href={`/search?q=${encodeURIComponent(query)}&category=${encodeURIComponent(c)}`}>{c} {pages.filter((p) => (p.category ?? "문서") === c).length}</Link>)}</nav>}
    {visible.length > 0 ? <div>{visible.map((page) => <Link className="result-row" href={`/wiki/${page.slug}`} key={page.slug}><div><small className="result-category">{page.category}</small><h2>{page.title}</h2><p>{page.excerpt}</p></div><span>→</span></Link>)}</div> : <div className="empty-state"><p>{query ? "일치하는 결과가 없습니다. 다른 단어나 이름으로 검색해 보세요." : "문서 제목, 기술 이름, 기수 또는 멤버 이름을 입력해 보세요."}</p><Link href="/wiki/문서-목록">모든 문서 보기 →</Link><Link href="/wiki/멤버">멤버 찾기 →</Link></div>}
  </section></main>;
}
