/* script.js — كود الموقع كله (الرئيسية + المتجر + الترجمة + Firebase) */
/* ================================================================
   الصفحة الرئيسية: الأقسام والمنتجات والسلايدر والسلة
   ================================================================ */
/* ============================================================
   script.js - منطق الصفحة الرئيسية
   1) بيانات الصور والأقسام والمنتجات  ← هنا بتحط مسارات صورك
   2) رسم الصفحة
   3) السلايدر
   4) Not Found + السلة + الكوكيز
   ============================================================ */

/* ---------- دالة بترجّع مربع "مكان صورة" لو الصورة مش موجودة ---------- */
function phBox(label) {
  const d = document.createElement('div');
  d.className = 'ph';
  d.textContent = label || 'صورة';
  return d;
}
// بتعمل <img> وبتحط مكانها placeholder لو الملف مش موجود
function imgTag(src, label) {
  return `<img src="${src}" alt="" onerror="this.replaceWith(phBox('${label}'))">`;
}

/* ============================================================
   1) البيانات
   ============================================================ */

/* 🖼 صور البانر الرئيسي (السلايدر) - حط الصور في images/banners/ */
const banners = [
  'images/banners/banner-1.jpg',
  'images/banners/banner-2.jpg',
  'images/banners/banner-3.jpg'
];

/* 🖼 الأقسام الدائرية - صورة لكل قسم في images/categories/ */
const categories = [
  { name: 'حلويات مصرية', img: 'images/categories/1.jpg' },
  { name: 'حلويات غربية', img: 'images/categories/2.jpg' },
  { name: 'ميكس سويت',    img: 'images/categories/3.jpg' },
  { name: 'مخبوزات',      img: 'images/categories/4.jpg' },
  { name: 'شيكولاته',     img: 'images/categories/5.jpg' },
  { name: 'كحك 2026',     img: 'images/categories/6.jpg' },
  { name: 'المولد 2026',  img: 'images/categories/7.jpg' },
  { name: 'آيس كريم',     img: 'images/categories/8.jpg' }
];

/* 🖼 صفوف المنتجات - كل منتج: الاسم، الاسم بالإنجليزي، القسم، القسم الفرعي، السعر، التقييم، عدد التقييمات،
   stock (اختياري: لو كتبت رقم بيظهر "تبقى فقط N")، والصورة في images/products/
   الصف اللي فيه carousel:true بيطلع سلايدر بأسهم */
const sections = [
  { title: 'الأكثر رواجًا', en: 'Best Sellers', items: [
    { name: 'بسبوسة سادة (1/4 كيلو)', en: 'Plain Basbousa (1/4 kg)',  cat: 'حلويات مصرية', sub: 'بسبوسه',   price: 50,   rating: 3, reviews: 1, img: 'images/products/1.jpg' },
    { name: 'عيون سادة (1/4 كيلو)',   en: 'Plain Oyoun (1/4 kg)',     cat: 'حلويات مصرية', sub: 'مكس شرقي', price: 60,   rating: 3, reviews: 1, img: 'images/products/2.jpg' },
    { name: 'كنافة كريمة (1/4 كيلو)', en: 'Cream Kunafa (1/4 kg)',    cat: 'حلويات مصرية', sub: 'كنافه',    price: 62.5, rating: 2, reviews: 1, stock: 8,  img: 'images/products/3.jpg' },
    { name: 'بسبوسة بندق (1/4 كيلو)', en: 'Hazelnut Basbousa (1/4 kg)', cat: 'حلويات مصرية', sub: 'بسبوسه', price: 70,   rating: 3, reviews: 1, img: 'images/products/4.jpg' },
    { name: 'بلح الشام (1/4 كيلو)',   en: 'Balah El Sham (1/4 kg)',   cat: 'حلويات مصرية', sub: 'مكس شرقي', price: 47.5, rating: 3, reviews: 1, stock: 10, img: 'images/products/5.jpg' }
  ]},
  { title: 'المنتجات الجديده', en: 'New Products', items: [
    { name: 'جلاش بالمكسرات (1/4 كيلو)', en: 'Nuts Goulash (1/4 kg)', cat: 'حلويات مصرية', sub: 'جلاش',     price: 75,  rating: 4, reviews: 2, img: 'images/products/6.jpg' },
    { name: 'خبز الحبة الكاملة',         en: 'Whole Grain Bread',     cat: 'مخبوزات',      sub: 'خبز',      price: 45,  rating: 4, reviews: 3, img: 'images/products/7.jpg' },
    { name: 'تشيز كيك التوت',            en: 'Berry Cheesecake',      cat: 'حلويات غربية', sub: 'تشيز كيك', price: 95,  rating: 5, reviews: 4, img: 'images/products/8.jpg' },
    { name: 'بوكس شيكولاته فاخر',        en: 'Premium Chocolate Box', cat: 'شيكولاته',     sub: 'بوكس',     price: 210, rating: 4, reviews: 2, stock: 5, img: 'images/products/9.jpg' },
    { name: 'كرواسون بالزبدة',           en: 'Butter Croissant',      cat: 'مخبوزات',      sub: 'كرواسون',  price: 40,  rating: 3, reviews: 1, img: 'images/products/10.jpg' }
  ]},
  { title: 'تشكيلة مميزة', en: 'Featured Selection', carousel: true,
    items: [
    { name: 'آيس كريم مانجو (نص لتر)', en: 'Mango Ice Cream (half liter)', cat: 'آيس كريم',     sub: 'نص لتر',    price: 85,  rating: 0, reviews: 0, img: 'images/products/11.jpg' },
    { name: 'كب كيك (علبة ٦ قطع)',     en: 'Cupcakes (box of 6)',          cat: 'حلويات غربية', sub: 'كب كيك',    price: 110, rating: 0, reviews: 0, img: 'images/products/12.jpg' },
    { name: 'دونات مشكل (علبة ٦ قطع)', en: 'Assorted Donuts (box of 6)',   cat: 'حلويات غربية', sub: 'دونات',     price: 130, rating: 0, reviews: 0, img: 'images/products/13.jpg' },
    { name: 'تارت فواكه',              en: 'Fruit Tart',                   cat: 'حلويات غربية', sub: 'تارت',      price: 140, rating: 0, reviews: 0, img: 'images/products/14.jpg' },
    { name: 'حلقوم وملبن (علبة هدايا)', en: 'Turkish Delight (gift box)',  cat: 'ميكس سويت',    sub: 'علب هدايا', price: 75,  rating: 0, reviews: 0, img: 'images/products/15.jpg' },
    { name: 'تورتة شيكولاته (وسط)',    en: 'Chocolate Cake (medium)',      cat: 'حلويات غربية', sub: 'تورتات',    price: 350, rating: 0, reviews: 0, stock: 3, img: 'images/products/16.jpg' }
  ]}
];

/* 🧭 القائمة العلوية: كل قسم له قايمة اختيارات، وكل اختيار بيفتح صفحة الصنف ده
   لإضافة اختيار: ضيفه في subs (واسمه لازم يطابق sub في المنتجات عشان يعرض منتجاتها) */
