let detailQuantity = 1;

async function initProductDetailPage() {
  const container = document.getElementById('product-details-container');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id')) || 48;

  let rawProduct = PRODUCTS_DATA.find(p => p.id === id) || PRODUCTS_DATA[0];

  try {
    const apiProd = await apiFetch(`${CONFIG.ENDPOINTS.PRODUCTS}/${encodeURIComponent(id)}`);
    if (apiProd && apiProd.name) {
      rawProduct = { ...rawProduct, ...apiProd };
    }
  } catch (err) {
    console.warn('Product details fallback:', err.message);
  }

  const product = normalizeProduct(rawProduct);
  const safeId = Number(product.id);
  const safeName = escapeHtml(product.name);
  const safeImg = escapeHtml(product.image);
  const safeDesc = escapeHtml(product.description);
  const safePrep = escapeHtml(product.preparationMethod);
  const safeRating = Number(product.rating).toFixed(1);
  const safePrice = Number(product.price).toFixed(2);
  const safeSpiciness = Number(product.spiciness);

  const ingredientsHtml =
    product.ingredients.length > 0
      ? product.ingredients.map(i => `<li>${escapeHtml(i)}</li>`).join('')
      : `<li>Fresh seasonal ingredients</li>`;

  container.innerHTML = `
    <div class="product-detail-grid">
      <img class="product-detail-img" src="${safeImg}" alt="${safeName}" />
      <div class="product-detail-info">
        <h1>${safeName}</h1>
        <div class="detail-rating">
          <span>★★★★★</span> (${safeRating} rating)
        </div>
        <div class="detail-price">$${safePrice}</div>
        <div class="badges-row">
          ${product.vegetarian ? `<span class="veg-badge">Vegetarian</span>` : ''}
          ${safeSpiciness > 0 ? `<span class="spicy-level-badge">Spicy Level ${safeSpiciness}</span>` : ''}
        </div>
        <p class="detail-desc">${safeDesc}</p>

        <div class="detail-section-title">Ingredients:</div>
        <ul class="ingredients-list">${ingredientsHtml}</ul>

        <div class="detail-section-title">Preparation Method:</div>
        <p class="prep-text">${safePrep || 'Prepared fresh to order by our chefs.'}</p>

        <div class="purchase-row">
          <div class="qty-control">
            <button type="button" onclick="changeDetailQty(-1)">-</button>
            <span id="detail-qty-value">1</span>
            <button type="button" onclick="changeDetailQty(1)">+</button>
          </div>
          <button class="btn-orange" style="flex: 1; padding: 12px;" onclick="addToCart(${safeId}, detailQuantity)">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;

  const relatedGrid = document.getElementById('related-products-grid');
  if (relatedGrid) {
    try {
      const query = product.categoryId ? `?CategoryId=${product.categoryId}&Take=5` : `?Take=5`;
      const relData = await apiFetch(`${CONFIG.ENDPOINTS.PRODUCTS_FILTER}${query}`);
      const relList = Array.isArray(relData) ? relData : (relData?.products || []);
      const filteredRel = relList.filter(p => Number(p.id) !== safeId).slice(0, 4);
      if (filteredRel.length > 0) {
        relatedGrid.innerHTML = filteredRel.map(renderProductCard).join('');
        return;
      }
    } catch (_) {}

    const fallbackRel = PRODUCTS_DATA.filter(p => p.id !== safeId).slice(0, 4);
    relatedGrid.innerHTML = fallbackRel.map(renderProductCard).join('');
  }
}

function changeDetailQty(delta) {
  detailQuantity = Math.max(1, detailQuantity + delta);
  const el = document.getElementById('detail-qty-value');
  if (el) el.textContent = detailQuantity;
}

document.addEventListener('DOMContentLoaded', () => {
  initProductDetailPage();
});