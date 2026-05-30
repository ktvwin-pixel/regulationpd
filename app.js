const recipient = "2025koreacl@gmail.com";
const byline = "KOREA CONTENTS LAB";
const storageKey = "regulation-pd-issues-v1";
const cueStorageKey = "regulation-pd-cues-v1";
const deletedIssueKey = "regulation-pd-deleted-issues-v1";
const cueTypes = {
  shorts: { label: "20초 쇼츠 제작용 큐시트", color: "초록색", minutes: "20초" },
  broadcast: { label: "1분 영상 제작용 원고", color: "노란색", minutes: "1분" },
  live: { label: "60분 유튜브 생방송용 큐시트", color: "파란색", minutes: "60분" },
};

const goodRegulationPrinciples = [
  "소수의 이익보다 국민 전체의 이익",
  "안전과 성장을 함께 고려",
  "기술발전을 제한하지 않고 혁신을 촉진",
  "위험에 대한 합리적 분석과 증거에 기반",
  "규제 외 대안이 없는 불가피한 경우에만 도입",
  "기존 중복·유사 규제 존재부터 확인",
  "이해관계자 의견수렴을 제대로 진행",
  "해야 할 일보다 하면 안 되는 일만 지정",
  "국제비교를 통해 규제강도를 최소화",
  "예측가능성을 높이고 불확실성을 제거",
  "처음부터 검증가능한 성과목표를 제시",
  "유효기간이 지나 불필요한 규제는 폐기",
  "비용보다 혜택이 더 큰 대안을 선택",
];

const issueBank = [
  {
    id: "monitor-99-good",
    title: "99주차 입법모니터링: 좋은 규제로 선정된 법률안의 공익·혁신 효과",
    sourceType: "입법 모니터링",
    source: "좋은규제시민포럼 22대 국회 99주차 모니터링(2026-04-28)",
    summary:
      "유용원·이종배 의원 법률안은 공익 보호와 제도 효율을 함께 높이는 방향으로 평가되어 좋은 규제 후보로 분류된다. 국민 전체 이익, 예측가능성, 비용 대비 편익을 중심으로 설명할 수 있다.",
    damage: 4,
    innovation: 5,
    attention: 4,
    feasibility: 5,
  },
  {
    id: "monitor-99-bad",
    title: "99주차 입법모니터링: 나쁜 규제로 선정된 법률안의 과잉개입 위험",
    sourceType: "입법 모니터링",
    source: "좋은규제시민포럼 22대 국회 99주차 모니터링(2026-04-28)",
    summary:
      "정혜경·김용만 의원 법률안은 규제 목적에 비해 시장·현장 부담이 커질 수 있는 나쁜 규제 후보로 제시된다. 불가피성, 중복규제, 이해관계자 의견수렴 여부를 따져야 한다.",
    damage: 5,
    innovation: 5,
    attention: 5,
    feasibility: 3,
  },
  {
    id: "monitor-98-bad",
    title: "98주차 입법모니터링: 플랫폼·지역경제 법안의 규제강도 점검",
    sourceType: "입법 모니터링",
    source: "좋은규제시민포럼 22대 국회 98주차 모니터링(2026-04-21)",
    summary:
      "김석기·복기왕 의원 법률안은 좋은 규제, 이정문·윤준병 의원 법률안은 나쁜 규제로 선정되었다. 지역경제 보호 명분과 실제 시장 선택권 제한 사이의 균형을 검증한다.",
    damage: 4,
    innovation: 4,
    attention: 4,
    feasibility: 4,
  },
  {
    id: "monitor-97-bad",
    title: "97주차 입법모니터링: 보호명분 규제의 비용·편익 재점검",
    sourceType: "입법 모니터링",
    source: "좋은규제시민포럼 22대 국회 97주차 모니터링(2026-04-14)",
    summary:
      "전현희·김성원 의원 법률안은 좋은 규제, 배준영·문진석 의원 법률안은 나쁜 규제로 선정되었다. 안전·보호 목적이 있더라도 성과목표와 비용 대비 편익을 따져야 한다.",
    damage: 4,
    innovation: 4,
    attention: 5,
    feasibility: 4,
  },
  {
    id: "monitor-96-bad",
    title: "96주차 입법모니터링: 행정 편의형 규제의 중복 여부 검토",
    sourceType: "입법 모니터링",
    source: "좋은규제시민포럼 22대 국회 96주차 모니터링(2026-04-07)",
    summary:
      "오세희·박희승 의원 법률안은 좋은 규제, 박홍배·박상혁 의원 법률안은 나쁜 규제로 선정되었다. 기존 제도와 중복되는지, 현장에 새 부담을 만드는지 점검한다.",
    damage: 4,
    innovation: 3,
    attention: 4,
    feasibility: 4,
  },
  {
    id: "monitor-95-bad",
    title: "95주차 입법모니터링: 신산업 진입을 막는 사전규제 점검",
    sourceType: "입법 모니터링",
    source: "좋은규제시민포럼 22대 국회 95주차 모니터링(2026-04-01)",
    summary:
      "송재봉·황정아 의원 법률안은 좋은 규제, 신성범·이용우 의원 법률안은 나쁜 규제로 선정되었다. 기술발전을 제한하는 사전규제인지, 사후관리로 대체 가능한지 검토한다.",
    damage: 5,
    innovation: 5,
    attention: 4,
    feasibility: 4,
  },
  {
    id: "monitor-93-bad",
    title: "93주차 입법모니터링: 공익 명분과 사적 선택권의 충돌",
    sourceType: "입법 모니터링",
    source: "좋은규제시민포럼 22대 국회 93주차 모니터링(2026-03-17)",
    summary:
      "서삼석·서영석 의원 법률안은 좋은 규제, 권향엽·김영진 의원 법률안은 나쁜 규제로 선정되었다. 공익 목적이 국민 전체 이익인지, 특정 집단 이익인지 구분한다.",
    damage: 4,
    innovation: 4,
    attention: 3,
    feasibility: 5,
  },
  {
    id: "monitor-92-bad",
    title: "92주차 입법모니터링: 규제효과를 검증할 수 있는 목표 설정",
    sourceType: "입법 모니터링",
    source: "좋은규제시민포럼 22대 국회 92주차 모니터링(2026-03-10)",
    summary:
      "전진숙·정준호 의원 법률안은 좋은 규제, 이개호·신장식 의원 법률안은 나쁜 규제로 선정되었다. 규제 도입 전에 성과목표와 일몰·재검토 기준을 분명히 해야 한다.",
    damage: 3,
    innovation: 4,
    attention: 4,
    feasibility: 5,
  },
];