const menu = [
  { name: 'الخصومات',     subs: ['عروض اليوم', 'عروض الأسبوع'] },
  { name: 'مطعم',         subs: ['وجبات', 'سلطات', 'مشروبات'] },
  { name: 'حلويات مصرية', subs: ['بسبوسه', 'علب مشكل', 'مكس شرقي', 'جلاش', 'اطباق', 'كنافه', 'علب شرقي جاهزة'] },
  { name: 'حلويات غربية', subs: ['تشيز كيك', 'كب كيك', 'دونات', 'تارت', 'تورتات'] },
  { name: 'ميكس سويت',    subs: ['علب هدايا', 'ملبن'] },
  { name: 'مخبوزات',      subs: ['خبز', 'كرواسون', 'بسكوت'] },
  { name: 'شيكولاته',     subs: ['بوكس', 'ألواح'] },
  { name: 'كحك 2026',     subs: ['كحك سادة', 'كحك بالعجمية', 'كحك محشي'] },
  { name: 'المولد 2026',  subs: ['حلاوة المولد', 'علب المولد', 'عروسة المولد'] },
  { name: 'آيس كريم',     subs: ['نص لتر', 'كوب', 'عبوات عائلية'] }
];
/* ---------- بيانات Firebase ----------
   لو Firebase اشتغل: الموقع بيعرض اللي في قاعدة البيانات بس (حتى لو فاضية).
   لو مردش أو القواعد مش منشورة: بيشتغل بالبيانات الافتراضية اللي فوق. */
sections.forEach(s => s.items.forEach(p => { p.id = p.id || p.img; }));
window.EXTRA_EN = {};
(function (R) {
  if (!R) return;
  const cfg = R.settings || {};
  // المنتجات: كل صف في الرئيسية بياخد المنتجات اللي اتحدد له، والباقي بيظهر في الأقسام والبحث
  const live = R.prods.filter(p => p.active !== false);
  live.forEach(p => { p.en = p.en || p.name; p.rating = p.rating || 0; p.reviews = p.reviews || 0; });
  sections.forEach(s => { s.items = live.filter(p => p.section === s.title); });
  sections.push({ title: 'أخرى', en: 'Other', hidden: true, items: live.filter(p => !sections.some(s => s.title === p.section)) });
  // الأقسام: القايمة العلوية + الدواير
  menu.length = 0; categories.length = 0;
  R.cats.forEach(c => {
    menu.push({ name: c.name, subs: c.subs || [] });
    if (c.circle && c.img) categories.push({ name: c.name, img: c.img });
    if (c.en) EXTRA_EN[c.name] = c.en;
    (c.subs || []).forEach((x, i) => { if (c.subsEn && c.subsEn[i]) EXTRA_EN[x] = c.subsEn[i]; });
  });
  // البانرات: لو مفيش صور بنخفي المكان بدل ما يظهر فاضي
  banners.length = 0; banners.push(...(cfg.banners || []));
  if (!banners.length) document.getElementById('slider').parentElement.style.display = 'none';
  const pr = cfg.promos || {}, els = document.querySelectorAll('.promos .promo');
  [pr.p1, pr.p2].forEach((u, i) => { if (!els[i]) return; if (u) els[i].innerHTML = imgTag(u, 'بانر إعلاني ' + (i + 1)); else els[i].style.display = 'none'; });
})(window.REMOTE);

document.getElementById('navList').innerHTML = menu.map(m => `
  <li class="has-drop">
    <a href="#" data-nf>${m.name}</a>
    <ul class="drop">
      <li><a href="#" data-nf data-go="${m.name}" class="all">عرض الكل</a></li>
      ${m.subs.map(x => `<li><a href="#" data-nf>${x}</a></li>`).join('')}
    </ul>
  </li>`).join('');

/* ============================================================
   2) رسم الصفحة
   ============================================================ */

// أيقونة القلب (المفضلة)
const HEART = '<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

// كارت منتج واحد (نفس ترتيب Etoile: صورة + بادج + قلب / اسم / نجوم / مخزون / سعر / زرار)
function productCard(p) {
  const favs = JSON.parse(localStorage.getItem('hm_favs') || '[]');
  const stars = `<span class="stars"><b>${'★'.repeat(p.rating)}</b>${'★'.repeat(5 - p.rating)}</span>`;
  const stock = p.stock === 0 ? `<span class="stock low">نفد المخزون</span>` : (p.stock && p.stock <= 10) ? `<span class="stock low">تبقى فقط ${p.stock}</span>` : `<span class="stock">متوفر في المخزون</span>`;
  return `
    <article class="card" data-id="${p.id}">
      <div class="card-img">
        <span class="badge">${p.cat} | ${p.sub}</span>
        <button class="heart ${favs.includes(p.id) ? 'on' : ''}" type="button" aria-label="Favorite">${HEART}</button>
        ${imgTag(p.img, 'صورة المنتج')}
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <div class="rate">${stars}<span class="rcount">(${p.reviews})</span></div>
        ${stock}
        <span class="price">${p.price} ج.م</span>
        <button class="add" type="button" ${p.stock === 0 ? 'disabled' : ''}><svg class="ic"><use href="#i-basket"/></svg>اضف الي عربة</button>
      </div>
    </article>`;
}

// الأقسام الدائرية
document.getElementById('cats').innerHTML = categories.map(c => `
  <a href="#" data-nf class="cat">
    <div class="cat-img">${imgTag(c.img, c.name)}</div>${c.name}
  </a>`).join('');

// صفوف المنتجات: صف عادي (شبكة 5 كروت) أو سلايدر بأسهم + الدايرة الخاصة
function sectionHTML(s) {
  if (s.hidden || !s.items.length) return '';
  const title = `<div class="sec-title"><i class="dot"></i><h2>${s.title}</h2><i class="line"></i></div>`;
  const cards = s.items.map(productCard).join('');
  if (!s.carousel) return `<section class="psec"><div class="container">${title}<div class="grid">${cards}</div></div></section>`;
  return `<section class="psec"><div class="container">${title}
    <div class="car-row">
      <div class="car">
        <button class="car-btn prev" type="button" aria-label="Previous"><svg class="ic"><use href="#i-left"/></svg></button>
        <div class="grid">${cards}</div>
        <button class="car-btn next" type="button" aria-label="Next"><svg class="ic"><use href="#i-right"/></svg></button>
      </div>
    </div></div></section>`;
}
document.getElementById('productSections').innerHTML = sections.map(sectionHTML).join('');

/* ============================================================
   3) السلايدر
   ============================================================ */
const slidesEl = document.getElementById('slides');
const dotsEl = document.getElementById('dots');
let current = 0, timer;

slidesEl.innerHTML = banners.map((src, i) =>
  `<div class="slide">${imgTag(src, 'مكان صورة البانر ' + (i + 1))}</div>`).join('');
dotsEl.innerHTML = banners.map((_, i) => `<i data-i="${i}"></i>`).join('');

function goTo(i) {
  current = (i + banners.length) % banners.length;
  slidesEl.style.transform = `translateX(${-current * 100}%)`;
  [...dotsEl.children].forEach((d, k) => d.classList.toggle('on', k === current));
}
function autoplay() { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 5000); }

