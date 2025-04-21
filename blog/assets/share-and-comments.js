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
  const wrapper = document.createElement("div");
  wrapper.className = "share-buttons";
  shareLinks.forEach(link => {
    const a = document.createElement("a");
    a.href = link.url;
    a.className = "share-btn";
    a.target = "_blank";
    a.innerHTML = `<span>${link.icon}</span> ${link.name}`;
    wrapper.appendChild(a);
  });
  // Copy link button
  const copyBtn = document.createElement("a");
  copyBtn.href = "#";
  copyBtn.className = "share-btn";
  copyBtn.onclick = copyPageUrl;
  copyBtn.innerHTML = `<span>📋</span>Copy Link`;
  wrapper.appendChild(copyBtn);

  container.appendChild(wrapper);
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
