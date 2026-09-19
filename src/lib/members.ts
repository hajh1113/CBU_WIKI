export type UnclassifiedMember = {
  slug: string;
  name: string;
  username: string;
  displayName?: string;
  realName?: string;
};

// Temporary roster collected from the accessible Slack #general member list.
// A member is kept here only when the profile did not contain an unambiguous cohort label.
export const unclassifiedMembers: UnclassifiedMember[] = [
  { slug: "hong-gwangho", name: "홍광호", username: "hsun05", realName: "홍광호" },
  { slug: "min-jiwon", name: "민지원", username: "nk5bfbp2g8", realName: "민지원" },
  { slug: "park-seongbin", name: "박성빈", username: "kbmania", realName: "박성빈" },
  { slug: "lee-minseob", name: "이민섭", username: "lms5914__", displayName: "이민섭", realName: "이민섭" },
  { slug: "cho-yeyoon", name: "조예윤", username: "joyeyoon1027", realName: "조예윤" },
  { slug: "cho-junmin", name: "조준민", username: "coom1222", realName: "조준민" },
  { slug: "park-seokwon", name: "박석원", username: "0226psw", realName: "박석원" },
  { slug: "jeong-muhyeok", name: "정무혁", username: "angurdl0508", realName: "정무혁" },
  { slug: "shin-seungyoon", name: "신승윤", username: "gusic0812", displayName: "신승윤", realName: "신승윤" },
  { slug: "lee-seohyeon", name: "이서현", username: "pjh8gtzybc", realName: "이서현" },
  { slug: "park-sangcheon", name: "박상천", username: "overwell24", displayName: "박상천", realName: "박상천" },
  { slug: "sjininn", name: "sjininn", username: "sjininn", realName: "sjininn" },
  { slug: "ryu-dongwon", name: "류동원", username: "a89379903", realName: "류동원" },
  { slug: "go-jeongmin", name: "고정민", username: "jeongmini8234", realName: "고정민" },
  { slug: "hyewon", name: "혜원", username: "jungjungjungdd", displayName: "혜원", realName: "혜원" },
  { slug: "seongeun", name: "성은", username: "bongfam2", realName: "성은" },
  { slug: "lee-joowon", name: "이주원", username: "joowon", realName: "이주원" },
  { slug: "kim-seungjo", name: "김승조", username: "seungjo.eren", displayName: "김승조", realName: "김승조" },
  { slug: "hamin", name: "하민", username: "kimhamin0308", realName: "하민" },
  { slug: "seo-yeongeun", name: "서영은", username: "a01053907220", realName: "서영은" },
  { slug: "ryu-sangjin", name: "류상진", username: "2024192015", displayName: "류상진", realName: "류상진" },
  { slug: "kim-ryeoeun", name: "김려은", username: "fudms", realName: "김려은" },
  { slug: "won-gahyeong", name: "원가형", username: "rkgud0206", realName: "원가형" },
];

export function getUnclassifiedMember(slug: string) {
  return unclassifiedMembers.find((member) => member.slug === slug);
}

export type CohortMember = {
  slug: string;
  name: string;
  cohort: number;
  classificationBasis: string;
};

export type MemberDocument = {
  slug: string;
  name: string;
  cohort?: number;
  username?: string;
  displayName?: string;
  realName?: string;
  classificationBasis: string;
};

type CohortRoster = {
  cohort: number;
  members: CohortMember[];
};

function createRoster(cohort: number, names: string[], classificationBasis = `Slack 프로필 표시명 또는 실명에 ${cohort}기 표기`) {
  return names.map((name, index) => ({ slug: `${cohort}-${index + 1}-${name}`, name, cohort, classificationBasis }));
}

export const cohortRosters: CohortRoster[] = [
  { cohort: 3, members: createRoster(3, ["김기현"], "사용자 확인: 김기현님은 3기") },
  { cohort: 12, members: createRoster(12, ["김동언", "조진영"]) },
  { cohort: 13, members: createRoster(13, ["김도현"]) },
  { cohort: 14, members: createRoster(14, ["김광현", "김건우"]) },
  { cohort: 15, members: createRoster(15, ["선호윤"]) },
  { cohort: 16, members: createRoster(16, ["양민경", "홍석영", "이민기", "고예승"]) },
  { cohort: 17, members: createRoster(17, ["장수혁"], "Slack 프로필 실명에 17기 표기") },
  { cohort: 20, members: createRoster(20, ["김민욱"], "Slack 프로필 실명에 20기 표기") },
  { cohort: 24, members: createRoster(24, ["박소연", "황건하", "박채연", "최수진", "김민성", "김나형", "이우영", "김채은", "이광해", "전준일", "신성재"]) },
  { cohort: 25, members: createRoster(25, ["방준혁", "강성주"]) },
  { cohort: 26, members: createRoster(26, ["김의중", "손예서"], "Slack 프로필 실명에 26기 표기") },
  { cohort: 28, members: createRoster(28, ["이수민", "김형수", "유연우", "박상욱", "정혜원", "이우진", "이민섭", "이주호", "강남규", "조수민", "박재현", "김강문", "백우진", "이서율", "류지민", "김준서", "한예원", "정수현", "심은지", "이한결", "박진우", "이채훈", "민재헌", "김유림", "김한길"]) },
  { cohort: 29, members: createRoster(29, ["심진서", "이정민"]) },
  { cohort: 30, members: createRoster(30, ["장재윤", "하지환", "이승혜", "이보민", "이준석", "이승철", "이용욱", "손예진", "조성진", "이혜령", "이예빈", "김서현", "이완", "경서준", "장예지", "최재혁", "안승수", "안근영", "유현호", "위태인", "변정민", "김선중", "김민주", "최민기"]) },
];

export type OperatingRole = {
  title: "회장" | "부회장" | "운영" | "행사" | "홍보";
  members: CohortMember[];
};

function findCohortMember(cohort: number, name: string) {
  const member = cohortRosters.find((roster) => roster.cohort === cohort)?.members.find((item) => item.name === name);
  if (!member) throw new Error(`Missing roster member: ${cohort}기 ${name}`);
  return member;
}

// Only roles explicitly present in the current Slack profile data are listed.
export const operatingRoles: OperatingRole[] = [
  { title: "회장", members: [findCohortMember(24, "황건하")] },
  { title: "부회장", members: [] },
  { title: "운영", members: [findCohortMember(14, "김광현")] },
  { title: "행사", members: [] },
  { title: "홍보", members: [] },
];

export function getCohortRoster(slug: string) {
  const match = /^(\d+)기$/.exec(slug);
  return match ? cohortRosters.find((roster) => roster.cohort === Number(match[1])) : undefined;
}

export function getMember(slug: string): MemberDocument | undefined {
  const unclassifiedMember = getUnclassifiedMember(slug);
  if (unclassifiedMember) return { ...unclassifiedMember, classificationBasis: "확인한 프로필 정보에 명확한 기수 표기가 없습니다." };
  return cohortRosters.flatMap((roster) => roster.members).find((member) => member.slug === slug);
}