document.getElementById('nextBtn').onclick = () => { goTo(current + 1); autoplay(); };
document.getElementById('prevBtn').onclick = () => { goTo(current - 1); autoplay(); };
dotsEl.onclick = (e) => { if (e.target.dataset.i) { goTo(+e.target.dataset.i); autoplay(); } };
goTo(0); autoplay();

/* ============================================================
   4) Not Found + السلة + الكوكيز
   ============================================================ */
const home = document.getElementById('home');
const notFound = document.getElementById('notfound');

function showNotFound() { home.hidden = true; notFound.hidden = false; window.scrollTo(0, 0); }
function showHome()     { notFound.hidden = true; home.hidden = false; window.scrollTo(0, 0); }

// أي عنصر عليه data-nf بيفتح Not Found
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-nf]')) { e.preventDefault(); showNotFound(); }
});
document.getElementById('backHome').addEventListener('click', (e) => { e.preventDefault(); showHome(); });
document.getElementById('logoLink').addEventListener('click', (e) => { e.preventDefault(); showHome(); });

// شريط الكوكيز
['allowCk', 'denyCk'].forEach(id =>
  document.getElementById(id).addEventListener('click', () =>
    document.getElementById('cookies').classList.add('hide')));

/* ============================================================
   5) الموبايل: قائمة الدرج + سحب البانر بالصباع
   ============================================================ */
const navEl = document.querySelector('.nav');
const overlay = document.getElementById('overlay');
const isMobile = () => window.innerWidth <= 900;
function toggleMenu(open) { navEl.classList.toggle('open', open); overlay.classList.toggle('show', open); }
document.getElementById('burger').addEventListener('click', () => toggleMenu(!navEl.classList.contains('open')));
overlay.addEventListener('click', () => toggleMenu(false));
navEl.addEventListener('click', (e) => { if (e.target.closest('a') && isMobile()) toggleMenu(false); });
// سحب البانر بالصباع
let touchX = null;
slidesEl.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
slidesEl.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) { goTo(current + (dx < 0 ? 1 : -1)); autoplay(); }
  touchX = null;
});


/* ================================================================
   المتجر: البحث والأقسام والنوافذ والسلة وصفحة المنتج وتسجيل الدخول
   ================================================================ */
/* ============================================================
   shop.js - الوظائف: تسجيل / دخول / سلة / صفحة منتج / طلب / بحث
   الحسابات والطلبات والرسائل بتتحفظ في Firebase (shop-firebase.js). السلة والمفضلة في متصفح العميل.
   ============================================================ */
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

/* ---------- الحالة ---------- */
const allProducts = sections.flatMap(s => s.items);              // كل المنتجات من script.js
const byId = (id) => allProducts.find(p => p.id === id);        // المنتج بيتعرف بمسار صورته
let cartData = load('hm_cart', {});                              // { id: كمية }
let user = load('hm_user', null);                                // المستخدم المسجّل دخول
let afterAuth = null;                                            // اعمل إيه بعد الدخول (مثلاً كمّل الطلب)
let detailQty = 1;

/* ---------- أدوات ---------- */
const modalEl = $('#modal');
// openModal(html, drawer): لو drawer = true بتظهر كنافذة منبثقة من جانب الشاشة (تسجيل الدخول / السلة / الحساب / الطلب)
// ولو false بتظهر نافذة في النص (نتائج البحث)
function openModal(html, drawer) {
  modalEl.innerHTML = `<div class="m-box ${drawer ? 'sm' : ''}"><button class="m-x" data-act="close" aria-label="إغلاق">×</button>${html}</div>`;
  modalEl.classList.toggle('drawer', !!drawer);
  modalEl.hidden = false; document.body.style.overflow = 'hidden';
}
function closeModal() { modalEl.hidden = true; modalEl.innerHTML = ''; document.body.style.overflow = ''; }
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.hidden = false;
  clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 2000);
}
const thumb = (p) => imgTag(p.img, 'صورة');                      // imgTag من script.js
const cartTotal = () => Object.entries(cartData).reduce((s, [id, q]) => s + (byId(id)?.price || 0) * q, 0);

/* ---------- السلة ---------- */
function saveCart() {
  save('hm_cart', cartData);
  $('#cartCount').textContent = Object.values(cartData).reduce((a, b) => a + b, 0);
}
// stock جاي من لوحة التحكم: رقم = الكمية المتاحة، فاضي = متوفر بدون حد
function addToCart(id, n = 1) {
  const p = byId(id), have = cartData[id] || 0;
  if (p && p.stock != null && have + n > p.stock) return toast('الكمية المتاحة ' + p.stock + ' فقط');
  cartData[id] = have + n; saveCart(); toast('تمت الإضافة للسلة ✓');
}

function showCart() {
  const rows = Object.entries(cartData).filter(([id]) => byId(id)).map(([id, q]) => {
    const p = byId(id);
    return `<div class="crow"><div class="t">${thumb(p)}</div>
      <div>${esc(p.name)}<small>${p.price} ج.م</small></div>
      <div class="qty"><button data-act="cdec" data-id="${esc(id)}">−</button><b>${q}</b><button data-act="cinc" data-id="${esc(id)}">+</button></div>
      <button class="del" data-act="cdel" data-id="${esc(id)}">حذف</button></div>`;
  }).join('');
  // نافذة جانبية: القايمة بتتسكرول والإجمالي وزرار الطلب ثابتين تحت
  openModal(`<div class="cart-wrap"><h2>سلة المشتريات</h2>` + (rows
    ? `<div class="cart-list">${rows}</div><div class="cart-foot"><div class="total"><span>الإجمالي</span><span>${cartTotal()} ج.م</span></div><button class="m-btn" data-act="checkout">إتمام الطلب</button></div>`
    : `<div class="empty">السلة فاضية — ضيف منتجات وارجع هنا.</div>`) + `</div>`, true);
}

/* ---------- صفحة المنتج (صفحة كاملة: الصورة على جنب والتفاصيل قدامها) ---------- */
function showProduct(id) {
  const p = byId(id); if (!p) return; detailQty = 1;
  closeModal();                                                  // لو جاي من نتائج البحث
  const out = p.stock === 0;
  const stock = out ? `<span class="pdp-stock out">نفد المخزون</span>`
    : (p.stock && p.stock <= 10) ? `<span class="pdp-stock low">تبقى فقط ${p.stock}</span>`
    : `<span class="pdp-stock">متوفر في المخزون</span>`;
  const rating = Math.max(0, Math.min(5, p.rating || 0));
  const stars = `<span class="stars"><b>${'★'.repeat(rating)}</b>${'★'.repeat(5 - rating)}</span>`;
  const rv = p.reviews ? `<span class="rcount">(${p.reviews})</span>` : `<span class="rcount">لا توجد تقييمات من العملاء</span>`;
  home.hidden = true; notFound.hidden = true; pageEl.hidden = false;
  pageEl.innerHTML = `
    <div class="crumb"><a href="#" id="crumbHome">الرئيسية</a> / <a href="#" data-nf>${esc(p.cat)}</a> / ${esc(p.name)}</div>
    <div class="pdp">
      <div class="pdp-img">${thumb(p)}</div>
      <div class="pdp-info">
        <h1>${esc(p.name)}</h1>
        <div class="pdp-code"><span>الرمز:</span> <span>${esc(String(p.id).slice(-6).toUpperCase())}</span></div>
        <hr>
        <div class="pdp-price">${p.price} ج.م</div>
        ${stock}
        <div class="pdp-rate">${stars}${rv}</div>
        <hr>
        <label class="pdp-label">كمية</label>
        <div class="qty big"><button data-act="dminus" ${out ? 'disabled' : ''}>−</button><b id="dq">1</b><button data-act="dplus" ${out ? 'disabled' : ''}>+</button></div>
        <button class="pdp-add" data-act="dadd" data-id="${esc(id)}" ${out ? 'disabled' : ''}>${out ? 'نفد المخزون' : 'أضف إلى السلة'}</button>
      </div>
    </div>`;
  window.scrollTo(0, 0);
}

