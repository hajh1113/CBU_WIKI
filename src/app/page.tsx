import Link from "next/link";
import { getRecentPages } from "@/lib/wiki";
import { cohortRosters } from "@/lib/members";
import { handbookPages } from "@/lib/handbook";
import { WikiHeader } from "@/components/wiki-header";

const topics = [
  { number: "01", title: "처음 오셨나요?", summary: "씨부엉에서 첫 활동을 시작하는 방법", links: ["신입-가이드", "학습-로드맵", "질문-가이드"] },
  { number: "02", title: "함께 배우고 만들기", summary: "스터디부터 프로젝트, 발표까지", links: ["스터디", "프로젝트-아카이브", "세미나-기록"] },
  { number: "03", title: "개발하며 남긴 지식", summary: "다음 사람이 같은 곳에서 막히지 않도록", links: ["개발-환경", "Git-협업", "트러블슈팅"] },
];

export default async function Home() {
  const recentPages = await getRecentPages();
  return <main className="wiki-shell" id="top">
    <WikiHeader />
    <div className="wiki-grid">
      <aside className="wiki-sidebar" aria-label="위키 탐색">
        <nav><p>위키</p><Link className="active" href="/" aria-current="page">대문</Link><Link href="/wiki/문서-목록">모든 문서</Link><Link href="/wiki/특수:최근바뀜">최근 업데이트</Link></nav>
        <nav><p>사람들</p><Link href="/wiki/멤버">멤버 · 기수별 아카이브</Link><Link href="/wiki/운영진">운영진</Link></nav>
        <nav><p>배움과 활동</p><Link href="/wiki/신입-가이드">신입 가이드</Link><Link href="/wiki/스터디">스터디</Link><Link href="/wiki/프로젝트-아카이브">프로젝트 아카이브</Link><Link href="/wiki/트러블슈팅">트러블슈팅 노트</Link><Link href="/wiki/세미나-기록">세미나·해커톤</Link></nav>
        <nav><p>함께 기록하기</p><Link href="/wiki/문서-템플릿">문서 템플릿</Link><Link href="/wiki/위키-작성-가이드">작성 가이드</Link><Link href="/wiki/위키-소개">위키 소개</Link></nav>
      </aside>
      <article className="wiki-article">
        <div className="article-toolbar"><span>씨부엉의 열린 노트</span><Link href="/wiki/위키-작성-가이드">위키 이용 안내 ↗</Link></div>
        <h1>대문 <span className="title-note">함께 쌓는 코드와 경험</span></h1>
        <section className="welcome-box">
          <div><p className="welcome-kicker">HELLO, CBU!</p><h2>오늘의 배움이<br className="mobile-break" /> 다음 씨부엉의 시작이 되도록.</h2><p>사람, 코드, 함께 만든 경험을 연결하는 코딩동아리 씨부엉 위키.</p></div>
          <Link className="welcome-cta" href="/wiki/신입-가이드">처음이라면 여기부터 <span>→</span></Link>
        </section>
        <section id="learn" className="topic-grid" aria-label="주제별 문서">
          {topics.map((topic) => <div className="topic-column" key={topic.number}><span className="topic-number">{topic.number} /</span><h2>{topic.title}</h2><p>{topic.summary}</p><ul>{topic.links.map((slug) => <li key={slug}><Link href={`/wiki/${slug}`}>{handbookPages.find((page) => page.slug === slug)?.title}<span aria-hidden="true">↗</span></Link></li>)}</ul></div>)}
        </section>
        <section className="content-section" id="people"><div className="section-heading"><h2>함께하는 사람들</h2><Link href="/wiki/멤버">멤버 전체 보기 →</Link></div>
          <Link className="team-card" href="/wiki/운영진"><span className="people-symbol" aria-hidden="true">◎</span><span><b>운영진</b><small>회장 · 부회장 · 운영 · 행사 · 홍보</small></span><span className="card-arrow" aria-hidden="true">→</span></Link>
          <h3 className="subsection-label" id="generations">멤버 · 기수별 아카이브</h3><div className="generation-list">{Array.from({ length: 30 }, (_, i) => { const generation = i + 1; const roster = cohortRosters.find((r) => r.cohort === generation); return <Link href={`/wiki/${generation}기`} key={generation}>{generation}기{roster && <span className="roster-dot" aria-label="명단 있음" />}</Link>; })}<Link className="unclassified-generation" href="/wiki/미분류">미분류</Link></div><p className="roster-legend"><span className="roster-dot" /> 확인된 멤버 명단이 있는 기수</p>
        </section>
        <div className="lower-grid"><section className="content-section recent-section" id="recent"><div className="section-heading"><h2>최근 업데이트</h2><Link href="/wiki/특수:최근바뀜">더 보기 →</Link></div><div className="recent-list">{recentPages.map((page) => <Link href={`/wiki/${page.slug}`} key={page.slug}><span className="recent-dot" /><span><b>{page.title}</b><small>{page.excerpt}</small></span><time>{page.updatedAt}</time></Link>)}</div></section>
        <section className="contribution-box" id="write"><span className="topic-number">기록의 시작</span><h2>빈 문서가<br />막막하지 않도록.</h2><p>프로젝트 소개, 오류 해결, 스터디 회고.<br />양식을 복사해 첫 줄을 남겨 보세요.</p><Link href="/wiki/문서-템플릿">문서 템플릿 보기 →</Link><Link className="secondary-link" href="/wiki/회고-인수인계">회고·인수인계 가이드</Link></section></div>
      </article>
      <aside className="page-tools" aria-label="대문 목차"><p>이 페이지에서</p><a href="#learn">배움과 활동</a><a href="#people">운영진</a><a href="#generations">멤버 · 기수</a><a href="#recent">최근 업데이트</a><a href="#write">기록 남기기</a><hr /><Link href="/wiki/문서-목록">모든 문서 →</Link><Link href="/wiki/커뮤니티-이용-안내">커뮤니티 이용 안내</Link></aside>
    </div>
    <footer className="wiki-footer"><div><b>씨부엉 · CBU WIKI</b><Link href="/wiki/위키-소개">위키 소개</Link><Link href="/wiki/위키-작성-가이드">문서 보완 안내</Link><a href="#top">맨 위로 ↑</a></div><p>함께 배우고, 만들고, 기록합니다.</p></footer>
  </main>;
}
