(function () {
  const recipient = "2025koreacl@gmail.com";
  const cueStorageKey = "regulation-pd-cues-v1";
  const cueTypes = {
    shorts: "20초 쇼츠 제작용 큐시트",
    broadcast: "1분 영상 제작용 원고",
    live: "60분 유튜브 생방송용 큐시트",
  };

  function savedCues() {
    try {
      const parsed = JSON.parse(localStorage.getItem(cueStorageKey) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  async function copyText(text, button, defaultText) {
    if (button) button.textContent = "복사 중";
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const helper = document.createElement("textarea");
        helper.value = text;
        helper.setAttribute("readonly", "");
        helper.style.position = "fixed";
        helper.style.left = "-9999px";
        document.body.appendChild(helper);
        helper.select();
        document.execCommand("copy");
        helper.remove();
      }
      if (button) {
        button.textContent = "복사 완료";
        window.setTimeout(() => {
          button.textContent = defaultText;
        }, 1400);
      }
    } catch {
      const helper = document.createElement("textarea");
      helper.value = text;
      helper.setAttribute("readonly", "");
      helper.style.position = "fixed";
      helper.style.left = "-9999px";
      document.body.appendChild(helper);
      helper.select();
      const copied = document.execCommand("copy");
      helper.remove();
      if (button) {
        button.textContent = copied ? "복사 완료" : "직접 복사";
        window.setTimeout(() => {
          button.textContent = defaultText;
        }, 1400);
      }
      if (!copied) window.prompt("아래 대본을 길게 눌러 복사하세요.", text);
    }
  }

  async function shareText(title, text) {
    if (navigator.share) {
      try {
        await navigator.share({ title, text });
        return;
      } catch (error) {
        if (error && error.name === "AbortError") return;
      }
    }
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text)}`;
  }

  function renderTimetable() {
    const target = document.querySelector("#savedCueList");
    if (!target) return;
    const cues = savedCues();
    if (!cues.length) {
      target.innerHTML = '<p class="empty-state">저장된 대본이 없습니다.</p>';
      return;
    }
    const rows = cues
      .map((cue, index) => {
        const label = cueTypes[cue.type] || "큐시트";
        return `
          <tr>
            <td class="time-cell">${escapeHtml(cue.date || "-")}</td>
            <td>
              <strong>${escapeHtml(cue.title || label)}</strong>
              <small>${escapeHtml(label)}</small>
            </td>
            <td class="cue-record-actions">
              <button type="button" data-load-cue="${index}">불러오기</button>
              <button type="button" class="secondary" data-copy-cue="${index}">복사</button>
              <button type="button" class="secondary" data-share-cue="${index}">공유</button>
            </td>
          </tr>
        `;
      })
      .join("");
    target.innerHTML = `
      <div class="cue-table-wrap">
        <table class="cue-table">
          <thead>
            <tr>
              <th>저장 시각</th>
              <th>대본 기록</th>
              <th>활용</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }

  document.addEventListener("click", function (event) {
    const copyCurrent = event.target.closest("#copyCueBtn");
    const shareCurrent = event.target.closest("#shareCueBtn");
    const saveCurrent = event.target.closest("#saveCueBtn");
    const cueOutput = document.querySelector("#cueOutput");

    if (copyCurrent && cueOutput) {
      event.preventDefault();
      event.stopImmediatePropagation();
      copyText(cueOutput.value, copyCurrent, "대본 복사");
      return;
    }

    if (shareCurrent && cueOutput) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const active = document.querySelector(".cue-tab.active")?.dataset.cue || "shorts";
      shareText(`${cueTypes[active] || "큐시트"} 공유 - KOREA CONTENTS LAB`, cueOutput.value);
      return;
    }

    if (saveCurrent) {
      window.setTimeout(renderTimetable, 100);
      return;
    }

    const loadButton = event.target.closest("[data-load-cue]");
    const copyButton = event.target.closest("[data-copy-cue]");
    const shareButton = event.target.closest("[data-share-cue]");
    if (!loadButton && !copyButton && !shareButton) return;

    const index = Number(loadButton?.dataset.loadCue ?? copyButton?.dataset.copyCue ?? shareButton?.dataset.shareCue);
    const cue = savedCues()[index];
    if (!cue) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    if (copyButton) {
      copyText(cue.body, copyButton, "복사");
      return;
    }
    if (shareButton) {
      shareText(`${cue.title || "저장 대본"} - KOREA CONTENTS LAB`, cue.body);
      return;
    }

    if (cueOutput) {
      cueOutput.className = cue.type || "shorts";
      cueOutput.value = cue.body || "";
      document.querySelectorAll(".cue-tab").forEach((button) => {
        button.classList.toggle("active", button.dataset.cue === cue.type);
      });
      cueOutput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, true);

  window.addEventListener("storage", renderTimetable);
  window.addEventListener("load", renderTimetable);
  renderTimetable();
})();