/* ---------- تسجيل / دخول / حساب (نافذة جانبية) ---------- */
const EYE = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 5C7 5 2.7 8.1 1 12c1.7 3.9 6 7 11 7s9.3-3.1 11-7c-1.7-3.9-6-7-11-7zm0 11.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0-7a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/></svg>';
function showAuth(tab = 'login') {
  const reg = tab === 'register';
  openModal(`<h2>${reg ? 'أهلاً بك' : 'مرحبا بعودتك'}</h2>
    <p class="dr-sub">${reg ? 'أنشئ حسابك لإتمام طلباتك بسهولة' : 'قم بتسجيل الدخول للاستمتاع بتجربتك عبر الإنترنت'}</p>
    <form data-form="${tab}">
      ${reg ? '<label>الاسم</label><input name="name" required>' : ''}
      ${reg ? '<label>رقم الموبايل</label><input name="phone" inputmode="tel" placeholder="01XXXXXXXXX" required>'
            : '<label>رقم الموبايل أو البريد الإلكتروني</label><input name="phone" placeholder="01XXXXXXXXX" autocomplete="username" autocapitalize="none" required>'}
      <label>كلمة المرور</label>
      <div class="pass-wrap"><input name="pass" type="password" autocomplete="${reg ? 'new-password' : 'current-password'}" required>
        <button type="button" class="eye" data-act="eye" aria-label="إظهار كلمة المرور">${EYE}</button></div>
      ${reg ? '' : '<a href="#" class="dr-link" data-act="forgot">نسيت كلمة المرور ؟</a>'}
      <div class="err" id="err"></div>
      <button class="m-btn" disabled>${reg ? 'إنشاء الحساب' : 'تسجيل دخول'}</button></form>
    <p class="dr-foot">${reg ? 'لديك حساب بالفعل ؟' : 'ليس لديك حساب ؟'} <a href="#" class="dr-link" data-act="${reg ? 'tlogin' : 'treg'}">${reg ? 'تسجيل دخول' : 'انشاء حساب'}</a></p>`, true);
}
function showAccount() {
  const orders = load('hm_orders', []).filter(o => o.phone === user.phone);
  openModal(`<h2>أهلاً ${esc(user.name)}</h2><p>${esc(user.phone)}</p>
    <h3 style="margin:14px 0 6px">طلباتي</h3>` +
    (orders.length ? orders.map(o => `<div class="sr"><div>طلب #${o.id}<small style="display:block;color:#888">${o.date} — ${o.total} ج.م</small></div></div>`).join('') : '<div class="empty">لسه معندكش طلبات.</div>') +
    `<button class="m-btn ghost" data-act="logout">تسجيل خروج</button>`, true);
}
function renderUser() {
  $('#loginTxt').textContent = user ? user.name : 'تسجيل دخول';
  $('#registerLink').hidden = !!user;
}

/* ---------- إتمام الطلب ---------- */
function showCheckout() {
  if (!Object.keys(cartData).length) return showCart();
  if (!user) { afterAuth = showCheckout; return showAuth('login'); }   // لازم يسجل الأول
  openModal(`<h2>إتمام الطلب</h2><form data-form="order">
    <label>عنوان التوصيل</label><textarea name="addr" rows="2" required></textarea>
    <label>ملاحظات (اختياري)</label><input name="note">
    <div class="total"><span>الإجمالي</span><span>${cartTotal()} ج.م</span></div>
    <p style="font-size:13px;color:#888">الدفع عند الاستلام</p>
    <button class="m-btn">تأكيد الطلب</button></form>`, true);
}

/* ---------- البحث ---------- */
function doSearch() {
  const q = $('#searchInput').value.trim(); if (!q) return;
  const hay = (p) => (p.name + p.en + p.cat + p.sub).toLowerCase();   // بحث عربي أو إنجليزي
  const res = allProducts.filter(p => hay(p).includes(q.toLowerCase()));
  openModal(`<h2>نتائج البحث عن "${esc(q)}"</h2>` + (res.length
    ? res.map(p => `<div class="sr" data-act="prod" data-id="${esc(p.id)}"><div class="t">${thumb(p)}</div><div>${esc(p.name)}<small style="display:block;color:#888">${p.price} ج.م</small></div></div>`).join('')
    : '<div class="empty">مفيش نتائج.</div>'));
}

/* ---------- الأوامر (أي عنصر عليه data-act) ---------- */
const actions = {
  close: closeModal,
  prod: (el) => showProduct(el.dataset.id),
  dplus: (el) => {                                               // مايعديش المخزون المتاح
    const p = byId($('.pdp-add').dataset.id);
    if (p && p.stock != null && detailQty >= p.stock) return toast('الكمية المتاحة ' + p.stock + ' فقط');
    $('#dq').textContent = ++detailQty;
  },
  dminus: () => { if (detailQty > 1) $('#dq').textContent = --detailQty; },
  dadd: (el) => addToCart(el.dataset.id, detailQty),            // الصفحة بتفضل مفتوحة، والسلة من الأيقونة فوق
  cinc: (el) => { const id = el.dataset.id, p = byId(id); if (p && p.stock != null && cartData[id] >= p.stock) return toast('الكمية المتاحة ' + p.stock + ' فقط'); cartData[id]++; saveCart(); showCart(); },
  cdec: (el) => { if (--cartData[el.dataset.id] <= 0) delete cartData[el.dataset.id]; saveCart(); showCart(); },
  cdel: (el) => { delete cartData[el.dataset.id]; saveCart(); showCart(); },
  checkout: showCheckout,
  eye: (el) => { const i = el.parentElement.querySelector('input'); i.type = i.type === 'password' ? 'text' : 'password'; },
  forgot: async () => {                                          // الاسترجاع بالإيميل بس (حسابات العملاء بالموبايل مالهاش إيميل حقيقي)
    const v = ($('.m-box input[name=phone]')?.value || '').trim(), e = $('#err');
    if (v.includes('@')) {
      try { await auth.sendPasswordResetEmail(v); e.className = 'err ok'; e.textContent = 'بعتنالك رابط إعادة تعيين كلمة المرور على الإيميل'; }
      catch { e.className = 'err'; e.textContent = 'تأكد من الإيميل وحاول تاني'; }
    } else { e.className = 'err'; e.textContent = 'لاستعادة كلمة المرور اتصل بنا على 16312'; }
  },
  tlogin: () => showAuth('login'),
  treg: () => showAuth('register'),
  logout: () => { user = null; localStorage.removeItem('hm_user'); renderUser(); closeModal(); toast('تم تسجيل الخروج'); }
};
modalEl.addEventListener('click', (e) => {
  if (e.target === modalEl) return closeModal();
  const a = e.target.closest('[data-act]'); if (a) { e.preventDefault(); actions[a.dataset.act]?.(a); }
});
// زرار الدخول/التسجيل يفضل رمادي لحد ما كل الخانات تتملى
modalEl.addEventListener('input', (e) => {
  const f = e.target.closest('form[data-form="login"], form[data-form="register"]'); if (!f) return;
  const b = f.querySelector('button.m-btn'); if (b) b.disabled = ![...f.querySelectorAll('input[required]')].every(i => i.value.trim());
});

