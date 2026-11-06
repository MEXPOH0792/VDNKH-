const dishes = [
  {
    id: 'plov', name: 'Плов с бараниной', price: 590, weight: '380 г', tag: 'традиционный', image: 'assets/plov-full.webp', focus: { x: 0, y: 0, scale: 1.23 },
    short: 'Рассыпчатый рис, томлёная баранина и чеснок.',
    description: 'Традиционный плов с томлёной бараниной, морковью, пряностями и целой головкой ароматного чеснока.',
    facts: ['томлёная баранина', 'рис лазер', 'готовим в казане'],
    ingredients: [['Баранина','assets/shashlik.webp'],['Рис','assets/plov.webp'],['Морковь','assets/salad.webp'],['Чеснок','assets/plov.webp']]
  },
  {
    id: 'shashlik', name: 'Шашлык из баранины', price: 790, weight: '320 г', tag: 'от шефа', image: 'assets/shashlik-full.webp', focus: { x: 0, y: 0, scale: 1.22 },
    short: 'Сочный, с дымком и горячей лепёшкой.',
    description: 'Баранина, приготовленная на открытом огне. Подаём с маринованным красным луком, свежей зеленью и горячей лепёшкой.',
    facts: ['баранина', 'лук и зелень', 'лепёшка из печи'],
    ingredients: [['Баранина','assets/shashlik.webp'],['Зелень','assets/salad.webp'],['Красный лук','assets/salad.webp'],['Лепёшка','assets/samsa.webp']]
  },
  {
    id: 'lagman', name: 'Лагман с говядиной', price: 540, weight: '420 г', tag: 'согревает', image: 'assets/lagman-full.webp', focus: { x: 0, y: 0, scale: 1.23 },
    short: 'Домашняя лапша, говядина и насыщенный бульон.',
    description: 'Густой ароматный лагман с домашней лапшой, говядиной, сладким перцем, овощами и свежей зеленью.',
    facts: ['домашняя лапша', 'говядина', 'насыщенный бульон'],
    ingredients: [['Лапша','assets/lagman.webp'],['Говядина','assets/shashlik.webp'],['Овощи','assets/salad.webp'],['Зелень','assets/salad.webp']]
  },
  {
    id: 'samsa', name: 'Самса с бараниной', price: 190, weight: '130 г', tag: 'из печи', image: 'assets/samsa-full.webp', focus: { x: 0, y: 0, scale: 1.26 },
    short: 'Слоёное тесто, баранина и восточные специи.',
    description: 'Румяная самса из слоёного теста с сочной начинкой из баранины, репчатого лука и восточных специй.',
    facts: ['слоёное тесто', 'рубленая баранина', 'печём к заказу'],
    ingredients: [['Тесто','assets/samsa.webp'],['Баранина','assets/shashlik.webp'],['Лук','assets/salad.webp'],['Специи','assets/plov.webp']]
  },
  {
    id: 'chicken', name: 'Цыплёнок на углях', price: 690, weight: '450 г', tag: 'на компанию', image: 'assets/chicken-full.webp', focus: { x: 0, y: 0, scale: 1.26 },
    short: 'Румяный цыплёнок, печёные овощи и зелень.',
    description: 'Цыплёнок с хрустящей корочкой, приготовленный на открытом огне. Подаём с печёными овощами и зеленью.',
    facts: ['фермерский цыплёнок', 'открытый огонь', 'овощи гриль'],
    ingredients: [['Цыплёнок','assets/chicken.webp'],['Томаты','assets/salad.webp'],['Перец','assets/chicken.webp'],['Зелень','assets/salad.webp']]
  },
  {
    id: 'salad', name: 'Ачичук', price: 290, weight: '220 г', tag: 'свежий', image: 'assets/salad-full.webp', focus: { x: 0, y: 0, scale: 1.27 },
    short: 'Спелые томаты, огурец, красный лук и зелень.',
    description: 'Лёгкий салат из спелых томатов, хрустящего огурца, красного лука и ароматной свежей зелени.',
    facts: ['спелые томаты', 'хрустящий огурец', 'свежая зелень'],
    ingredients: [['Томаты','assets/salad.webp'],['Огурец','assets/salad.webp'],['Красный лук','assets/salad.webp'],['Зелень','assets/salad.webp']]
  }
];

const state = {
  index: 1,
  mode: 'home',
  changingDish: false,
  cart: new Map(),
  selectedIngredients: new Map()
};

