const CONFIG = {
  BASE_URL: 'https://restaurantapi.stepacademy.ge',
  API_KEY: 'ac90337c-cc12-43b4-a74f-3f4b4dbf3077',
  ENDPOINTS: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    REFRESH_TOKEN: '/api/auth/refresh-access-token',
    VERIFY_EMAIL: '/api/auth/verify-email',
    RESEND_VERIFY: '/api/auth/resend-email-verification',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    CATEGORIES: '/api/categories',
    PRODUCTS: '/api/products',
    PRODUCTS_FILTER: '/api/products/filter',
    CART_GET: '/api/cart',
    CART_ADD: '/api/cart/add-to-cart',
    CART_EDIT: '/api/cart/edit-quantity',
    CART_REMOVE: '/api/cart/remove-from-cart',
    CART_CHECKOUT: '/api/cart/checkout',
    USER_ME: '/api/users/me',
    USER_PROFILE: '/api/users/profile',
    USER_EDIT: '/api/users/edit',
    USER_CHANGE_PASS: '/api/users/change-password',
    USER_DELETE: '/api/users/delete'
  }
};

const CATEGORIES_DATA = [
  { id: 1, name: 'Desserts' },
  { id: 2, name: 'First Courses' },
  { id: 3, name: 'Main Courses' },
  { id: 4, name: 'Pizzas' },
  { id: 5, name: 'Side Dishes' },
  { id: 6, name: 'Appetizers' }
];