/* ---------- الفورمات ---------- */
modalEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.target)), type = e.target.dataset.form;
  const err = (m) => $('#err').textContent = m;
  const users = load('hm_users', []);

  if (type === 'register') {
    if (!/^01[0125]\d{8}$/.test(f.phone)) return err('رقم الموبايل غير صحيح');
    if (f.pass.length < 6) return err('كلمة المرور لازم 6 حروف على الأقل');
    if (users.some(u => u.phone === f.phone)) return err('الرقم ده مسجّل قبل كده');
    users.push({ name: f.name.trim(), phone: f.phone, pass: f.pass }); save('hm_users', users);
    user = { name: f.name.trim(), phone: f.phone };
  } else if (type === 'login') {
    const u = users.find(u => u.phone === f.phone && u.pass === f.pass);
    if (!u) return err('الرقم أو كلمة المرور غلط');
    user = { name: u.name, phone: u.phone };
  } else if (type === 'order') {
    const orders = load('hm_orders', []), id = 1000 + orders.length + 1;
    orders.push({ id, phone: user.phone, items: cartData, total: cartTotal(), addr: f.addr, note: f.note, date: new Date().toLocaleDateString('ar-EG') });
    save('hm_orders', orders); cartData = {}; saveCart();
    return openModal(`<div class="empty"><h2>تم استلام طلبك ✓</h2>رقم الطلب #${id}<br>هنتواصل معاك على ${esc(user.phone)}</div>`, true);
  }
  save('hm_user', user); renderUser(); closeModal(); toast('أهلاً ' + user.name);
  if (afterAuth) { const fn = afterAuth; afterAuth = null; fn(); }
});

/* ---------- ربط الصفحة ---------- */
$('#loginLink').onclick = (e) => { e.preventDefault(); user ? showAccount() : showAuth('login'); };
$('#registerLink').onclick = (e) => { e.preventDefault(); showAuth('register'); };
$('#cartLink').onclick = (e) => { e.preventDefault(); showCart(); };
$('#searchBtn').onclick = doSearch;
$('#searchInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ضغطة على الكارت تفتح صفحة المنتج، وعلى "أضف للسلة" تضيف مباشرة
document.addEventListener('click', (e) => {
  const card = e.target.closest('.card'); if (!card) return;
  const heart = e.target.closest('.heart');
  if (heart) {                                                   // القلب = مفضلة (بتتحفظ)
    const favs = load('hm_favs', []), id = card.dataset.id, i = favs.indexOf(id);
    i < 0 ? favs.push(id) : favs.splice(i, 1); save('hm_favs', favs); heart.classList.toggle('on', i < 0);
    return;
  }
  e.target.closest('.add') ? addToCart(card.dataset.id) : showProduct(card.dataset.id);
});

saveCart(); renderUser();

/* ============================================================
   الصفحات الداخلية - كل لينك بيفتح صفحة حقيقية (مفيش 404)
   ============================================================ */
const pageEl = $('#page');


// ✏ نصوص الصفحات التعريفية - عدّلها بمعلومات العميل
const infoPages = {
  'من نحن': '<p>حلو الملك بيقدّم أفضل الحلويات الشرقية والغربية والمخبوزات بأجود المكونات، وبنهتم بالطعم والجودة في كل منتج.</p>',
  'الفروع': '<h3>فرع مكرم عبيد</h3><p>مدينة نصر، القاهرة<br>اتصل بنا: 16312</p>',
  'وظائف': '<p>عايز تشتغل معانا؟ ابعتلنا بياناتك من صفحة "اتصل بنا" وهنراجعها.</p>',
  'الشروط والأحكام': '<p>بإتمامك الطلب فإنت بتوافق على بيانات التوصيل والأسعار المعروضة وقت الطلب. الأسعار قابلة للتغيير. لو في مشكلة في الطلب كلمنا خلال 24 ساعة من الاستلام.</p>',
  'سياسة الخصوصية': '<p>بنستخدم بياناتك (الاسم والموبايل والعنوان) لتوصيل طلبك والتواصل معاك بس، ومش بنشاركها مع أي جهة تانية.</p>'
};

function showPage(title, body) {
  home.hidden = true; notFound.hidden = true; pageEl.hidden = false;
  pageEl.innerHTML = `<div class="crumb"><a href="#" id="crumbHome">الرئيسية</a> / ${esc(title)}</div><h1 class="pg-title">${esc(title)}</h1>${body}`;
  window.scrollTo(0, 0);
}
// نخلّي زرار "الرجوع للرئيسية" واللوجو يقفلوا الصفحة الداخلية كمان
showHome = function () { pageEl.hidden = true; notFound.hidden = true; home.hidden = false; window.scrollTo(0, 0); };

const grid = (list, emptyMsg) => list.length
  ? `<div class="grid wrap">${list.map(productCard).join('')}</div>`   // productCard من script.js
  : `<div class="empty">${emptyMsg || 'المنتجات دي هتتضاف قريباً.'}</div>`;

function contactForm() {
  return `<div class="info"><p>اتصل بنا: 16312</p>
    <form data-form="contact"><label>الاسم</label><input name="name" required>
    <label>الموبايل</label><input name="phone" required>
    <label>رسالتك</label><textarea name="msg" rows="3" required></textarea>
    <button class="m-btn">إرسال</button></form></div>`;
}

// 🧭 الراوتر: بياخد اسم اللينك ويفتح الصفحة المناسبة
function route(label, el) {
  if (label === 'اتصل بنا') return showPage(label, contactForm());
  if (infoPages[label]) return showPage(label, `<div class="info">${infoPages[label]}</div>`);
  if (label === 'عرض الكل') {                                   // "عرض الكل" جنب كل صف منتجات
    const t = el.closest('section').querySelector('h2').textContent;
    return showPage(t, grid(sections.find(s => s.title === t).items));
  }
  if (!label) return showPage('كل المنتجات', grid(allProducts));   // البانرات الإعلانية
  if (allProducts.some(p => p.sub === label) || ['علب مشكل', 'اطباق', 'علب شرقي جاهزة'].includes(label))
    return showPage(label, grid(allProducts.filter(p => p.sub === label)));
  if (label === 'الخصومات') return showPage(label, grid([], 'مفيش عروض متاحة دلوقتي — تابعنا قريباً.'));
  showPage(label, grid(allProducts.filter(p => p.cat === label)));   // أي قسم تاني
}

// قفل قوايم القائمة
const closeDrops = () => document.querySelectorAll('.has-drop.open').forEach(l => l.classList.remove('open'));
document.addEventListener('click', (e) => { if (!e.target.closest('.has-drop')) closeDrops(); });
// بنلقط كل ضغطة على data-nf قبل ما script.js يفتح 404
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-nf]'); if (!el) return;
  e.preventDefault(); e.stopImmediatePropagation();
  const li = el.parentElement;
  if (li.classList.contains('has-drop')) {                       // اسم القسم نفسه: يفتح/يقفل قايمته
    const was = li.classList.contains('open'); closeDrops(); li.classList.toggle('open', !was); return;
  }
  closeDrops();
  if (isMobile()) toggleMenu(false);
  // data-go = "عرض الكل" بيودّي لصفحة القسم الأب
  route(toAr(el.dataset.go || el.textContent.trim().replace(/\s+/g, ' ')), el);
}, true);

