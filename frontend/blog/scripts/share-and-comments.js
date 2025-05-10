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

  // Icon set for each button
  function getIcon(name) {
    const icons = {
      "X": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M14.68..."/></svg>`,
      "LinkedIn": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M4.98..."/></svg>`,
      "Reddit": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M22..."/></svg>`,
      "Email": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M20..."/></svg>`,
      "Telegram": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M9.97..."/></svg>`,
      "Messenger": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M12..."/></svg>`,
      "Messages": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M2..."/></svg>`,
      "Copy Link": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M3.9..."/></svg>`,
      "QR Code": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M3..."/></svg>`,
      "Long Screenshot": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M5..."/></svg>`,
      "More…": `<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>`
    };
    return icons[name] || "";
  }

  // Basic styles
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
    }
    .screenshot-area {
      position: absolute; border: 2px dashed #00ffc3;
      background: rgba(0, 255, 195, 0.15);
    }
  `;
  document.head.appendChild(style);

  // Share buttons render logic
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

    // Iterate all share options
    shareOptions.forEach(opt => {
      const el = opt.action ? document.createElement("button") : document.createElement("a");
      el.innerHTML = `${getIcon(opt.name)} ${opt.name}`;

      // Share logic
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
            try {
              await navigator.share({ title: pageTitle, text: pageTitle, url: window.location.href });
            } catch (err) {
              alert("Sharing cancelled.");
            }
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

  // Utteranc.es comment injection
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

  // Screenshot Region Selector
  function createDraggableScreenshotRegion() {
    const overlay = document.createElement("div");
    overlay.className = "screenshot-overlay";
    document.body.appendChild(overlay);

    let startX = 0, startY = 0;
    const rect = document.createElement("div");
    rect.className = "screenshot-area";
    overlay.appendChild(rect);

    overlay.addEventListener("mousedown", e => {
      startX = e.clientX;
      startY = e.clientY;
      rect.style.left = `${startX}px`;
      rect.style.top = `${startY}px`;
      rect.style.width = "0px";
      rect.style.height = "0px";

      const onMouseMove = e2 => {
        const width = Math.abs(e2.clientX - startX);
        const height = Math.abs(e2.clientY - startY);
        rect.style.left = `${Math.min(e2.clientX, startX)}px`;
        rect.style.top = `${Math.min(e2.clientY, startY)}px`;
        rect.style.width = `${width}px`;
        rect.style.height = `${height}px`;
      };

      const onMouseUp = async () => {
        overlay.removeEventListener("mousemove", onMouseMove);
        overlay.removeEventListener("mouseup", onMouseUp);
        const rectBounds = rect.getBoundingClientRect();
        overlay.remove();

        const canvas = await html2canvas(document.body, {
          x: rectBounds.left + window.scrollX,
          y: rectBounds.top + window.scrollY,
          width: rectBounds.width,
          height: rectBounds.height,
          scale: 2,
          useCORS: true
        });

        const link = document.createElement("a");
        link.download = "region-screenshot.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      overlay.addEventListener("mousemove", onMouseMove);
      overlay.addEventListener("mouseup", onMouseUp);
    });
  }
});