const PRODUCTS_DATA = [
  {
    id: 48,
    name: 'Sfogliatelle',
    description: 'Flaky, shell-shaped pastries filled with sweet ricotta and candied citrus.',
    rating: 2.7,
    rate: 2.7,
    price: 8.0,
    spiciness: 0,
    vegetarian: false,
    categoryId: 1,
    image: 'https://kewtpvji9t.ufs.sh/f/NYvkRWJMpsa7LoztrfwCRVF4SABcXupCwhg0b9soOl6T2x5n',
    ingredients: [
      'For dough: 500g flour, 250ml water, 10g salt, 50g lard',
      'For filling: 500g ricotta, 200g sugar, 100g semolina, 2 eggs, candied citrus, cinnamon'
    ],
    preparationMethod: 'Make dough, roll paper-thin. Spread with lard, roll into log. Slice, shape into cones. Cook filling ingredients until thick. Fill pastries. Bake at 400°F for 25 minutes.'
  },
  {
    id: 49,
    name: 'Affogato',
    description: "Vanilla gelato 'drowned' in hot espresso.",
    rating: 3.9,
    rate: 3.9,
    price: 6.5,
    spiciness: 0,
    vegetarian: false,
    categoryId: 1,
    image: 'https://kewtpvji9t.ufs.sh/f/NYvkRWJMpsa7B10mb69xMtoEa0e7lRC8f1JzZhgON5brqUyj',
    ingredients: [
      '1 scoop vanilla gelato',
      '1 shot hot espresso',
      'Amaretto or Frangelico (optional)',
      'Chocolate shavings or biscotti for garnish'
    ],
    preparationMethod: 'Place gelato in a serving glass. Pour hot espresso over gelato just before serving.'
  },
  {
    id: 50,
    name: 'Cassata Siciliana',
    description: 'Elaborate Sicilian cake with ricotta, marzipan, candied fruit, and decorative icing.',
    rating: 5.0,
    rate: 5.0,
    price: 11.0,
    spiciness: 0,
    vegetarian: false,
    categoryId: 1,
    image: 'https://kewtpvji9t.ufs.sh/f/NYvkRWJMpsa7xzua55ZMtulRZfKod078gwHbEFcs54AQYLpN',
    ingredients: [
      '1 sponge cake',
      '500g ricotta, sweetened',
      '100g chocolate chips',
      '100g candied fruit',
      '200g marzipan',
      "300g confectioners' sugar",
      'Green food coloring'
    ],
    preparationMethod: 'Line bowl with plastic wrap. Cover with green marzipan. Line with cake slices soaked in liqueur. Fill with ricotta mixture. Cover with more cake. Chill 12 hours.'
  },
  {
    id: 43,
    name: 'Cannoli Siciliani',
    description: 'Crispy fried pastry tubes filled with sweetened ricotta cheese and chocolate chips.',
    rating: 1.1,
    rate: 1.1,
    price: 8.5,
    spiciness: 0,
    vegetarian: false,
    categoryId: 1,
    image: 'https://kewtpvji9t.ufs.sh/f/NYvkRWJMpsa7i81F0Ao5r946HPUgShjYt7KmZALnazOqeTkp',
    ingredients: [
      'For shells: 250g flour, 30g sugar, 30g butter, 2 tbsp Marsala wine, 1 egg',
      'For filling: 500g ricotta, 150g sugar, 100g chocolate chips, candied fruit, pistachios'
    ],
    preparationMethod: 'Make dough, rest. Roll thin, cut circles, wrap around metal tubes. Fry until crisp. Mix filling ingredients. Pipe filling into cooled shells.'
  },
  {
    id: 44,
    name: 'Gelato (Assorted Flavors)',
    description: 'Italian ice cream known for its dense, rich texture and intense flavors.',
    rating: 1.2,
    rate: 1.2,
    price: 6.0,
    spiciness: 0,
    vegetarian: false,
    categoryId: 1,
    image: 'https://kewtpvji9t.ufs.sh/f/NYvkRWJMpsa7c4d5UOHsam6fQLrpRUT4bvikdSWBeDMZ10OE',
    ingredients: [
      'Base: 500ml milk, 250ml heavy cream, 150g sugar, 6 egg yolks',
      'For flavoring: vanilla, chocolate, pistachio, fruit purées, etc.'
    ],
    preparationMethod: 'Heat milk and cream. Whisk yolks and sugar. Temper eggs with hot milk, return to heat, cook until thickened. Add flavorings. Chill, then churn.'
  },
  {
    id: 45,
    name: 'Torta Caprese',
    description: 'Rich, flourless chocolate and almond cake from the island of Capri.',
    rating: 3.4,
    rate: 3.4,
    price: 10.0,
    spiciness: 0,
    vegetarian: false,
    categoryId: 1,
    image: 'https://kewtpvji9t.ufs.sh/f/NYvkRWJMpsa7ZYwKBamKzDAWCrwvPpHt9asNSk2McUljGbqd',
    ingredients: [
      '200g dark chocolate',
      '200g butter',
      '200g sugar',
      '200g almond flour',
      '6 eggs, separated',
      '2 tbsp cocoa powder'
    ],
    preparationMethod: 'Melt chocolate and butter. Beat yolks with sugar, add chocolate mixture and almond flour. Fold in beaten egg whites. Bake at 350°F for 45 minutes.'
  },
  {
    id: 46,
    name: 'Crostata di Frutta',
    description: 'Sweet pastry tart filled with custard and topped with fresh fruit.',
    rating: 3.7,
    rate: 3.7,
    price: 9.5,
    spiciness: 0,
    vegetarian: false,
    categoryId: 1,
    image: 'https://kewtpvji9t.ufs.sh/f/NYvkRWJMpsa7wJSMKdQaRUjePAi7o1Qv9kl2b6HLdBz0uMnS',
    ingredients: [
      'For pastry: 250g flour, 125g butter, 100g sugar, 1 egg, lemon zest',
      'For custard: 500ml milk, 4 egg yolks, 100g sugar, 40g cornstarch, vanilla'
    ],
    preparationMethod: 'Make and blind bake pastry shell. Make custard, cool. Fill shell with custard, arrange fruit on top. Brush with warmed apricot jam.'
  },
  {
    id: 47,
    name: 'Zabaione',
    description: 'Light, foamy custard made with egg yolks, sugar, and sweet wine.',
    rating: 2.7,
    rate: 2.7,
    price: 7.0,
    spiciness: 0,
    vegetarian: false,
    categoryId: 1,
    image: 'https://kewtpvji9t.ufs.sh/f/NYvkRWJMpsa76QwVVvs7pKLHVRJYrSoGDCk6miFxI25AteOX',
    ingredients: [
      '6 egg yolks',
      '120g sugar',
      '120ml Marsala wine',
      'Fresh berries for serving'
    ],
    preparationMethod: 'Whisk yolks and sugar until pale. Add wine. Cook over double boiler, whisking constantly until thick and foamy.'
  },
  {
    id: 38,
    name: 'Caponata',
    description: 'Sweet and sour Sicilian eggplant dish with celery, olives, and capers.',
    rating: 2.6,
    rate: 2.6,
    price: 8.0,
    spiciness: 1,
    vegetarian: false,
    categoryId: 5,
    image: 'https://kewtpvji9t.ufs.sh/f/NYvkRWJMpsa7gmZztiusRbiyM3EukdWDIlf0GHwZAP89xUvj',
    ingredients: [
      '2 eggplants, diced',
      '2 celery stalks, diced',
      '1 onion, diced',
      '2 tbsp capers',
      '100g green olives, pitted'
    ],
    preparationMethod: 'Fry eggplant. Sauté onion and celery. Add tomatoes, olives, capers. Add vinegar and sugar. Simmer 20 minutes.'
  },
  {
    id: 39,
    name: 'Peperonata',
    description: 'Slow-cooked sweet peppers with onions and tomatoes.',
    rating: 2.8,
    rate: 2.8,
    price: 7.5,
    spiciness: 1,
    vegetarian: false,
    categoryId: 5,
    image: 'https://kewtpvji9t.ufs.sh/f/NYvkRWJMpsa7A6damlgDFL3KrQOo0V1GsSdezTBYkWl4apyf',
    ingredients: [
      '4 bell peppers, sliced',
      '2 onions, sliced',
      '2 cloves garlic, minced',
      '400g canned tomatoes'
    ],
    preparationMethod: 'Sauté onions and peppers until soft. Add garlic, tomatoes. Simmer 30 minutes. Add basil before serving.'
  }
];

