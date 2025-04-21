window.addEventListener("DOMContentLoaded", () => {
  const pageUrl = encodeURIComponent(window.location.href);

  const shareLinks = [
    {
      name: "X",
      url: `https://x.com/intent/tweet?text=Check%20this%20out&url=${pageUrl}`
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`
    },
    {
      name: "Reddit",
      url: `https://reddit.com/submit?url=${pageUrl}`
    },
    {
      name: "Email",
      url: `mailto:?subject=Check this out&body=${pageUrl}`
    }
  ];

  function getIcon(name) {
    switch (name) {
      case "X":
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M14.68 10.74L22 2h-2.62l-6.08 7.18L7.34 2H2l7.79 11.27L2 22h2.62l6.55-7.74L16.66 22H22l-7.32-11.26z"/></svg>`;
      case "LinkedIn":
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6a2.5 2.5 0 0 1 2.48-2.5zM2 8.9h6v12H2zM9.5 8.9h5.5v1.6h.1c.8-1.5 2.8-1.9 4.2-1.9 4.5 0 5.3 3 5.3 6.9v6.5h-6v-5.8c0-1.4 0-3.2-2-3.2-2 0-2.3 1.5-2.3 3v6h-6z"/></svg>`;
      case "Reddit":
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zM11 17c-2.76 0-5-1.79-5-4s2.24-4 5-4 5 1.79 5 4-2.24 4-5 4zm-1.25-4.25a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0zM13.75 12.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0z"/></svg>`;
      case "Email":
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>`;
      case "Copy Link":
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3.9 12c0-1.1.9-2 2-2h6v-2H5.9A4 4 0 0 0 2 12a4 4 0 0 0 3.9 4H12v-2H5.9c-1.1 0-2-.9-2-2zm16.2 0a4 4 0 0 0-3.9-4H12v2h4.1c1.1 0 2 .9 2 2s-.9 2-2 2H12v2h4.1a4 4 0 0 0 3.9-4z"/></svg>`;
      default:
        return "";
    }
  }

  // Inject styles
const style = document.createElement("style");
style.textContent = `
  .share-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1rem;
  }
  .share-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    color: #f4f4f4;
    font-size: 0.9rem;
    text-decoration: none;
    transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
    backdrop-filter: blur(3px);
    box-shadow: 0 0 6px rgba(0, 255, 195, 0.05);
  }
  .share-btn:hover {
    background: rgba(0, 255, 195, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 0 10px rgba(0, 255, 195, 0.3);
  }
  .share-btn svg {
    vertical-align: middle;
    fill: #00ffc3;
  }
`;
document.head.appendChild(style);

  // Share buttons
  const container = document.getElementById("share-buttons");
  if (container) {
    const wrapper = document.createElement("div");
    wrapper.className = "share-buttons";
    [...shareLinks, { name: "Copy Link", action: "copy" }].forEach(link => {
      const a = document.createElement("a");
      a.className = "share-btn";
      if (link.action === "copy") {
        a.href = "#";
        a.onclick = (e) => {
          e.preventDefault();
          navigator.clipboard.writeText(window.location.href);
          a.innerHTML = `✅ Copied!`;
          setTimeout(() => {
            a.innerHTML = `${getIcon(link.name)} ${link.name}`;
          }, 1500);
        };
      } else {
        a.href = link.url;
        a.target = "_blank";
      }
      a.innerHTML = `${getIcon(link.name)} ${link.name}`;
      wrapper.appendChild(a);
    });
    container.appendChild(wrapper);
  }

  // Inject comments via Utterances
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