const app = document.querySelector('#app');
const mainDish = document.querySelector('#mainDish');
const mainDishImage = document.querySelector('#mainDishImage');
const dishOrbit = document.querySelector('#dishOrbit');
const listView = document.querySelector('#listView');
const detailCopy = document.querySelector('#detailCopy');
const ingredients = document.querySelector('#ingredients');
const carouselDuration = 340;
const money = value => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
const currentDish = () => dishes[state.index];
const wrap = index => (index + dishes.length) % dishes.length;

function applyFocus(element, dish) {
  element.style.setProperty('--focus-x', `${dish.focus.x}%`);
  element.style.setProperty('--focus-y', `${dish.focus.y}%`);
  element.style.setProperty('--focus-scale', dish.focus.scale);
}

function selectedFor(dish) {
  if (!state.selectedIngredients.has(dish.id)) {
    state.selectedIngredients.set(dish.id, new Set(dish.ingredients.map((_, index) => index)));
  }
  return state.selectedIngredients.get(dish.id);
}

function renderDishCopy(dish) {
  document.querySelector('#dishTag').textContent = dish.tag;
  document.querySelector('#dishName').textContent = dish.name;
  document.querySelector('#dishMeta').textContent = `${dish.weight} · ${dish.short.toLowerCase()}`;
  document.querySelector('#detailName').textContent = dish.name;
  document.querySelector('#detailDescription').textContent = dish.description;
  document.querySelector('#detailPrice').textContent = money(dish.price);
  document.querySelector('#detailFacts').innerHTML = dish.ingredients.map(([name]) => `<li>${name}</li>`).join('');
}

function renderDish() {
  const dish = currentDish();
  const previous = dishes[wrap(state.index - 1)];
  const next = dishes[wrap(state.index + 1)];

  mainDishImage.src = dish.image;
  mainDishImage.alt = dish.name;
  mainDish.setAttribute('aria-label', `Открыть состав: ${dish.name}`);
  document.querySelector('#previousDishImage').src = previous.image;
  document.querySelector('#nextDishImage').src = next.image;
  applyFocus(mainDish, dish);
  applyFocus(document.querySelector('.side-left'), previous);
  applyFocus(document.querySelector('.side-right'), next);
  renderDishCopy(dish);
  renderIngredients();
}

function renderIngredients() {
  const dish = currentDish();
  const selected = selectedFor(dish);
  document.querySelector('#ingredientTrack').innerHTML = dish.ingredients.map(([name, image], index) => `
    <button class="ingredient ${selected.has(index) ? 'selected' : ''}" type="button" data-ingredient="${index}" aria-pressed="${selected.has(index)}">
      <img src="${image}" alt=""><span>${name}</span>
    </button>
  `).join('');
}

function renderList() {
  document.querySelector('#listItems').innerHTML = dishes.map((dish, index) => `
    <button class="list-card" type="button" data-list-index="${index}">
      <img src="${dish.image}" alt="" loading="lazy">
      <div><strong>${dish.name}</strong><small>${dish.weight}</small><span>★★★★★</span></div>
      <b>${money(dish.price)}</b>
    </button>
  `).join('');
}

function setMode(mode) {
  if (!['home','detail','customize','list'].includes(mode)) return;
  state.mode = mode;
  app.dataset.mode = mode;
  detailCopy.setAttribute('aria-hidden', String(mode !== 'detail'));
  ingredients.setAttribute('aria-hidden', String(mode !== 'customize'));
  listView.setAttribute('aria-hidden', String(mode !== 'list'));

  document.querySelectorAll('[data-mode-target]').forEach(button => {
    button.classList.toggle('active', mode === 'customize' ? button.dataset.modeTarget === 'customize' : button.dataset.modeTarget === 'home');
  });
}

