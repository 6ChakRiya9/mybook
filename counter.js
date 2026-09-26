// Visitor + book view counters backed by the free Abacus counter API
// (https://abacus.jasoncameron.dev). Counts are shared by every visitor.
// The number already written in the HTML is kept as a starting offset,
// so the displayed value is: HTML number + real hits counted online.
(function () {
  var API = "https://abacus.jasoncameron.dev";
  var NS = "shelfcontrol-6chakriya9-v2";

  function parseNum(text) {
    return parseInt(String(text).replace(/[^\d]/g, ""), 10) || 0;
  }

  function fmt(n) {
    return n.toLocaleString("en-US");
  }

  // Abacus keys only allow letters, digits, "-", "_" and "."
  function toKey(s) {
    return s.toLowerCase().replace(/[^a-z0-9_.-]+/g, "-").slice(0, 60);
  }

  function getCount(key) {
    return fetch(API + "/get/" + NS + "/" + key)
      .then(function (r) { return r.ok ? r.json() : { value: 0 }; })
      .then(function (d) { return d.value || 0; })
      .catch(function () { return 0; });
  }

  function hitCount(key) {
    // keepalive lets the request finish even if the page navigates away
    return fetch(API + "/hit/" + NS + "/" + key, { keepalive: true })
      .then(function (r) { return r.json(); })
      .then(function (d) { return d.value || 0; })
      .catch(function () { return null; });
  }

  // Last known count per key, so numbers show instantly before the server replies
  function cached(key) {
    try { return parseInt(localStorage.getItem("sc-" + NS + "-" + key), 10) || 0; }
    catch (e) { return 0; }
  }

  function remember(key, v) {
    try { localStorage.setItem("sc-" + NS + "-" + key, String(v)); } catch (e) {}
  }

  // TOTAL VISITORS (index.html): +1 on every page load, including refreshes
  var visitEl = document.querySelector(".stat-number");
  if (visitEl) {
    var visitBase = parseNum(visitEl.textContent);
    var visits = 0;

    function showVisits(v) {
      if (v < visits) return; // never count backwards on screen
      visits = v;
      visitEl.textContent = fmt(visitBase + v);
      remember("site-visits", v);
    }

    function countVisit() {
      showVisits(Math.max(visits, cached("site-visits")) + 1); // instant +1
      hitCount("site-visits").then(function (v) { if (v !== null) showVisits(v); });
    }

    countVisit();
    // Coming back with the browser Back button reuses the old page without
    // re-running scripts, so count that as a visit too
    window.addEventListener("pageshow", function (e) { if (e.persisted) countVisit(); });
  }

  // 👁 views (library.html): +1 every time a book cover is clicked
  document.querySelectorAll(".mini-book-card").forEach(function (card) {
    var viewEl = card.querySelector(".views");
    var link = card.querySelector(".card-cover a");
    var title = card.querySelector("h3");
    if (!viewEl || !link || !title) return;

    var base = parseNum(viewEl.textContent);
    var key = "book-" + toKey(title.textContent);
    var current = 0;

    function show(v) {
      if (v < current) return; // never count backwards on screen
      current = v;
      viewEl.textContent = "👁 " + fmt(base + v);
      remember(key, v);
    }

    show(cached(key)); // instant, then refresh from the server
    getCount(key).then(show);

    link.addEventListener("click", function () {
      show(current + 1); // update instantly, then sync with the server
      hitCount(key).then(function (v) { if (v !== null) show(v); });
    });
  });
})();
