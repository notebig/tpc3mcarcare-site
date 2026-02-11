<script>
  async function includeHTML(selector, file) {
    const el = document.querySelector(selector);
    if (!el) return;

    const res = await fetch(file);
    if (!res.ok) return;

    el.innerHTML = await res.text();
  }
</script>
