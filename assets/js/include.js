async function includeHTML(selector, file) {
  const el = document.querySelector(selector);

  if (!el) {
    console.warn("Include target not found:", selector);
    return;
  }

  try {
    const res = await fetch(file);

    if (!res.ok) {
      console.error("Include failed:", file, res.status);
      return;
    }

    el.innerHTML = await res.text();
  } catch (err) {
    console.error("Include error:", file, err);
  }
}
