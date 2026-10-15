const filterState = {
  Query: '',
  CategoryId: null,
  Vegetarian: false,
  Spiciness: null,
  Rate: 0,
  MinPrice: null,
  MaxPrice: null,
  Page: 1,
  Take: 10
};

async function initMenuPage() {
  const menuGrid = document.getElementById('menu-products-grid');
  if (!menuGrid) return;

  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = parseInt(urlParams.get('page'), 10);
  if (!isNaN(pageParam) && pageParam > 0) {
    filterState.Page = pageParam;
  }

  await loadCategories();
  bindFilterListeners();
  await loadFilteredProducts();
}

async function loadCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  let categories = CATEGORIES_DATA;
  try {
    const apiCats = await apiFetch(CONFIG.ENDPOINTS.CATEGORIES);
    const list = Array.isArray(apiCats) ? apiCats : (apiCats?.categories || apiCats?.items || []);
    if (list.length > 0) categories = list;
  } catch (err) {
    console.warn('Categories fallback:', err.message);
  }

  container.innerHTML = categories
    .map(cat => `
      <label>
        <input type="checkbox" name="category-checkbox" value="${Number(cat.id)}" onchange="onCategoryToggle(this)" />
        ${escapeHtml(cat.name)}
      </label>
    `)
    .join('');
}

function onCategoryToggle(checkbox) {
  document.querySelectorAll('input[name="category-checkbox"]').forEach(cb => {
    if (cb !== checkbox) cb.checked = false;
  });
  filterState.CategoryId = checkbox.checked ? Number(checkbox.value) : null;
  filterState.Page = 1;
  syncPageUrl();
  loadFilteredProducts();
}

function syncPageUrl() {
  const url = new URL(window.location);
  if (filterState.Page > 1) {
    url.searchParams.set('page', filterState.Page);
  } else {
    url.searchParams.delete('page');
  }
  window.history.pushState({}, '', url);
}

async function loadFilteredProducts() {
  const menuGrid = document.getElementById('menu-products-grid');
  const countEl = document.getElementById('showing-count');
  if (!menuGrid) return;

  const params = new URLSearchParams();
  if (filterState.Query) params.append('Query', filterState.Query);
  if (filterState.Vegetarian) params.append('Vegetarian', 'true');
  if (filterState.Spiciness !== null) params.append('Spiciness', filterState.Spiciness);
  if (filterState.Rate > 0) params.append('Rate', filterState.Rate);
  if (filterState.MinPrice !== null && filterState.MinPrice > 0) params.append('MinPrice', filterState.MinPrice);
  if (filterState.MaxPrice !== null && filterState.MaxPrice < 500) params.append('MaxPrice', filterState.MaxPrice);
  if (filterState.CategoryId !== null) params.append('CategoryId', filterState.CategoryId);
  params.append('Page', filterState.Page);
  params.append('Take', filterState.Take);

  let pageItems = [];
  let hasNextPage = false;

  try {
    const data = await apiFetch(`${CONFIG.ENDPOINTS.PRODUCTS_FILTER}?${params.toString()}`);
    const apiList = Array.isArray(data) ? data : (data?.products || data?.items || []);
    pageItems = apiList;
    hasNextPage =
      data?.hasMore !== undefined
        ? Boolean(data.hasMore)
        : pageItems.length === filterState.Take;
  } catch (err) {
    console.warn('Filter API fallback to local dataset:', err.message);
    const filtered = PRODUCTS_DATA.map(normalizeProduct).filter(p => {
      if (filterState.Query && !p.name.toLowerCase().includes(filterState.Query.toLowerCase())) return false;
      if (filterState.CategoryId !== null && p.categoryId !== filterState.CategoryId) return false;
      if (filterState.Vegetarian && !p.vegetarian) return false;
      if (filterState.Spiciness !== null && p.spiciness !== Number(filterState.Spiciness)) return false;
      if (filterState.Rate > 0 && p.rating < filterState.Rate) return false;
      if (filterState.MinPrice !== null && p.price < filterState.MinPrice) return false;
      if (filterState.MaxPrice !== null && p.price > filterState.MaxPrice) return false;
      return true;
    });

    const start = (filterState.Page - 1) * filterState.Take;
    pageItems = filtered.slice(start, start + filterState.Take);
    hasNextPage = start + filterState.Take < filtered.length;
  }

  if (countEl) countEl.textContent = `Showing ${pageItems.length} products`;
  menuGrid.innerHTML =
    pageItems.length > 0
      ? pageItems.map(renderProductCard).join('')
      : `<p style="color:#64748b; grid-column: 1 / -1; padding: 20px 0;">No dishes match the selected filters.</p>`;

  const prevBtn = document.getElementById('prev-page-btn');
  const nextBtn = document.getElementById('next-page-btn');
  if (prevBtn) prevBtn.style.display = filterState.Page > 1 ? 'inline-block' : 'none';
  if (nextBtn) nextBtn.style.display = hasNextPage ? 'inline-block' : 'none';
}