function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validatePassword(password) {
  if (!password || password.length < 8) return false;
  return (
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

function normalizeProduct(p) {
  if (!p) return {};
  const ratingVal = p.rate !== undefined ? Number(p.rate) : Number(p.rating || 0);
  const vegVal = p.vegetarian !== undefined ? Boolean(p.vegetarian) : Boolean(p.vegeterian);
  return {
    ...p,
    id: Number(p.id),
    name: p.name || 'Dish',
    description: p.description || '',
    price: Number(p.price || 0),
    rating: ratingVal,
    rate: ratingVal,
    spiciness: Number(p.spiciness || 0),
    vegetarian: vegVal,
    vegeterian: vegVal,
    image: p.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    ingredients: Array.isArray(p.ingredients) ? p.ingredients : (p.ingredients ? [p.ingredients] : []),
    preparationMethod: p.method || p.preparationMethod || ''
  };
}

function isValidJwt(token) {
  return typeof token === 'string' && token.split('.').length === 3;
}

function getAccessToken() {
  return localStorage.getItem('accessToken') || localStorage.getItem('token') || '';
}

function getRefreshToken() {
  return localStorage.getItem('refreshToken') || '';
}

function saveTokens(accessToken, refreshToken) {
  const existingRefresh = getRefreshToken();
  const finalRefresh = refreshToken || existingRefresh;

  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('token', accessToken);
  }
  if (finalRefresh) {
    localStorage.setItem('refreshToken', finalRefresh);
  }
}

function clearAuthTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('foodie_current_user');
  localStorage.removeItem('foodie_cart');
  sessionStorage.clear();
}

