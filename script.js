// Simple interactivity for the CaioLabs static test site.

document.addEventListener("DOMContentLoaded", () => {
  // Set the current year in the footer.
  const buildYear = document.getElementById("buildYear");
  if (buildYear) {
    buildYear.textContent = new Date().getFullYear();
  }

  // Click counter.
  const button = document.getElementById("clickButton");
  const countSpan = document.getElementById("count");
  let count = 0;

  if (button && countSpan) {
    button.addEventListener("click", () => {
      count += 1;
      countSpan.textContent = count;
    });
  }

  // Render a small sample list dynamically.
  const items = [
    "Deploy to GitHub Pages",
    "Verify custom domain",
    "Check HTTPS certificate",
    "Confirm new commits trigger a build",
  ];

  const list = document.getElementById("itemList");
  if (list) {
    items.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      list.appendChild(li);
    });
  }
});
