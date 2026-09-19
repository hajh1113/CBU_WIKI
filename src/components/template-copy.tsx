"use client";
import { useRef, useState } from "react";

export function TemplateCopy({ text }: { text: string }) {
  const [status, setStatus] = useState("");
  const field = useRef<HTMLTextAreaElement>(null);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("복사했습니다. 문서 편집기에 붙여 넣어 작성하세요.");
    } catch {
      field.current?.focus();
      field.current?.select();
      setStatus("자동 복사를 사용할 수 없습니다. 선택된 양식을 직접 복사해 주세요.");
    }
  }
  return <section className="template-box" id="template">
    <div className="section-heading"><h2>기록 양식</h2><button type="button" onClick={copy}>양식 복사</button></div>
    <label className="sr-only" htmlFor="document-template">복사할 문서 양식</label>
    <textarea id="document-template" ref={field} readOnly value={text} rows={12} spellCheck={false} />
    <p className="copy-status" role="status">{status || "필요한 항목을 채워 운영진에게 전달해 주세요."}</p>
  </section>;
}
