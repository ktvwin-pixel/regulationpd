const recipient = "2025koreacl@gmail.com";
const byline = "KOREA CONTENTS LAB";
const storageKey = "regulation-pd-issues-v1";
const cueStorageKey = "regulation-pd-cues-v1";
const cueTypes = {
  shorts: { label: "20초 쇼츠 제작용 큐시트", color: "초록색", minutes: "20초" },
  broadcast: { label: "10분 방송 제작용 큐시트", color: "노란색", minutes: "10분" },
  live: { label: "60분 유튜브 생방송용 큐시트", color: "파란색", minutes: "60분" },
};

const seedIssues = [
  {
    title: "중복 인증과 사전승인이 신산업 출시를 늦추는 문제",
    sourceType: "정부 보도자료",
    source: "부처 보도자료·규제혁신 회의 자료",
    summary:
      "안전 확보라는 취지는 유효하지만 여러 부처의 인증과 사전승인이 겹치며 시장 진입 시간이 길어지고 비용이 커지는 사례가 반복된다.",
    damage: 4,
    innovation: 5,
    attention: 4,
    feasibility: 4,
  },
  {
    title: "지역 소상공인 디지털 전환을 막는 낡은 영업 기준",
    sourceType: "언론 보도",
    source: "경제지·지역지 보도",
    summary:
      "오프라인 영업장을 전제로 만든 기준이 온라인 예약, 배달, 플랫폼 판매 같은 현재 영업 방식과 충돌해 소상공인의 판로 확장을 어렵게 한다.",
    damage: 5,
    innovation: 4,
    attention: 4,
    feasibility: 5,
  },
  {
    title: "공공 발주 절차의 과도한 서류 요구와 책임 회피형 규정",
    sourceType: "공기업 요구",
    source: "공기업·협회 현장 건의",
    summary:
      "사고 예방과 감사 대응을 위해 쌓인 서류 규정이 실제 안전 품질보다 절차 방어에 집중되며 중소 협력사의 행정 부담을 높인다.",
    damage: 4,
    innovation: 3,
    attention: 3,
    feasibility: 4,
  },
  {
    title: "유튜브 댓글에서 반복되는 생활형 인허가 지연 불만",
    sourceType: "유튜브·댓글 이슈",
    source: "정책 설명 영상 댓글",
    summary:
      "국민은 규제 목적보다 처리 기간과 담당 기관 간 답변 차이를 더 크게 체감한다. 댓글에는 '누가 책임지는지 모르겠다'는 불만이 반복된다.",
    damage: 4,
    innovation: 3,
    attention: 5,
    feasibility: 4,
  },
];

