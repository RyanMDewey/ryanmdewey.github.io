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

  // === STYLE INJECTION ===
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

    /* Long Screenshot UI */
    .screenshot-full {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.9); z-index: 9999;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
    }
    .screenshot-preview {
      position: relative; overflow: hidden;
      border: 2px solid #00ffc3;
      max-height: 80vh; width: auto;
    }
    .screenshot-preview img {
      width: auto; max-height: 100%;
      display: block;
    }
    .drag-handle {
      position: absolute; left: 0; right: 0;
      height: 24px; background: #00ffc3; opacity: 0.8;
      cursor: ns-resize; z-index: 2;
      display: flex; justify-content: center; align-items: center;
    }
    .handle-top { top: 0; }
    .handle-bottom { bottom: 0; }
    .screenshot-controls {
      margin-top: 1rem;
      display: flex; gap: 1rem;
    }
    .screenshot-controls button {
      font-size: 1.2rem; font-weight: bold;
      padding: 0.5rem 1rem; border: none; border-radius: 8px;
      cursor: pointer;
    }
    .screenshot-confirm { background: #00ffc3; color: #000; }
    .screenshot-cancel { background: crimson; color: white; }
  `;
  document.head.appendChild(style);

  // === ICONS ===
  function getIcon(name) {
    const icons = {
      "X": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M14.68..."/></svg>`,
      "More…": `<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>`
    };
    return icons[name] || "";
  }

  // === RENDER SHARE DROPDOWN ===
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

    shareOptions.forEach(opt => {
      const el = opt.action ? document.createElement("button") : document.createElement("a");
      el.innerHTML = `${getIcon(opt.name)} ${opt.name}`;

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
          triggerLongScreenshot();
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

  // === LONG SCREENSHOT CAPTURE WITH CROPPING ===
  async function triggerLongScreenshot() {
    const canvas = await html2canvas(document.body, { scale: 2, useCORS: true });
    const fullImg = document.createElement("img");
    fullImg.src = canvas.toDataURL("image/png");

    const overlay = document.createElement("div");
    overlay.className = "screenshot-full";

    const previewBox = document.createElement("div");
    previewBox.className = "screenshot-preview";
    previewBox.appendChild(fullImg);

    // Drag handles
    const topHandle = document.createElement("div");
    topHandle.className = "drag-handle handle-top";
    const bottomHandle = document.createElement("div");
    bottomHandle.className = "drag-handle handle-bottom";

    previewBox.appendChild(topHandle);
    previewBox.appendChild(bottomHandle);

    let topY = 0;
    let bottomY = fullImg.offsetHeight;

    // Touch/Mouse drag setup
    const enableDrag = (handle, setPos) => {
      let dragging = false;
      const onMove = e => {
        if (!dragging) return;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const boxRect = previewBox.getBoundingClientRect();
        setPos(clientY - boxRect.top);
      };
      const onUp = () => dragging = false;
      handle.addEventListener("mousedown", () => dragging = true);
      handle.addEventListener("touchstart", () => dragging = true);
      document.addEventListener("mousemove", onMove);
      document.addEventListener("touchmove", onMove);
      document.addEventListener("mouseup", onUp);
      document.addEventListener("touchend", onUp);
    };

    enableDrag(topHandle, y => {
      topY = Math.max(0, Math.min(y, bottomY - 50));
      topHandle.style.top = `${topY}px`;
    });

    enableDrag(bottomHandle, y => {
      bottomY = Math.min(fullImg.offsetHeight, Math.max(y, topY + 50));
      bottomHandle.style.bottom = `${fullImg.offsetHeight - bottomY}px`;
    });

    // Confirm / Cancel
    const controls = document.createElement("div");
    controls.className = "screenshot-controls";
    const confirmBtn = document.createElement("button");
    confirmBtn.className = "screenshot-confirm";
    confirmBtn.textContent = "✓";

    confirmBtn.onclick = () => {
      const cropped = document.createElement("canvas");
      const ctx = cropped.getContext("2d");
      const scale = canvas.height / fullImg.offsetHeight;
      const cropHeight = (bottomY - topY) * scale;

      cropped.width = canvas.width;
      cropped.height = cropHeight;
      ctx.drawImage(canvas, 0, topY * scale, canvas.width, cropHeight, 0, 0, canvas.width, cropHeight);

      const link = document.createElement("a");
      link.href = cropped.toDataURL("image/png");
      link.download = "long-screenshot.png";
      link.click();
      overlay.remove();
    };

    const cancelBtn = document.createElement("button");
    cancelBtn.className = "screenshot-cancel";
    cancelBtn.textContent = "✕";
    cancelBtn.onclick = () => overlay.remove();

    controls.appendChild(confirmBtn);
    controls.appendChild(cancelBtn);

    overlay.appendChild(previewBox);
    overlay.appendChild(controls);
    document.body.appendChild(overlay);
  }

  // === UTTERANCES COMMENT INJECTION ===
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
});