function getCurrentLocalUser() {
  try {
    return JSON.parse(localStorage.getItem('foodie_current_user') || 'null');
  } catch (_) {
    return null;
  }
}

function setCurrentLocalUser(user) {
  if (!user) {
    localStorage.removeItem('foodie_current_user');
    return;
  }
  localStorage.setItem('foodie_current_user', JSON.stringify(user));
}

let refreshPromise = null;

async function refreshAccessToken() {
  if (refreshPromise) return refreshPromise;

  const rToken = getRefreshToken();
  if (!rToken) return false;

  refreshPromise = (async () => {
    try {
      const res = await fetch(
        `${CONFIG.BASE_URL}${CONFIG.ENDPOINTS.REFRESH_TOKEN}/${encodeURIComponent(rToken)}`,
        {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'X-API-KEY': CONFIG.API_KEY
          }
        }
      );

      if (!res.ok) return false;

      const raw = await res.json();
      const data = raw?.data !== undefined ? raw.data : raw;
      const newAccess = data?.accessToken || data?.token;
      const newRefresh = data?.refreshToken || rToken;

      if (newAccess && isValidJwt(newAccess)) {
        saveTokens(newAccess, newRefresh);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Token refresh failed:', err);
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function ensureAccessToken() {
  let token = getAccessToken();
  if (!isValidJwt(token) && getRefreshToken()) {
    await refreshAccessToken();
    token = getAccessToken();
  }
  return isValidJwt(token) ? token : '';
}

async function apiFetch(endpoint, options = {}, requireAuth = false) {
  const headers = {
    'accept': 'application/json',
    'X-API-KEY': CONFIG.API_KEY,
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {})
  };

  let token = getAccessToken();
  if (requireAuth && !isValidJwt(token) && getRefreshToken()) {
    await refreshAccessToken();
    token = getAccessToken();
  }

  if (isValidJwt(token)) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response = await fetch(`${CONFIG.BASE_URL}${endpoint}`, { ...options, headers });

  if (response.status === 401 && requireAuth) {
    const refreshed = await refreshAccessToken();
    const updatedToken = getAccessToken();
    if (refreshed && isValidJwt(updatedToken)) {
      headers['Authorization'] = `Bearer ${updatedToken}`;
      response = await fetch(`${CONFIG.BASE_URL}${endpoint}`, { ...options, headers });
    } else {
      clearAuthTokens();
    }
  }

  const text = await response.text();
  let parsed = null;
  if (text && text.trim()) {
    try {
      parsed = JSON.parse(text);
    } catch (_) {
      parsed = text.trim();
    }
  }

  if (!response.ok) {
    let msg = response.status === 401 ? 'Authentication required. Please sign in.' : `HTTP Error ${response.status}`;

    if (parsed && typeof parsed === 'object') {
      let validationErrors = [];
      if (Array.isArray(parsed.errors)) {
        validationErrors = parsed.errors
          .map(e => (typeof e === 'string' ? e : e.description || e.message || ''))
          .filter(Boolean);
      } else if (parsed.errors && typeof parsed.errors === 'object') {
        validationErrors = Object.values(parsed.errors)
          .flat()
          .map(e => (typeof e === 'string' ? e : e.description || e.message || ''))
          .filter(Boolean);
      }

      if (validationErrors.length > 0) {
        msg = validationErrors.join('\n');
      } else if (parsed.detail || parsed.error?.message || parsed.message || parsed.title) {
        msg = parsed.detail || parsed.error?.message || parsed.message || parsed.title;
      }
    } else if (typeof parsed === 'string' && parsed.length > 0 && !parsed.startsWith('<')) {
      msg = parsed;
    }

    const err = new Error(msg);
    err.status = response.status;
    throw err;
  }

  const unwrapped = parsed && typeof parsed === 'object' && parsed.data !== undefined ? parsed.data : parsed;

  if (unwrapped && typeof unwrapped === 'object' && unwrapped.isSuccess === false) {
    const errMsg = unwrapped.error?.message || unwrapped.message || 'Operation failed.';
    const logicErr = new Error(errMsg);
    logicErr.status = unwrapped.error?.statusCode || 400;
    throw logicErr;
  }

  return unwrapped !== null ? unwrapped : true;
}

function showToast(message, type = 'info', customTitle = '') {
  const existing = document.getElementById('auth-toast-popup');
  if (existing) existing.remove();

  const titles = {
    success: 'Success',
    error: 'Error',
    warning: 'Authentication Required',
    info: 'Notification'
  };

  const colors = {
    success: '#15803d',
    error: '#d93025',
    warning: '#ff6b35',
    info: '#ff6b35'
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '!',
    info: 'i'
  };

  const accent = colors[type] || colors.info;
  const titleText = customTitle || titles[type] || titles.info;

  const toast = document.createElement('div');
  toast.id = 'auth-toast-popup';
  toast.className = 'auth-toast';
  toast.style.borderLeftColor = accent;

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'auth-toast-close';
  closeBtn.textContent = '×';
  closeBtn.addEventListener('click', () => toast.remove());

  const iconEl = document.createElement('div');
  iconEl.className = 'auth-toast-icon';
  iconEl.style.color = accent;
  iconEl.textContent = icons[type] || '!';

  const contentEl = document.createElement('div');
  contentEl.className = 'auth-toast-content';

  const h4 = document.createElement('h4');
  h4.textContent = titleText;

  const p = document.createElement('p');
  p.textContent = message || '';

  contentEl.appendChild(h4);
  contentEl.appendChild(p);
  toast.appendChild(closeBtn);
  toast.appendChild(iconEl);
  toast.appendChild(contentEl);

  document.body.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 4500);
}

function showAuthRequiredToast(customMessage) {
  showToast(
    customMessage || 'You need to be logged in to perform this action.',
    'warning',
    'Authentication Required'
  );
}

function initResponsiveControls() {
  const navbar = document.querySelector('.navbar');
  const navLeft = document.querySelector('.nav-left');
  if (navbar && navLeft && !document.querySelector('.mobile-menu-toggle')) {
    const menuBtn = document.createElement('button');
    menuBtn.type = 'button';
    menuBtn.className = 'mobile-menu-toggle';
    menuBtn.setAttribute('aria-label', 'Toggle navigation');
    menuBtn.textContent = '☰';
    menuBtn.addEventListener('click', () => {
      navbar.classList.toggle('mobile-open');
      menuBtn.textContent = navbar.classList.contains('mobile-open') ? '✕' : '☰';
    });
    navLeft.appendChild(menuBtn);
  }

  const menuContainer = document.querySelector('.menu-page-container');
  const sidebar = document.querySelector('.filters-sidebar');
  if (menuContainer && sidebar && !document.querySelector('.mobile-filter-btn')) {
    const filterBtn = document.createElement('button');
    filterBtn.type = 'button';
    filterBtn.className = 'mobile-filter-btn';
    filterBtn.innerHTML = '<span>Filters</span><span id="filter-arrow">▾</span>';
    filterBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      const arrow = document.getElementById('filter-arrow');
      if (arrow) arrow.textContent = sidebar.classList.contains('open') ? '▴' : '▾';
    });
    menuContainer.insertBefore(filterBtn, sidebar);
  }
}

