# CBU WIKI

CBU 구성원의 사람, 활동, 기수별 아카이브와 지식을 쌓아가는 한국어 위키입니다. 참고 위키의 정보 구조를 바탕으로 새 디자인과 콘텐츠 모델로 구현했습니다.

## 구성

- 반응형 대문: 탐색 영역, 기수 아카이브, 지식 문서, 최근 업데이트
- `/wiki/[slug]`: 개별 문서 페이지
- `/search?q=...`: 제목과 요약 검색
- Supabase `wiki_pages` 테이블에서 최근 문서와 검색 결과를 조회
- Supabase 환경 변수가 없을 때는 예시 콘텐츠를 표시

## Supabase 적용

1. Supabase SQL Editor에서 [`supabase/schema.sql`](./supabase/schema.sql)을 실행합니다.
2. Supabase Dashboard의 Project URL과 Publishable key를 복사합니다.
3. `.env.example`을 `.env.local`로 복사한 뒤 두 값을 입력합니다.

```bash
cp .env.example .env.local
```

Vercel에도 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`를 Preview와 Production 환경에 등록하세요.

## 로컬 실행과 검증

```bash
npm run dev
npm run lint
npx next build --webpack
```

이 환경에서는 Turbopack의 내부 포트 제약으로 `npm run build` 대신 `npx next build --webpack`으로 검증했습니다.

## 2026-09-19 개선

- 신입 안내, 학습 로드맵, 개발 환경, Git·코드 리뷰, 스터디, 프로젝트, 트러블슈팅, 질문, 세미나·해커톤, 회고·인수인계 등 14개 기본 문서.
- 문서 목차·관련 문서·분류 탐색과 7종 복사 가능한 양식.
- 기본 문서 본문·태그와 멤버 이름·기수 검색. 원격 문서는 제목·요약 검색.
- 기존 멤버 데이터와 운영진-개인 문서 연결 유지. 빈 기수 안내와 알 수 없는 문서의 404 처리.
- 웹 편집·로그인·업로드는 아직 제공하지 않으며, 작동하지 않던 메뉴는 제거.

기본 문서는 `src/lib/handbook.ts`에서 관리합니다. 기본 가이드는 같은 slug의 Supabase 예시 문서보다 우선 표시하며 원격 레코드를 변경하지 않습니다. 그 외 원격 문서의 상세 조회, 검색, 최근 문서 조회는 유지합니다. 환경 변수가 없거나 원격 조회가 실패해도 기본 문서는 계속 사용할 수 있습니다.

참고한 구성: 위키백과의 대문·참여 안내, MediaWiki의 도움말·분류, SPARCS의 프로젝트·스터디 활동. 실제 모집·일정·실적은 확인된 내용이 있을 때 추가합니다.
