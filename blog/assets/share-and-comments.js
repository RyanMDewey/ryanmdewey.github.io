// /blog/assets/share-and-comments.js

window.addEventListener("DOMContentLoaded", () => {
  const pageUrl = encodeURIComponent(window.location.href);

  const shareLinks = [
    {
      name: "X",
      url: `https://x.com/intent/tweet?text=Check%20this%20out&url=${pageUrl}`,
      icon: "✖️"
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
      icon: "🔗"
    },
    {
      name: "Reddit",
      url: `https://reddit.com/submit?url=${pageUrl}`,
      icon: "📢"
    },
    {
      name: "Email",
      url: `mailto:?subject=Check this out&body=${pageUrl}`,
      icon: "✉️"
    },
    {
      name: "Copy Link",
      action: "copy",
      icon: "📋"
    }
  ];

  const container = document.getElementById("share-buttons");
  if (container) {
    shareLinks.forEach(link => {
      const a = document.createElement("a");
      a.className = "share-btn";
      a.innerText = `${link.icon} ${link.name}`;
      a.href = link.url || "#";
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      if (link.action === "copy") {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          navigator.clipboard.writeText(window.location.href)
            .then(() => alert("Link copied!"))
            .catch(() => alert("Copy failed."));
        });
      }

      container.appendChild(a);
    });
  }

  // Utterances comment loader
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
