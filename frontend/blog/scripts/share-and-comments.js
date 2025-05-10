window.addEventListener("DOMContentLoaded", () => {
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = document.title;

  const shareOptions = [
    { name: "X", url: `https://x.com/intent/tweet?text=${pageTitle}&url=${pageUrl}` },
    { name: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}` },
    { name: "Reddit", url: `https://reddit.com/submit?url=${pageUrl}` },
    { name: "Email", url: `mailto:?subject=${pageTitle}&body=${pageUrl}` },
    { name: "Telegram", url: `https://t.me/share/url?url=${pageUrl}&text=${pageTitle}` },
    { name: "Messenger", url: `fb-messenger://share/?link=${pageUrl}` },
    { name: "Messages", url: `sms:&body=${pageTitle}%20${pageUrl}` },
    { name: "Copy Link", action: "copy" },
    { name: "QR Code", action: "qrcode" },
    { name: "Long Screenshot", action: "screenshot" },
    { name: "More…", action: "systemshare" }
  ];

  // Inject styles
  const style = document.createElement("style");
  style.textContent = `
    .share-container { position: relative; margin-top: 1rem; }
    .main-share-btn {
      background: #00ffc3; color: #0b0b0b;
      padding: 0.5rem 1rem; font-weight: bold;
      border-radius: 8px; border: none; cursor: pointer;
    }
    .share-dropdown {
      position: absolute; top: 2.5rem; left: 0;
      display: none; flex-direction: column;
      background: #1a1a1a; border: 1px solid #00ffc3;
      border-radius: 8px; z-index: 999; padding: 0.5rem; gap: 0.25rem;
    }
    .share-dropdown a, .share-dropdown button {
      color: #f4f4f4; background: none; border: none;
      text-align: left; display: flex; align-items: center;
      gap: 0.5rem; padding: 0.25rem 0.5rem; cursor: pointer;
    }
    .share-dropdown a:hover, .share-dropdown button:hover {
      background-color: rgba(0,255,195,0.1);
    }
    .screenshot-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.85); z-index: 10000;
      display: flex; justify-content: center; align-items: center; flex-direction: column;
    }
    .screenshot-preview {
      position: relative; overflow-y: scroll;
      border: 2px solid #00ffc3; max-height: 90vh; width: 90vw;
    }
    .screenshot-dragbar {
      position: absolute; height: 2px; width: 100%;
      cursor: ns-resize; background: #00ffc3;
    }
    .screenshot-top::after, .screenshot-bottom::after {
      content: "↕"; color: black;
      display: block; background: #00ffc3;
      font-size: 1.2rem; text-align: center;
      width: 100%; padding: 2px 0;
    }
    .screenshot-top { top: 0; }
    .screenshot-bottom { bottom: 0; }
    .screenshot-controls {
      margin-top: 1rem; display: flex; gap: 1rem;
    }
    .screenshot-controls button {
      padding: 0.5rem 1rem; font-weight: bold;
      border-radius: 8px; border: none;
      font-size: 1.1rem; cursor: pointer;
    }
    .screenshot-capture { background: #00ffc3; color: #000; }
    .screenshot-cancel { background: #f44336; color: white; }
  `;
  document.head.appendChild(style);

  const container = document.getElementById("share-buttons");
  if (container) {
    const wrapper = document.createElement("div");
    wrapper.className = "share-container";

    const mainBtn = document.createElement("button");
    mainBtn.className = "main-share-btn";
    mainBtn.textContent = "Share";
    mainBtn.id = "main-share-btn";
    wrapper.appendChild(mainBtn);

    const dropdown = document.createElement("div");
    dropdown.className = "share-dropdown";

    shareOptions.forEach(opt => {
      const el = opt.action ? document.createElement("button") : document.createElement("a");
      el.textContent = opt.name;

      if (opt.action === "copy") {
        el.onclick = e => {
          e.preventDefault();
          navigator.clipboard.writeText(window.location.href);
          el.textContent = "✅ Copied!";
          setTimeout(() => el.textContent = opt.name, 1500);
        };
      } else if (opt.action === "qrcode") {
        el.onclick = e => {
          e.preventDefault();
          window.open(`https://api.qrserver.com/v1/create-qr-code/?data=${pageUrl}&size=200x200`, "_blank");
        };
      } else if (opt.action === "screenshot") {
        el.onclick = e => {
          e.preventDefault();
          launchScreenshotUI();
        };
      } else if (opt.action === "systemshare") {
        el.onclick = async e => {
          e.preventDefault();
          if (navigator.share) {
            await navigator.share({ title: pageTitle, text: pageTitle, url: window.location.href });
          } else {
            alert("Your device doesn't support native sharing.");
          }
        };
      } else {
        el.href = opt.url;
        el.target = "_blank";
      }

      dropdown.appendChild(el);
    });

    mainBtn.onclick = () => {
      dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
    };

    wrapper.appendChild(dropdown);
    container.appendChild(wrapper);
  }

  const commentContainer = document.getElementById("comments");
  if (commentContainer) {
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "RyanMDewey/ryanmdewey.github.io");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("label", "💬 Blog Comments");
    script.setAttribute("theme", "icy-dark");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    commentContainer.appendChild(script);
  }

  // Screenshot logic
  async function launchScreenshotUI() {
    const overlay = document.createElement("div");
    overlay.className = "screenshot-overlay";

    const preview = document.createElement("div");
    preview.className = "screenshot-preview";

    const clone = document.body.cloneNode(true);
    const shareBtn = clone.querySelector("#main-share-btn");
    if (shareBtn) shareBtn.style.display = "none";

    preview.appendChild(clone);

    const topBar = document.createElement("div");
    const bottomBar = document.createElement("div");
    topBar.className = "screenshot-dragbar screenshot-top";
    bottomBar.className = "screenshot-dragbar screenshot-bottom";

    preview.appendChild(topBar);
    preview.appendChild(bottomBar);
    overlay.appendChild(preview);

    const controls = document.createElement("div");
    controls.className = "screenshot-controls";

    const cancelBtn = document.createElement("button");
    cancelBtn.className = "screenshot-cancel";
    cancelBtn.textContent = "✖ Cancel";
    cancelBtn.onclick = () => overlay.remove();

    const confirmBtn = document.createElement("button");
    confirmBtn.className = "screenshot-capture";
    confirmBtn.textContent = "✓ Capture";
    confirmBtn.onclick = async () => {
      overlay.remove();
      const canvas = await html2canvas(document.body, {
        scale: 2,
        useCORS: true,
        ignoreElements: el => el.id === "main-share-btn"
      });
      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    controls.appendChild(cancelBtn);
    controls.appendChild(confirmBtn);
    overlay.appendChild(controls);
    document.body.appendChild(overlay);
  }
});
