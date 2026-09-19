import Link from "next/link";
import { WikiHeader } from "@/components/wiki-header";
export default function NotFound() {
  return <main><WikiHeader /><article className="article"><p className="eyebrow">404 / 문서를 찾을 수 없습니다</p><h1>아직 없는 문서예요.</h1><p className="article-lead">주소를 확인하거나 다른 문서를 찾아보세요.</p><div className="category-pills"><Link href="/">대문</Link><Link href="/wiki/문서-목록">모든 문서</Link><Link href="/wiki/문서-템플릿">문서 작성 양식</Link></div></article></main>;
}