function changePage(step) {
  const next = filterState.Page + step;
  if (next < 1) return;
  filterState.Page = next;
  syncPageUrl();
  loadFilteredProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function clearAllFilters() {
  filterState.Query = '';
  filterState.CategoryId = null;
  filterState.Vegetarian = false;
  filterState.Spiciness = null;
  filterState.Rate = 0;
  filterState.MinPrice = null;
  filterState.MaxPrice = null;
  filterState.Page = 1;

  document.getElementById('filter-search').value = '';
  document.getElementById('filter-vegetarian').checked = false;
  document.getElementById('filter-spiciness').value = -1;
  document.getElementById('spiciness-label').textContent = 'Level: not selected';
  document.getElementById('filter-rating').value = 0;
  document.getElementById('rating-label').textContent = '⭐ 0.0+';
  document.getElementById('filter-min-price').value = 0;
  document.getElementById('min-price-label').textContent = '$ 0';
  document.getElementById('filter-max-price').value = 500;
  document.getElementById('max-price-label').textContent = '$ 500+';
  document.querySelectorAll('input[name="category-checkbox"]').forEach(cb => (cb.checked = false));

  syncPageUrl();
  loadFilteredProducts();
}

function bindFilterListeners() {
  document.getElementById('filter-search')?.addEventListener('input', e => {
    filterState.Query = e.target.value.trim();
    filterState.Page = 1;
    syncPageUrl();
    loadFilteredProducts();
  });

  document.getElementById('filter-vegetarian')?.addEventListener('change', e => {
    filterState.Vegetarian = e.target.checked;
    filterState.Page = 1;
    syncPageUrl();
    loadFilteredProducts();
  });

  document.getElementById('filter-spiciness')?.addEventListener('input', e => {
    const val = Number(e.target.value);
    filterState.Spiciness = val >= 0 ? val : null;
    document.getElementById('spiciness-label').textContent = val >= 0 ? `Level: ${val}` : 'Level: not selected';
    filterState.Page = 1;
    syncPageUrl();
    loadFilteredProducts();
  });

  document.getElementById('filter-rating')?.addEventListener('input', e => {
    const val = Number(e.target.value);
    filterState.Rate = val;
    document.getElementById('rating-label').textContent = `⭐ ${val.toFixed(1)}+`;
    filterState.Page = 1;
    syncPageUrl();
    loadFilteredProducts();
  });

  document.getElementById('filter-min-price')?.addEventListener('input', e => {
    const val = Number(e.target.value);
    filterState.MinPrice = val;
    document.getElementById('min-price-label').textContent = `$ ${val}`;
    filterState.Page = 1;
    syncPageUrl();
    loadFilteredProducts();
  });

  document.getElementById('filter-max-price')?.addEventListener('input', e => {
    const val = Number(e.target.value);
    filterState.MaxPrice = val;
    document.getElementById('max-price-label').textContent = `$ ${val}+`;
    filterState.Page = 1;
    syncPageUrl();
    loadFilteredProducts();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMenuPage();
});