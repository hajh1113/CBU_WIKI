import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { WikiHeader } from "@/components/wiki-header";
import { TemplateCopy } from "@/components/template-copy";
import { DocumentIndex } from "@/components/document-index";
import { aliases, handbookPages } from "@/lib/handbook";
import { getCohortRoster, operatingRoles, unclassifiedMembers } from "@/lib/members";
import { getWikiPage } from "@/lib/wiki";

export default async function WikiPage({ params }: PageProps<"/wiki/[slug]">) {
  const { slug } = await params;
  let decodedSlug: string;
  try { decodedSlug = decodeURIComponent(slug); } catch { notFound(); }
  if (aliases[decodedSlug]) permanentRedirect(`/wiki/${encodeURIComponent(aliases[decodedSlug])}`);
  if (decodedSlug === "문서-목록") return <DocumentIndex kind="documents" />;
  if (decodedSlug === "멤버") return <DocumentIndex kind="members" />;
  if (decodedSlug === "특수:최근바뀜") return <DocumentIndex kind="recent" />;

  if (decodedSlug === "운영진") {
    return (
      <main className="article-shell">
        <WikiHeader />
        <article className="article">
          <p className="eyebrow">CBU WIKI / 운영진</p>
          <h1>운영진</h1>
          <p className="article-lead">CBU의 활동과 커뮤니티를 함께 운영하는 역할입니다.</p>
          <hr />
          <div className="role-grid">
            {operatingRoles.map((role) => <section key={role.title}><h2>{role.title}</h2>{role.members.length > 0 ? <ul>{role.members.map((member) => <li key={member.slug}><Link href={`/wiki/member/${member.slug}`}>{member.name}</Link><span>{member.cohort}기</span></li>)}</ul> : <p>확인된 구성원 없음</p>}</section>)}
          </div>
          <div className="article-meta"><span>마지막 수정 · Slack 프로필 역할 표기 기반</span><Link href="/wiki/새-문서">정보 보완 제안 →</Link></div>
        </article>
      </main>
    );
  }

  if (decodedSlug === "미분류") {
    return (
      <main className="article-shell">
        <WikiHeader />
        <article className="article">
          <p className="eyebrow">CBU WIKI / 기수별 아카이브</p>
          <h1>미분류</h1>
          <p className="article-lead">프로필에 확인 가능한 기수 표기가 없는 구성원의 임시 명단입니다.</p>
          <hr />
          <aside className="temporary-note"><b>임시 분류</b><span>기수 정보가 확인되면 해당 기수 문서로 옮깁니다. 이름을 누르면 현재 확인된 프로필 정보를 볼 수 있습니다.</span></aside>
          <ul className="member-roster">
            {unclassifiedMembers.map((member) => <li key={member.slug}><Link href={`/wiki/member/${member.slug}`}>{member.name}</Link></li>)}
          </ul>
          <div className="article-meta"><span>마지막 수정 · 임시 명단</span><Link href="/wiki/새-문서">정보 보완 제안 →</Link></div>
        </article>
      </main>
    );
  }

  const cohortRoster = getCohortRoster(decodedSlug);
  if (cohortRoster || /^(?:[1-9]|[12][0-9]|30)기$/.test(decodedSlug)) {
    const roster = cohortRoster ?? { cohort: Number(decodedSlug.slice(0, -1)), members: [] };
    return (
      <main className="article-shell">
        <WikiHeader />
        <article className="article">
          <p className="eyebrow">CBU WIKI / 기수별 아카이브</p>
          <h1>{roster.cohort}기</h1>
          <p className="article-lead">현재 확인된 {roster.members.length}명의 구성원입니다.</p>
          <hr />
          <p className="roster-intro">{roster.members.length ? "이름을 누르면 현재 확인된 분류 정보를 볼 수 있습니다." : "아직 확인된 명단이 없습니다. 기수 정보가 확인되면 이곳에 추가합니다."}</p>
          <ul className="member-roster">
            {roster.members.map((member) => <li key={member.slug}><Link href={`/wiki/member/${member.slug}`}>{member.name}</Link></li>)}
          </ul>
          <div className="article-meta"><span>마지막 수정 · Slack 프로필 기반</span><Link href="/wiki/새-문서">정보 보완 제안 →</Link></div>
        </article>
      </main>
    );
  }

  const page = await getWikiPage(decodedSlug);
  if (!page) notFound();
  const body = page.body;

  return (
    <main className="article-shell">
      <WikiHeader />
      <article className="article">
        <p className="eyebrow"><Link href="/">대문</Link> / <Link href="/wiki/문서-목록">{page.category ?? "문서"}</Link></p>
        <h1>{page.title}</h1><p className="article-lead">{page.excerpt}</p>
        <hr />
        {page.sections && <nav className="document-toc" aria-label="문서 목차"><b>목차</b><ol>{page.sections.map((section, i) => <li key={section.title}><a href={`#section-${i + 1}`}>{section.title}</a></li>)}{page.template && <li><a href="#template">기록 양식</a></li>}</ol></nav>}
        {body && <div className="article-body">{body}</div>}
        {page.sections?.map((section, i) => <section className="handbook-section" id={`section-${i + 1}`} key={section.title}><h2><span>{i + 1}.</span> {section.title}</h2>{section.text && <p>{section.text}</p>}{section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}{section.links && <ul className="resource-links">{section.links.map((link) => <li key={link.href}><a href={link.href}>{link.title} ↗</a></li>)}</ul>}</section>)}
        {page.template && <TemplateCopy text={page.template} />}
        {page.related && <aside className="related-docs"><h2>함께 읽기</h2><div>{page.related.map((related) => <Link href={`/wiki/${related}`} key={related}>{handbookPages.find((p) => p.slug === related)?.title ?? related} →</Link>)}</div></aside>}
        <div className="article-meta"><span>마지막 수정 · {page.updatedAt}</span><Link href="/wiki/새-문서">문서 보완 제안 →</Link></div>
      </article>
    </main>
  );
}

export async function generateMetadata({ params }: PageProps<"/wiki/[slug]">) {
  const { slug } = await params;
  let decodedSlug: string;
  try { decodedSlug = decodeURIComponent(slug); } catch { return { title: "문서를 찾을 수 없습니다 | 씨부엉 위키" }; }
  const page = handbookPages.find((p) => p.slug === (aliases[decodedSlug] ?? decodedSlug));
  return { title: `${page?.title ?? decodedSlug.replaceAll("-", " ")} | 씨부엉 위키`, description: page?.excerpt };
}
