/* LISTRIKU — logika aplikasi (tahap 2: kerangka web) */
(function () {
  'use strict';
  const D = window.DATA;
  const $app = document.getElementById('app');
  const KEY = 'listriku_v1';

  /* ---------- ikon ---------- */
  const P = {
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 9.5V21h5v-6h4v6h5V9.5"/>',
    help: '<circle cx="12" cy="12" r="9.5"/><path d="M9.3 9.2a2.8 2.8 0 0 1 5.4 1c0 1.9-2.7 2.4-2.7 4"/><path d="M12 17.6v.1"/>',
    target: '<circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="1.5"/>',
    bulb: '<path d="M9 18h6M10 21.5h4"/><path d="M12 2.5a6.5 6.5 0 0 0-4 11.6c.7.6 1 1.4 1 2.2V17h6v-.7c0-.8.3-1.6 1-2.2a6.5 6.5 0 0 0-4-11.6z"/>',
    pen: '<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    book: '<path d="M3 5c3-1.5 6-1.5 9 1 3-2.5 6-2.5 9-1v14c-3-1.5-6-1.5-9 1-3-2.5-6-2.5-9-1z"/><path d="M12 6v14"/>',
    quiz: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 9l1.5 1.5L12 8M8 15l1.5 1.5L12 14M14.5 9.5H17M14.5 15.5H17"/>',
    ref: '<path d="M6 3h12v18l-6-4-6 4z"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10.5" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
    left: '<path d="M15 5l-7 7 7 7"/>', right: '<path d="M9 5l7 7-7 7"/>',
    save: '<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v5h7V3M8 21v-7h8v7"/>',
    send: '<path d="M3 11.5L21 3l-8.5 18-2-7.5z"/>', check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/>',
    teacher: '<rect x="3" y="3" width="18" height="12" rx="1.5"/><path d="M8 21l4-6 4 6"/>',
    play: '<path d="M7 4l13 8-13 8z" fill="currentColor"/>', ext: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v6H4V6h6"/>',
    grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
    out: '<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>', reset: '<path d="M4 12a8 8 0 1 0 2.5-5.8"/><path d="M4 4v4h4"/>'
  };
  const I = (n, s) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"${s ? ` style="${s}"` : ''}>${P[n]}</svg>`;
  const BOLT = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="currentColor"/></svg>';
  const BULB_ART = `<svg viewBox="-20 -40 440 500" width="100%" style="max-width:420px;display:block;margin:auto;overflow:visible">
<defs><radialGradient id="bg1" cx="50%" cy="40%" r="50%"><stop offset="0" stop-color="#FFF6D6" stop-opacity=".95"/><stop offset=".35" stop-color="#FFC93C" stop-opacity=".55"/><stop offset="1" stop-color="#FFC93C" stop-opacity="0"/></radialGradient>
<radialGradient id="gl1" cx="45%" cy="38%" r="60%"><stop offset="0" stop-color="#FFFDF2"/><stop offset=".55" stop-color="#FFE58A"/><stop offset="1" stop-color="#FFC93C"/></radialGradient>
<linearGradient id="bs1" x1="0" x2="1"><stop offset="0" stop-color="#8E96A6"/><stop offset=".45" stop-color="#E6E9EF"/><stop offset="1" stop-color="#7C8494"/></linearGradient></defs>
<circle cx="200" cy="175" r="190" fill="url(#bg1)"><animate attributeName="r" values="180;196;180" dur="3.2s" repeatCount="indefinite"/></circle>
<g stroke="#FFE7A0" stroke-width="7" stroke-linecap="round" opacity=".85">${[0, 40, 80, 120, 160, 200, 240, 280, 320].map(a => { const r1 = 150, r2 = 182, c = Math.cos((a - 90) * Math.PI / 180), s = Math.sin((a - 90) * Math.PI / 180); return a > 100 && a < 260 ? '' : `<line x1="${200 + c * r1}" y1="${175 + s * r1}" x2="${200 + c * r2}" y2="${175 + s * r2}"/>`; }).join('')}</g>
<path d="M200 55c-66 0-118 52-118 116 0 40 20 70 44 94 15 15 22 31 22 52v13h104v-13c0-21 7-37 22-52 24-24 44-54 44-94 0-64-52-116-118-116z" fill="url(#gl1)" stroke="#F2B533" stroke-width="3"/>
<path d="M150 120c10-22 30-36 52-40" stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none" opacity=".8"/>
<path d="M176 330v-80l-14-60M224 330v-80l14-60" stroke="#B9822A" stroke-width="4" fill="none"/>
<path d="M162 190q8 -16 16 0t16 0t16 0t16 0t12 0" stroke="#FFFFFF" stroke-width="6" fill="none" stroke-linecap="round"/>
<rect x="146" y="330" width="108" height="20" rx="6" fill="url(#bs1)"/><rect x="150" y="352" width="100" height="18" rx="6" fill="url(#bs1)"/><rect x="154" y="372" width="92" height="18" rx="6" fill="url(#bs1)"/>
<path d="M170 392h60l-12 26h-36z" fill="#3A3F4A"/></svg>`;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- penyimpanan (cadangan di browser) ---------- */
  let S;
  function fresh() { return { user: null, mode: null, p: {}, order: {}, pending: false }; }
  function load() { try { S = JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch (e) { S = fresh(); } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* penyimpanan tidak tersedia: tetap jalan di memori */ } }
  /* ---------- kirim ke Google Sheet ---------- */
  // Setiap perubahan mengirim ringkasan lengkap siswa (bukan potongan), jadi aman bila ada kiriman yang gagal lalu diulang.
  let syncTimer = null, sending = false;
  function sync(jenis) { S.pending = true; S.lastEvent = jenis; save(); clearTimeout(syncTimer); syncTimer = setTimeout(flush, 600); }
  function payload() {
    const p = S.p, u = S.user, pr = (p.predict || {}).ans || {}, tb = (p.observe || {}).tab || {}, lab = (p.observe || {}).lab;
    const optTxt = (q, i) => i == null ? '' : q.o[i];
    const pre = p.pretest && p.pretest.done ? p.pretest.skor : null, post = p.posttest && p.posttest.done ? p.posttest.skor : null;
    let ng = '', kat = '';
    if (pre != null && post != null && pre < 100) { const g = (post - pre) / (100 - pre); ng = Math.round(g * 100) / 100; kat = g >= 0.7 ? 'Tinggi' : g >= 0.3 ? 'Sedang' : 'Rendah'; }
    const st = steps(), nt = st.find(k => !done(k));
    const status = (S.mode === 'A' ? p.selesai || done('posttest') : done('kuis')) ? 'Selesai' : 'Sedang: ' + STEP[nt].lbl;
    const rekap = {
      'Pre-test': pre == null ? '' : pre, 'Dugaan awal': (p.pemantik || {}).dugaan || '',
      'Prediksi 1': optTxt(D.predict[0], pr.p1), 'Prediksi 2': optTxt(D.predict[1], pr.p2), 'Prediksi 3': optTxt(D.predict[2], pr.p3), 'Alasan prediksi': p.predict && p.predict.done ? p.predict.alasan : '',
      'Seri: nyala': tb.seri_nyala || '', 'Seri: arus (A)': tb.seri_arus || '', 'Seri: V tiap lampu': tb.seri_volt || '', 'Seri: 1 lampu dilepas': tb.seri_lepas || '',
      'Paralel: nyala': tb.par_nyala || '', 'Paralel: arus (A)': tb.par_arus || '', 'Paralel: V tiap lampu': tb.par_volt || '', 'Paralel: 1 lampu dilepas': tb.par_lepas || '',
      'Aktivitas lab': lab ? `${lab.aksi} aksi, ${lab.rusak} kerusakan, amperemeter dicoba di ${Object.keys(lab.posA || {}).length} posisi` : '',
      'Penjelasan (Explain)': (p.explain || {}).teks || '', 'Post-test': post == null ? '' : post, 'N-Gain': ng, 'Kategori N-Gain': kat,
      'Kuis: percobaan pertama': p.kuis && p.kuis.first != null ? p.kuis.first * 10 : '', 'Kuis: nilai terakhir': p.kuis && p.kuis.done ? p.kuis.skor * 10 : '', 'Kuis: jumlah percobaan': p.kuis && p.kuis.tries ? p.kuis.tries : '',
      'Status': status
    };
    const butir = ['pretest', 'posttest'].filter(k => p[k] && p[k].done).map(k => ({ tes: k === 'pretest' ? 'Pre-test' : 'Post-test', items: D.tes.map(q => p[k].ans[q.id] === q.k ? 1 : 0), skor: p[k].skor }));
    if (p.kuis && p.kuis.firstAns) butir.push({ tes: 'Kuis', items: D.kuisPG.map(q => p.kuis.firstAns[q.id] === q.k ? 1 : 0), skor: p.kuis.first * 10 });
    return { token: D.sheetToken, siswa: { kelas: u.kelas, absen: u.absen, nama: u.nama, jalur: S.mode === 'A' ? 'Asesmen' : 'Mandiri' }, rekap, butir, jenis: S.lastEvent, waktu: new Date().toISOString() };
  }
  function flush() {
    if (!S.user || !S.pending || sending) return;
    if (!D.sheetURL) return; // belum disambungkan: jawaban tetap aman di perangkat
    if (navigator.onLine === false) return;
    sending = true;
    const body = JSON.stringify(payload());
    fetch(D.sheetURL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body })
      .then(() => { S.pending = false; S.lastSent = new Date().toISOString(); save(); updSync(); })
      .catch(() => { updSync(); setTimeout(flush, 15000); })
      .finally(() => { sending = false; });
  }
  function syncLabel() {
    if (!D.sheetURL) return 'Pengiriman ke guru belum disambungkan (jawaban tersimpan di perangkat ini).';
    if (S.pending) return 'Menunggu koneksi untuk mengirim jawaban ke guru…';
    return S.lastSent ? 'Semua jawaban sudah terkirim ke guru ✓' : '';
  }
  function updSync() { const el = document.getElementById('syncst'); if (el) el.textContent = syncLabel(); }
  window.addEventListener('online', flush);

  /* ---------- langkah belajar ---------- */
  const STEP = {
    pretest: { lbl: 'Pre-test', ic: 'lock', num: 'P' },
    tujuan: { lbl: 'Tujuan Pembelajaran', ic: 'target' },
    pemantik: { lbl: 'Pemantik', ic: 'bulb' },
    predict: { lbl: 'Predict', ic: 'pen', poe: 1 },
    observe: { lbl: 'Observe', ic: 'eye', poe: 1 },
    explain: { lbl: 'Explain', ic: 'book', poe: 1 },
    posttest: { lbl: 'Post-test', ic: 'quiz' },
    kuis: { lbl: 'Kuis Latihan', ic: 'quiz' }
  };
  const steps = () => S.mode === 'A' ? ['pretest', 'tujuan', 'pemantik', 'predict', 'observe', 'explain', 'posttest'] : ['tujuan', 'pemantik', 'predict', 'observe', 'explain', 'kuis'];
  const numOf = k => { const st = steps().filter(x => x !== 'pretest'); return k === 'pretest' ? 'P' : String(st.indexOf(k) + 1); };
  const done = k => !!(S.p[k] && S.p[k].done);
  const unlocked = k => { const st = steps(), i = st.indexOf(k); if (i < 0) return false; return st.slice(0, i).every(done); };
  const nextTodo = () => steps().find(k => !done(k)) || (S.mode === 'A' ? 'hasil' : 'kuis');
  const totalSteps = () => steps().filter(k => k !== 'pretest').length;

  /* ---------- toast & modal ---------- */
  let tt;
  function toast(msg) { const t = document.getElementById('toast'); t.innerHTML = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2600); }
  function modal(title, body, acts) {
    const m = document.getElementById('modal');
    m.innerHTML = `<div class="box" role="dialog" aria-modal="true" aria-label="${esc(title)}"><h2>${esc(title)}</h2><div class="muted" style="margin-top:6px">${body}</div><div class="acts">${acts.map((a, i) => `<button class="btn ${a.cls || 'sec'}" data-i="${i}">${a.t}</button>`).join('')}</div></div>`;
    m.hidden = false;
    m.querySelectorAll('button').forEach(b => b.onclick = () => { m.hidden = true; const a = acts[+b.dataset.i]; a.fn && a.fn(); });
  }

  /* ---------- kerangka halaman ---------- */
  function go(v) { if (location.hash === '#' + v) render(); else location.hash = v; }
  function sideNav(active) {
    const st = steps();
    return st.map(k => {
      const s = STEP[k], d = done(k), u = unlocked(k), on = k === active;
      const cls = on ? 'on' : d ? 'done' : !u ? 'lk' : '';
      return `<button class="nav ${cls}" data-step="${k}"${!u ? ' aria-disabled="true"' : ''}><span class="n">${d && !on ? '✓' : numOf(k)}</span>${I(s.ic)}<span>${s.lbl}</span>${!u ? `<svg class="ico lock" viewBox="0 0 24 24">${P.lock}</svg>` : s.poe ? '<span class="tag">POE</span>' : ''}</button>`;
    }).join('');
  }
  function shell(o) {
    const st = steps(), idx = st.indexOf(o.active);
    const doneCount = st.filter(k => k !== 'pretest' && done(k)).length;
    const pct = Math.round(doneCount / totalSteps() * 100);
    const stepTxt = o.active === 'pretest' ? 'Pre-test' : idx >= 0 ? `Langkah ${numOf(o.active)} dari ${totalSteps()}` : '';
    const dots = st.filter(k => k !== 'pretest').map(k => `<i class="${done(k) ? 'f' : k === o.active ? 'c' : ''}"></i>`).join('');
    const next = o.next === false ? '' : o.next && o.next.ok ? `<button class="btn pri" id="btnNext">${o.next.t || 'Lanjut'}${I('right')}</button>` : `<button class="btn off" id="btnNext" aria-disabled="true">${I('lock', 'width:16px;height:16px')}${(o.next && o.next.t) || 'Lanjut'}</button>`;
    return `<div class="shell">
<header class="hdr"><a class="logo" href="#menu" aria-label="LISTRIKU, ke Menu Utama"><span class="bolt">${BOLT}</span>LISTRIKU</a>
<div class="ttl">Rangkaian Seri &amp; Paralel · IPA Kelas IX <span class="jalur ${S.mode}">${S.mode === 'A' ? 'Jalur Asesmen' : 'Belajar Mandiri'}</span></div>
<span style="flex:1" class="mob-sp"></span>
<button class="hbtn" data-go="petunjuk">${I('help')}<span>Petunjuk</span></button><button class="hbtn" data-go="menu">${I('home')}<span>Menu Utama</span></button></header>
<div class="mprog"><div class="row"><span>${stepTxt ? stepTxt.toUpperCase() + (idx >= 0 ? ' · <span style="color:var(--ink)">' + STEP[o.active].lbl + '</span>' : '') : esc(o.crumb)}</span><button id="openSheet">Daftar langkah ▾</button></div><div class="bar"><i style="width:${pct}%"></i></div></div>
<aside class="side" aria-label="Langkah belajar"><div class="cap">LANGKAH BELAJAR</div>${sideNav(o.active)}<hr><button class="nav ${o.active === 'referensi' ? 'on' : ''}" data-go="referensi"><span class="n">${I('ref', 'width:14px;height:14px')}</span>${I('ref')}<span>Referensi</span></button></aside>
<main class="main" id="main"><div class="crumb">${esc(o.crumb)}</div><h1 class="pt">${o.title}</h1>${o.body}</main>
<footer class="ftr"><button class="btn sec" id="btnBack">${I('left')}Kembali</button><div class="prog"><span>${stepTxt}</span><div class="dots">${dots}</div></div>${next}</footer></div>`;
  }
  function bindShell(o) {
    $app.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
    $app.querySelectorAll('[data-step]').forEach(b => b.onclick = () => openStep(b.dataset.step));
    const back = document.getElementById('btnBack'); if (back) back.onclick = () => go(o.back || prevOf(o.active));
    const nx = document.getElementById('btnNext');
    if (nx) nx.onclick = () => { if (o.next && o.next.ok) { o.next.fn ? o.next.fn() : go(nextOf(o.active)); } else toast(o.next && o.next.why ? o.next.why : 'Simpan jawabanmu dulu agar bisa lanjut.'); };
    const os = document.getElementById('openSheet'); if (os) os.onclick = () => openSheet(o.active);
  }
  function prevOf(k) { const st = steps(), i = st.indexOf(k); return i > 0 ? st[i - 1] : 'menu'; }
  function nextOf(k) { const st = steps(), i = st.indexOf(k); if (i < 0) return nextTodo(); if (i === st.length - 1) return S.mode === 'A' ? 'hasil' : 'menu'; return st[i + 1]; }
  function openStep(k) {
    if (!unlocked(k)) { const prev = steps()[steps().indexOf(k) - 1]; toast(`${I('lock', 'width:16px;height:16px;vertical-align:-3px')} Langkah <b>${STEP[k].lbl}</b> masih terkunci. Selesaikan <b>${STEP[prev].lbl}</b> dulu ya!`); return; }
    go(k);
  }
  function openSheet(active) {
    const el = document.createElement('div'); el.className = 'sheet';
    el.innerHTML = `<div class="in" role="dialog" aria-label="Daftar langkah"><div class="grab"></div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><b style="font-size:17px">Daftar Langkah</b><button class="btn ghost" data-x aria-label="Tutup">✕</button></div>${sideNav(active)}<hr style="border:none;border-top:1px solid var(--line);margin:10px 0"><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="tab" data-g="menu">${I('home')}Menu</button><button class="tab" data-g="petunjuk">${I('help')}Petunjuk</button><button class="tab" data-g="referensi">${I('ref')}Referensi</button></div></div>`;
    document.body.appendChild(el);
    const close = () => el.remove();
    el.onclick = e => { if (e.target === el) close(); };
    el.querySelector('[data-x]').onclick = close;
    el.querySelectorAll('[data-step]').forEach(b => b.onclick = () => { if (unlocked(b.dataset.step)) close(); openStep(b.dataset.step); });
    el.querySelectorAll('[data-g]').forEach(b => b.onclick = () => { close(); go(b.dataset.g); });
  }

  /* ---------- helper ---------- */
  function rng(seedStr) { let h = 1779033703 ^ seedStr.length; for (let i = 0; i < seedStr.length; i++) { h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; } return function () { h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; }
  function shuffle(arr, r) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function testOrder(kind) {
    if (!S.order[kind]) {
      const r = rng((S.user ? S.user.nama + S.user.absen : 'x') + kind);
      S.order[kind] = shuffle(D.tes.map((_, i) => i), r).map(qi => ({ qi, oo: shuffle([0, 1, 2, 3], r) }));
      save();
    }
    return S.order[kind];
  }
  function scoreTest(kind) { const p = S.p[kind]; if (!p) return 0; let c = 0; D.tes.forEach(q => { if (p.ans[q.id] === q.k) c++; }); return Math.round(c / D.tes.length * 100); }
  const L = 'ABCD';
  function circuitSVG(mode, w) {
    const bulb = (x, y) => `<g transform="translate(${x},${y})"><circle r="13" fill="#FFE8A8" stroke="#1B2A4E" stroke-width="2.5"/><path d="M-6 -6L6 6M6 -6L-6 6" stroke="#1B2A4E" stroke-width="2"/></g>`;
    const bat = `<g transform="translate(40,90)"><rect x="-14" y="-26" width="28" height="52" rx="5" fill="#17A398" stroke="#1B2A4E" stroke-width="2.5"/><rect x="-6" y="-32" width="12" height="6" fill="#1B2A4E"/><text x="0" y="5" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">+</text></g>`;
    if (mode === 'seri') return `<svg viewBox="0 0 300 180" width="${w}" role="img" aria-label="Rangkaian seri dua lampu"><path d="M40 58V20H260V160H40V122" fill="none" stroke="#1B2A4E" stroke-width="3"/>${bat}${bulb(120, 20)}${bulb(200, 20)}<text x="150" y="105" text-anchor="middle" font-size="14" fill="#5D6A85" font-weight="700">Seri</text></svg>`;
    return `<svg viewBox="0 0 300 180" width="${w}" role="img" aria-label="Rangkaian paralel dua lampu"><path d="M40 58V20H260V160H40V122M150 20V160M260 20V160" fill="none" stroke="#1B2A4E" stroke-width="3"/>${bat}${bulb(150, 90)}${bulb(260, 90)}<text x="205" y="150" text-anchor="middle" font-size="14" fill="#5D6A85" font-weight="700">Paralel</text></svg>`;
  }

  /* ================= HALAMAN ================= */
  const V = {};

  V.beranda = function () {
    $app.innerHTML = `<section class="hero"><a class="logo" href="#beranda"><span class="bolt">${BOLT}</span>LISTRIKU</a>
<div class="wrap"><div><span class="badge">IPA SMP · Kelas IX · Fase D</span><h1>Rangkaian <span>Seri</span> &amp; <span>Paralel</span></h1>
<p class="lead">Media belajar interaktif dengan lab rangkaian 3D dan alur <b>Predict – Observe – Explain</b>. Tebak, buktikan, lalu lihat yang tak terlihat!</p>
<button class="btn pri" id="mulai">${I('play', 'width:18px;height:18px')}${S.user ? 'Lanjutkan Belajar' : 'Mulai Belajar'}</button>
${S.user ? `<p class="dev" style="opacity:.8">Masuk sebagai <b>${esc(S.user.nama)}</b> (${esc(S.user.kelas)}). <button class="btn ghost" id="bukan" style="color:#FFC93C;padding:0;min-height:auto">Bukan kamu?</button></p>` : ''}
</div>
<div class="bulbart" aria-hidden="true">${BULB_ART}</div></div></section>`;
    document.getElementById('mulai').onclick = () => go(S.user ? 'menu' : 'identitas');
    const b = document.getElementById('bukan'); if (b) b.onclick = keluar;
  };

  V.identitas = function () {
    const kelasOpt = ['IX-A', 'IX-B', 'IX-C', 'IX-D', 'IX-E', 'IX-F', 'IX-G', 'IX-H', 'Lainnya'];
    $app.innerHTML = `<section class="hero"><a class="logo" href="#beranda"><span class="bolt">${BOLT}</span>LISTRIKU</a>
<div class="wrap"><form class="idcard" id="fid" novalidate><h1 style="font-size:24px;margin:0 0 4px;color:var(--ink)">Isi Identitasmu</h1><p class="muted small" style="margin-bottom:16px">Agar jawabanmu tersimpan dan dapat dilihat gurumu.</p>
<div style="margin-bottom:12px"><label class="f" for="nama">Nama lengkap</label><input class="inp" id="nama" autocomplete="name" placeholder="Ani Rahmawati"><div class="err" id="e_nama"></div></div>
<div style="display:flex;gap:12px;margin-bottom:12px"><div style="flex:1"><label class="f" for="kelas">Kelas</label><select class="inp" id="kelas"><option value="">Pilih kelas</option>${kelasOpt.map(k => `<option>${k}</option>`).join('')}</select><div class="err" id="e_kelas"></div></div>
<div style="flex:1"><label class="f" for="absen">No. absen</label><input class="inp" id="absen" inputmode="numeric" placeholder="01"><div class="err" id="e_absen"></div></div></div>
<div style="margin-bottom:14px"><label class="f" for="kode">Kode kelas <span class="muted" style="font-weight:500">(opsional)</span></label><input class="inp" id="kode" autocomplete="off" placeholder="Kosongkan jika belajar mandiri"><div class="err" id="e_kode"></div>
<div class="hint" style="margin-top:8px">Isi kode <b>hanya jika diberikan gurumu</b>. Dengan kode, kamu akan mengerjakan Pre-test dan Post-test. Tanpa kode, kamu belajar mandiri dan mengerjakan Kuis Latihan.</div></div>
<button class="btn pri" style="width:100%" type="submit">Masuk${I('right')}</button></form>
<div style="color:#fff"><p style="font-weight:700;opacity:.8;margin-bottom:12px">Dua jalur belajar:</p>
<div class="jalurbox" style="background:rgba(255,201,60,.12);border:1.5px solid rgba(255,201,60,.6)"><div style="color:var(--yellow);font-weight:800;font-size:17px">Dengan kode kelas · Jalur Asesmen</div><div style="opacity:.9;font-size:14px;margin-top:4px">Pre-test → Tujuan → Pemantik → Predict → Observe → Explain → Post-test → Hasil Belajar</div></div>
<div class="jalurbox" style="background:rgba(23,163,152,.15);border:1.5px solid rgba(23,163,152,.7)"><div style="color:#7FE0D6;font-weight:800;font-size:17px">Tanpa kode · Belajar Mandiri</div><div style="opacity:.9;font-size:14px;margin-top:4px">Tujuan → Pemantik → Predict → Observe → Explain → Kuis Latihan</div></div></div></div></section>`;
    const f = document.getElementById('fid');
    f.querySelectorAll('input,select').forEach(x => x.addEventListener('input', () => { const e = document.getElementById('e_' + x.id); if (e) e.textContent = ''; }));
    f.onsubmit = e => {
      e.preventDefault();
      const v = id => document.getElementById(id).value.trim();
      let ok = true; const err = (id, m) => { document.getElementById('e_' + id).textContent = m; ok = false; };
      if (v('nama').length < 3) err('nama', 'Tulis nama lengkapmu.');
      if (!v('kelas')) err('kelas', 'Pilih kelasmu.');
      if (!/^\d{1,2}$/.test(v('absen'))) err('absen', 'Isi nomor absen dengan angka.');
      const kode = v('kode').toUpperCase().replace(/\s+/g, '');
      if (kode && !D.kodeKelas.includes(kode)) err('kode', 'Kode tidak dikenali. Periksa lagi, atau kosongkan jika belajar mandiri.');
      if (!ok) return;
      S = fresh(); S.user = { nama: v('nama'), kelas: v('kelas'), absen: v('absen').padStart(2, '0'), kode: kode || '' }; S.mode = kode ? 'A' : 'M';
      save(); sync('identitas', S.user);
      go(S.mode === 'A' ? 'pretest' : 'menu');
    };
  };

  V.menu = function () {
    const st = steps();
    const nt = nextTodo();
    const cards = st.map(k => {
      const s = STEP[k], d = done(k), u = unlocked(k), isNext = k === nt;
      return `<button class="scard ${s.poe ? 'poe' : ''} ${!u ? 'lk' : ''} ${isNext ? 'next' : ''}" data-step="${k}"><div class="ic">${I(s.ic, 'width:26px;height:26px')}</div><div><div class="lbl">${k === 'pretest' ? 'AWAL' : 'LANGKAH ' + numOf(k)}</div><div class="nm">${s.lbl}</div></div>${d ? '<span class="st" style="color:var(--teal)">✓ Selesai</span>' : !u ? `<span class="st">${I('lock', 'width:16px;height:16px;color:#8A93A6')}</span>` : isNext ? '<span class="st" style="background:var(--yellow);padding:2px 8px;border-radius:6px;top:-10px">LANJUTKAN</span>' : ''}</button>`;
    }).join('');
    const o = { active: 'menu', crumb: 'Menu Utama', title: `Halo, ${esc(S.user.nama.split(' ')[0])}! Ikuti langkah belajar berurutan ya`,
      body: `<div class="cards">${cards}</div>
<div class="cards" style="margin-top:14px"><button class="scard" data-go="petunjuk"><div class="ic">${I('help', 'width:26px;height:26px')}</div><div><div class="nm" style="font-size:15px">Petunjuk Penggunaan</div><div class="small muted">Baca dulu jika baru pertama kali</div></div></button>
<button class="scard" data-go="referensi"><div class="ic">${I('ref', 'width:26px;height:26px')}</div><div><div class="nm" style="font-size:15px">Referensi &amp; Profil</div><div class="small muted">Sumber media dan pengembang</div></div></button>
${S.mode === 'A' && done('posttest') ? `<button class="scard" data-go="hasil"><div class="ic">${I('check', 'width:26px;height:26px')}</div><div><div class="nm" style="font-size:15px">Hasil Belajar</div><div class="small muted">Lihat skor dan pembahasan</div></div></button>` : ''}</div>
<p class="small" id="syncst" style="margin-top:18px;color:var(--teal-d);font-weight:600">${esc(syncLabel())}</p><p class="small muted" style="margin-top:4px">Masuk sebagai <b>${esc(S.user.nama)}</b> · ${esc(S.user.kelas)} · absen ${esc(S.user.absen)} · <button class="btn ghost small" id="keluar" style="padding:0;min-height:auto;color:var(--teal-d)">Ganti pengguna</button></p>`,
      back: 'beranda', next: { ok: true, t: 'Lanjutkan', fn: () => openStep(nt === 'hasil' ? 'posttest' : nt) } };
    if (nt === 'hasil') o.next.fn = () => go('hasil');
    $app.innerHTML = shell(o); bindShell(o);
    document.getElementById('keluar').onclick = keluar;
  };
  function keluar() { modal('Ganti pengguna?', (S.pending && D.sheetURL ? '<b style="color:var(--red)">Masih ada jawaban yang belum terkirim ke guru.</b> ' : '') + 'Data belajar di perangkat ini akan dihapus. Jawaban yang sudah terkirim ke guru tetap tersimpan.', [{ t: 'Batal' }, { t: 'Ya, ganti', cls: 'pri', fn: () => { S = fresh(); save(); go('beranda'); } }]); }

  V.petunjuk = function () {
    const tab = V._ptab || 'siswa';
    const siswa = `<div class="grid2"><div class="card"><h2>Langkah penggunaan</h2><ol style="margin:8px 0 0 20px;line-height:1.9">
<li>Klik <b>Mulai Belajar</b>, lalu isi nama, kelas, dan absen.</li><li>Isi <b>Kode Kelas</b> hanya jika diberikan gurumu.</li><li>Ikuti langkah di menu secara berurutan. Langkah berikutnya terbuka setelah langkah sebelumnya selesai.</li>
<li>Pada tahap <b>Predict</b>, tulis tebakanmu dengan jujur. Tebakan tidak bisa diubah setelah disimpan.</li><li>Pada tahap <b>Observe</b>, lakukan percobaan dan isi tabel.</li><li>Pada tahap <b>Explain</b>, bandingkan tebakan dengan hasil.</li><li>Kerjakan <b>Post-test</b> atau <b>Kuis</b> di akhir.</li></ol></div>
<div class="card"><h2>Arti tombol</h2><table class="otable" style="margin-top:6px"><tbody>
${[['home', 'Menu Utama', 'Kembali ke daftar langkah'], ['help', 'Petunjuk', 'Membuka halaman ini'], ['left', 'Kembali', 'Ke halaman sebelumnya'], ['right', 'Lanjut', 'Ke langkah berikutnya'], ['lock', 'Terkunci', 'Selesaikan langkah sebelumnya dulu'], ['save', 'Simpan', 'Menyimpan jawaban'], ['ref', 'Referensi', 'Sumber media']].map(r => `<tr><td style="width:40px">${I(r[0])}</td><td style="font-weight:700;width:120px">${r[1]}</td><td class="muted">${r[2]}</td></tr>`).join('')}</tbody></table></div></div>`;
    const guru = `<div class="grid2"><div class="card"><h2>Menggunakan Jalur Asesmen</h2><ol style="margin:8px 0 0 20px;line-height:1.9"><li>Bagikan tautan web dan <b>Kode Kelas</b> kepada siswa.</li><li>Siswa mengisi identitas dan kode, lalu mengerjakan Pre-test.</li><li>Siswa belajar dengan alur POE (±60 menit).</li><li>Siswa mengerjakan Post-test di akhir pertemuan.</li><li>Pre-test dan Post-test hanya dapat dikerjakan 1 kali.</li></ol>
<div class="hint" style="margin-top:12px"><b>Kode Kelas</b> tercantum di Buku Panduan Guru.</div></div>
<div class="card"><h2>Melihat jawaban siswa</h2><ol style="margin:8px 0 0 20px;line-height:1.9"><li>Buka Google Sheet rekap (tautan di Buku Panduan Guru).</li><li>1 baris = 1 siswa, urut per kelas dan nomor absen.</li><li>Kolom berisi dugaan awal, prediksi, pengamatan, penjelasan, skor Pre-test, Post-test, dan N-Gain.</li><li>Kolom <b>Status</b> menunjukkan langkah terakhir siswa.</li></ol>
<div class="hint" style="margin-top:12px;border-color:var(--teal);background:#E5F5F3">Tanpa kode, siswa masuk Jalur Belajar Mandiri dan skor Kuis Latihan (10 soal) yang tercatat.</div></div></div>`;
    const o = { active: 'petunjuk', crumb: 'Petunjuk', title: 'Cara Menggunakan Media', back: 'menu', next: { ok: true, t: 'Ke Menu', fn: () => go('menu') },
      body: `<div class="tabs" role="tablist"><button class="tab ${tab === 'siswa' ? 'on' : ''}" data-tab="siswa" role="tab" aria-selected="${tab === 'siswa'}">${I('user')}Petunjuk Siswa</button><button class="tab ${tab === 'guru' ? 'on' : ''}" data-tab="guru" role="tab" aria-selected="${tab === 'guru'}">${I('teacher')}Petunjuk Guru</button></div>${tab === 'siswa' ? siswa : guru}` };
    $app.innerHTML = shell(o); bindShell(o);
    $app.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { V._ptab = b.dataset.tab; render(); });
  };

  /* ---------- pre-test & post-test ---------- */
  function testView(kind) {
    const isPre = kind === 'pretest';
    const p = S.p[kind] = S.p[kind] || { ans: {}, done: false };
    const ord = testOrder(kind);
    if (p.done) {
      const o = { active: kind, crumb: isPre ? 'Awal · Pre-test' : `Langkah ${numOf(kind)} · Post-test`, title: isPre ? 'Pre-test sudah dikirim' : 'Post-test sudah dikirim',
        body: `<div class="card" style="max-width:640px"><p>${isPre ? 'Terima kasih! Pre-test hanya dikerjakan sekali dan sudah terkunci. Sekarang mulailah belajar dari <b>Tujuan Pembelajaran</b>.' : 'Post-test sudah terkunci. Lihat skor dan pembahasannya di halaman <b>Hasil Belajar</b>.'}</p></div>`,
        next: { ok: true, t: isPre ? 'Mulai belajar' : 'Lihat hasil', fn: () => go(isPre ? 'tujuan' : 'hasil') } };
      $app.innerHTML = shell(o); bindShell(o); return;
    }
    const cur = Math.min(V._qi || 0, ord.length - 1);
    const it = ord[cur], q = D.tes[it.qi];
    const body = `<div class="card" style="display:flex;gap:12px;align-items:center;background:${isPre ? '#EEF2FA' : '#FFF8E6'};border-color:${isPre ? '#C9D4EA' : '#F3DFA6'}">${I('lock', 'width:22px;height:22px')}<div class="small">${isPre ? '<b>Pre-test hanya dikerjakan 1 kali</b> dan tidak memengaruhi nilai rapor. Jawablah dengan jujur sesuai pemahamanmu sekarang, tanpa membuka sumber lain.' : '<b>Post-test hanya dikerjakan 1 kali.</b> Skor dan pembahasan muncul setelah semua jawaban dikirim.'}</div></div>
<div class="testwrap" style="margin-top:14px"><div class="card"><div class="small muted" style="font-weight:700">SOAL ${cur + 1} DARI ${ord.length}</div><p style="font-weight:700;font-size:17px;margin-top:6px">${esc(q.q)}</p>
${it.oo.map((oi, j) => `<button class="opt ${p.ans[q.id] === oi ? 'sel' : ''}" data-oi="${oi}"><span class="r"></span><span class="lt">${L[j]}.</span><span>${esc(q.o[oi])}</span></button>`).join('')}
<div style="display:flex;justify-content:space-between;margin-top:16px;gap:10px"><button class="btn sec" id="qprev" ${cur === 0 ? 'disabled style="opacity:.4"' : ''}>${I('left')}Sebelumnya</button>${cur < ord.length - 1 ? `<button class="btn teal" id="qnext">Berikutnya${I('right')}</button>` : ''}</div></div>
<div class="card"><b>Nomor soal</b><div class="numgrid">${ord.map((x, i) => `<button class="${i === cur ? 'cur' : p.ans[D.tes[x.qi].id] != null ? 'ans' : ''}" data-q="${i}" aria-label="Soal ${i + 1}">${i + 1}</button>`).join('')}</div>
<p class="small muted" style="margin-top:10px">Hijau = sudah dijawab</p><button class="btn teal" style="width:100%;margin-top:16px" id="kirim">${I('send')}Kirim Jawaban</button><div class="err" id="e_kirim"></div></div></div>`;
    const o = { active: kind, crumb: isPre ? 'Awal · Pre-test' : `Langkah ${numOf(kind)} · Post-test`, title: isPre ? 'Pre-test: Seberapa Jauh Kamu Tahu?' : 'Post-test: Tunjukkan Pemahamanmu!', body, next: { ok: false, why: 'Kirim jawabanmu dulu dengan tombol Kirim Jawaban.' } };
    $app.innerHTML = shell(o); bindShell(o);
    $app.querySelectorAll('[data-oi]').forEach(b => b.onclick = () => { p.ans[q.id] = +b.dataset.oi; save(); if (cur < ord.length - 1) { V._qi = cur + 1; } render(); });
    $app.querySelectorAll('[data-q]').forEach(b => b.onclick = () => { V._qi = +b.dataset.q; render(); });
    const qp = document.getElementById('qprev'); if (qp) qp.onclick = () => { V._qi = Math.max(0, cur - 1); render(); };
    const qn = document.getElementById('qnext'); if (qn) qn.onclick = () => { V._qi = cur + 1; render(); };
    document.getElementById('kirim').onclick = () => {
      const kosong = ord.map((x, i) => p.ans[D.tes[x.qi].id] == null ? i + 1 : 0).filter(Boolean);
      if (kosong.length) { document.getElementById('e_kirim').textContent = 'Belum dijawab: soal ' + kosong.join(', ') + '.'; return; }
      modal('Kirim jawaban?', 'Setelah dikirim, jawaban tidak dapat diubah lagi.', [{ t: 'Periksa lagi' }, { t: 'Kirim', cls: 'pri', fn: () => {
        p.done = true; p.skor = scoreTest(kind); p.waktu = new Date().toISOString(); save(); sync(kind, { ans: p.ans, skor: p.skor }); V._qi = 0;
        if (isPre) { toast('Pre-test terkirim. Selamat belajar!'); go('tujuan'); } else go('hasil');
      } }]);
    };
  }
  V.pretest = () => testView('pretest');
  V.posttest = () => testView('posttest');

  V.tujuan = function () {
    const o = { active: 'tujuan', crumb: `Langkah ${numOf('tujuan')}`, title: 'Tujuan Pembelajaran',
      body: `<div class="card" style="background:#EEF2FA;border-color:#C9D4EA"><div class="small" style="font-weight:800;color:var(--muted);letter-spacing:1px">CAPAIAN PEMBELAJARAN · FASE D</div><p style="margin-top:6px">${esc(D.cp)}</p></div>
<p style="font-weight:800;margin:18px 0 10px">Setelah mempelajari media ini, kamu dapat:</p>
<div class="stack">${D.tp.map((t, i) => `<div class="card" style="display:flex;gap:14px;align-items:center;padding:14px 18px"><span style="width:34px;height:34px;border-radius:50%;background:var(--yellow);display:grid;place-items:center;font-weight:800;flex:none">${i + 1}</span><span>${esc(t)}</span></div>`).join('')}</div>`,
      next: { ok: true, fn: () => { S.p.tujuan = { done: true }; save(); sync('tujuan', {}); go(nextOf('tujuan')); } } };
    $app.innerHTML = shell(o); bindShell(o);
  };

  V.pemantik = function () {
    const p = S.p.pemantik || {};
    const o = { active: 'pemantik', crumb: `Langkah ${numOf('pemantik')}`, title: 'Pemantik: Ada yang Aneh di Rumah!',
      body: `<div class="grid2"><div class="card" style="padding:0;overflow:hidden;background:#0A1430"><video controls playsinline preload="metadata" poster="assets/poster-pemantik.jpg" style="width:100%;aspect-ratio:16/9" aria-label="Video pemantik"><source src="assets/pemantik.mp4" type="video/mp4">Browsermu tidak dapat memutar video ini.</video></div>
<div class="stack"><div class="card" style="font-size:18px;font-weight:600;line-height:1.5">Lampu di satu kamar padam, tetapi lampu di kamar lain <span style="color:var(--teal-d)">tetap menyala</span>. Mengapa bisa begitu?</div>
<div class="card"><label class="f" for="dugaan">Tulis dugaan awalmu:</label><textarea class="inp" id="dugaan" rows="4" placeholder="Menurutku, ..." ${p.done ? '' : ''}>${esc(p.dugaan || '')}</textarea><div class="err" id="e_dug"></div>
<div style="display:flex;justify-content:flex-end;margin-top:10px"><button class="btn teal" id="simpan">${I('save')}${p.done ? 'Perbarui Dugaan' : 'Simpan Dugaan'}</button></div></div></div></div>`,
      next: { ok: !!p.done, why: 'Tulis dan simpan dugaanmu dulu agar bisa lanjut.' } };
    $app.innerHTML = shell(o); bindShell(o);
    const ta = document.getElementById('dugaan'); ta.oninput = () => document.getElementById('e_dug').textContent = '';
    document.getElementById('simpan').onclick = () => {
      const v = ta.value.trim(); if (v.length < 10) { document.getElementById('e_dug').textContent = 'Tulis dugaanmu minimal satu kalimat.'; return; }
      S.p.pemantik = { dugaan: v, done: true }; save(); sync('pemantik', { dugaan: v }); toast('Dugaan tersimpan.'); render();
    };
  };

  V.predict = function () {
    const p = S.p.predict || { ans: {}, alasan: '' };
    const lock = !!p.done;
    const o = { active: 'predict', crumb: `Langkah ${numOf('predict')} · POE`, title: 'Predict: Ayo Tebak Dulu!',
      body: `<div class="cards" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">${D.predict.map((q, qi) => `<div class="card"><div style="background:#F4F6FB;border-radius:10px;display:grid;place-items:center;padding:6px">${circuitSVG(q.mode, 170)}</div><p style="font-weight:700;margin-top:10px">${qi + 1}. ${esc(q.q)}</p>
${q.o.map((t, oi) => `<button class="opt ${p.ans[q.id] === oi ? 'sel' : ''}" data-q="${q.id}" data-oi="${oi}" ${lock ? 'disabled' : ''}><span class="r"></span><span>${esc(t)}</span></button>`).join('')}</div>`).join('')}</div>
<div class="card" style="margin-top:14px"><label class="f" for="alasan">Alasan tebakanmu:</label><textarea class="inp" id="alasan" rows="3" placeholder="Aku menebak begitu karena ..." ${lock ? 'disabled' : ''}>${esc(p.alasan || '')}</textarea><div class="err" id="e_pr"></div>
${lock ? `<div class="locked-note">${I('lock', 'width:16px;height:16px')}Prediksi sudah disimpan dan terkunci. Kamu akan membandingkannya di tahap Explain.</div>` : `<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:10px;flex-wrap:wrap"><span class="small muted">Prediksi yang sudah disimpan tidak dapat diubah.</span><button class="btn teal" id="simpan">${I('save')}Simpan Prediksi</button></div>`}</div>`,
      next: { ok: lock, why: 'Jawab semua soal, tulis alasan, lalu simpan prediksimu dulu.' } };
    $app.innerHTML = shell(o); bindShell(o);
    if (lock) return;
    $app.querySelectorAll('[data-oi]').forEach(b => b.onclick = () => { p.ans[b.dataset.q] = +b.dataset.oi; S.p.predict = p; save(); $app.querySelectorAll(`[data-q="${b.dataset.q}"]`).forEach(x => x.classList.toggle('sel', x === b)); document.getElementById('e_pr').textContent = ''; });
    const al = document.getElementById('alasan'); al.oninput = () => { p.alasan = al.value; S.p.predict = p; save(); };
    document.getElementById('simpan').onclick = () => {
      const miss = D.predict.filter(q => p.ans[q.id] == null).map((q, i) => D.predict.indexOf(q) + 1);
      if (miss.length) { document.getElementById('e_pr').textContent = 'Pilih jawaban untuk soal ' + miss.join(', ') + '.'; return; }
      if (al.value.trim().length < 10) { document.getElementById('e_pr').textContent = 'Tulis alasanmu minimal satu kalimat.'; return; }
      modal('Simpan prediksi?', 'Setelah disimpan, prediksi tidak dapat diubah. Ini supaya kamu bisa membandingkannya secara jujur dengan hasil percobaan.', [{ t: 'Periksa lagi' }, { t: 'Simpan', cls: 'pri', fn: () => {
        p.alasan = al.value.trim(); p.done = true; S.p.predict = p; save(); sync('predict', { ans: p.ans, alasan: p.alasan }); toast('Prediksi tersimpan dan terkunci.'); render();
      } }]);
    };
  };

  /* ---------- lab 3D (dimuat saat dibutuhkan) ---------- */
  let LAB = null, libP = null;
  function loadLib() {
    if (window.Lab3D) return Promise.resolve();
    if (libP) return libP;
    const files = ['three.min.js', 'OrbitControls.js', 'CSS2DRenderer.js', 'CopyShader.js', 'LuminosityHighPassShader.js', 'EffectComposer.js', 'RenderPass.js', 'ShaderPass.js', 'UnrealBloomPass.js'].map(f => 'js/vendor/' + f).concat(['js/lab3d.js']);
    libP = files.reduce((p, src) => p.then(() => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error(src)); document.head.appendChild(s); })), Promise.resolve());
    return libP;
  }
  function killLab() { if (LAB) { try { LAB.dispose(); } catch (e) { } LAB = null; } }
  function webglOK() { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; } }
  function labBox(kind) {
    const lens = kind === 'explain';
    return `<div class="labbox" id="labbox">
<div class="labbar"><div class="seg" role="group" aria-label="Jenis rangkaian"><button data-mode="seri" class="on">Seri</button><button data-mode="paralel">Paralel</button></div>
${lens ? '' : `<label class="ctl">Baterai <input type="range" id="lbV" min="1" max="8" step="1" value="2" aria-label="Jumlah sel baterai"><b id="lbVo">3 V</b></label>
<label class="ctl">Hambatan lampu <input type="range" id="lbR" min="5" max="20" step="1" value="10" aria-label="Hambatan tiap lampu"><b id="lbRo">10 Ω</b></label>
<label class="ctl">Amperemeter <select id="lbA"></select></label><label class="ctl">Voltmeter <select id="lbVm"><option value="none">Tidak dipasang</option><option value="L1">Lampu 1</option><option value="L2">Lampu 2</option><option value="baterai">Baterai</option></select></label>`}
<button class="minibtn" id="lbSw">Buka saklar</button>${lens ? '<button class="minibtn" id="lbSlow">Gerak lambat</button>' : '<button class="minibtn" id="lbFix">Ganti lampu &amp; sekring</button>'}<button class="minibtn" id="lbMax" aria-label="Perbesar lab">⛶ Perbesar</button></div>
${lens ? `<div class="labbar" style="background:#fff"><div class="lensbtns" role="group" aria-label="Lensa">${[['tanpa', 'Tanpa lensa', '<span class="dot" style="border:2px solid #8A93A6"></span>'], ['elektron', 'Elektron', '<span class="dot" style="background:#4D9BF0"></span>'], ['arus', 'Arus', '<b style="color:#EF9F27">➜</b>'], ['tegangan', 'Tegangan', '<span class="dot" style="width:18px;border-radius:4px;background:linear-gradient(90deg,#F0773B,#7F77DD,#378ADD)"></span>'], ['energi', 'Energi', '<b style="color:#EF9F27">✦</b>'], ['zoom', 'Zoom filamen', '<span class="dot" style="border:2px solid #FFC93C"></span>']].map(l => `<button data-lens="${l[0]}">${l[2]}${l[1]}</button>`).join('')}</div></div>` : ''}
<div id="labalert"></div>
<div class="l3-host" id="l3host"><div class="l3-loading" id="l3load">Memuat lab 3D…</div><span class="l3-tag">${lens ? 'Klik lampu atau saklar · seret untuk memutar' : 'Klik lampu untuk melepas · klik saklar · seret untuk memutar'}</span></div>
${lens ? '<div class="legend" id="legend"></div>' : '<div class="readouts" id="readouts"></div>'}</div>`;
  }
  function mountLab(kind, onRead) {
    const host = document.getElementById('l3host');
    if (!webglOK()) { document.getElementById('l3load').innerHTML = 'Perangkat ini tidak mendukung grafik 3D (WebGL). Coba buka di browser lain, atau gunakan simulasi PhET.'; return; }
    loadLib().then(() => {
      if (!document.body.contains(host)) return;
      document.getElementById('l3load').remove();
      const lens = kind === 'explain';
      LAB = window.Lab3D.create(host, { view: kind, onChange: r => { syncBar(r); onRead && onRead(r); }, onEvent: (t, m) => {
        if (t === 'rusak') { const a = document.getElementById('labalert'); if (a) a.innerHTML = `<div class="labalert"><span>⚠</span><span><b>${esc(m.t)}</b> Tekan <b>Ganti lampu &amp; sekring</b> untuk memperbaiki.</span><span class="q"><b>Coba pikirkan:</b> ${m.k === 'lampu' ? 'Mengapa lampu putus pada tegangan ini? Bandingkan tegangan tiap lampu pada rangkaian seri dan paralel dengan baterai yang sama.' : 'Mengapa arus di bagian ini melebihi 1 A? Ingat, arus total paralel adalah jumlah arus semua cabang.'}</span></div>`; }
        else toast(esc(m));
      } });
      const box = document.getElementById('labbox');
      box.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { LAB.set('mode', b.dataset.mode); });
      const sw = document.getElementById('lbSw'); sw.onclick = () => LAB.set('sw', !LAB.state().sw);
      const mx = document.getElementById('lbMax'); mx.onclick = () => { box.classList.toggle('max'); mx.textContent = box.classList.contains('max') ? '✕ Tutup' : '⛶ Perbesar'; };
      if (lens) {
        box.querySelectorAll('[data-lens]').forEach(b => b.onclick = () => LAB.set('lens', b.dataset.lens));
        const sl = document.getElementById('lbSlow'); sl.onclick = () => { const on = !sl.classList.contains('on'); sl.classList.toggle('on', on); LAB.set('slow', on); };
        LAB.set('lens', V._lens || 'elektron');
      } else {
        const v = document.getElementById('lbV'), rr = document.getElementById('lbR');
        v.oninput = () => LAB.set('cells', +v.value); rr.oninput = () => LAB.set('R', +rr.value);
        document.getElementById('lbA').onchange = e => LAB.set('ammPos', e.target.value);
        document.getElementById('lbVm').onchange = e => LAB.set('vmPos', e.target.value);
        document.getElementById('lbFix').onclick = () => { LAB.repair(); document.getElementById('labalert').innerHTML = ''; };
      }
      syncBar(LAB.readings());
    }).catch(() => { const l = document.getElementById('l3load'); if (l) l.textContent = 'Lab 3D gagal dimuat. Periksa koneksi internet lalu muat ulang halaman.'; });
  }
  function syncBar(r) {
    const box = document.getElementById('labbox'); if (!box) return;
    box.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('on', b.dataset.mode === r.mode));
    const sw = document.getElementById('lbSw'); if (sw) sw.textContent = r.sw ? 'Buka saklar' : 'Tutup saklar';
    const vo = document.getElementById('lbVo'); if (vo) vo.textContent = `${fmtN(r.V, 1)} V`;
    const ro = document.getElementById('lbRo'); if (ro) ro.textContent = `${r.R} Ω`;
    const a = document.getElementById('lbA');
    if (a && LAB) { const names = LAB.ammNames(); const want = '<option value="none">Tidak dipasang</option>' + Object.entries(names).map(([k, v]) => `<option value="${k}">${v}</option>`).join(''); if (a.dataset.m !== r.mode) { a.innerHTML = want; a.dataset.m = r.mode; } a.value = r.amm.pos; }
    box.querySelectorAll('[data-lens]').forEach(b => b.classList.toggle('on', b.dataset.lens === r.lens));
    const rd = document.getElementById('readouts');
    if (rd) rd.innerHTML = `<span><i>Rangkaian:</i> ${r.mode === 'seri' ? 'Seri' : 'Paralel'}</span><span><i>Baterai:</i> ${fmtN(r.V, 1)} V (${r.cells} sel)</span><span><i>Amperemeter${r.amm.pos !== 'none' ? ' (' + esc(r.amm.name) + ')' : ''}:</i> ${r.amm.pos === 'none' ? 'belum dipasang' : r.amm.brk ? 'sekring putus' : fmtN(r.amm.val) + ' A'}</span><span><i>Voltmeter${r.vm.pos !== 'none' ? ' (' + (r.vm.pos === 'baterai' ? 'baterai' : 'lampu ' + r.vm.pos.slice(1)) + ')' : ''}:</i> ${r.vm.pos === 'none' ? 'belum dipasang' : fmtN(r.vm.val, 2) + ' V'}</span>`;
    const lg = document.getElementById('legend'); if (lg) lg.innerHTML = lensLegend(r.lens);
  }
  const fmtN = (x, d = 2) => (Math.round((x || 0) * Math.pow(10, d)) / Math.pow(10, d)).toLocaleString('id-ID');
  function lensLegend(l) {
    return ({
      tanpa: 'Tampilan alat seperti di laboratorium. Pilih lensa untuk melihat yang tak terlihat.',
      elektron: '<b style="color:#2F7FE0">●</b> Elektron (muatan −) bergerak dari kutub − ke +. Kecepatan geraknya sebanding dengan besar arus (diperlambat).',
      arus: '<b style="color:#EF9F27">➜</b> Arus konvensional I mengalir dari kutub + ke −. Makin besar panah, makin besar arus.',
      tegangan: '<span style="display:inline-block;width:56px;height:8px;border-radius:4px;background:linear-gradient(90deg,#F0773B,#7F77DD,#378ADD)"></span> Warna kabel = "ketinggian energi" (model): oranye tinggi → biru 0 V; abu-abu = tidak terhubung.',
      energi: '<b style="color:#EF9F27">✦</b> Percikan = energi yang dilepas elektron di filamen. Makin banyak, daya lampu makin besar.',
      zoom: 'Jendela zoom (model): atom logam filamen bergetar, elektron bertumbukan dengannya.'
    })[l] || '';
  }
  function lensExplain(r) {
    const on = r.I > 0, l = r.lens, s = r.mode === 'seri';
    const t = {
      tanpa: s ? 'Pilih salah satu lensa di atas untuk melihat apa yang terjadi di dalam rangkaian seri.' : 'Pilih salah satu lensa di atas untuk melihat apa yang terjadi di dalam rangkaian paralel.',
      elektron: on ? 'Elektron sudah ada di seluruh kabel sejak awal; baterai hanya mendorongnya, jadi semuanya bergerak bersamaan. Perhatikan penghitung: elektron yang <b>masuk</b> L1 selalu sama dengan yang <b>keluar</b>. Arus tidak habis dipakai lampu.' : 'Rangkaian terputus: semua elektron berhenti serentak di tempatnya. Elektron tidak bocor keluar dari kabel.',
      arus: on ? (s ? `Seri: hanya ada satu jalur, jadi arus di semua titik sama, ${fmtN(r.I)} A.` : `Paralel: arus total ${fmtN(r.I)} A dari baterai terbagi ke tiap cabang (${fmtN(r.L1.I)} A dan ${fmtN(r.L2.I)} A), lalu bergabung lagi.`) : 'Tidak ada arus karena rangkaian terputus.',
      tegangan: s ? (on ? `Seri: tegangan turun bertahap, ${fmtN(r.L1.V, 1)} V di L1 lalu ${fmtN(r.L2.V, 1)} V di L2. Tiap lampu hanya mendapat sebagian tegangan baterai, sehingga redup.` : 'Seri terputus: tidak ada arus, jadi tidak ada tegangan yang turun di lampu yang utuh. Seluruh tegangan baterai tertahan di bagian yang terputus.') : 'Paralel: setiap lampu menghubungkan kabel bertegangan penuh langsung ke kabel 0 V, jadi tiap lampu mendapat tegangan penuh baterai.',
      energi: on ? `Elektron tidak habis di lampu; yang diserahkan adalah energinya. Daya L1 ${fmtN(r.L1.V * r.L1.I)} W${s ? ' (seri, redup)' : ' (paralel, terang)'}.` : 'Tanpa arus, tidak ada energi yang dilepaskan, lampu padam.',
      zoom: r.L1.I > 0 ? 'Elektron bergerak sambil terus bertumbukan dengan atom logam filamen. Tumbukan membuat atom bergetar makin kuat, filamen panas lalu berpijar. Inilah yang disebut hambatan.' : 'Tanpa arus, elektron hanya bergerak acak tanpa arah, dan atom bergetar lemah. Filamen dingin.'
    };
    return t[l] || '';
  }

  V.observe = function () {
    const p = S.p.observe || { tab: {} };
    const T = p.tab;
    const sel = (id, opts) => `<select class="inp" data-k="${id}"><option value="">Pilih</option>${opts.map(x => `<option ${T[id] === x ? 'selected' : ''}>${x}</option>`).join('')}</select>`;
    const num = (id, unit) => `<input class="inp" data-k="${id}" inputmode="decimal" placeholder="${unit}" value="${esc(T[id] || '')}">`;
    const row = (r, nm) => `<tr><td>${nm}</td><td data-l="Nyala lampu">${sel(r + '_nyala', ['Terang', 'Redup', 'Padam'])}</td><td data-l="Arus (A)">${num(r + '_arus', 'A')}</td><td data-l="V tiap lampu">${num(r + '_volt', 'V')}</td><td data-l="Jika 1 lampu dilepas">${sel(r + '_lepas', ['Lampu lain tetap menyala', 'Semua lampu padam'])}</td></tr>`;
    let lastStats = p.lab || null;
    const o = { active: 'observe', crumb: `Langkah ${numOf('observe')} · POE`, title: 'Observe: Ukur dan Buktikan di Lab 3D',
      body: `${labBox('observe')}
<div class="grid2" style="grid-template-columns:1fr 1.6fr;margin-top:14px"><div class="card"><h2>Langkah percobaan</h2><ol style="margin:6px 0 0 18px;line-height:1.75;font-size:14px"><li>Pilih <b>Seri</b>, baterai 3 V. Amati nyala lampu.</li><li>Pasang <b>amperemeter</b> di 3 posisi, catat arusnya.</li><li>Pasang <b>voltmeter</b> di Lampu 1, catat tegangannya.</li><li>Lepas satu lampu (klik lampunya), amati lampu lain.</li><li>Ulangi untuk <b>Paralel</b>.</li></ol><p class="small muted" style="margin-top:8px">Baterai 3 V dan hambatan 10 Ω dipakai untuk mengisi tabel. Setelah itu, bebas bereksperimen.</p></div>
<div class="card"><h2>Tabel pengamatan (baterai 3 V)</h2><table class="otable"><thead><tr><th>Rangkaian</th><th>Nyala lampu</th><th>Arus (A)</th><th>V tiap lampu</th><th>Jika 1 lampu dilepas</th></tr></thead><tbody>${row('seri', 'Seri')}${row('par', 'Paralel')}</tbody></table>
<div class="err" id="e_ob"></div><div style="display:flex;justify-content:flex-end;gap:10px;margin-top:12px;flex-wrap:wrap"><button class="btn sec" id="ulang">${I('reset')}Ulangi</button><button class="btn teal" id="simpan">${I('save')}${p.done ? 'Perbarui' : 'Simpan'}</button></div></div></div>`,
      next: { ok: !!p.done, why: 'Isi lengkap tabel pengamatan lalu simpan dulu.' } };
    $app.innerHTML = shell(o); bindShell(o);
    mountLab('observe', r => { lastStats = r.stats; });
    $app.querySelectorAll('[data-k]').forEach(x => x.oninput = x.onchange = () => { T[x.dataset.k] = x.value.trim(); S.p.observe = p; save(); document.getElementById('e_ob').textContent = ''; });
    document.getElementById('ulang').onclick = () => modal('Kosongkan tabel?', 'Isian tabel akan dihapus agar kamu bisa mengulang percobaan.', [{ t: 'Batal' }, { t: 'Kosongkan', cls: 'pri', fn: () => { S.p.observe = { tab: {}, done: p.done }; save(); render(); } }]);
    document.getElementById('simpan').onclick = () => {
      const need = ['seri_nyala', 'seri_arus', 'seri_volt', 'seri_lepas', 'par_nyala', 'par_arus', 'par_volt', 'par_lepas'];
      const miss = need.filter(k => !T[k]);
      if (miss.length) { document.getElementById('e_ob').textContent = 'Masih ada ' + miss.length + ' kolom yang kosong.'; return; }
      const bad = need.filter(k => /arus|volt/.test(k) && isNaN(parseFloat(String(T[k]).replace(',', '.'))));
      if (bad.length) { document.getElementById('e_ob').textContent = 'Kolom arus dan tegangan diisi angka, misalnya 0,15.'; return; }
      p.done = true; p.lab = lastStats; S.p.observe = p; save(); sync('observe', { tabel: T, lab: lastStats }); toast('Hasil pengamatan tersimpan.'); render();
    };
  };

  V.explain = function () {
    const p = S.p.explain || {};
    const pr = (S.p.predict || { ans: {} }).ans;
    const cmp = D.predict.map((q, i) => { const a = pr[q.id], ok = a === q.k; return `<span>Soal ${i + 1}: ${esc(q.o[a] != null ? q.o[a] : '-')} <b style="color:${ok ? 'var(--green)' : 'var(--red)'}">${ok ? '✓' : '✗'}</b>${ok ? '' : ` → ${esc(q.o[q.k])}`}</span>`; }).join('');
    const o = { active: 'explain', crumb: `Langkah ${numOf('explain')} · POE`, title: 'Explain: Lihat yang Tak Terlihat',
      body: `<div class="card" style="background:#FFF8E6;border-color:#F3DFA6"><b>Prediksimu vs Hasil</b><div class="compare" style="margin-top:8px">${cmp}</div></div>
<div class="grid2" style="grid-template-columns:1.6fr 1fr;margin-top:14px;align-items:start">${labBox('explain')}
<div class="stack"><div class="card"><div class="small muted" style="font-weight:800;letter-spacing:.5px" id="exHead">LENSA</div><p id="exText" style="margin-top:6px;line-height:1.65"></p></div>
<div class="card small"><b>Kunci jawaban Predict</b>${D.predict.map((q, i) => `<div style="margin-top:6px">Soal ${i + 1}: ${esc(q.jelas)}</div>`).join('')}</div>
<a class="card" href="${D.referensi[0].url}" target="_blank" rel="noopener" style="display:flex;gap:10px;align-items:center;background:#EEF2FA;border-color:#C9D4EA;text-decoration:none;color:var(--ink)">${I('ext')}<span class="small"><b>Pengayaan:</b> ingin merangkai bebas? Coba simulasi PhET</span></a></div></div>
<div class="card" style="margin-top:14px"><label class="f" for="jelas">Mengapa prediksimu benar atau salah? Jelaskan dengan kata-katamu sendiri.</label><textarea class="inp" id="jelas" rows="3" placeholder="Ternyata ...">${esc(p.teks || '')}</textarea><div class="err" id="e_ex"></div><div style="display:flex;justify-content:flex-end;margin-top:10px"><button class="btn teal" id="simpan">${I('save')}${p.done ? 'Perbarui' : 'Simpan'}</button></div></div>`,
      next: { ok: !!p.done, why: 'Tulis dan simpan penjelasanmu dulu agar bisa lanjut.' } };
    $app.innerHTML = shell(o); bindShell(o);
    const names = { tanpa: 'TANPA LENSA', elektron: 'LENSA ELEKTRON', arus: 'LENSA ARUS', tegangan: 'LENSA TEGANGAN', energi: 'LENSA ENERGI', zoom: 'LENSA ZOOM FILAMEN' };
    mountLab('explain', r => { V._lens = r.lens; const h = document.getElementById('exHead'), t = document.getElementById('exText'); if (h) h.textContent = names[r.lens] + ' · ' + (r.mode === 'seri' ? 'SERI' : 'PARALEL'); if (t) t.innerHTML = lensExplain(r); });
    const ta = document.getElementById('jelas'); ta.oninput = () => document.getElementById('e_ex').textContent = '';
    document.getElementById('simpan').onclick = () => {
      const v = ta.value.trim(); if (v.length < 15) { document.getElementById('e_ex').textContent = 'Tulis penjelasanmu minimal satu kalimat lengkap.'; return; }
      S.p.explain = { teks: v, done: true }; save(); sync('explain', { teks: v }); toast('Penjelasan tersimpan.'); render();
    };
  };

  V.hasil = function () {
    if (!(S.mode === 'A' && done('posttest'))) { go('menu'); return; }
    const pre = S.p.pretest.skor, post = S.p.posttest.skor, naik = post - pre;
    const ng = pre >= 100 ? null : (post - pre) / (100 - pre);
    const show = V._bahas;
    const o = { active: 'hasil', crumb: 'Hasil Belajar', title: `Hebat, ${esc(S.user.nama.split(' ')[0])}! Kamu sudah menyelesaikan semua langkah`, back: 'posttest',
      body: `<div class="grid2" style="grid-template-columns:1.3fr 1fr"><div class="card"><h2>Perbandingan skor</h2><div class="bars"><div class="b"><b style="font-size:26px;color:var(--muted)">${pre}</b><i style="height:${Math.max(4, pre * 1.9)}px"></i></div><div class="b post"><b style="font-size:26px;color:var(--teal-d)">${post}</b><i style="height:${Math.max(4, post * 1.9)}px"></i></div></div>
<div style="display:flex;gap:50px;margin-left:10px;font-weight:700"><span style="width:110px;text-align:center;padding-top:8px">Pre-test</span><span style="width:110px;text-align:center;padding-top:8px">Post-test</span></div></div>
<div class="stack"><div class="card" style="background:${naik >= 0 ? '#E7F6EE' : '#FFF8E6'};border-color:${naik >= 0 ? '#BFE5D0' : '#F3DFA6'}"><div class="small" style="font-weight:800;color:${naik >= 0 ? 'var(--green)' : '#8A5E00'}">${naik > 0 ? 'PENINGKATAN' : naik === 0 ? 'SKOR TETAP' : 'SKOR TURUN'}</div><div style="font-size:34px;font-weight:800">${naik > 0 ? '+' : ''}${naik} poin</div><div class="small">${naik > 0 ? 'Pemahamanmu tentang rangkaian seri dan paralel meningkat!' : 'Pelajari lagi pembahasan soal yang masih salah, ya.'}${ng != null ? ` (N-Gain ${ng.toFixed(2).replace('.', ',')})` : ''}</div></div>
<div class="card"><b>Langkah selanjutnya</b><p class="small muted" style="margin:6px 0 12px">Pelajari soal yang masih salah melalui pembahasan.</p><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn sec" id="bahas">${I('book')}${show ? 'Tutup' : 'Lihat'} Pembahasan</button><button class="btn pri" id="selesai">${I('check')}Selesai</button></div></div></div></div>
${show ? `<div class="stack" style="margin-top:16px">${D.tes.map((q, i) => { const a = S.p.posttest.ans[q.id], ok = a === q.k; return `<div class="card"><p style="font-weight:700">${i + 1}. ${esc(q.q)}</p><p class="small" style="margin-top:6px">Jawabanmu: <b style="color:${ok ? 'var(--green)' : 'var(--red)'}">${esc(q.o[a])}</b> ${ok ? '✓' : `✗ · Jawaban benar: <b>${esc(q.o[q.k])}</b>`}</p><div class="fb ${ok ? 'ok' : 'no'}" style="margin-top:8px">${esc(q.bahas)}</div></div>`; }).join('')}</div>` : ''}`,
      next: { ok: true, t: 'Ke Menu', fn: () => go('menu') } };
    $app.innerHTML = shell(o); bindShell(o);
    document.getElementById('bahas').onclick = () => { V._bahas = !show; render(); };
    document.getElementById('selesai').onclick = () => { if (!S.p.selesai) { S.p.selesai = true; save(); sync('selesai', {}); } toast('Status belajarmu: Selesai. Terima kasih!'); go('menu'); };
  };

  V.kuis = function () {
    const p = S.p.kuis = S.p.kuis || { pg: {}, done: false };
    const n = D.kuisPG.length, Q = D.kuisPG;
    const skorNow = () => Q.filter(x => p.pg[x.id] === x.k).length;
    const qi = V._kq == null ? (p.done ? n : Math.max(0, Q.findIndex(x => p.pg[x.id] == null))) : V._kq;
    let body;
    if (qi < n) {
      const q = Q[qi], a = p.pg[q.id], answered = a != null, ok = a === q.k;
      const last = qi === n - 1;
      body = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px"><b class="muted">Soal ${qi + 1} dari ${n}</b><span class="small" style="font-weight:700">Benar: ${skorNow()}/${n}</span></div>
<div style="height:6px;background:#E3E7EF;border-radius:4px;margin-bottom:14px;overflow:hidden"><div style="height:100%;width:${(qi + (answered ? 1 : 0)) / n * 100}%;background:var(--teal)"></div></div>
<div class="card"><p style="font-weight:700;font-size:17px">${esc(q.q)}</p>${q.o.map((t, oi) => `<button class="opt ${answered ? (oi === q.k ? 'ok' : oi === a ? 'no' : '') : ''}" data-oi="${oi}" ${answered ? 'disabled' : ''}><span class="r"></span><span class="lt">${L[oi]}.</span><span>${esc(t)}</span></button>`).join('')}
${answered ? `<div class="fb ${ok ? 'ok' : 'no'}"><b>${ok ? 'Tepat!' : `Belum tepat. Jawaban yang benar: ${L[q.k]}. ${esc(q.o[q.k])}.`}</b><div style="margin-top:6px"><b>Pembahasan:</b> ${esc(q.bahas)}</div></div>` : '<p class="small muted" style="margin-top:10px">Pilih satu jawaban. Pembahasan langsung muncul setelah kamu memilih.</p>'}</div>
<div style="display:flex;justify-content:space-between;margin-top:14px;gap:10px">${qi > 0 ? `<button class="btn sec" id="kp">${I('left')}Sebelumnya</button>` : '<span></span>'}<button class="btn teal" id="kn" ${answered ? '' : 'disabled style="opacity:.45"'}>${last ? 'Lihat Hasil Kuis' : 'Soal Berikutnya'}${I('right')}</button></div>`;
    } else {
      const skor = p.skor != null ? p.skor : skorNow();
      const salah = Q.filter(x => p.pg[x.id] !== x.k);
      body = `<div class="card" style="max-width:720px"><h2>Kuis selesai!</h2><p style="font-size:30px;font-weight:800;margin:6px 0">${skor * 10} <span class="small muted" style="font-weight:600">nilai · ${skor} dari ${n} soal benar</span></p>
<p class="small muted">${skor === n ? 'Luar biasa, semua benar! Kamu sudah memahami rangkaian seri dan paralel.' : skor >= 7 ? 'Bagus! Baca lagi pembahasan soal yang masih salah di bawah ini.' : 'Tidak apa-apa. Baca pembahasan di bawah, coba lagi lensa di tahap Explain, lalu ulangi kuisnya.'}</p>
${salah.length ? `<div class="stack" style="margin-top:12px">${salah.map(q => `<div class="fb no" style="margin:0"><b>Soal ${Q.indexOf(q) + 1}.</b> ${esc(q.q)}<div style="margin-top:4px">Jawaban benar: <b>${L[q.k]}. ${esc(q.o[q.k])}</b></div><div style="margin-top:4px">${esc(q.bahas)}</div></div>`).join('')}</div>` : ''}
<div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap"><button class="btn sec" id="ulangk">${I('reset')}Ulangi Kuis</button><button class="btn pri" data-go="menu">Ke Menu</button></div></div>`;
    }
    const o = { active: 'kuis', crumb: `Langkah ${numOf('kuis')} · Belajar Mandiri`, title: 'Kuis Latihan: Cek Pemahamanmu', body, next: { ok: !!p.done, t: 'Ke Menu', fn: () => go('menu'), why: 'Selesaikan kuis dulu.' } };
    $app.innerHTML = shell(o); bindShell(o);
    $app.querySelectorAll('[data-oi]').forEach(b => b.onclick = () => { p.pg[Q[qi].id] = +b.dataset.oi; V._kq = qi; save(); render(); });
    const kp = document.getElementById('kp'); if (kp) kp.onclick = () => { V._kq = qi - 1; render(); };
    const kn = document.getElementById('kn'); if (kn) kn.onclick = () => {
      if (qi < n - 1) { V._kq = qi + 1; render(); return; }
      p.skor = skorNow(); p.tries = (p.tries || 0) + 1;
      if (p.first == null) { p.first = p.skor; p.firstAns = Object.assign({}, p.pg); }
      p.done = true; save(); sync('kuis', { skor: p.skor }); V._kq = n; render();
    };
    const ul = document.getElementById('ulangk'); if (ul) ul.onclick = () => { p.pg = {}; p.skor = null; V._kq = 0; save(); render(); };
  };


  V.referensi = function () {
    const g = D.pengembang;
    const o = { active: 'referensi', crumb: 'Referensi', title: 'Referensi &amp; Profil Pengembang', back: 'menu', next: { ok: true, t: 'Ke Menu', fn: () => go('menu') },
      body: `<div class="grid2" style="grid-template-columns:1.4fr 1fr"><div class="card"><h2>Sumber media dan materi</h2>${D.referensi.map((r, i) => `<div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--line);font-size:14px"><b style="color:var(--teal-d)">[${i + 1}]</b><span>${esc(r.t)}${r.url ? ` <a href="${r.url}" target="_blank" rel="noopener">Buka</a>` : ''}</span></div>`).join('')}</div>
<div class="card" style="text-align:center"><img src="${g.foto}" alt="Foto ${esc(g.nama)}" style="width:130px;height:130px;border-radius:50%;object-fit:cover;margin:6px auto 12px"><b style="font-size:18px">${esc(g.nama)}</b><p class="muted small" style="margin-top:4px">NIM ${esc(g.nim)}<br>${esc(g.prodi)}</p></div></div>` };
    $app.innerHTML = shell(o); bindShell(o);
  };

  /* ---------- router ---------- */
  const PUBLIC = ['beranda', 'identitas'];
  function render() {
    const v = (location.hash || '#beranda').slice(1) || 'beranda';
    killLab();
    window.scrollTo(0, 0);
    if (!V[v] || v.startsWith('_')) { go('beranda'); return; }
    if (!PUBLIC.includes(v) && !S.user) { go('identitas'); return; }
    if (v === 'identitas' && S.user) { go('menu'); return; }
    if (STEP[v]) {
      if (!steps().includes(v)) { go('menu'); return; }
      if (!unlocked(v)) { const nt = nextTodo(); toast(`Langkah <b>${STEP[v].lbl}</b> masih terkunci.`); go(nt); return; }
    }
    if (V._last !== v) { V._qi = 0; V._kq = null; V._bahas = false; }
    V._last = v;
    V[v]();
    const h = $app.querySelector('h1'); if (h) h.setAttribute('tabindex', '-1');
  }
  load();
  window.addEventListener('hashchange', render);
  render();
  setTimeout(flush, 1500);
})();