function switchDish(step, animate = true) {
  if (state.changingDish) return;
  const nextIndex = wrap(state.index + step);
  if (!animate || state.mode !== 'home' || !mainDish.animate) {
    state.index = nextIndex;
    renderDish();
    return;
  }

  state.changingDish = true;
  app.classList.add('carousel-moving');
  app.dataset.direction = step > 0 ? 'next' : 'previous';
  const outgoingDish = currentDish();
  const distance = step > 0 ? -175 : 175;
  const entry = -distance;
  const ghost = document.createElement('span');
  ghost.className = 'carousel-ghost';
  ghost.innerHTML = `<img src="${currentDish().image}" alt="">`;
  applyFocus(ghost, currentDish());
  dishOrbit.appendChild(ghost);

  const ghostAnimation = ghost.animate([
    { transform: 'translate3d(-50%,0,0) scale(1)', opacity: 1 },
    { transform: `translate3d(calc(-50% + ${distance}px),0,0) scale(.42)`, opacity: .72 }
  ], { duration: carouselDuration, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });

  state.index = nextIndex;
  renderDish();
  const incomingDish = currentDish();
  renderDishCopy(outgoingDish);
  window.setTimeout(() => renderDishCopy(incomingDish), carouselDuration / 2);
  mainDish.animate([
    { transform: `translate3d(calc(-50% + ${entry}px),0,0) scale(.42)`, opacity: .72 },
    { transform: 'translate3d(-50%,0,0) scale(1)', opacity: 1 }
  ], { duration: carouselDuration, easing: 'cubic-bezier(.4,0,.2,1)' });

  document.querySelector('#homeCopy').animate([
    { opacity: 1, transform: 'translateX(0)', offset: 0 },
    { opacity: 0, transform: `translateX(${step > 0 ? -14 : 14}px)`, offset: .42 },
    { opacity: 0, transform: `translateX(${step > 0 ? 14 : -14}px)`, offset: .55 },
    { opacity: 1, transform: 'translateX(0)', offset: 1 }
  ], { duration: carouselDuration, easing: 'cubic-bezier(.4,0,.2,1)' });

  ghostAnimation.finished.finally(() => {
    ghost.remove();
    app.classList.remove('carousel-moving');
    state.changingDish = false;
  });
}

function renderCart() {
  const entries = [...state.cart.entries()];
  const count = entries.reduce((sum, [, quantity]) => sum + quantity, 0);
  const total = entries.reduce((sum, [id, quantity]) => sum + dishes.find(dish => dish.id === id).price * quantity, 0);
  const badge = document.querySelector('#cartCount');
  badge.hidden = count === 0;
  badge.textContent = count;
  document.querySelector('#cartItems').innerHTML = entries.length ? entries.map(([id, quantity]) => {
    const dish = dishes.find(item => item.id === id);
    return `<div class="cart-line"><img src="${dish.image}" alt=""><div><strong>${dish.name}</strong><small>${quantity} × ${money(dish.price)}</small></div><b>${money(dish.price * quantity)}</b></div>`;
  }).join('') : '<p>Корзина пока пуста.</p>';
  document.querySelector('#cartTotal').textContent = money(total);
}

function addCurrent() {
  const dish = currentDish();
  state.cart.set(dish.id, (state.cart.get(dish.id) || 0) + 1);
  renderCart();
  const button = document.querySelector('.primary-action');
  button.classList.add('added');
  showToast(`${dish.name} добавлен`);
  window.setTimeout(() => button.classList.remove('added'), 720);
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 1700);
}

function openDrawer(id) {
  document.querySelectorAll('.drawer').forEach(drawer => drawer.setAttribute('aria-hidden', 'true'));
  document.querySelector(id).setAttribute('aria-hidden', 'false');
}

function closeDrawers() {
  document.querySelectorAll('.drawer').forEach(drawer => drawer.setAttribute('aria-hidden', 'true'));
}

function handleAction(action) {
  if (action === 'home') return setMode('home');
  if (action === 'open-detail') {
    if (state.changingDish) return;
    renderDish();
    return setMode('detail');
  }
  if (action === 'previous-dish') return switchDish(-1);
  if (action === 'next-dish') return switchDish(1);
  if (action === 'toggle-list') return setMode(state.mode === 'list' ? 'home' : 'list');
  if (action === 'confirm-customize') return setMode('detail');
  if (action === 'add-current') return addCurrent();
  if (action === 'cart') { renderCart(); return openDrawer('#cartDrawer'); }
  if (action === 'info') return openDrawer('#infoDrawer');
  if (action === 'close-drawer') return closeDrawers();
  if (action === 'demo-order') { closeDrawers(); return showToast('Демо-заказ готов. iiko пока не подключена'); }
}

