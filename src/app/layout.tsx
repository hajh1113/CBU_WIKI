import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "씨부엉 위키 | 함께 쌓는 코드와 경험", description: "코딩동아리 씨부엉의 멤버, 스터디, 프로젝트와 개발 지식을 연결하는 위키" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="ko"><body>{children}</body></html>;
}