function renderProductCard(rawProduct) {
  const product = normalizeProduct(rawProduct);
  const safeId = Number(product.id) || 0;
  const safeName = escapeHtml(product.name);
  const safeDesc = escapeHtml(product.description || '');
  const safeImg = escapeHtml(product.image || '');
  const safeRating = Number(product.rating || 0).toFixed(1);
  const safePrice = Number(product.price || 0).toFixed(2);
  const spicyBadge = Number(product.spiciness) > 0 ? `<span class="spicy-badge">🔥</span>` : '';

  return `
    <div class="product-card" onclick="goToProductDetails(${safeId})">
      <div class="card-img-wrapper">
        <img src="${safeImg}" alt="${safeName}" />
        ${spicyBadge}
      </div>
      <div class="card-body">
        <h3>${safeName}</h3>
        <p class="desc">${safeDesc}</p>
        <div class="rating"><span>★</span> ${safeRating}</div>
        <div class="price">$${safePrice}</div>
        <button class="btn-orange" onclick="event.stopPropagation(); addToCart(${safeId}, 1)">Add to Cart</button>
      </div>
    </div>
  `;
}

function goToProductDetails(id) {
  window.location.href = `product.html?id=${encodeURIComponent(id)}`;
}

async function syncNavbarCartBadge() {
  const badgeEl = document.getElementById('cart-badge');
  if (!badgeEl) return;

  const token = await ensureAccessToken();
  if (!token) {
    badgeEl.style.display = 'none';
    return;
  }

  try {
    const cartData = await apiFetch(CONFIG.ENDPOINTS.CART_GET, { method: 'GET' }, true);
    const items = Array.isArray(cartData) ? cartData : (cartData?.items || []);
    const totalCount =
      cartData?.totalItems !== undefined
        ? Number(cartData.totalItems)
        : items.reduce((acc, i) => acc + Number(i.quantity || 1), 0);

    localStorage.setItem('foodie_cart', JSON.stringify(items));
    badgeEl.textContent = totalCount;
    badgeEl.style.display = totalCount > 0 ? 'inline-flex' : 'none';
  } catch (err) {
    console.warn('Cart badge sync warning:', err.message);
  }
}