const seedIssues = getDefaultIssues();

const form = document.querySelector("#issueForm");
const issueList = document.querySelector("#issueList");
const topIssues = document.querySelector("#topIssues");
const issueSummary = document.querySelector("#issueSummary");
const reportOutput = document.querySelector("#reportOutput");
const cueOutput = document.querySelector("#cueOutput");
const savedCueList = document.querySelector("#savedCueList");

const state = {
  issues: loadIssues(),
  savedCues: loadSavedCues(),
  activeCue: "shorts",
};

function loadIssues() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return getDefaultIssues();
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : getDefaultIssues();
  } catch {
    return getDefaultIssues();
  }
}

function loadSavedCues() {
  const saved = localStorage.getItem(cueStorageKey);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadDeletedIssueIds() {
  try {
    const parsed = JSON.parse(localStorage.getItem(deletedIssueKey) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getDefaultIssues(limit = 3) {
  const deleted = new Set(loadDeletedIssueIds());
  const available = issueBank.filter((issue) => !deleted.has(issue.id));
  const source = available.length >= limit ? available : issueBank;
  return source.slice(0, limit).map((issue) => ({ ...issue }));
}

function rememberDeletedIssue(issue) {
  if (!issue || !issue.id) return;
  const deleted = loadDeletedIssueIds();
  if (!deleted.includes(issue.id)) {
    deleted.push(issue.id);
    localStorage.setItem(deletedIssueKey, JSON.stringify(deleted.slice(-issueBank.length)));
  }
}

function ensureIssueSet() {
  if (state.issues.length) return;
  state.issues = getDefaultIssues();
  localStorage.setItem(storageKey, JSON.stringify(state.issues));
}

function persist() {
  localStorage.setItem(storageKey, JSON.stringify(state.issues));
  localStorage.setItem(cueStorageKey, JSON.stringify(state.savedCues));
  const saveState = document.querySelector("#saveState");
  saveState.textContent = "저장됨";
  window.setTimeout(() => {
    saveState.textContent = "자동 저장";
  }, 1200);
}

function getWeekLabel() {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() + 1);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const fmt = new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric" });
  return `${fmt.format(start)} - ${fmt.format(end)}`;
}

function scoreIssue(issue) {
  return (
    Number(issue.damage) * 1.25 +
    Number(issue.innovation) * 1.25 +
    Number(issue.attention) +
    Number(issue.feasibility) * 1.15
  );
}

function getPrincipleHits(issue) {
  const hits = [];
  if (issue.damage >= 5) hits.push(goodRegulationPrinciples[0], goodRegulationPrinciples[12]);
  if (issue.innovation >= 5) hits.push(goodRegulationPrinciples[2], goodRegulationPrinciples[7]);
  if (issue.attention >= 5) hits.push(goodRegulationPrinciples[6], goodRegulationPrinciples[9]);
  if (issue.feasibility >= 5) hits.push(goodRegulationPrinciples[10], goodRegulationPrinciples[11]);
  if (!hits.length) hits.push(goodRegulationPrinciples[3], goodRegulationPrinciples[5], goodRegulationPrinciples[8]);
  return [...new Set(hits)].slice(0, 3);
}

function assessIssue(issue) {
  const burden = Number(issue.damage) + Number(issue.innovation);
  const correction = Number(issue.feasibility) + Number(issue.attention);
  if (burden >= 9 && issue.feasibility <= 3) return "나쁜 규제 후보";
  if (correction >= 9 && issue.feasibility >= 4) return "좋은 규제 후보";
  return "추가 검증 후보";
}

function classify(issue) {
  if (issue.damage >= 5) return "현장 피해형";
  if (issue.innovation >= 5) return "혁신 저해형";
  if (issue.attention >= 5) return "여론 확산형";
  if (issue.feasibility >= 5) return "즉시 개선형";
  return "균형 검토형";
}

function renderMetrics() {
  const govTypes = ["정부 보도자료", "공기업 요구", "입법 모니터링"];
  const privateTypes = ["민간 기업 요구", "민간 단체 요구"];
  document.querySelector("#weekLabel").textContent = getWeekLabel();
  document.querySelector("#metricTotal").textContent = state.issues.length;
  document.querySelector("#metricGov").textContent = state.issues.filter((issue) =>
    govTypes.includes(issue.sourceType)
  ).length;
  document.querySelector("#metricPrivate").textContent = state.issues.filter((issue) =>
    privateTypes.includes(issue.sourceType)
  ).length;
  document.querySelector("#metricComments").textContent = state.issues.filter(
    (issue) => issue.sourceType === "유튜브·댓글 이슈"
  ).length;
}

function renderIssues() {
  issueList.innerHTML = "";
  state.issues
    .map((issue, index) => ({ issue, index, score: scoreIssue(issue) }))
    .sort((a, b) => b.score - a.score)
    .forEach(({ issue, index, score }) => {
      const card = document.createElement("article");
      card.className = "issue-card";
      card.innerHTML = `
        <header>
          <h3>${escapeHtml(issue.title)}</h3>
          <span class="score">${score.toFixed(1)}</span>
        </header>
        <p>${escapeHtml(issue.summary)}</p>
        <div class="tag-row">
          <span class="tag byline">${byline}</span>
          <span class="tag">${escapeHtml(issue.sourceType)}</span>
          <span class="tag">${assessIssue(issue)}</span>
          <span class="tag">${classify(issue)}</span>
          <span class="tag">개선가능성 ${issue.feasibility}/5</span>
        </div>
        <button class="delete-btn" type="button" data-index="${index}">삭제</button>
      `;
      issueList.appendChild(card);
    });
}

function renderTopIssues() {
  const top = getTopIssues();
  topIssues.innerHTML = "";
  top.forEach((issue, index) => {
    const card = document.createElement("article");
    card.className = "top-card";
    card.innerHTML = `
      <header>
        <h3>${index + 1}. ${escapeHtml(issue.title)}</h3>
        <span class="score">${scoreIssue(issue).toFixed(1)}</span>
      </header>
      <p>${escapeHtml(issue.summary)}</p>
      <ol>
        <li>${escapeHtml(makeHook(issue))}</li>
        <li>${escapeHtml(`13대 조건 적용: ${getPrincipleHits(issue).join(" / ")}`)}</li>
        <li>${escapeHtml(makeReformAngle(issue))}</li>
        <li>${escapeHtml(makeVideoFormat(issue))}</li>
      </ol>
      <div class="tag-row">
        <span class="tag byline">${byline}</span>
        <span class="tag">${escapeHtml(issue.sourceType)}</span>
        <span class="tag">${assessIssue(issue)}</span>
        <span class="tag">${classify(issue)}</span>
      </div>
    `;
    topIssues.appendChild(card);
  });
}

function summarizeIssue(issue, index) {
  const score = scoreIssue(issue).toFixed(1);
  const source = issue.source || "추가 확인 필요";
  return {
    title: `${index + 1}. ${issue.title}`,
    body: `${assessIssue(issue)} · ${classify(issue)} · 점수 ${score}. ${issue.summary} 출처는 ${source}이며, 13대 조건 중 ${getPrincipleHits(issue).join(", ")} 기준으로 검토한다.`,
  };
}

function renderIssueSummary() {
  const summaries = getTopIssues().map(summarizeIssue);
  issueSummary.innerHTML = summaries
    .map(
      (item) => `
        <article class="summary-card">
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.body)}</p>
        </article>
      `
    )
    .join("");
}

function getTopIssues() {
  return [...state.issues].sort((a, b) => scoreIssue(b) - scoreIssue(a)).slice(0, 3);
}

function makeHook(issue) {
  if (issue.sourceType.includes("입법")) {
    return `규제 시민 포럼의 이번 주 질문, "${issue.title}"이 왜 좋은 규제 또는 나쁜 규제인지 바로 판정한다.`;
  }
  if (issue.sourceType.includes("유튜브")) {
    return "댓글의 분노를 정책 언어로 번역해 '왜 국민은 답답한가'를 첫 장면으로 연다.";
  }
  if (issue.innovation >= 5) {
    return "좋은 의도로 만든 규제가 어떻게 신산업의 유리턱이 되는지 사례 중심으로 보여준다.";
  }
  if (issue.damage >= 5) {
    return "현장에서 매일 발생하는 비용과 지연을 한 사람의 하루로 압축해 공감대를 만든다.";
  }
  return "규제의 목적과 실제 결과가 어긋난 지점을 차분하게 대조한다.";
}

function makeReformAngle(issue) {
  const principles = getPrincipleHits(issue).join(", ");
  if (issue.feasibility >= 5) {
    return `13대 조건 중 ${principles} 기준을 적용해 법 개정보다 고시·지침·처리 기준 정비로 빠르게 바꿀 수 있는 대안을 제시한다.`;
  }
  if (issue.innovation >= 4) {
    return `13대 조건 중 ${principles} 기준을 적용해 사전허가에서 사후관리, 금지에서 기준 공개, 중복심사에서 상호인정으로 전환하는 방안을 검토한다.`;
  }
  return `13대 조건 중 ${principles} 기준을 적용해 예방 목적은 유지하되 서류·절차·책임 소재를 줄이는 비례적 대안을 찾는다.`;
}

function makeVideoFormat(issue) {
  if (issue.attention >= 5) {
    return "1분 이슈 판정 영상: 법안 취지, 13대 조건 위반·충족 여부, 시민에게 남는 비용을 빠르게 판정한다.";
  }
  if (issue.damage >= 5) {
    return "20초 쇼츠와 1분 영상 모두 현장 비용을 첫 문장에 놓고, 60분 생방송에서는 법안별 쟁점을 대조한다.";
  }
  return "13대 조건 설명형 콘텐츠: 좋은 규제와 나쁜 규제를 같은 체크리스트로 비교한다.";
}

function buildReport() {
  const top = getTopIssues();
  const summaries = top.map(summarizeIssue);
  const date = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date());

  const lines = [
    `[주간 규제 개선 콘텐츠 기획안] ${date}`,
    "",
    `수신: ${recipient}`,
    "목적: 규제 시민 포럼의 주간 입법 모니터링과 현장 이슈를 바탕으로 이번 주 좋은 규제·나쁜 규제 후보 3건을 선정하고, 바로 사용할 수 있는 영상 원고로 전환합니다.",
    "",
    "분석 기준: 좋은 규제의 13대 조건",
    ...goodRegulationPrinciples.map((principle, index) => `${index + 1}. ${principle}`),
    "",
    "총괄 판단:",
    "이번 주 분석은 규제 목적의 선의보다 실제 비용, 국민 전체 편익, 혁신 제한 여부, 중복 규제 여부, 성과 검증 가능성을 우선했습니다. 좋은 규제는 공익과 예측가능성을 높이는 법안으로, 나쁜 규제는 보호 명분에 비해 현장 부담과 시장 제한이 큰 법안으로 구분합니다.",
    "",
    "주요이슈 3개 요약:",
    ...summaries.map((item) => `- ${item.title}: ${item.body}`),
    "",
  ];

  top.forEach((issue, index) => {
    lines.push(`${index + 1}. ${issue.title}`);
    lines.push(`- 바이라인: ${byline}`);
    lines.push(`- 출처 유형: ${issue.sourceType}`);
    lines.push(`- 출처 메모: ${issue.source || "추가 확인 필요"}`);
    lines.push(`- 종합 점수: ${scoreIssue(issue).toFixed(1)} / 판정: ${assessIssue(issue)} / 유형: ${classify(issue)}`);
    lines.push(`- 적용 원칙: ${getPrincipleHits(issue).join(" / ")}`);
    lines.push(`- 핵심 진단: ${issue.summary}`);
    lines.push(`- 영상 도입: ${makeHook(issue)}`);
    lines.push(`- 개선 방향: ${makeReformAngle(issue)}`);
    lines.push(`- 추천 포맷: ${makeVideoFormat(issue)}`);
    lines.push("- 구성안: 문제 제기 60초 -> 현장 사례 2분 -> 규제의 원래 목적 1분 -> 부작용 검증 2분 -> 개선 대안 2분 -> 시청자 제보 요청 30초");
    lines.push("");
  });

  lines.push("다음 액션:");
  lines.push("- 규제 시민 포럼 모니터링 원문에서 해당 주차의 법률안명과 대표 발의자를 확인합니다.");
  lines.push("- 좋은 규제·나쁜 규제 판정 근거를 13대 조건 번호로 표시합니다.");
  lines.push("- 20초 쇼츠, 1분 영상, 60분 생방송 원고를 그대로 복사해 제작에 사용합니다.");
  lines.push("- 다음 주 새로고침 시 삭제된 기본 이슈를 제외하고 차순위 모니터링 후보가 자동으로 채워집니다.");
  return lines.join("\n");
}

function renderReport() {
  reportOutput.value = buildReport();
}

function buildCueSheet(type) {
  const cue = cueTypes[type];
  const top = getTopIssues();
  const fallbackIssue = getDefaultIssues(1)[0] || issueBank[0];
  const main = top[0] || fallbackIssue;
  const second = top[1] || main;
  const third = top[2] || second;
  const mainPrinciples = getPrincipleHits(main).join(", ");
  const date = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  if (type === "shorts") {
    return [
      `[${cue.label}] ${date}`,
      `바이라인: ${byline}`,
      `주제: ${main.title}`,
      `판정: ${assessIssue(main)}`,
      `적용 원칙: ${mainPrinciples}`,
      "",
      "00:00-00:03 | 첫 문장",
      `"이번 주 규제 시민 포럼 모니터링에서 주목할 법안은 ${main.title}입니다."`,
      "",
      "00:03-00:08 | 판정",
      `"판정은 ${assessIssue(main)}입니다. 핵심은 ${mainPrinciples}입니다."`,
      "",
      "00:08-00:15 | 이유",
      `${main.summary}`,
      "",
      "00:15-00:18 | 기준",
      `"좋은 규제는 목적이 좋아 보이는 규제가 아니라, 비용보다 편익이 크고 혁신을 막지 않는 규제입니다."`,
      "",
      "00:18-00:20 | 콜 투 액션",
      `"이번 법안, 좋은 규제일까요 나쁜 규제일까요? 의견을 남겨주세요."`,
      "",
      "화면 메모: 법안명 큰 자막 -> 좋은/나쁜 규제 판정 -> 13대 조건 키워드 3개 -> KLC 로고",
    ].join("\n");
  }

  if (type === "broadcast") {
    return [
      `[${cue.label}] ${date}`,
      `바이라인: ${byline}`,
      `대표 법안: ${main.title}`,
      `판정: ${assessIssue(main)}`,
      "",
      "00:00-00:05 | 훅",
      `이번 주 입법 모니터링의 핵심은 "${main.title}"입니다.`,
      "",
      "00:05-00:15 | 한 줄 판정",
      `이 법안은 ${assessIssue(main)}입니다. 판단 기준은 ${mainPrinciples}입니다.`,
      "",
      "00:15-00:35 | 근거",
      `${main.summary}`,
      "",
      "00:35-00:50 | 좋은 규제 13대 조건 적용",
      `${makeReformAngle(main)}`,
      "",
      "00:50-01:00 | 마무리",
      `규제는 선의만으로 충분하지 않습니다. 국민 전체 이익, 혁신, 비용 대비 편익을 통과해야 좋은 규제입니다. KOREA CONTENTS LAB이 다음 주에도 입법 모니터링을 이어가겠습니다.`,
    ].join("\n");
  }

  return [
    `[${cue.label}] ${date}`,
    `바이라인: ${byline}`,
    "형식: 규제 시민 포럼 주간 입법 모니터링 생방송, 진행자 1명 + 패널 1-2명 + 실시간 댓글 반영",
    "",
    "00:00-03:00 | 대기 화면",
    "- KLC 로고",
    `- 오늘의 모니터링 주제 3개: ${top.map((issue) => issue.title).join(" / ")}`,
    "- 제보 이메일 안내",
    "",
    "03:00-08:00 | 오프닝",
    "- 오늘의 큰 질문: 이 법안은 좋은 규제인가, 나쁜 규제인가",
    "- 좋은 규제의 13대 조건 소개",
    ...goodRegulationPrinciples.map((principle, index) => `  ${index + 1}. ${principle}`),
    "- 시청자 댓글 참여 방식 안내",
    "",
    "08:00-20:00 | 1부: 1순위 법안 판정",
    `- 1순위: ${main.title}`,
    `- 판정: ${assessIssue(main)}`,
    `- 적용 원칙: ${getPrincipleHits(main).join(" / ")}`,
    `- 진단: ${main.summary}`,
    `- 개선 방향: ${makeReformAngle(main)}`,
    "",
    "20:00-32:00 | 2부: 2순위 법안 판정",
    `- 2순위: ${second.title}`,
    `- 판정: ${assessIssue(second)}`,
    `- 적용 원칙: ${getPrincipleHits(second).join(" / ")}`,
    `- 진단: ${second.summary}`,
    `- 개선 방향: ${makeReformAngle(second)}`,
    "",
    "32:00-44:00 | 3부: 3순위 법안 판정",
    `- 3순위: ${third.title}`,
    `- 판정: ${assessIssue(third)}`,
    `- 적용 원칙: ${getPrincipleHits(third).join(" / ")}`,
    `- 진단: ${third.summary}`,
    `- 개선 방향: ${makeReformAngle(third)}`,
    "",
    "44:00-54:00 | 4부: 13대 조건 종합 토론",
    "- 국민 전체 이익과 특정 이해관계 보호를 구분",
    "- 규제 외 대안 가능성 검토",
    "- 중복 규제와 국제비교 기준 검토",
    "- 성과목표, 일몰, 비용 대비 편익을 최종 점검",
    "",
    "54:00-60:00 | 클로징",
    `- 오늘의 결론: ${top.map((issue, index) => `${index + 1}순위 ${assessIssue(issue)}`).join(" / ")}`,
    "- 다음 주 조사 예고",
    "- KOREA CONTENTS LAB 바이라인 고지와 제보 요청",
  ].join("\n");
}

function renderCueSheet() {
  cueOutput.className = state.activeCue;
  cueOutput.value = buildCueSheet(state.activeCue);
  document.querySelectorAll(".cue-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.cue === state.activeCue);
  });
}

function renderSavedCues() {
  savedCueList.innerHTML = "";
  if (!state.savedCues.length) {
    savedCueList.innerHTML = `<p class="empty-state">저장된 대본이 없습니다.</p>`;
    return;
  }
  state.savedCues.forEach((cue, index) => {
    const item = document.createElement("article");
    item.className = "saved-cue";
    item.innerHTML = `
      <strong>${escapeHtml(cue.title)}</strong>
      <small>${escapeHtml(cue.date)} · ${escapeHtml(cueTypes[cue.type].label)}</small>
      <button type="button" data-load-cue="${index}">불러오기</button>
    `;
    savedCueList.appendChild(item);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderAll() {
  renderMetrics();
  renderIssues();
  renderIssueSummary();
  renderTopIssues();
  renderReport();
  renderCueSheet();
  renderSavedCues();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  state.issues.push({
    title: data.get("title").trim(),
    sourceType: data.get("sourceType"),
    source: data.get("source").trim(),
    summary: data.get("summary").trim(),
    damage: Number(data.get("damage")),
    innovation: Number(data.get("innovation")),
    attention: Number(data.get("attention")),
    feasibility: Number(data.get("feasibility")),
  });
  form.reset();
  document.querySelector("#damage").value = 4;
  document.querySelector("#innovation").value = 4;
  document.querySelector("#attention").value = 3;
  document.querySelector("#feasibility").value = 4;
  persist();
  renderAll();
});

issueList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-index]");
  if (!button) return;
  const [removed] = state.issues.splice(Number(button.dataset.index), 1);
  rememberDeletedIssue(removed);
  persist();
  renderAll();
});

