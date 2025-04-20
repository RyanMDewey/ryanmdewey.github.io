// Inject share buttons and Utterances comment widget
window.addEventListener('DOMContentLoaded', () => {
  const pageUrl = encodeURIComponent(window.location.href);

  const shareLinks = [
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=Check%20out%20this%20post%20by%20@RyanMDewey&url=${pageUrl}`,
      color: "#1DA1F2",
      icon: "🐦"
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
      color: "#0077b5",
      icon: "💼"
    },
    {
      name: "Reddit",
      url: `https://reddit.com/submit?url=${pageUrl}&title=Check%20this%20out!`,
      color: "#FF5700",
      icon: "👽"
    },
    {
      name: "Email",
      url: `mailto:?subject=Check this out&body=${pageUrl}`,
      color: "#ffaa00",
      icon: "✉️"
    },
    {
      name: "Copy Link",
      action: "copy",
      color: "#00ffc3",
      icon: "🔗"
    }
  ];

  const container = document.getElementById("share-buttons");
  if (container) {
    shareLinks.forEach(link => {
      const a = document.createElement("a");
      a.href = link.url || "#";
      a.target = "_blank";
      a.style = `
        background: ${link.color}; 
        color: white; 
        padding: 0.5rem 1rem; 
        border-radius: 6px; 
        text-decoration: none; 
        font-family: JetBrains Mono, monospace;
        font-size: 0.9rem;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        box-shadow: 0 0 10px ${link.color}66;
      `;
      a.textContent = `${link.icon} ${link.name}`;
      if (link.action === "copy") {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const url = window.location.href;
          navigator.clipboard.writeText(url).then(() => {
            alert("✅ Link copied to clipboard!");
          }).catch(() => {
            alert("❌ Failed to copy link.");
          });
        });
      }
      container.appendChild(a);
    });
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
