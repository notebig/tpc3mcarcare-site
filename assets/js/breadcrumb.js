function generateBreadcrumb() {
  const container = document.getElementById("breadcrumb");
  if (!container) return;

  const baseUrl = window.location.origin;

  const path = container.dataset.path || "";
  const title = container.dataset.title || "";

  const segments = path ? path.split("/") : [];

  let html = `<nav aria-label="Breadcrumb"><ol>`;
  html += `<li><a href="${baseUrl}/index.html">หน้าแรก</a></li>`;

  let currentPath = "";
  const schemaItems = [];

  // Home
  schemaItems.push({
    "@type": "ListItem",
    "position": 1,
    "name": "หน้าแรก",
    "item": `${baseUrl}/index.html`
  });

  let position = 2;

  segments.forEach((seg) => {
    currentPath += "/" + seg;

    const name = seg
      .replace("-", " ")
      .replace(/\b\w/g, c => c.toUpperCase());

    const url = `${baseUrl}${currentPath}/index.html`;

    html += `<li><a href="${url}">${name}</a></li>`;

    schemaItems.push({
      "@type": "ListItem",
      "position": position,
      "name": name,
      "item": url
    });

    position++;
  });

  if (title) {
    html += `<li aria-current="page">${title}</li>`;

    schemaItems.push({
      "@type": "ListItem",
      "position": position,
      "name": title,
      "item": window.location.href
    });
  }

  html += `</ol></nav>`;
  container.innerHTML = html;

  // JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": schemaItems
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", generateBreadcrumb);