const form = document.querySelector("#issueForm");
const issueList = document.querySelector("#issueList");
const topIssues = document.querySelector("#topIssues");
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
  if (!saved) return seedIssues;
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : seedIssues;
  } catch {
    return seedIssues;
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

function classify(issue) {
  if (issue.damage >= 5) return "현장 피해형";
  if (issue.innovation >= 5) return "혁신 저해형";
  if (issue.attention >= 5) return "여론 확산형";
  if (issue.feasibility >= 5) return "즉시 개선형";
  return "균형 검토형";
}

function renderMetrics() {
  const govTypes = ["정부 보도자료", "공기업 요구"];
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
        <li>${escapeHtml(makeReformAngle(issue))}</li>
        <li>${escapeHtml(makeVideoFormat(issue))}</li>
      </ol>
      <div class="tag-row">
        <span class="tag byline">${byline}</span>
        <span class="tag">${escapeHtml(issue.sourceType)}</span>
        <span class="tag">${classify(issue)}</span>
      </div>
    `;
    topIssues.appendChild(card);
  });
}

function getTopIssues() {
  return [...state.issues].sort((a, b) => scoreIssue(b) - scoreIssue(a)).slice(0, 3);
}

function makeHook(issue) {
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
  if (issue.feasibility >= 5) {
    return "법 개정보다 고시·지침·처리 기준 정비로 빠르게 바꿀 수 있는 개선안을 우선 제시한다.";
  }
  if (issue.innovation >= 4) {
    return "사전허가에서 사후관리, 금지에서 기준 공개, 중복심사에서 상호인정으로 전환하는 방안을 검토한다.";
  }
  return "예방 목적은 유지하되 서류·절차·책임 소재를 줄이는 비례적 대안을 찾는다.";
}

function makeVideoFormat(issue) {
  if (issue.attention >= 5) {
    return "8분 내외 이슈 브리핑: 댓글 3개, 팩트체크 3개, 개선안 3개 구조가 적합하다.";
  }
  if (issue.damage >= 5) {
    return "10분 현장형 다큐: 당사자 인터뷰와 행정절차 타임라인을 결합한다.";
  }
  return "6분 설명형 콘텐츠: 규제 탄생 배경, 현재 부작용, 개선 시나리오를 비교한다.";
}

function buildReport() {
  const top = getTopIssues();
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
    "목적: 대한민국 언론 보도, 정부 보도자료, 공공·민간 요구, 유튜브 여론을 바탕으로 이번 주 규제 개선 콘텐츠 주제 3건을 선정합니다.",
    "",
    "총괄 판단:",
    "이번 주 분석은 규제의 선한 목적과 실제 현장 효과가 어긋나는 지점을 중심으로 보았습니다. 특히 사고 예방을 명분으로 쌓인 사전절차, 중복 인증, 책임 회피형 서류 규정이 국민과 기업에게 보이지 않는 유리턱으로 작동하는지를 우선 검토했습니다.",
    "",
  ];

  top.forEach((issue, index) => {
    lines.push(`${index + 1}. ${issue.title}`);
    lines.push(`- 바이라인: ${byline}`);
    lines.push(`- 출처 유형: ${issue.sourceType}`);
    lines.push(`- 출처 메모: ${issue.source || "추가 확인 필요"}`);
    lines.push(`- 종합 점수: ${scoreIssue(issue).toFixed(1)} / 유형: ${classify(issue)}`);
    lines.push(`- 핵심 진단: ${issue.summary}`);
    lines.push(`- 영상 도입: ${makeHook(issue)}`);
    lines.push(`- 개선 방향: ${makeReformAngle(issue)}`);
    lines.push(`- 추천 포맷: ${makeVideoFormat(issue)}`);
    lines.push("- 구성안: 문제 제기 60초 -> 현장 사례 2분 -> 규제의 원래 목적 1분 -> 부작용 검증 2분 -> 개선 대안 2분 -> 시청자 제보 요청 30초");
    lines.push("");
  });

  lines.push("다음 액션:");
  lines.push("- 정부 사이트에서 원문 보도자료와 담당 부처를 확인합니다.");
  lines.push("- 관련 기사 3건 이상과 유튜브 댓글 반응을 교차 확인합니다.");
  lines.push("- 이해관계자 인터뷰 후보를 공공기관, 기업, 민간 단체로 나누어 섭외합니다.");
  lines.push("- 영상 제목은 '규제가 국민을 지키는가, 아니면 기회를 막는가'의 질문형으로 테스트합니다.");
  return lines.join("\n");
}

function renderReport() {
  reportOutput.value = buildReport();
}

function buildCueSheet(type) {
  const cue = cueTypes[type];
  const top = getTopIssues();
  const main = top[0] || seedIssues[0];
  const second = top[1] || main;
  const third = top[2] || second;
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
      "",
      "00:00-00:03 | 오프닝 훅",
      `"이 규제, 국민을 지키는 장치일까요? 아니면 기회를 막는 유리턱일까요?"`,
      "",
      "00:03-00:08 | 문제 압축",
      `${main.summary}`,
      "",
      "00:08-00:14 | 반전 포인트",
      `${makeReformAngle(main)}`,
      "",
      "00:14-00:18 | 개선 메시지",
      `"목적은 살리고, 절차는 줄이고, 현장은 움직이게 해야 합니다."`,
      "",
      "00:18-00:20 | 콜 투 액션",
      `"댓글로 여러분이 겪은 낡은 규제를 제보해주세요."`,
      "",
      "화면 메모: 큰 자막, 현장 이미지 2컷, 마지막 2초 KLC 로고 노출",
    ].join("\n");
  }

  if (type === "broadcast") {
    return [
      `[${cue.label}] ${date}`,
      `바이라인: ${byline}`,
      `대표 주제: ${main.title}`,
      "",
      "00:00-00:40 | 타이틀 및 문제 제기",
      "- KLC 로고 인트로",
      "- 오늘의 질문: 좋은 규제와 낡은 규제는 어디서 갈리는가",
      "",
      "00:40-02:00 | 이슈 1 현장 설명",
      `- ${main.title}`,
      `- 핵심 진단: ${main.summary}`,
      "",
      "02:00-04:00 | 이슈 2 비교 사례",
      `- ${second.title}`,
      `- 개선 방향: ${makeReformAngle(second)}`,
      "",
      "04:00-06:20 | 이슈 3 여론·댓글 포인트",
      `- ${third.title}`,
      `- 영상 포맷: ${makeVideoFormat(third)}`,
      "",
      "06:20-08:40 | 전문가 해설 대본",
      "- 규제의 원래 목적을 인정한다",
      "- 현장 비용, 중복 절차, 혁신 지연을 분리해 설명한다",
      "- 사전 금지보다 사후 관리, 중복 심사보다 상호 인정 원칙을 제시한다",
      "",
      "08:40-10:00 | 결론 및 제보 요청",
      "- 이번 주 TOP 3 요약",
      "- 정부 원문, 기사, 댓글 반응을 다음 회차에서 추가 검증 예고",
      "- 제보 요청: 기업, 공기업, 민간 단체 현장 사례",
    ].join("\n");
  }

  return [
    `[${cue.label}] ${date}`,
    `바이라인: ${byline}`,
    "형식: 유튜브 라이브, 진행자 1명 + 패널 1-2명 + 실시간 댓글 반영",
    "",
    "00:00-03:00 | 대기 화면",
    "- KLC 로고, 오늘의 주제 3개, 제보 이메일 안내",
    "",
    "03:00-08:00 | 오프닝",
    "- 오늘의 큰 질문: 규제는 안전망인가, 성장의 모래판인가",
    "- 시청자 댓글 참여 방식 안내",
    "",
    "08:00-20:00 | 1부: 이번 주 핵심 이슈",
    `- 1순위: ${main.title}`,
    `- 진단: ${main.summary}`,
    `- 개선 방향: ${makeReformAngle(main)}`,
    "",
    "20:00-32:00 | 2부: 공공·민간 요구 비교",
    `- 2순위: ${second.title}`,
    "- 공공기관, 기업, 단체가 보는 이해관계 차이 정리",
    "- 댓글 질문 3개 반영",
    "",
    "32:00-44:00 | 3부: 댓글 많은 이슈 검증",
    `- 3순위: ${third.title}`,
    "- 여론의 불만과 실제 제도 개선 가능성을 구분",
    "- 사실 확인이 필요한 주장 표시",
    "",
    "44:00-54:00 | 4부: 개선 시나리오",
    "- 즉시 개선: 지침·고시·서류 간소화",
    "- 중기 개선: 부처 간 상호 인정, 처리 기간 공개",
    "- 장기 개선: 법령 개정, 사후관리 체계 전환",
    "",
    "54:00-60:00 | 클로징",
    "- 이번 주 TOP 3 재정리",
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
  state.issues.splice(Number(button.dataset.index), 1);
  persist();
  renderAll();
});

document.querySelector("#analyzeBtn").addEventListener("click", renderAll);

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
  state.issues = seedIssues;
  persist();
  renderAll();
});

renderAll();