document.addEventListener('click', event => {
  if (suppressClick) {
    event.preventDefault();
    return;
  }
  const actionTarget = event.target.closest('[data-action]');
  if (actionTarget) {
    handleAction(actionTarget.dataset.action);
    return;
  }

  const modeTarget = event.target.closest('[data-mode-target]');
  if (modeTarget) {
    setMode(modeTarget.dataset.modeTarget);
    return;
  }

  const listTarget = event.target.closest('[data-list-index]');
  if (listTarget) {
    state.index = Number(listTarget.dataset.listIndex);
    renderDish();
    setMode('home');
    return;
  }

  const ingredientTarget = event.target.closest('[data-ingredient]');
  if (ingredientTarget) {
    const selected = selectedFor(currentDish());
    const index = Number(ingredientTarget.dataset.ingredient);
    selected.has(index) ? selected.delete(index) : selected.add(index);
    renderIngredients();
  }
});

let pointerStart = null;
let suppressClick = false;
let suppressClickTimer = null;
const dishScene = document.querySelector('#dishScene');

function clearPointer() {
  pointerStart = null;
}

function suppressSwipeClick() {
  suppressClick = true;
  window.clearTimeout(suppressClickTimer);
  suppressClickTimer = window.setTimeout(() => { suppressClick = false; }, 420);
}

dishScene.addEventListener('pointerdown', event => {
  if (state.mode !== 'home' || state.changingDish) return;
  if (event.pointerType === 'mouse' && event.button !== 0) return;

  pointerStart = {
    id: event.pointerId,
    x: event.clientX,
    y: event.clientY
  };

  try { dishScene.setPointerCapture(event.pointerId); } catch (_) {}
});

dishScene.addEventListener('pointermove', event => {
  if (!pointerStart || pointerStart.id !== event.pointerId) return;

  const dx = event.clientX - pointerStart.x;
  const dy = event.clientY - pointerStart.y;

  if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
    event.preventDefault();
  }
}, { passive: false });

dishScene.addEventListener('pointerup', event => {
  if (!pointerStart || pointerStart.id !== event.pointerId) return;

  const dx = event.clientX - pointerStart.x;
  const dy = event.clientY - pointerStart.y;
  const isSwipe = state.mode === 'home'
    && Math.abs(dx) > 30
    && Math.abs(dx) > Math.abs(dy) * 1.15;

  try { dishScene.releasePointerCapture(event.pointerId); } catch (_) {}
  clearPointer();

  if (isSwipe) {
    suppressSwipeClick();
    switchDish(dx < 0 ? 1 : -1);
  }
});

dishScene.addEventListener('pointercancel', event => {
  if (!pointerStart || pointerStart.id !== event.pointerId) return;
  clearPointer();
});

dishScene.addEventListener('lostpointercapture', clearPointer);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeDrawers(); setMode('home'); }
  if (event.key === 'ArrowLeft' && state.mode === 'home') switchDish(-1);
  if (event.key === 'ArrowRight' && state.mode === 'home') switchDish(1);
});

function initBrandIntro(params) {
  const intro = document.querySelector('#brandIntro');
  const logo = document.querySelector('#brandIntroLogo');
  if (!intro || !logo) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.documentElement.classList.contains('intro-pending')) {
    intro.remove();
    return;
  }

  let closed = false;
  let fallbackTimer;
  const closeIntro = () => {
    if (closed) return;
    closed = true;
    window.clearTimeout(fallbackTimer);
    try { sessionStorage.setItem('sheikh-intro-v2', 'seen'); } catch (_) {}
    document.documentElement.classList.remove('intro-pending');
    intro.classList.remove('is-visible');
    intro.classList.add('is-leaving');
    window.setTimeout(() => intro.remove(), 460);
  };

  intro.setAttribute('aria-hidden', 'false');
  window.requestAnimationFrame(() => intro.classList.add('is-visible'));
  intro.querySelector('[data-intro-skip]').addEventListener('click', closeIntro);
  logo.addEventListener('error', closeIntro, { once: true });
  fallbackTimer = window.setTimeout(closeIntro, reducedMotion ? 720 : 1380);
}

const previewParams = new URLSearchParams(window.location.search);
initBrandIntro(previewParams);
const requestedDishIndex = dishes.findIndex(dish => dish.id === previewParams.get('dish'));
if (requestedDishIndex >= 0) state.index = requestedDishIndex;
renderList();
renderDish();
renderCart();
const requestedMode = previewParams.get('mode');
setMode(['home','detail','customize','list'].includes(requestedMode) ? requestedMode : 'home');
if (previewParams.get('drawer') === 'info') openDrawer('#infoDrawer');
if (previewParams.get('drawer') === 'cart') openDrawer('#cartDrawer');
if (previewParams.get('motion') === 'next') {
  window.setTimeout(() => switchDish(1), 120);
}
