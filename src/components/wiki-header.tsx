import Link from "next/link";

export function WikiHeader() {
  return <header className="wiki-header">
    <Link className="wiki-logo" href="/" aria-label="씨부엉 위키 대문"><span className="owl-mark" aria-hidden="true">◉◉</span><span><b>씨부엉</b><small>CBU WIKI</small></span></Link>
    <form className="wiki-search" action="/search" role="search"><label className="sr-only" htmlFor="wiki-search">문서·멤버 검색</label><input id="wiki-search" name="q" maxLength={100} placeholder="문서, 기술, 멤버 검색" /><button type="submit">검색</button></form>
    <nav className="header-links" aria-label="빠른 탐색"><Link href="/wiki/멤버">멤버</Link><Link href="/wiki/운영진">운영진</Link><Link href="/wiki/문서-템플릿">기록 남기기 ↗</Link></nav>
  </header>;
}
