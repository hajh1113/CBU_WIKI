import Link from "next/link";
import { categories, handbookPages } from "@/lib/handbook";
import { cohortRosters, unclassifiedMembers } from "@/lib/members";
import { getRecentPages } from "@/lib/wiki";
import { WikiHeader } from "./wiki-header";

export async function DocumentIndex({ kind }: { kind: "documents" | "members" | "recent" }) {
  const title = kind === "members" ? "멤버" : kind === "recent" ? "최근 업데이트" : "모든 문서";
  const recent = kind === "recent" ? await getRecentPages(30) : [];
  return <main className="article-shell"><WikiHeader /><article className="article directory-article"><p className="eyebrow"><Link href="/">대문</Link> / {title}</p><h1>{title}</h1>
    {kind === "documents" && <><p className="article-lead">주제별로 찾아보는 씨부엉의 안내와 기록 양식.</p><nav className="category-pills" aria-label="문서 분류">{categories.map((c, i) => <a href={`#category-${i}`} key={c}>{c}</a>)}</nav>{categories.map((c, i) => <section className="directory-section" id={`category-${i}`} key={c}><h2>{c} <small>{handbookPages.filter((p) => p.category === c).length}</small></h2>{handbookPages.filter((p) => p.category === c).map((p) => <Link className="result-row" key={p.slug} href={`/wiki/${p.slug}`}><div><h3>{p.title}</h3><p>{p.excerpt}</p></div><span>→</span></Link>)}</section>)}<div className="article-meta"><Link href="/wiki/멤버">멤버 명단</Link><Link href="/wiki/운영진">운영진</Link></div></>}
    {kind === "members" && <><p className="article-lead">기수를 선택하고 이름을 누르면 개인 상세 문서로 연결됩니다.</p><Link className="team-card" href="/wiki/운영진">운영진 보기 →</Link><div className="cohort-directory">{Array.from({ length: 30 }, (_, i) => { const roster = cohortRosters.find((r) => r.cohort === i + 1); return <Link key={i} href={`/wiki/${i + 1}기`}><b>{i + 1}기</b><small>{roster ? `${roster.members.length}명 확인` : "명단 등록 전"}</small></Link>; })}<Link href="/wiki/미분류"><b>미분류</b><small>{unclassifiedMembers.length}명 · 기수 확인 필요</small></Link></div></>}
    {kind === "recent" && <><p className="article-lead">최근 수정된 문서입니다. 같은 날짜의 문서는 표시 순서가 수정 시각을 뜻하지 않습니다.</p>{recent.map((p) => <Link className="result-row" key={p.slug} href={`/wiki/${p.slug}`}><div><h2>{p.title}</h2><p>{p.excerpt}</p></div><time>{p.updatedAt}</time></Link>)}</>}
  </article></main>;
}