pageEl.addEventListener('click', (e) => { if (e.target.id === 'crumbHome') { e.preventDefault(); showHome(); } });
pageEl.addEventListener('submit', (e) => {                       // فورم اتصل بنا
  e.preventDefault();
  const msgs = load('hm_msgs', []); msgs.push(Object.fromEntries(new FormData(e.target))); save('hm_msgs', msgs);
  e.target.innerHTML = '<div class="empty">وصلتنا رسالتك ✓ هنرد عليك قريباً.</div>';
});

/* ---------- العنوان واللغة ---------- */
const areas = ['مكرم عبيد', 'مدينة نصر', 'التجمع الخامس', 'المعادي', 'الدقي'];   // ✏ عدّل المناطق
$('#areaTxt').textContent = load('hm_area', 'مكرم عبيد');
$('#areaLink').onclick = (e) => {
  e.preventDefault();
  openModal('<h2>اختار منطقتك</h2>' + areas.map(a => `<button class="area ${a === $('#areaTxt').textContent ? 'on' : ''}" data-act="area" data-v="${a}">${a}</button>`).join(''), true);
};
actions.area = (el) => { save('hm_area', el.dataset.v); $('#areaTxt').textContent = el.dataset.v; closeModal(); };


/* ---------- أسهم السلايدر + الكوكيز + زرار فوق ---------- */
document.querySelectorAll('.car').forEach(car => {
  const track = car.querySelector('.grid'), prev = car.querySelector('.prev'), next = car.querySelector('.next');
  const upd = () => { prev.disabled = track.scrollLeft <= 2; next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2; };
  prev.onclick = () => track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' });
  next.onclick = () => track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' });
  track.addEventListener('scroll', upd); upd();
});
$('#ckTab').onclick = () => $('#cookies').classList.toggle('hide');
const topBtn = $('#toTop');
window.addEventListener('scroll', () => topBtn.classList.toggle('show', window.scrollY > 400));
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });


/* ================================================================
   الترجمة: عربي / English
   ================================================================ */
/* ============================================================
   lang.js - زرار اللغة: بيقلب الموقع كله عربي <-> إنجليزي
   الفكرة: قاموس D (عربي ← إنجليزي). أي نص في الصفحة بيتترجم تلقائي،
   وأي نص جديد بيظهر (نافذة، صفحة، رسالة) بيتترجم لوحده عن طريق MutationObserver.
   لإضافة ترجمة جديدة: ضيف سطر في D.
   ============================================================ */
