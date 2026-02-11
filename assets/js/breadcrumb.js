document.addEventListener("DOMContentLoaded", function() {

  const container = document.getElementById("breadcrumb");
  if (!container) return;

  const path = container.dataset.path;
  const title = container.dataset.title;

  const segments = path.split("/");
  let currentPath = "../../";
  let html = `<div class="breadcrumb">`;

  html += `<a href="../../index.html">หน้าแรก</a><span>/</span>`;

  segments.forEach((segment, index) => {
    currentPath += segment + "/";
    const label = segment.replace("-", " ");

    html += `<a href="${currentPath}index.html">${label}</a>`;

    if (index < segments.length - 1) {
      html += `<span>/</span>`;
    }
  });

  html += `<span>/</span><span>${title}</span>`;
  html += `</div>`;

  container.innerHTML = html;
});