async function addToCart(productId, quantity = 1) {
  const token = await ensureAccessToken();
  if (!token) {
    showAuthRequiredToast();
    return;
  }

  try {
    await apiFetch(
      CONFIG.ENDPOINTS.CART_ADD,
      {
        method: 'POST',
        body: JSON.stringify({
          productId: Number(productId),
          quantity: Number(quantity) || 1
        })
      },
      true
    );
    await syncNavbarCartBadge();
    showToast('Item added to cart!', 'success');
  } catch (err) {
    console.error('Add to cart error:', err);
    if (err.status === 401) {
      showAuthRequiredToast();
    } else {
      showToast(err.message || 'Could not add item to cart.', 'error');
    }
  }
}

async function handleCartClick() {
  const token = await ensureAccessToken();
  if (!token) {
    showAuthRequiredToast();
    return;
  }
  window.location.href = 'cart.html';
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (input) input.type = input.type === 'password' ? 'text' : 'password';
}

function logoutUser() {
  clearAuthTokens();
  window.location.href = 'index.html';
}

async function initNavbarAuth() {
  const token = await ensureAccessToken();
  const loginLink = document.getElementById('nav-login-link');
  const signupLink = document.getElementById('nav-signup-link');
  if (!token) return;

  await syncNavbarCartBadge();

  if (signupLink) {
    signupLink.textContent = 'Logout';
    signupLink.href = '#';
    signupLink.onclick = e => {
      e.preventDefault();
      logoutUser();
    };
  }

  try {
    const me = await apiFetch(CONFIG.ENDPOINTS.USER_ME, { method: 'GET' }, true);
    if (me && (me.firstName || me.email)) {
      setCurrentLocalUser(me);
      if (loginLink) {
        loginLink.textContent = me.firstName || me.email || 'Profile';
        loginLink.href = 'cart.html';
      }
    }
  } catch (_) {
    const cached = getCurrentLocalUser();
    if (loginLink) {
      loginLink.textContent = cached?.firstName || cached?.email || 'Profile';
      loginLink.href = 'cart.html';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initResponsiveControls();
  initNavbarAuth();
});