function getRootPrefixFromScript() {
  // หา <script src=".../assets/js/breadcrumb.js"> แล้วดึง prefix เช่น "../../"
  const scripts = document.querySelectorAll('script[src]');
  for (const s of scripts) {
    const srcAttr = s.getAttribute('src') || "";
    if (srcAttr.includes("assets/js/breadcrumb.js")) {
      // ตัดตั้งแต่ assets/js/breadcrumb.js ออก เหลือ prefix
      return srcAttr.replace(/assets\/js\/breadcrumb\.js.*$/, "");
    }
  }
  // fallback (ถ้าหาไม่เจอจริง ๆ) — ให้ชี้ root แบบเดิม
  return "./";
}

function toTitleCaseFromSlug(slug) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

function generateBreadcrumb() {
  const container = document.getElementById("breadcrumb");
  if (!container) return;

  const rootPrefix = getRootPrefixFromScript(); // เช่น "../../"
  const path = (container.dataset.path || "").trim();     // เช่น "services/window-film"
  const title = (container.dataset.title || "").trim();   // เช่น "3M Ceramic Ultra Clear"

  const segments = path ? path.split("/").filter(Boolean) : [];

  // HTML
  let html = `<nav aria-label="Breadcrumb"><ol>`;
  html += `<li><a href="${rootPrefix}index.html">หน้าแรก</a></li>`;

  // JSON-LD
  const schemaItems = [];
  schemaItems.push({
    "@type": "ListItem",
    "position": 1,
    "name": "หน้าแรก",
    "item": `${rootPrefix}index.html`
  });

  // Build segments
  let position = 2;

  segments.forEach((seg, idx) => {
    const name = toTitleCaseFromSlug(seg);
    const url = `${rootPrefix}${segments.slice(0, idx + 1).join("/")}/index.html`;

    html += `<li><a href="${url}">${name}</a></li>`;

    schemaItems.push({
      "@type": "ListItem",
      "position": position,
      "name": name,
      "item": url
    });

    position++;
  });

  // Current page (title)
  if (title) {
    html += `<li aria-current="page">${title}</li>`;

    // สำหรับ item ของหน้าปัจจุบันให้เป็น relative ที่คำนวณจาก path+filename ถ้าต้องการ
    // ที่นี่ใช้ window.location.pathname จะเป็น absolute ของโดเมน (ไม่กระทบการคลิก breadcrumb)
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
