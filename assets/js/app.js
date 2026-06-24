/* Эль-Ниньо: Карта Пиздеца — рендер карты, таймлайн, интерактив (мобайл-фёрст). */
(function () {
  'use strict';

  // ---------- проекция (эквидистантная цилиндрическая) ----------
  // долгота -180..180 → x 0..360 ; широта 84..-56 → y (отрезаем Антарктиду и крайний север)
  const LAT_TOP = 84, LAT_BOT = -56;
  const VW = 360, VH = LAT_TOP - LAT_BOT;
  function px(lon) { return lon + 180; }
  function py(lat) { return LAT_TOP - lat; }

  const svgNS = 'http://www.w3.org/2000/svg';
  const mapWrap = document.getElementById('map-wrap');
  const svg = document.getElementById('map');
  svg.setAttribute('viewBox', `0 0 ${VW} ${VH}`);

  // строим path d для страны
  function ringToPath(ring) {
    let d = '';
    let prevLon = null;
    for (let i = 0; i < ring.length; i++) {
      const lon = ring[i][0];
      const x = px(lon).toFixed(2);
      const y = py(ring[i][1]).toFixed(2);
      // разрыв на пересечении 180° меридиана (Россия/Фиджи), чтобы не было росчерка через карту
      const jump = prevLon !== null && Math.abs(lon - prevLon) > 180;
      d += (i === 0 || jump ? 'M' : 'L') + x + ' ' + y;
      prevLon = lon;
    }
    return d + 'Z';
  }

  // ---------- состояние ----------
  let year = 2023;            // стартуем на мощном Эль-Ниньо
  const paths = {};           // name -> <path>
  let selected = null;

  // ---------- построение карты ----------
  const frag = document.createDocumentFragment();
  WORLD.forEach(function (ctry) {
    let d = '';
    ctry.p.forEach(function (ring) { d += ringToPath(ring); });
    const p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', d);
    p.setAttribute('class', 'country');
    p.setAttribute('data-name', ctry.n);
    p.addEventListener('click', function () { selectCountry(ctry.n); });
    frag.appendChild(p);
    paths[ctry.n] = p;
  });
  svg.appendChild(frag);

  // ---------- покраска по году ----------
  function repaint() {
    const oni = ONI[year];
    WORLD.forEach(function (ctry) {
      const st = countryState(ctry.n, oni);
      const lvl = LEVELS[st.level];
      const p = paths[ctry.n];
      // нейтральные/без профиля — приглушённый бежевый, чтобы выделялись горячие точки
      if (st.phaseKey === 'neutral' || (!PROFILES[ctry.n] && st.score < 8)) {
        p.style.fill = '#e9e3d3';
      } else {
        p.style.fill = lvl.color;
      }
      p.style.opacity = st.score < 8 ? '0.55' : '1';
    });
    updateHud(oni);
    updateRanking(oni);
    if (selected) renderCard(selected, oni);
  }

  // ---------- HUD (фаза + год + мега-метр) ----------
  const elYear = document.getElementById('year-val');
  const elPhase = document.getElementById('phase-label');
  const elPhaseFace = document.getElementById('phase-face');
  const elNote = document.getElementById('scenario-note');
  const elMeterFill = document.getElementById('meter-fill');
  const elMeterTxt = document.getElementById('meter-txt');

  function updateHud(oni) {
    elYear.textContent = year;
    elPhase.textContent = ensoLabel(oni);
    const ph = ensoPhase(oni);
    elPhaseFace.textContent = ph.key === 'el' ? '🔥' : ph.key === 'la' ? '🥶' : '😶';
    document.body.dataset.phase = ph.key;
    elNote.style.display = (year > ONI_OBSERVED_MAX) ? 'block' : 'none';

    // глобальный «пиздец-метр» = средневзвешенный топ-импактов
    let total = 0, n = 0, worst = 0;
    WORLD.forEach(function (c) {
      const s = countryState(c.n, oni).score;
      if (s > 12) { total += s; n++; }
      if (s > worst) worst = s;
    });
    const idx = n ? Math.round(total / n) : 0;
    const lvl = LEVELS[levelOf(worst)];
    elMeterFill.style.width = Math.max(6, worst) + '%';
    elMeterFill.style.background = lvl.color;
    elMeterTxt.textContent = lvl.emoji + ' ' + lvl.name + ' · пик ' + worst + '/100 · ' + n + ' стран в зоне';
  }

  // ---------- карточка страны ----------
  const card = document.getElementById('card');
  const cardBody = document.getElementById('card-body');

  function selectCountry(name) {
    if (selected) { const pp = paths[selected]; if (pp) pp.classList.remove('sel'); }
    selected = name;
    paths[name].classList.add('sel');
    renderCard(name, ONI[year]);
    card.classList.add('open');
  }
  function starsHTML(level) {
    let s = '<div class="stars">';
    for (let i = 0; i < 5; i++) s += '<span class="star' + (i <= level ? ' on' : '') + '">★</span>';
    return s + '</div>';
  }
  function renderCard(name, oni) {
    const st = countryState(name, oni);
    const lvl = LEVELS[st.level];
    const ruName = RU_NAMES[name] || name;
    let html = '';
    html += '<div class="card-head" style="background:' + lvl.color + '">';
    html += '<button id="card-close" aria-label="закрыть">✕</button>';
    html += '<div class="card-face">' + lvl.emoji + '</div>';
    html += '<div><div class="card-name">' + ruName + '</div>';
    html += '<div class="card-cont">' + (st.continent || 'нет данных ENSO') + '</div></div>';
    html += '</div>';
    html += '<div class="card-score"><div class="cs-num" style="color:' + lvl.color + '">' + st.score + '</div>';
    html += '<div class="cs-lab">' + starsHTML(st.level) + '<b>' + lvl.name + '</b><span>индекс угрозы / 100</span></div></div>';

    if (st.hazards.length) {
      html += '<div class="haz-grid">';
      st.hazards.forEach(function (h) {
        html += '<div class="haz"><span class="hz-e">' + h.e + '</span><span>' + h.t + '</span></div>';
      });
      html += '</div>';
    }
    if (st.goods && st.goods.length) {
      html += '<div class="goods">';
      st.goods.forEach(function (g) { html += '<span class="good">' + g.e + ' ' + g.t + '</span>'; });
      html += '</div>';
    }
    if (st.note) html += '<p class="card-note">' + st.note + '</p>';
    if (!st.continent) html += '<p class="card-note">Для этой страны телеконнекция ENSO слабая или не выражена.</p>';
    html += '<p class="card-meta">' + year + ' · ' + ensoLabel(oni) + '</p>';

    cardBody.innerHTML = html;
    document.getElementById('card-close').addEventListener('click', closeCard);
  }
  function closeCard() {
    card.classList.remove('open');
    if (selected) { const pp = paths[selected]; if (pp) pp.classList.remove('sel'); selected = null; }
  }

  // ---------- рейтинг континентов / стран ----------
  const rankBox = document.getElementById('rank-list');
  function updateRanking(oni) {
    const rows = [];
    Object.keys(PROFILES).forEach(function (name) {
      const st = countryState(name, oni);
      if (st.score >= 20) rows.push({ name: name, st: st });
    });
    rows.sort(function (a, b) { return b.st.score - a.st.score; });
    const top = rows.slice(0, 12);
    let html = '';
    if (!top.length) {
      html = '<div class="rank-empty">В этот год сильных ENSO-аномалий нет — мир относительно спокоен 🌍</div>';
    }
    const medals = ['🥇', '🥈', '🥉'];
    top.forEach(function (r, i) {
      const lvl = LEVELS[r.st.level];
      const haz = r.st.hazards.slice(0, 3).map(function (h) { return h.e; }).join('');
      const pos = i < 3 ? '<span class="medal">' + medals[i] + '</span>' : '<span class="rk-num">' + (i + 1) + '</span>';
      html += '<button class="rank-row' + (i < 3 ? ' top3' : '') + '" data-n="' + r.name + '">';
      html += '<span class="rk-pos">' + pos + '</span>';
      html += '<span class="rk-mid"><span class="rk-name">' + (RU_NAMES[r.name] || r.name) + '</span>';
      html += '<span class="rk-bar"><span class="rk-fill" style="width:' + r.st.score + '%;background:' + lvl.color + '"></span></span></span>';
      html += '<span class="rk-haz">' + haz + '</span>';
      html += '<span class="rk-sc" style="background:' + lvl.color + '">' + r.st.score + '</span>';
      html += '</button>';
    });
    rankBox.innerHTML = html;
    Array.prototype.forEach.call(rankBox.querySelectorAll('.rank-row'), function (b) {
      b.addEventListener('click', function () {
        const n = b.dataset.n;
        selectCountry(n);
        focusCountry(n);
      });
    });
  }

  // прокрутить карту к стране (грубо — по центру bbox первого кольца)
  function focusCountry(name) {
    mapWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ---------- таймлайн ----------
  const slider = document.getElementById('year-slider');
  slider.min = ONI_MIN_YEAR; slider.max = ONI_MAX_YEAR; slider.value = year;

  // мини-график ONI под слайдером
  const spark = document.getElementById('spark');
  function drawSpark() {
    const w = 1000, h = 80, mid = h / 2;
    const years = ONI_YEARS;
    const span = ONI_MAX_YEAR - ONI_MIN_YEAR;
    let bars = '';
    years.forEach(function (y) {
      const v = ONI[y];
      const x = (y - ONI_MIN_YEAR) / span * w;
      const bw = w / years.length * 0.8;
      const bh = Math.abs(v) / 2.6 * (mid - 4);
      const col = v >= 0.5 ? '#ff6b35' : v <= -0.5 ? '#3a86ff' : '#cfc7b5';
      const yy = v >= 0 ? mid - bh : mid;
      bars += '<rect x="' + (x - bw / 2).toFixed(1) + '" y="' + yy.toFixed(1) + '" width="' + bw.toFixed(1) +
              '" height="' + Math.max(1, bh).toFixed(1) + '" fill="' + col + '" rx="1"/>';
      if (y > ONI_OBSERVED_MAX) {
        bars += '<rect x="' + (x - bw / 2).toFixed(1) + '" y="2" width="' + bw.toFixed(1) + '" height="' + (h - 4) + '" fill="#000" opacity="0.05"/>';
      }
    });
    spark.innerHTML = '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none">' +
      '<line x1="0" y1="' + mid + '" x2="' + w + '" y2="' + mid + '" stroke="#bbb" stroke-width="0.5"/>' +
      bars + '<rect id="spark-cursor" width="3" height="' + h + '" fill="#111" opacity="0.55"/></svg>';
    moveCursor();
  }
  function moveCursor() {
    const cur = document.getElementById('spark-cursor');
    if (!cur) return;
    const x = (year - ONI_MIN_YEAR) / (ONI_MAX_YEAR - ONI_MIN_YEAR) * 1000;
    cur.setAttribute('x', (x - 1.5).toFixed(1));
  }

  slider.addEventListener('input', function () {
    year = +slider.value;
    repaint();
    moveCursor();
  });

  // кнопки быстрых лет (легендарные события)
  Array.prototype.forEach.call(document.querySelectorAll('[data-jump]'), function (b) {
    b.addEventListener('click', function () {
      year = +b.dataset.jump;
      slider.value = year;
      repaint();
      moveCursor();
    });
  });

  // авто-проигрывание таймлайна
  let playing = null;
  const playBtn = document.getElementById('play-btn');
  playBtn.addEventListener('click', function () {
    if (playing) { clearInterval(playing); playing = null; playBtn.textContent = '▶'; return; }
    playBtn.textContent = '⏸';
    playing = setInterval(function () {
      year = year >= ONI_MAX_YEAR ? ONI_MIN_YEAR : year + 1;
      slider.value = year;
      repaint();
      moveCursor();
    }, 700);
  });

  // легенда уровней
  const legend = document.getElementById('legend');
  legend.innerHTML = LEVELS.map(function (l) {
    return '<span class="lg"><i style="background:' + l.color + '"></i>' + l.emoji + ' ' + l.name + '</span>';
  }).join('');

  // ---------- старт ----------
  drawSpark();
  repaint();
})();
