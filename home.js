async function initHomePage() {
  const grid = document.getElementById('popular-dishes-grid');
  if (!grid) return;

  try {
    const data = await apiFetch(`${CONFIG.ENDPOINTS.PRODUCTS_FILTER}?Page=1&Take=6`);
    const items = Array.isArray(data) ? data : (data?.products || data?.items || []);
    if (items.length > 0) {
      grid.innerHTML = items.slice(0, 6).map(renderProductCard).join('');
      return;
    }
  } catch (err) {
    console.warn('Could not load products from API, using fallback:', err.message);
  }

  grid.innerHTML = PRODUCTS_DATA.slice(0, 6).map(renderProductCard).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  initHomePage();
});