const D = {
  // الشريط العلوي والهيدر
  'اتصل بنا: 16312': 'Call us: 16312', 'وقت التوصيل من ٤٥ : ٦٠ دقيقة': 'Delivery time 45 - 60 minutes', 'طرق دفع سهلة': 'Easy payment methods',
  'ابحث عن..': 'Search for..', 'تسجيل دخول': 'Login', 'انشاء حساب': 'Sign up', 'إنشاء حساب': 'Sign up', 'منتج (ات)': 'item(s)', 'تغيير': 'Change',
  'مكرم عبيد': 'Makram Ebeid', 'مدينة نصر': 'Nasr City', 'التجمع الخامس': 'Fifth Settlement', 'المعادي': 'Maadi', 'الدقي': 'Dokki',
  'حلو الملك': 'Helw El Malek',
  // القائمة
  'الخصومات': 'Offers', 'مطعم': 'Restaurant', 'حلويات مصرية': 'Egyptian Sweets', 'حلويات غربية': 'Western Sweets', 'ميكس سويت': 'Mix Sweet',
  'مخبوزات': 'Bakery', 'شيكولاته': 'Chocolate', 'كحك 2026': 'Kahk 2026', 'المولد 2026': 'Mawlid 2026', 'آيس كريم': 'Ice Cream',
  'بسبوسه': 'Basbousa', 'علب مشكل': 'Assorted Boxes', 'مكس شرقي': 'Oriental Mix', 'جلاش': 'Goulash', 'اطباق': 'Plates', 'كنافه': 'Kunafa',
  'علب شرقي جاهزة': 'Ready Oriental Boxes', 'خبز': 'Bread', 'تشيز كيك': 'Cheesecake', 'بوكس': 'Box', 'كرواسون': 'Croissant', 'نص لتر': 'Half Liter',
  'كب كيك': 'Cupcakes', 'دونات': 'Donuts', 'تارت': 'Tarts', 'علب هدايا': 'Gift Boxes', 'عرض الكل': 'View all', 'عروض اليوم': "Today's Offers", 'عروض الأسبوع': 'Weekly Offers', 'وجبات': 'Meals', 'سلطات': 'Salads',
  'مشروبات': 'Drinks', 'ملبن': 'Malban', 'بسكوت': 'Biscuits', 'ألواح': 'Bars', 'كحك سادة': 'Plain Kahk', 'كحك بالعجمية': 'Ajamiya Kahk', 'كحك محشي': 'Stuffed Kahk',
  'حلاوة المولد': 'Mawlid Halawa', 'علب المولد': 'Mawlid Boxes', 'عروسة المولد': 'Mawlid Doll', 'كوب': 'Cups', 'عبوات عائلية': 'Family Tubs', 'تورتات': 'Cakes',
  // الكروت
  'متوفر في المخزون': 'In stock', 'اضف الي عربة': 'Add to cart', 'أضف للسلة': 'Add to cart',
  // الفوتر
  'نصنع أفضل الحلويات الشرقية والغربية والمخبوزات بأجود المكونات.': 'We make the finest oriental and western sweets and bakery from the best ingredients.',
  'عن الشركة': 'About', 'من نحن': 'About us', 'الفروع': 'Branches', 'وظائف': 'Careers', 'خدمة العملاء': 'Customer service', 'اتصل بنا': 'Contact us',
  'الشروط والأحكام': 'Terms & conditions', 'سياسة الخصوصية': 'Privacy policy', 'تواصل معنا': 'Get in touch', '© 2026 جميع الحقوق محفوظة': '© 2026 All rights reserved',
  // 404 والصفحات
  'الصفحة دي لسه مش متاحة في النسخة التجريبية.': 'This page is not available in the demo yet.', 'الرجوع للرئيسية': 'Back to home', 'الرئيسية': 'Home', 'كل المنتجات': 'All products',
  'المنتجات دي هتتضاف قريباً.': 'These products are coming soon.', 'مفيش عروض متاحة دلوقتي — تابعنا قريباً.': 'No offers right now — stay tuned.',
  'حلو الملك بيقدّم أفضل الحلويات الشرقية والغربية والمخبوزات بأجود المكونات، وبنهتم بالطعم والجودة في كل منتج.': 'Helw El Malek serves the best oriental and western sweets and bakery made with the finest ingredients, and we care about taste and quality in every product.',
  'فرع مكرم عبيد': 'Makram Ebeid branch', 'مدينة نصر، القاهرة': 'Nasr City, Cairo', 'اتصل بنا: 16312': 'Call us: 16312',
  'عايز تشتغل معانا؟ ابعتلنا بياناتك من صفحة "اتصل بنا" وهنراجعها.': 'Want to work with us? Send your details from the "Contact us" page and we will review them.',
  'بإتمامك الطلب فإنت بتوافق على بيانات التوصيل والأسعار المعروضة وقت الطلب. الأسعار قابلة للتغيير. لو في مشكلة في الطلب كلمنا خلال 24 ساعة من الاستلام.': 'By placing an order you agree to the delivery details and prices shown at the time of ordering. Prices may change. If there is a problem with your order, contact us within 24 hours of delivery.',
  'بنستخدم بياناتك (الاسم والموبايل والعنوان) لتوصيل طلبك والتواصل معاك بس، ومش بنشاركها مع أي جهة تانية.': 'We use your data (name, mobile and address) only to deliver your order and contact you, and we never share it with anyone else.',
  'اتصل بنا: 16312 — info@etoileeg.online': 'Call us: 16312 — info@etoileeg.online', 'الاسم': 'Name', 'الموبايل': 'Mobile', 'رسالتك': 'Your message', 'إرسال': 'Send',
  'وصلتنا رسالتك ✓ هنرد عليك قريباً.': 'We got your message ✓ We will reply soon.',
  // النوافذ
  'سلة المشتريات': 'Shopping cart', 'الإجمالي': 'Total', 'إتمام الطلب': 'Checkout', 'حذف': 'Remove', 'السلة فاضية — ضيف منتجات وارجع هنا.': 'Your cart is empty — add some products first.',
  'تمت الإضافة للسلة ✓': 'Added to cart ✓', 'رقم الموبايل': 'Mobile number', 'رقم الموبايل أو الإيميل': 'Mobile number or email', 'كلمة المرور': 'Password', 'دخول': 'Login', 'إنشاء الحساب': 'Create account',
  'رقم الموبايل غير صحيح': 'Invalid mobile number', 'كلمة المرور لازم 6 حروف على الأقل': 'Password must be at least 6 characters', 'الرقم ده مسجّل قبل كده': 'This number is already registered',
  'الرقم أو كلمة المرور غلط': 'Wrong number or password', 'طلباتي': 'My orders', 'لسه معندكش طلبات.': 'You have no orders yet.', 'تسجيل خروج': 'Logout', 'تم تسجيل الخروج': 'Logged out',
  'عنوان التوصيل': 'Delivery address', 'ملاحظات (اختياري)': 'Notes (optional)', 'الدفع عند الاستلام': 'Cash on delivery', 'تأكيد الطلب': 'Confirm order',
  'تم استلام طلبك ✓': 'Order received ✓', 'مفيش نتائج.': 'No results.', 'صورة المنتج': 'Product image', 'صورة': 'Image', 'اللوجو': 'Logo', 'بانر إعلاني 1': 'Promo banner 1', 'بانر إعلاني 2': 'Promo banner 2', 'اختار منطقتك': 'Choose your area',
  'مرحبا بعودتك': 'Welcome back', 'قم بتسجيل الدخول للاستمتاع بتجربتك عبر الإنترنت': 'Log in to enjoy your online experience',
  'رقم الموبايل أو البريد الإلكتروني': 'Mobile number or email', 'نسيت كلمة المرور ؟': 'Forgot password?',
  'ليس لديك حساب ؟': "Don't have an account?", 'لديك حساب بالفعل ؟': 'Already have an account?', 'أهلاً بك': 'Welcome',
  'أنشئ حسابك لإتمام طلباتك بسهولة': 'Create your account to order easily',
  'بعتنالك رابط إعادة تعيين كلمة المرور على الإيميل': 'We sent a password reset link to your email',
  'لاستعادة كلمة المرور اتصل بنا على 16312': 'To reset your password call us on 16312', 'تأكد من الإيميل وحاول تاني': 'Check the email and try again',
  'الرمز:': 'SKU:', 'كمية': 'Quantity', 'أضف إلى السلة': 'Add to cart', 'لا توجد تقييمات من العملاء': 'No customer reviews'
};
// أسماء المنتجات وعناوين الصفوف بتتضاف تلقائي من الداتا
sections.forEach(s => { D[s.title] = s.en; s.items.forEach(p => { D[p.name] = p.en; }); });
Object.assign(D, window.EXTRA_EN || {});
D['نفد المخزون'] = 'Out of stock';
// جمل فيها أرقام أو أسماء
const RULES = [
  [/^تبقى فقط (\d+)$/, 'Only $1 left'], [/^الكمية المتاحة (\d+) فقط$/, 'Only $1 available'], [/^(.+) ج\.م$/, '$1 EGP'], [/^أهلاً (.+)$/, 'Welcome $1'], [/^طلب #(\d+)$/, 'Order #$1'],
  [/^رقم الطلب #(\d+)$/, 'Order number #$1'], [/^هنتواصل معاك على (.+)$/, 'We will contact you at $1'],
  [/^نتائج البحث عن "(.*)"$/, 'Search results for "$1"'], [/^(.+) — (\d+) ج\.م$/, '$1 — $2 EGP']
];
const REV = Object.fromEntries(Object.entries(D).map(([a, e]) => [e, a]));
const toAr = (s) => REV[s] || s;                                  // بيرجّع الاسم العربي (للراوتر)

let lang = 'ar';
const origText = new WeakMap();

function trText(s) {                                              // يترجم نص واحد
  const t = s.trim(); if (!t) return s;
  let r = D[t];
  if (r === undefined && t.includes(' | ')) { r = t.split(' | ').map(x => D[x] ?? x).join(' | '); if (r === t) r = undefined; }
  if (r === undefined) for (const [re, to] of RULES) if (re.test(t)) { r = t.replace(re, to); break; }
  return r === undefined ? s : s.replace(t, () => r);
}
function walk(root) {                                             // يترجم عقدة وكل اللي جواها
  if (root.nodeType === 3) return fixNode(root);
  if (root.nodeType !== 1) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let n; while ((n = w.nextNode())) { if (!/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName)) fixNode(n); }
  [root, ...root.querySelectorAll('[placeholder],[aria-label]')].forEach(el => ['placeholder', 'aria-label'].forEach(a => {
    if (el.getAttribute && el.hasAttribute(a) && !el.dataset['ar' + a]) { const v = el.getAttribute(a), r = trText(v); if (r !== v) { el.dataset['ar' + a] = v; el.setAttribute(a, r); } }
  }));
}
function fixNode(n) { const r = trText(n.nodeValue); if (r !== n.nodeValue) { if (!origText.has(n)) origText.set(n, n.nodeValue); n.nodeValue = r; } }
function restore() {                                              // يرجّع الأصل العربي
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
  while ((n = w.nextNode())) if (origText.has(n)) { n.nodeValue = origText.get(n); origText.delete(n); }
  document.querySelectorAll('[data-arplaceholder],[data-aria-label],[data-ararialabel]').forEach(el => {
    if (el.dataset.arplaceholder) { el.setAttribute('placeholder', el.dataset.arplaceholder); delete el.dataset.arplaceholder; }
  });
}
// أي حاجة تتضاف للصفحة وإحنا إنجليزي تتترجم فوراً
new MutationObserver(ms => { if (lang === 'en') ms.forEach(m => m.addedNodes.forEach(walk)); })
  .observe(document.body, { childList: true, subtree: true });

function setLang(l) {
  lang = l; localStorage.setItem('hm_lang', l);
  const en = l === 'en', root = document.documentElement;
  root.lang = l; root.dir = en ? 'ltr' : 'rtl';                   // ده اللي بيقلب الاتجاه كله
  en ? walk(document.body) : restore();
  document.title = en ? 'Helw El Malek' : 'حلو الملك';
  $('#flag').classList.toggle('us', !en);                         // الزرار بيعرض اللغة التانية
  $('#langTxt').textContent = en ? 'العربية' : 'English';
}
$('#langLink').onclick = (e) => { e.preventDefault(); setLang(lang === 'ar' ? 'en' : 'ar'); };
setLang(localStorage.getItem('hm_lang') || 'ar');


/* ================================================================
   Firebase: الحسابات والطلبات والرسائل
   ================================================================ */
/* shop-firebase.js - بيحل محل localStorage في الموقع: حسابات + طلبات + رسائل على Firebase */
localStorage.removeItem('hm_user');
auth.onAuthStateChanged(async (u) => {
  if (!u) { user = null; renderUser(); return; }
  try {
    const d = await db.collection('users').doc(u.uid).get();
    user = { uid: u.uid, name: d.exists ? d.data().name : 'عميل', phone: d.exists ? d.data().phone : '' };
  } catch { user = { uid: u.uid, name: 'عميل', phone: '' }; }
  renderUser();
});

showAccount = async function () {
  openModal(`<h2>أهلاً ${esc(user.name)}</h2><p>${esc(user.phone)}</p><h3 style="margin:14px 0 6px">طلباتي</h3><div id="myOrders" class="empty">...</div><button class="m-btn ghost" data-act="logout">تسجيل خروج</button>`, true);
  try {
    const snap = await db.collection('orders').where('uid', '==', user.uid).get();
    const list = snap.docs.map(d => d.data()).sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    const box = $('#myOrders'); if (!box) return;
    box.className = '';
    box.innerHTML = list.length
      ? list.map(o => `<div class="sr"><div>طلب #${o.orderNo}<small style="display:block;color:#888">${esc(o.status)} — ${o.total} ج.م</small></div></div>`).join('')
      : '<div class="empty">لسه معندكش طلبات.</div>';
  } catch { const b = $('#myOrders'); if (b) b.textContent = 'تعذّر تحميل الطلبات'; }
};
actions.logout = async () => { await auth.signOut(); closeModal(); toast('تم تسجيل الخروج'); };

modalEl.addEventListener('submit', async (e) => {
  const type = e.target.dataset.form;
  if (!['register', 'login', 'order'].includes(type)) return;
  e.preventDefault(); e.stopImmediatePropagation();
  const f = Object.fromEntries(new FormData(e.target));
  const err = (m) => { const x = $('#err'); if (x) x.textContent = m; };
  const btn = e.target.querySelector('button.m-btn'); if (btn) btn.disabled = true;
  try {
    if (type === 'register') {
      if (!/^01[0125]\d{8}$/.test(f.phone)) return err('رقم الموبايل غير صحيح');
      if (f.pass.length < 6) return err('كلمة المرور لازم 6 حروف على الأقل');
      const c = await auth.createUserWithEmailAndPassword(phoneEmail(f.phone), f.pass);
      await db.collection('users').doc(c.user.uid).set({ name: f.name.trim(), phone: f.phone, createdAt: TS() });
      user = { uid: c.user.uid, name: f.name.trim(), phone: f.phone };
    } else if (type === 'login') {
      // نفس الفورم للعميل (برقم الموبايل) وللأدمن (بالإيميل): لو فيه @ ده إيميل، غير كده رقم موبايل
      const id = f.phone.trim();
      const c = await auth.signInWithEmailAndPassword(id.includes('@') ? id : phoneEmail(id), f.pass);
      const adm = await db.collection('admins').doc(c.user.uid).get();
      if (adm.exists) { location.href = 'admin.html'; return; }          // أدمن ← يروح للوحة التحكم
      const d = await db.collection('users').doc(c.user.uid).get();
      if (!d.exists) throw { code: 'auth/user-not-found' };
      user = { uid: c.user.uid, name: d.data().name, phone: d.data().phone };
    } else {
      const items = Object.entries(cartData).filter(([id]) => byId(id))
        .map(([id, qty]) => ({ id, name: byId(id).name, cat: byId(id).cat, price: byId(id).price, qty }));
      const orderNo = 1000 + Math.floor(Date.now() / 1000) % 1000000;
      await db.collection('orders').add({
        uid: user.uid, name: user.name, phone: user.phone, items, total: cartTotal(),
        addr: f.addr, note: f.note || '', status: 'جديدة', orderNo, createdAt: TS()
      });
      cartData = {}; saveCart();
      return openModal(`<div class="empty"><h2>تم استلام طلبك ✓</h2>رقم الطلب #${orderNo}<br>هنتواصل معاك على ${esc(user.phone)}</div>`, true);
    }
    renderUser(); closeModal(); toast('أهلاً ' + user.name);
    if (afterAuth) { const fn = afterAuth; afterAuth = null; fn(); }
  } catch (ex) {
    const c = ex.code || '';
    err(c === 'auth/email-already-in-use' ? 'الرقم ده مسجّل قبل كده'
      : /invalid|wrong|user-not-found/.test(c) ? 'الرقم أو كلمة المرور غلط'
      : c === 'auth/network-request-failed' ? 'مشكلة في الاتصال بالإنترنت' : 'حصلت مشكلة، حاول تاني');
  } finally { if (btn) btn.disabled = false; }
}, true);

pageEl.addEventListener('submit', async (e) => {
  e.preventDefault(); e.stopImmediatePropagation();
  const data = Object.fromEntries(new FormData(e.target));
  try {
    await db.collection('messages').add({ ...data, read: false, createdAt: TS() });
    e.target.innerHTML = '<div class="empty">وصلتنا رسالتك ✓ هنرد عليك قريباً.</div>';
  } catch { toast('تعذّر الإرسال، حاول تاني'); }
}, true);

