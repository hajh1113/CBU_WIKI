import Link from "next/link";
import { WikiHeader } from "@/components/wiki-header";
import { notFound } from "next/navigation";
import { getMember } from "@/lib/members";

export default async function MemberPage({ params }: PageProps<"/wiki/member/[slug]">) {
  const { slug } = await params;
  let decodedSlug: string;
  try { decodedSlug = decodeURIComponent(slug); } catch { notFound(); }
  const member = getMember(decodedSlug);
  if (!member) notFound();

  const rosterHref = member.cohort ? `/wiki/${member.cohort}기` : "/wiki/미분류";
  const rosterTitle = member.cohort ? `${member.cohort}기` : "미분류";

  return (
    <main className="article-shell">
      <WikiHeader />
      <article className="article">
        <p className="eyebrow"><Link href="/wiki/멤버">멤버</Link> / <Link href={rosterHref}>{rosterTitle}</Link></p>
        <h1>{member.name}</h1>
        <p className="article-lead">임시 회원 문서</p>
        <hr />
        <dl className="member-profile">
          <div><dt>분류</dt><dd>{rosterTitle}</dd></div>
          {member.username && <div><dt>Slack 사용자명</dt><dd>@{member.username}</dd></div>}
          {member.displayName && <div><dt>표시 이름</dt><dd>{member.displayName}</dd></div>}
          {member.realName && <div><dt>이름</dt><dd>{member.realName}</dd></div>}
          <div><dt>분류 근거</dt><dd>{member.classificationBasis}</dd></div>
        </dl>
        {!member.cohort && <aside className="temporary-note"><b>임시 문서</b><span>기수 정보가 확인되면 이 문서를 해당 기수 문서로 연결합니다.</span></aside>}
        <div className="article-meta"><span>마지막 수정 · Slack 프로필 기반</span><Link href={rosterHref}>{rosterTitle} 명단으로 →</Link></div>
      </article>
    </main>
  );
}
