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

  // Basic styling for overlay
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

    /* Screenshot Preview Mode */
    .screenshot-preview {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.85); z-index: 9999;
      display: flex; flex-direction: column; align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    .screenshot-preview img {
      max-height: 80vh; border: 2px solid #00ffc3;
      border-radius: 4px;
    }
    .screenshot-controls {
      margin-top: 1rem;
      display: flex; gap: 1rem;
    }
    .screenshot-controls button {
      font-size: 1.25rem;
      padding: 0.5rem 1.25rem;
      border-radius: 8px;
      border: none;
      font-weight: bold;
      cursor: pointer;
    }
    .screenshot-confirm {
      background: #00ffc3; color: #0b0b0b;
    }
    .screenshot-cancel {
      background: #ff0033; color: white;
    }
  `;
  document.head.appendChild(style);

  // Share logic
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
          longScreenshot();
        };
      } else if (opt.action === "systemshare") {
        el.onclick = async e => {
          e.preventDefault();
          if (navigator.share) {
            try {
              await navigator.share({ title: pageTitle, text: pageTitle, url: window.location.href });
            } catch { alert("Sharing cancelled."); }
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

  // Long Screenshot w/ preview and confirmation
  function longScreenshot() {
    html2canvas(document.body, { scale: 1.5, useCORS: true }).then(canvas => {
      const preview = document.createElement("div");
      preview.className = "screenshot-preview";

      const img = document.createElement("img");
      img.src = canvas.toDataURL("image/png");
      preview.appendChild(img);

      const controls = document.createElement("div");
      controls.className = "screenshot-controls";

      const confirm = document.createElement("button");
      confirm.textContent = "✓";
      confirm.className = "screenshot-confirm";
      confirm.onclick = () => {
        const link = document.createElement("a");
        link.download = "long-screenshot.png";
        link.href = img.src;
        link.click();
        preview.remove();
      };

      const cancel = document.createElement("button");
      cancel.textContent = "✕";
      cancel.className = "screenshot-cancel";
      cancel.onclick = () => preview.remove();

      controls.appendChild(confirm);
      controls.appendChild(cancel);
      preview.appendChild(controls);
      document.body.appendChild(preview);
    });
  }

  // Comment thread
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
