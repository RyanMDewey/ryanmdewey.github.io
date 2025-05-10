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
    { name: "More", action: "systemshare" }
  ];

  function getIcon(name) {
    const icons = {
      "X": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M14.68 10.74L22 2h-2.62l-6.08 7.18L7.34 2H2l7.79 11.27L2 22h2.62l6.55-7.74L16.66 22H22l-7.32-11.26z"/></svg>`,
      "LinkedIn": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6a2.5 2.5 0 0 1 2.48-2.5zM2 8.9h6v12H2zM9.5 8.9h5.5v1.6h.1c.8-1.5 2.8-1.9 4.2-1.9 4.5 0 5.3 3 5.3 6.9v6.5h-6v-5.8c0-1.4 0-3.2-2-3.2-2 0-2.3 1.5-2.3 3v6h-6z"/></svg>`,
      "Reddit": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zM11 17c-2.76 0-5-1.79-5-4s2.24-4 5-4 5 1.79 5 4-2.24 4-5 4zm-1.25-4.25a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0zM13.75 12.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0z"/></svg>`,
      "Email": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M20 4H4c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
      "Telegram": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M9.97 16.58 8.15 19.7c-.18.33-.54.48-.87.4-.33-.1-.54-.44-.48-.8l1.23-7.23L3.98 10.6c-.36-.15-.4-.67-.07-.87l15.3-8.75c.46-.26 1.03.22.86.73l-3.29 15.56c-.12.6-.82.82-1.25.44l-3.56-3.15-2.52 2.52z"/></svg>`,
      "Messenger": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 2C6.48 2 2 6.08 2 11c0 2.7 1.38 5.1 3.53 6.68V22l3.24-1.78c.72.18 1.48.28 2.23.28 5.52 0 10-4.08 10-9S17.52 2 12 2zm.8 12.5-2.42-2.5-5.08 2.5L10.2 9.5l2.43 2.5 5.07-2.5-5 5z"/></svg>`,
      "Messages": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14l-4-4H4a2 2 0 0 1-2-2V4z"/></svg>`,
      "Copy Link": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M3.9 12c0-1.1.9-2 2-2h6v-2H5.9A4 4 0 0 0 2 12a4 4 0 0 0 3.9 4H12v-2H5.9c-1.1 0-2-.9-2-2zm16.2 0a4 4 0 0 0-3.9-4H12v2h4.1c1.1 0 2 .9 2 2s-.9 2-2 2H12v2h4.1a4 4 0 0 0 3.9-4z"/></svg>`,
      "QR Code": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8 0h2v2h-2V5zm-4 8h2v2H9v-2zm0-4h2v2H9V9zm4 0h2v2h-2V9zm0 4h2v2h-2v-2zm6-10h2v2h-2V3zm0 4h2v2h-2V7zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zM3 15h6v6H3v-6zm2 2v2h2v-2H5z"/></svg>`,
      "Long Screenshot": `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 3h14a2 2 0 0 1 2 2v4h-2V5H5v14h14v-4h2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM9 8v8h6V8H9z"/></svg>`,
      "More": `<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>`
    };
    return icons[name] || "";
  }

  const style = document.createElement("style");
  style.textContent = `
    .share-container { position: relative; margin-top: 1rem; }
    .main-share-btn {
      background: #00ffc3;
      color: #0b0b0b;
      padding: 0.5rem 1rem;
      font-weight: bold;
      border-radius: 8px;
      border: none;
      cursor: pointer;
    }
    .share-dropdown {
      position: absolute;
      top: 2.5rem;
      left: 0;
      display: none;
      flex-direction: column;
      background: #1a1a1a;
      border: 1px solid #00ffc3;
      border-radius: 8px;
      z-index: 999;
      padding: 0.5rem;
      gap: 0.25rem;
    }
    .share-dropdown a, .share-dropdown button {
      color: #f4f4f4;
      background: none;
      border: none;
      text-align: left;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem 0.5rem;
      text-decoration: none;
      cursor: pointer;
    }
    .share-dropdown a:hover, .share-dropdown button:hover {
      background-color: rgba(0,255,195,0.1);
    }
  `;
  document.head.appendChild(style);

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
          setTimeout(() => (el.innerHTML = `${getIcon(opt.name)} ${opt.name}`), 1500);
        };
      } else if (opt.action === "qrcode") {
        el.onclick = e => {
          e.preventDefault();
          window.open(`https://api.qrserver.com/v1/create-qr-code/?data=${pageUrl}&size=200x200`, "_blank");
        };
      } else if (opt.action === "screenshot") {
        el.onclick = async e => {
          e.preventDefault();
          const canvas = await html2canvas(document.body, { scale: 2, useCORS: true });
          const link = document.createElement("a");
          link.download = "screenshot.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        };
      } else if (opt.action === "systemshare") {
        el.onclick = async e => {
          e.preventDefault();
          if (navigator.share) {
            await navigator.share({
              title: pageTitle,
              text: pageTitle,
              url: window.location.href
            });
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
});
