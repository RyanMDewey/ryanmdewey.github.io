// Main script for share menu, comment loader, and region-based screenshot capture

window.addEventListener("DOMContentLoaded", () => {
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = document.title;

  // Share options array
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

  // Optional icons (truncated here for clarity, use full SVGs in real code)
  function getIcon(name) {
    const dots = `<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>`;
    return { "More…": dots }[name] || "";
  }

  // Inject styling for dropdown, buttons, and overlay
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
      background: rgba(0, 255, 195, 0.2);
      z-index: 9999; cursor: crosshair;
      touch-action: none;
    }
    .screenshot-area {
      position: absolute; border: 2px dashed #00ffc3;
      background: rgba(0, 255, 195, 0.1);
    }
  `;
  document.head.appendChild(style);

  // Render share UI
  const container = document.getElementById("share-buttons");
  if (container) {
    const wrapper = document.createElement("div");
    wrapper.className = "share-container";

    const mainBtn = document.createElement("button");
    mainBtn.className = "main-share-btn";
    mainBtn.textContent = "Share";
    wrapper.appendChild(mainBtn);

    const dropdown = document.createElement("div");
    dropdown.className = "share-dropdown";

    // Loop through all options
    shareOptions.forEach(opt => {
      const el = opt.action ? document.createElement("button") : document.createElement("a");
      el.innerHTML = `${getIcon(opt.name)} ${opt.name}`;

      // Handle actions
      if (opt.action === "copy") {
        el.onclick = e => {
          e.preventDefault();
          navigator.clipboard.writeText(window.location.href);
          el.textContent = "✅ Copied!";
          setTimeout(() => el.innerHTML = `${getIcon(opt.name)} ${opt.name}`, 1500);
        };
      } else if (opt.action === "qrcode") {
        el.onclick = e => {
          e.preventDefault();
          window.open(`https://api.qrserver.com/v1/create-qr-code/?data=${pageUrl}&size=200x200`, "_blank");
        };
      } else if (opt.action === "screenshot") {
        el.onclick = e => {
          e.preventDefault();
          createDraggableScreenshotRegion();
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

  // Load utterances comments
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

  // Screenshot selection logic (drag to select region, then capture)
  function createDraggableScreenshotRegion() {
    const overlay = document.createElement("div");
    overlay.className = "screenshot-overlay";
    document.body.appendChild(overlay);

    let startX = 0, startY = 0;
    const rect = document.createElement("div");
    rect.className = "screenshot-area";
    overlay.appendChild(rect);

    const getTouch = e => e.touches ? e.touches[0] : e;

    const onStart = e => {
      const t = getTouch(e);
      startX = t.clientX;
      startY = t.clientY;
      rect.style.left = `${startX}px`;
      rect.style.top = `${startY}px`;

      const onMove = e2 => {
        const m = getTouch(e2);
        const x = Math.min(m.clientX, startX);
        const y = Math.min(m.clientY, startY);
        const w = Math.abs(m.clientX - startX);
        const h = Math.abs(m.clientY - startY);
        Object.assign(rect.style, {
          left: `${x}px`, top: `${y}px`,
          width: `${w}px`, height: `${h}px`
        });
      };

      const onEnd = async () => {
        overlay.removeEventListener("mousemove", onMove);
        overlay.removeEventListener("mouseup", onEnd);
        overlay.removeEventListener("touchmove", onMove);
        overlay.removeEventListener("touchend", onEnd);
        const bounds = rect.getBoundingClientRect();
        overlay.remove();

        const canvas = await html2canvas(document.body, {
          x: bounds.left + window.scrollX,
          y: bounds.top + window.scrollY,
          width: bounds.width,
          height: bounds.height,
          scale: 2,
          useCORS: true
        });

        const link = document.createElement("a");
        link.download = "region-screenshot.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      overlay.addEventListener("mousemove", onMove);
      overlay.addEventListener("mouseup", onEnd);
      overlay.addEventListener("touchmove", onMove);
      overlay.addEventListener("touchend", onEnd);
    };

    overlay.addEventListener("mousedown", onStart);
    overlay.addEventListener("touchstart", onStart);
  }
});
