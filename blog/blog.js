document.addEventListener("DOMContentLoaded", async () => {
  const blogContainer = document.getElementById("blog-list");

  // Define your posts manually or later automate via API
  const posts = [
    {
      title: "Building AI on Bare-Metal with NEON Kernels",
      date: "2025-04-18",
      file: "2025-04-18-neon.html"
    },
    {
      title: "Designing the Lumina Language: Beyond Solidity",
      date: "2025-04-12",
      file: "2025-04-12-lumina.html"
    }
  ];

  for (let post of posts) {
    const res = await fetch(post.file);
    const text = await res.text();
    const preview = text.split("\n").slice(4, 10).join("\n").replace(/[#>*`]/g, "").trim();

    const postElement = document.createElement("div");
    postElement.className = "post-preview";
    postElement.innerHTML = `
      <h3><a href="${post.file}">${post.title}</a></h3>
      <p class="post-meta">${post.date}</p>
      <p class="post-snippet">${preview}</p>
    `;
    blogContainer.appendChild(postElement);
  }
});
