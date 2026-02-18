document.addEventListener("DOMContentLoaded", function() {

  const container = document.getElementById("breadcrumb-services");
  if (!container) return;

  const html = `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="../index.html">หน้าแรก</a>
      <span>/</span>
      <span>บริการ</span>
    </nav>
  `;

  container.innerHTML = html;

});