document.querySelector("#analyzeBtn").addEventListener("click", renderAll);

document.querySelector("#summarizeBtn").addEventListener("click", () => {
  renderIssueSummary();
  renderReport();
  issueSummary.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#refreshBtn").addEventListener("click", async () => {
  const button = document.querySelector("#refreshBtn");
  button.textContent = "갱신 중";
  ensureIssueSet();
  try {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
        if (registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }
      }
    }
    window.location.reload();
  } catch {
    window.location.reload();
  }
});

document.querySelector("#copyBtn").addEventListener("click", async () => {
  await navigator.clipboard.writeText(reportOutput.value);
  document.querySelector("#copyBtn").textContent = "복사 완료";
  window.setTimeout(() => {
    document.querySelector("#copyBtn").textContent = "보고서 복사";
  }, 1400);
});

document.querySelector("#emailBtn").addEventListener("click", () => {
  const subject = encodeURIComponent("주간 규제 개선 유튜브 콘텐츠 기획안");
  const body = encodeURIComponent(reportOutput.value);
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});

document.querySelectorAll(".cue-tab").forEach((button) => {
  button.addEventListener("click", () => {
    state.activeCue = button.dataset.cue;
    renderCueSheet();
  });
});

document.querySelector("#saveCueBtn").addEventListener("click", () => {
  const cue = cueTypes[state.activeCue];
  state.savedCues.unshift({
    type: state.activeCue,
    title: `${cue.label} - ${getTopIssues()[0]?.title || "규제 개선 주제"}`,
    date: new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date()),
    body: cueOutput.value,
  });
  state.savedCues = state.savedCues.slice(0, 20);
  persist();
  renderSavedCues();
  document.querySelector("#saveCueBtn").textContent = "저장 완료";
  window.setTimeout(() => {
    document.querySelector("#saveCueBtn").textContent = "대본 저장";
  }, 1400);
});

document.querySelector("#copyCueBtn").addEventListener("click", async () => {
  await navigator.clipboard.writeText(cueOutput.value);
  document.querySelector("#copyCueBtn").textContent = "복사 완료";
  window.setTimeout(() => {
    document.querySelector("#copyCueBtn").textContent = "대본 복사";
  }, 1400);
});

document.querySelector("#shareCueBtn").addEventListener("click", () => {
  const cue = cueTypes[state.activeCue];
  const subject = encodeURIComponent(`${cue.label} 공유 - KOREA CONTENTS LAB`);
  const body = encodeURIComponent(cueOutput.value);
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});

savedCueList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-load-cue]");
  if (!button) return;
  const cue = state.savedCues[Number(button.dataset.loadCue)];
  if (!cue) return;
  state.activeCue = cue.type;
  cueOutput.className = cue.type;
  cueOutput.value = cue.body;
  document.querySelectorAll(".cue-tab").forEach((tabButton) => {
    tabButton.classList.toggle("active", tabButton.dataset.cue === cue.type);
  });
});

document.querySelector("#resetBtn").addEventListener("click", () => {
  localStorage.removeItem(deletedIssueKey);
  state.issues = getDefaultIssues();
  persist();
  renderAll();
});

renderAll();
