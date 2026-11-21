/* LISTRIKU — Lab rangkaian 3D (tahap 3)
   Model: baterai ideal (1,5 V per sel), lampu identik berhambatan tetap, alat ukur ideal.
   Batas: lampu putus bila tegangannya > 4,5 V; sekring amperemeter putus bila arus > 1 A. */
(function () {
  'use strict';
  const T = window.THREE;
  const VMAX_L = 4.5, AMAX = 1, Y = 0.14;
  const LOOP = [[-4, -1.4], [-4, -2.5], [4, -2.5], [4, 2.5], [-4, 2.5], [-4, 1.4]];
  const G = {
    seri: { lamps: { L1: [-1.3, -2.5, 'x'], L2: [1.7, -2.5, 'x'] }, sw: [0.5, 2.5],
      paths: [{ pts: LOOP, needs: ['L1', 'L2'] }],
      wires: [[[-4, -1.4], [-4, -2.5], 'A'], [[-4, -2.5], [-1.75, -2.5], 'A'], [[-0.85, -2.5], [1.25, -2.5], 'B'], [[2.15, -2.5], [4, -2.5], 'C'], [[4, -2.5], [4, 2.5], 'C'], [[4, 2.5], [0.95, 2.5], 'C'], [[0.05, 2.5], [-4, 2.5], 'D'], [[-4, 2.5], [-4, 1.4], 'D']],
      amm: { utama: [-2.9, -2.5, 'x', 'A'], antara: [0.2, -2.5, 'x', 'B'], setelah: [4, 0.4, 'z', 'C'] },
      ammNames: { utama: 'Sebelum L1', antara: 'Di antara L1 dan L2', setelah: 'Setelah L2' }, cnt: { in: [0.15, -2.5], out: [-2.75, -2.5] } },
    paralel: { lamps: { L1: [0, 0, 'z'], L2: [4, 0, 'z'] }, sw: [-2, 2.5],
      paths: [{ pts: [[-4, -1.4], [-4, -2.5], [0, -2.5], [0, 2.5], [-4, 2.5], [-4, 1.4]], needs: ['L1'] }, { pts: LOOP, needs: ['L2'] }],
      wires: [[[-4, -1.4], [-4, -2.5], 'T'], [[-4, -2.5], [4, -2.5], 'T'], [[0, -2.5], [0, -0.45], 'T'], [[4, -2.5], [4, -0.45], 'T'], [[0, 0.45], [0, 2.5], 'B'], [[4, 0.45], [4, 2.5], 'B'], [[4, 2.5], [0, 2.5], 'B'], [[0, 2.5], [-1.55, 2.5], 'B'], [[-2.45, 2.5], [-4, 2.5], 'N'], [[-4, 2.5], [-4, 1.4], 'N']],
      amm: { utama: [-2.6, -2.5, 'x', 'T'], cabang1: [0, 1.5, 'z', 'B'], cabang2: [4, 1.5, 'z', 'B'] },
      ammNames: { utama: 'Kabel utama', cabang1: 'Cabang L1', cabang2: 'Cabang L2' }, cnt: { in: [0.85, 1.05], out: [0.85, -1.05] } }
  };
  const fmt = (x, d = 2) => (Math.round(x * Math.pow(10, d)) / Math.pow(10, d)).toLocaleString('id-ID');
  const C = h => new T.Color(h).convertSRGBToLinear();
  const v3 = (p, y = Y) => new T.Vector3(p[0], y, p[1]);

  function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.anisotropy = 4; return t; }
  function mkPath(pts) {
    const P = pts.map(p => v3(p, Y + 0.16)), seg = []; let L = 0;
    for (let i = 0; i < P.length - 1; i++) { const l = P[i].distanceTo(P[i + 1]); seg.push([P[i], P[i + 1], L, l]); L += l; }
    const find = d => { d = ((d % L) + L) % L; for (const s of seg) if (d <= s[2] + s[3]) return [s, d]; return [seg[seg.length - 1], L]; };
    return { L, at(d, out) { const [s, dd] = find(d); return (out || new T.Vector3()).copy(s[0]).lerp(s[1], (dd - s[2]) / s[3]); }, dir(d) { const [s] = find(d); return s[1].clone().sub(s[0]).normalize(); } };
  }

  function create(container, opts) {
    opts = opts || {};
    const view = opts.view || 'observe';
    const mobile = window.matchMedia('(max-width: 860px)').matches || (navigator.hardwareConcurrency || 4) <= 4 && /Android|iPhone|iPad/i.test(navigator.userAgent);
    const st = { mode: 'seri', sw: true, cells: 2, R: 10, removed: { L1: false, L2: false }, burnt: { L1: false, L2: false }, ammPos: 'none', ammBrk: false, vmPos: 'none', lens: view === 'observe' ? 'tanpa' : 'elektron', slow: false };
    const stats = { aksi: 0, rusak: 0, posA: {}, mode: {} };

    /* ---------- renderer ---------- */
    const wrap = document.createElement('div'); wrap.className = 'l3-wrap'; container.appendChild(wrap);
    const W = () => Math.max(200, wrap.clientWidth), H = () => Math.max(200, wrap.clientHeight);
    const renderer = new T.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(mobile ? 1.5 : 2, window.devicePixelRatio || 1));
    renderer.setSize(W(), H());
    renderer.outputEncoding = T.sRGBEncoding; renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = !mobile; renderer.shadowMap.type = T.PCFSoftShadowMap;
    wrap.appendChild(renderer.domElement);
    const lr = new T.CSS2DRenderer(); lr.setSize(W(), H()); lr.domElement.className = 'l3-labels'; wrap.appendChild(lr.domElement);
    const zc = document.createElement('canvas'); zc.width = 440; zc.height = 280; zc.className = 'l3-zoom'; wrap.appendChild(zc); const zx = zc.getContext('2d');

    const scene = new T.Scene();
    scene.background = C(0xDCE2EC);
    scene.fog = new T.Fog(C(0xDCE2EC), 24, 46);
    const cam = new T.PerspectiveCamera(36, W() / H(), 0.1, 200);
    const ctr = new T.OrbitControls(cam, lr.domElement);
    ctr.enableDamping = true; ctr.maxPolarAngle = 1.42; ctr.minDistance = 6; ctr.maxDistance = 26; ctr.enablePan = false;
    function frameCam() { const a = W() / H(); cam.aspect = a; if (a < 1.3) { cam.position.set(0, 16.5, 8.2); ctr.target.set(0, 0, 0.5); } else { const k = a < 1.6 ? 0.98 : 0.84; cam.position.set(0, 10.2 * k, 10.6 * k); ctr.target.set(0, 0, 0); } cam.updateProjectionMatrix(); }
    frameCam();

    // environment for reflections
    const pmrem = new T.PMREMGenerator(renderer);
    const envScene = new T.Scene();
    const envBox = new T.Mesh(new T.BoxGeometry(30, 15, 30), new T.MeshBasicMaterial({ color: C(0x8C93A3), side: T.BackSide })); envScene.add(envBox);
    [[0, 7, 0, 10, 10], [-12, 3, 5, 5, 8], [12, 4, -5, 5, 8]].forEach(([x, y, z, w, h]) => { const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: C(0xffffff), side: T.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); envScene.add(m); });
    const envTex = pmrem.fromScene(envScene, 0.04).texture;

    scene.add(new T.HemisphereLight(0xffffff, 0x9AA3B5, 0.55));
    const sun = new T.DirectionalLight(0xffffff, 0.9); sun.position.set(5, 12, 7); sun.castShadow = !mobile;
    sun.shadow.mapSize.set(1024, 1024); Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 7, bottom: -7, near: 1, far: 30 }); sun.shadow.bias = -0.0008; sun.shadow.radius = 4;
    scene.add(sun);

    let composer = null;
    if (!mobile && !window.LAB_NOBLOOM && T.EffectComposer && T.UnrealBloomPass) {
      composer = new T.EffectComposer(renderer); composer.setSize(W(), H());
      composer.addPass(new T.RenderPass(scene, cam));
      composer.addPass(new T.UnrealBloomPass(new T.Vector2(W(), H()), 0.55, 0.45, 0.88));
    }

    /* ---------- materials ---------- */
    const M = {
      copper: new T.MeshStandardMaterial({ color: C(0xD9814A), metalness: 1, roughness: 0.32 }),
      steel: new T.MeshStandardMaterial({ color: C(0xC9CDD4), metalness: 1, roughness: 0.25 }),
      brass: new T.MeshStandardMaterial({ color: C(0xC9A24A), metalness: 1, roughness: 0.3 }),
      blackPl: new T.MeshStandardMaterial({ color: C(0x1E2126), roughness: 0.55 }),
      beigePl: new T.MeshStandardMaterial({ color: C(0xE9E1D0), roughness: 0.6 }),
      redPl: new T.MeshStandardMaterial({ color: C(0xC8352E), roughness: 0.45 }),
      ins0: 0, ins: { A: 0xD0342C, T: 0xD0342C, B: 0x2F6FC0, C: 0x2F6FC0, D: 0x23262B, N: 0x23262B }
    };
    [M.copper, M.steel, M.brass].forEach(m => { m.envMap = envTex; m.envMapIntensity = 0.9; });
    const insMat = {}; const getIns = (col) => insMat[col] || (insMat[col] = new T.MeshStandardMaterial({ color: C(col), roughness: 0.55, metalness: 0 }));

    /* ---------- static desk ---------- */
    const wood = canvasTex(1024, 512, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#9B6B43'); g.addColorStop(1, '#8A5C38'); x.fillStyle = g; x.fillRect(0, 0, w, h); for (let i = 0; i < 140; i++) { x.strokeStyle = `rgba(${60 + Math.random() * 40},${35 + Math.random() * 20},20,${0.08 + Math.random() * 0.12})`; x.lineWidth = 1 + Math.random() * 3; x.beginPath(); const y0 = Math.random() * h; x.moveTo(0, y0); for (let k = 0; k <= 10; k++) x.lineTo(k * w / 10, y0 + Math.sin(k * 0.8 + i) * 6 + Math.random() * 4); x.stroke(); } });
    wood.wrapS = wood.wrapT = T.RepeatWrapping; wood.repeat.set(2, 2);
    const desk = new T.Mesh(new T.BoxGeometry(40, 0.6, 26), new T.MeshStandardMaterial({ map: wood, roughness: 0.65 })); desk.position.y = -0.62; desk.receiveShadow = true; scene.add(desk);
    const matTex = canvasTex(1024, 680, (x, w, h) => { x.fillStyle = '#1F5C52'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(255,255,255,0.10)'; x.lineWidth = 1; for (let i = 0; i <= w; i += 32) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, h); x.stroke(); } for (let j = 0; j <= h; j += 32) { x.beginPath(); x.moveTo(0, j); x.lineTo(w, j); x.stroke(); } x.strokeStyle = 'rgba(255,255,255,0.22)'; for (let i = 0; i <= w; i += 160) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, h); x.stroke(); } for (let j = 0; j <= h; j += 160) { x.beginPath(); x.moveTo(0, j); x.lineTo(w, j); x.stroke(); } x.fillStyle = 'rgba(255,255,255,0.35)'; x.font = '600 18px sans-serif'; x.fillText('LISTRIKU · LAB RANGKAIAN', 24, h - 22); });
    const mat = new T.Mesh(new T.BoxGeometry(13, 0.06, 8.4), new T.MeshStandardMaterial({ map: matTex, roughness: 0.85 })); mat.position.y = -0.29; mat.receiveShadow = true; scene.add(mat);

    const HALO = canvasTex(128, 128, (x, w, h) => { const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, 'rgba(255,240,200,1)'); g.addColorStop(0.25, 'rgba(255,200,110,.55)'); g.addColorStop(1, 'rgba(255,180,80,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    let dyn = new T.Group(); scene.add(dyn);
    let labels = [], bulbs = [], clickables = [], flows = [], arrows = [], counters = null, cntVal = 0, lampFx = {}, sparks = null, elecMesh = null, flashL = new T.PointLight(0xffffff, 0, 7);
    scene.add(flashL); let flashT = 0;

    function label(text, cls, pos, parent) {
      const d = document.createElement('div'); d.className = 'l3-lbl ' + (cls || ''); d.innerHTML = text;
      const o = new T.CSS2DObject(d); o.position.copy(pos); (parent || dyn).add(o); labels.push(o); return o;
    }
    function add(mesh, shadow = true) { mesh.castShadow = shadow && !mobile; mesh.receiveShadow = !mobile; dyn.add(mesh); return mesh; }
    function cyl(A, B, r, mat, seg = 12) { const len = A.distanceTo(B); if (len < 0.01) return null; const m = new T.Mesh(new T.CylinderGeometry(r, r, len, seg), mat); m.position.copy(A).add(B).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), B.clone().sub(A).normalize()); return add(m); }
    function box(w, h, d, mat, x, y, z) { const m = new T.Mesh(new T.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); return add(m); }

    /* ---------- physics ---------- */
    function solve() {
      const V = st.cells * 1.5, R = st.R, op = k => st.removed[k] || st.burnt[k];
      const r = { V, R, I: 0, L: { L1: { V: 0, I: 0 }, L2: { V: 0, I: 0 } }, amm: null, vm: null, flows: [], pot: {} };
      if (st.mode === 'seri') {
        const ao = st.ammPos !== 'none' && st.ammBrk;
        const closed = st.sw && !op('L1') && !op('L2') && !ao;
        const I = closed ? V / (2 * R) : 0; r.I = I;
        ['L1', 'L2'].forEach(k => r.L[k] = { V: op(k) ? 0 : I * R, I });
        if (st.ammPos !== 'none') r.amm = ao ? null : I;
        if (st.vmPos === 'baterai') r.vm = V;
        else if (st.vmPos !== 'none') { const k = st.vmPos, o = k === 'L1' ? 'L2' : 'L1'; r.vm = !op(k) ? I * R : ((st.sw && !op(o) && !ao) ? V : 0); }
        if (closed) { r.flows.push({ p: 0, I }); r.pot = { A: V, B: V / 2, C: 0, D: 0 }; }
        else {
          const pieces = ['A', 'B', 'C', 'D'];
          const opens = []; if (ao) opens.push({ utama: 0, antara: 1, setelah: 2 }[st.ammPos] - 0.5); if (op('L1')) opens.push(0); if (op('L2')) opens.push(1); if (!st.sw) opens.push(2);
          const f = Math.min(...opens), l = Math.max(...opens);
          pieces.forEach((p, i) => r.pot[p] = i <= f ? V : (i > l ? 0 : null));
        }
      } else {
        const co = !st.sw || (st.ammPos === 'utama' && st.ammBrk);
        ['L1', 'L2'].forEach((k, i) => { const bo = st.ammPos === 'cabang' + (i + 1) && st.ammBrk; const I = (!co && !op(k) && !bo) ? V / R : 0; r.L[k] = { V: I > 0 ? V : 0, I }; r.I += I; if (I > 0) r.flows.push({ p: i, I }); });
        if (st.ammPos === 'utama') r.amm = st.ammBrk ? null : r.I; else if (st.ammPos === 'cabang1') r.amm = st.ammBrk ? null : r.L.L1.I; else if (st.ammPos === 'cabang2') r.amm = st.ammBrk ? null : r.L.L2.I;
        if (st.vmPos === 'baterai') r.vm = V;
        else if (st.vmPos !== 'none') { const k = st.vmPos, i = k === 'L1' ? 1 : 2; r.vm = co ? 0 : ((st.ammPos === 'cabang' + i && st.ammBrk && !op(k)) ? 0 : V); }
        const any = !op('L1') || !op('L2');
        r.pot = { T: V, B: st.sw ? 0 : (any ? V : null), N: 0 };
      }
      return r;
    }
    let R0 = null;
    function update(reason) {
      let r = solve(); const msgs = [];
      for (let it = 0; it < 3; it++) {
        let ch = false;
        for (const k of ['L1', 'L2']) { if (!st.burnt[k] && !st.removed[k] && r.L[k].V > VMAX_L + 1e-9) { st.burnt[k] = true; ch = true; stats.rusak++; msgs.push({ k: 'lampu', t: `Lampu ${k} putus! Tegangannya ${fmt(r.L[k].V, 1)} V, melebihi batas 4,5 V.` }); flashAt(G[st.mode].lamps[k]); break; } }
        if (!ch && st.ammPos !== 'none' && !st.ammBrk && r.amm !== null && r.amm > AMAX + 1e-9) { st.ammBrk = true; ch = true; stats.rusak++; msgs.push({ k: 'amm', t: `Sekring amperemeter putus! Arus ${fmt(r.amm)} A melebihi batas ukur 1 A.` }); flashAt(G[st.mode].amm[st.ammPos]); }
        if (!ch) break; r = solve();
      }
      R0 = r; build(r);
      msgs.forEach(m => opts.onEvent && opts.onEvent('rusak', m));
      opts.onChange && opts.onChange(readings());
    }
    function flashAt(p) { flashL.position.set(p[0], 1.4, p[1]); flashT = 0.5; }
    function readings() { const r = R0; return { mode: st.mode, sw: st.sw, cells: st.cells, V: r.V, R: st.R, I: r.I, L1: r.L.L1, L2: r.L.L2, amm: { pos: st.ammPos, name: G[st.mode].ammNames[st.ammPos] || '', val: r.amm, brk: st.ammBrk }, vm: { pos: st.vmPos, val: r.vm }, burnt: { ...st.burnt }, removed: { ...st.removed }, lens: st.lens, stats: JSON.parse(JSON.stringify(stats)) }; }

    /* ---------- builders ---------- */
    function disposeDyn() {
      labels.forEach(o => { if (o.element.parentNode) o.element.parentNode.removeChild(o.element); }); labels = [];
      dyn.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material && o.material.userData && o.material.userData.own) o.material.dispose(); });
      scene.remove(dyn); dyn = new T.Group(); scene.add(dyn);
      bulbs = []; clickables = []; flows = []; arrows = []; counters = null; lampFx = {}; sparks = null; elecMesh = null;
    }
    function cutWires(list) {
      const g = G[st.mode], ap = st.ammPos !== 'none' ? g.amm[st.ammPos] : null; if (!ap) return list;
      const out = [];
      list.forEach(([a, b, pc]) => {
        const horiz = a[1] === b[1], on = horiz ? (ap[2] === 'x' && Math.abs(ap[1] - a[1]) < 1e-6 && ap[0] > Math.min(a[0], b[0]) && ap[0] < Math.max(a[0], b[0])) : (ap[2] === 'z' && Math.abs(ap[0] - a[0]) < 1e-6 && ap[1] > Math.min(a[1], b[1]) && ap[1] < Math.max(a[1], b[1]));
        if (!on) { out.push([a, b, pc]); return; }
        const k = horiz ? 0 : 1, s = Math.sign(b[k] - a[k]), c = horiz ? ap[0] : ap[1];
        const p1 = horiz ? [c - s * 0.5, a[1]] : [a[0], c - s * 0.5], p2 = horiz ? [c + s * 0.5, a[1]] : [a[0], c + s * 0.5];
        out.push([a, p1, pc]); out.push([p2, b, pc]);
      });
      return out;
    }
    const LO = C(0x378ADD), HI = C(0xF0773B), GR = C(0x8A8F99);
    function potColor(p, V) { return p == null ? GR.clone() : LO.clone().lerp(HI, V > 0 ? p / V : 0); }

    function buildWires(r) {
      const tg = st.lens === 'tegangan';
      const ws = cutWires(G[st.mode].wires);
      const joints = new Set();
      ws.forEach(([a, b, pc]) => {
        let mat;
        if (tg) { const c = potColor(r.pot[pc], r.V); mat = new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.06, roughness: 0.4 }); mat.userData.own = true; }
        else mat = getIns(M.ins[pc]);
        cyl(v3(a), v3(b), tg ? 0.085 : 0.07, mat, 14);
        [a, b].forEach(p => { const key = p.join(','); if (joints.has(key)) { const s = new T.Mesh(new T.SphereGeometry(tg ? 0.085 : 0.07, 12, 10), mat); s.position.copy(v3(p)); add(s); } joints.add(key); });
        // copper tips at open ends (component terminals)
      });
      if (tg) { const seen = {}; ws.forEach(([a, b, pc]) => { if (seen[pc]) return; seen[pc] = 1; const p = r.pot[pc]; const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; label(p == null ? '? V' : fmt(p, 1) + ' V', p == null ? 'pot-n' : p > r.V * 0.66 ? 'pot-h' : p > 0 ? 'pot-m' : 'pot-l', v3(mid, 0.75)); }); }
    }
    function buildBattery(r) {
      const n = st.cells, cols = Math.ceil(n / 2), rows = n > 1 ? 2 : 1;
      const cw = 0.42, w = cols * cw + 0.16, d = rows === 2 ? 2.75 : 1.45, cx = -4.35;
      const g = new T.Group(); g.position.set(cx, 0, 0); dyn.add(g);
      const base = new T.Mesh(new T.BoxGeometry(w, 0.12, d), M.blackPl); base.position.y = -0.2; base.castShadow = base.receiveShadow = !mobile; g.add(base);
      [[w, 0.3, 0.06, 0, -d / 2], [w, 0.3, 0.06, 0, d / 2], [0.06, 0.3, d, -w / 2, 0], [0.06, 0.3, d, w / 2, 0]].forEach(([a, b, c, x, z]) => { const m = new T.Mesh(new T.BoxGeometry(a, b, c), M.blackPl); m.position.set(x, -0.04, z); m.castShadow = !mobile; g.add(m); });
      const labelTex = canvasTex(256, 128, (x, W2, H2) => { const gr = x.createLinearGradient(0, 0, 0, H2); gr.addColorStop(0, '#1A9C8E'); gr.addColorStop(1, '#0E6E64'); x.fillStyle = gr; x.fillRect(0, 0, W2, H2); x.fillStyle = '#FFC93C'; x.fillRect(W2 * 0.72, 0, W2 * 0.28, H2); x.fillStyle = '#fff'; x.font = '800 44px sans-serif'; x.save(); x.translate(W2 * 0.36, H2 / 2 + 16); x.fillText('1,5 V', -60, 0); x.restore(); });
      const cellMat = new T.MeshStandardMaterial({ map: labelTex, roughness: 0.35, metalness: 0.2 }); cellMat.userData.own = true;
      for (let i = 0; i < n; i++) {
        const col = Math.floor(i / rows), row = i % rows;
        const x = -w / 2 + 0.08 + cw / 2 + col * cw, z = rows === 2 ? (row === 0 ? -0.66 : 0.66) : 0;
        const c = new T.Mesh(new T.CylinderGeometry(0.17, 0.17, 1.2, 28), cellMat); c.rotation.x = Math.PI / 2; c.rotation.y = 0; c.position.set(x, 0.0, z); c.castShadow = !mobile; g.add(c);
        const cap = new T.Mesh(new T.CylinderGeometry(0.17, 0.17, 0.05, 28), M.steel); cap.rotation.x = Math.PI / 2; cap.position.set(x, 0, z + 0.62); g.add(cap);
        const nub = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 0.07, 16), M.steel); nub.rotation.x = Math.PI / 2; nub.position.set(x, 0, z - 0.63); g.add(nub);
      }
      // terminals & leads to wire ends
      cyl(new T.Vector3(cx + w / 2 - 0.12, Y, -d / 2 + 0.05), v3([-4, -1.4]), 0.07, getIns(M.ins.A));
      cyl(new T.Vector3(cx + w / 2 - 0.12, Y, d / 2 - 0.05), v3([-4, 1.4]), 0.07, getIns(M.ins.D));
      label('+', 'term-p', new T.Vector3(cx + w / 2 + 0.35, 0.55, -d / 2 + 0.1));
      label('−', 'term-n', new T.Vector3(cx + w / 2 + 0.35, 0.55, d / 2 - 0.1));
      label(`Baterai ${fmt(r.V, 1)} V`, 'name', new T.Vector3(cx, 0.9, -d / 2 - 0.35));
    }
    function buildSwitch() {
      const [sx, sz] = G[st.mode].sw;
      box(1.1, 0.14, 0.62, M.beigePl, sx, -0.19, sz);
      [-0.38, 0.38].forEach(dx => { cyl(new T.Vector3(sx + dx, -0.12, sz), new T.Vector3(sx + dx, 0.2, sz), 0.07, M.brass); });
      const pivot = new T.Group(); pivot.position.set(sx - 0.38, 0.18, sz); dyn.add(pivot);
      const blade = new T.Mesh(new T.BoxGeometry(0.85, 0.05, 0.1), M.copper); blade.position.x = 0.42; blade.castShadow = !mobile; pivot.add(blade);
      const handle = new T.Mesh(new T.CylinderGeometry(0.06, 0.06, 0.32, 12), M.redPl); handle.rotation.z = Math.PI / 2; handle.position.set(0.86, 0.06, 0); pivot.add(handle);
      pivot.rotation.z = st.sw ? 0 : 0.85;
      const hit = new T.Mesh(new T.BoxGeometry(1.2, 0.8, 0.8), new T.MeshBasicMaterial({ visible: false })); hit.position.set(sx, 0.2, sz); hit.userData.act = 'sw'; dyn.add(hit); clickables.push(hit);
      label(st.sw ? 'Saklar tertutup' : 'Saklar terbuka', 'small', new T.Vector3(sx, 0.85, sz + 0.65));
    }
    function lampLabel(k, r) {
      const P = r.L[k].V * r.L[k].I;
      if (st.burnt[k]) return [`${k} PUTUS`, 'bad'];
      if (st.removed[k]) return [`${k} dilepas`, 'bad'];
      switch (st.lens) {
        case 'arus': return [`I = ${fmt(r.L[k].I)} A`, 'cur'];
        case 'tegangan': return [`turun ${fmt(r.L[k].V, 1)} V`, 'name'];
        case 'energi': return [`daya ${fmt(P)} W`, 'cur'];
        case 'elektron': case 'zoom': case 'tanpa': default: return [k, 'name'];
      }
    }
    function buildLamps(r) {
      const g = G[st.mode];
      for (const k in g.lamps) {
        const [x, z, dir] = g.lamps[k];
        const lg = new T.Group(); lg.position.set(x, 0, z); if (dir === 'z') lg.rotation.y = Math.PI / 2; dyn.add(lg);
        const plate = new T.Mesh(new T.BoxGeometry(1.0, 0.14, 0.7), M.beigePl); plate.position.y = -0.19; plate.castShadow = plate.receiveShadow = !mobile; lg.add(plate);
        [-0.4, 0.4].forEach(dx => { const t = new T.Mesh(new T.CylinderGeometry(0.075, 0.075, 0.3, 12), M.brass); t.position.set(dx, -0.02, 0); lg.add(t); });
        const sock = new T.Mesh(new T.CylinderGeometry(0.21, 0.24, 0.36, 24), M.steel); sock.position.y = 0.06; sock.castShadow = !mobile; lg.add(sock);
        const ring = new T.Mesh(new T.CylinderGeometry(0.25, 0.25, 0.08, 24), M.blackPl); ring.position.y = -0.1; lg.add(ring);
        const hit = new T.Mesh(new T.SphereGeometry(0.55, 12, 8), new T.MeshBasicMaterial({ visible: false })); hit.position.y = 0.65; hit.userData.lamp = k; lg.add(hit); bulbs.push(hit);
        const P = r.L[k].V * r.L[k].I, Pn = 9 / st.R; const b = st.burnt[k] || st.removed[k] ? 0 : Math.min(1.7, P / Pn);
        if (!st.removed[k]) {
          const glassMat = new T.MeshPhysicalMaterial({ color: st.burnt[k] ? 0x5A524A : 0xFFFFFF, roughness: 0.04, metalness: 0, transparent: true, opacity: st.burnt[k] ? 0.75 : 0.28 + b * 0.12, clearcoat: 1, clearcoatRoughness: 0.05, emissive: C(0xFFC56B), emissiveIntensity: b * 0.9, envMap: envTex, envMapIntensity: 1.2, depthWrite: false }); glassMat.userData.own = true;
          const glass = new T.Mesh(new T.SphereGeometry(0.38, 32, 24), glassMat); glass.position.y = 0.66; lg.add(glass);
          const neck = new T.Mesh(new T.CylinderGeometry(0.17, 0.21, 0.2, 24, 1, true), glassMat); neck.position.y = 0.32; lg.add(neck);
          // filament coil
          const pts = []; for (let i = 0; i <= 80; i++) { const a = i / 80 * Math.PI * 10; pts.push(new T.Vector3(-0.13 + i / 80 * 0.26, 0.66 + Math.sin(a) * 0.022, Math.cos(a) * 0.022)); }
          const fMat = new T.MeshStandardMaterial({ color: b > 0 ? 0xFFF1C9 : 0x5B5751, emissive: C(0xFFC56B), emissiveIntensity: b > 0 ? 1.2 + b * 3.2 : 0, roughness: 0.5 }); fMat.userData.own = true;
          if (!st.burnt[k]) { const fil = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 80, 0.008, 6), fMat); lg.add(fil); }
          else { const h1 = pts.slice(0, 34), h2 = pts.slice(46); [h1, h2].forEach((pp, j) => { const f = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pp.map(p => p.clone().add(new T.Vector3(0, -0.03 * (j ? 1 : 0.6), 0)))), 30, 0.008, 6), fMat); lg.add(f); }); }
          [-0.13, 0.13].forEach(dx => { const sw = new T.Mesh(new T.CylinderGeometry(0.006, 0.006, 0.36, 6), M.steel); sw.position.set(dx, 0.48, 0); lg.add(sw); });
          if (b > 0) { const pl = new T.PointLight(0xFFC56B, b * 1.9, 5.5, 2); pl.position.y = 0.7; lg.add(pl);
            const hm = new T.SpriteMaterial({ map: HALO, color: 0xFFD27A, transparent: true, opacity: Math.min(0.95, 0.35 + b * 0.45), blending: T.AdditiveBlending, depthWrite: false }); hm.userData.own = true;
            const halo = new T.Sprite(hm); const hs = 1.1 + b * 1.1; halo.scale.set(hs, hs, 1); halo.position.y = 0.66; lg.add(halo); }
          lampFx[k] = { P, b, pos: new T.Vector3(x, 0.66, z) };
        }
        const [t, c] = lampLabel(k, r); label(t, c, new T.Vector3(0, 1.45, 0), lg);
        if (st.lens === 'zoom' && k === 'L1') { const ringZ = new T.Mesh(new T.TorusGeometry(0.62, 0.035, 8, 48), new T.MeshBasicMaterial({ color: C(0xFFC93C) })); ringZ.position.y = 0.66; ringZ.rotation.x = Math.PI / 2; lg.add(ringZ); }
      }
    }
    function meter(pos, dir, kind, val, broken) {
      const g = new T.Group(); g.position.copy(pos); if (dir === 'z') g.rotation.y = Math.PI / 2; dyn.add(g);
      const bodyMat = new T.MeshStandardMaterial({ color: C(kind === 'A' ? 0xF2B33D : 0x7A6CF0), roughness: 0.55 }); bodyMat.userData.own = true;
      const body = new T.Mesh(new T.BoxGeometry(0.95, 0.32, 0.78), bodyMat); body.position.y = -0.06; body.castShadow = !mobile; g.add(body);
      const face = new T.Mesh(new T.BoxGeometry(0.8, 0.04, 0.62), M.blackPl); face.position.y = 0.11; g.add(face);
      const txt = broken ? 'ERR' : val == null ? '- - -' : fmt(val) + (kind === 'A' ? ' A' : ' V');
      const lcd = canvasTex(256, 96, (x, w, h) => { x.fillStyle = broken ? '#5A2222' : '#B8D8B0'; x.fillRect(0, 0, w, h); x.fillStyle = broken ? '#FF8A8A' : '#132A12'; x.font = '700 54px "Courier New",monospace'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, w / 2, h / 2 + 2); });
      const lm = new T.MeshBasicMaterial({ map: lcd, toneMapped: false }); lm.userData.own = true;
      const scr = new T.Mesh(new T.PlaneGeometry(0.66, 0.25), lm); scr.rotation.x = -Math.PI / 2; scr.position.set(0, 0.135, -0.12); if (dir === 'z') scr.rotation.z = 0; g.add(scr);
      const dial = new T.Mesh(new T.CylinderGeometry(0.11, 0.11, 0.05, 20), M.blackPl); dial.position.set(0, 0.15, 0.17); g.add(dial);
      label(kind, kind === 'A' ? 'mA' : 'mV', new T.Vector3(0, 0.55, 0), g);
      return g;
    }
    function buildMeters(r) {
      const g = G[st.mode];
      if (st.ammPos !== 'none') { const ap = g.amm[st.ammPos]; meter(v3([ap[0], ap[1]], 0.02), ap[2], 'A', r.amm, st.ammBrk); }
      if (st.vmPos !== 'none') {
        let A, B, pos;
        if (st.vmPos === 'baterai') { A = [-4, -1.4]; B = [-4, 1.4]; pos = [-2.2, 0]; }
        else { const [x, z, d] = g.lamps[st.vmPos]; if (d === 'x') { A = [x - 0.4, z]; B = [x + 0.4, z]; pos = [x + 0.2, z + 1.5]; } else { A = [x, z - 0.4]; B = [x, z + 0.4]; pos = [x + 1.5, z]; } }
        meter(v3(pos, 0.02), 'x', 'V', r.vm, false);
        [[A, 0xD0342C], [B, 0x23262B]].forEach(([p, col], i) => {
          const start = new T.Vector3(pos[0] + (i ? 0.2 : -0.2), 0.12, pos[1] - 0.3), end = v3(p, 0.22);
          const mid = start.clone().lerp(end, 0.5); mid.y = 1.0;
          const curve = new T.QuadraticBezierCurve3(start, mid, end);
          const lm = getIns(col); const tube = new T.Mesh(new T.TubeGeometry(curve, 28, 0.03, 8), lm); tube.castShadow = !mobile; dyn.add(tube);
          const clip = new T.Mesh(new T.BoxGeometry(0.16, 0.08, 0.08), M.steel); clip.position.copy(end); dyn.add(clip);
        });
      }
    }
    function buildFlows(r) {
      const g = G[st.mode];
      const showE = ['elektron', 'energi', 'zoom'].includes(st.lens);
      const list = [];
      g.paths.forEach((p, pi) => {
        const fl = r.flows.find(f => f.p === pi);
        if (showE && (fl || (st.lens === 'elektron' && r.flows.length === 0 && (st.mode === 'seri' ? pi === 0 : true)))) {
          const P = mkPath(p.pts); const n = Math.round(P.L / 0.55);
          list.push({ P, n, v: fl ? Math.min(3.2, fl.I * 2.2) : 0, s: pi * 0.27, pi });
        }
        if (st.lens === 'arus' && fl) {
          const P = mkPath(p.pts); const sc = 0.75 + Math.min(1, fl.I) * 1.4;
          [2.2, 7.4, 12.6, 20.4].forEach(m => { if (m > P.L - 0.3) return; const cm = new T.MeshStandardMaterial({ color: C(0xFFB23F), emissive: C(0xFF9A1F), emissiveIntensity: 0.6, roughness: 0.4 }); cm.userData.own = true; const cone = new T.Mesh(new T.ConeGeometry(0.16 * sc, 0.42 * sc, 18), cm); cone.position.copy(P.at(m + pi * 0.6)).add(new T.Vector3(0, 0.45, 0)); cone.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), P.dir(m + pi * 0.6)); dyn.add(cone); arrows.push(cone); });
          if (pi === 0) label(`I total = ${fmt(r.I)} A`, 'cur', P.at(2.7).add(new T.Vector3(0, 0.95, -0.55)));
        }
      });
      flows = list;
      const total = list.reduce((a, f) => a + f.n, 0);
      if (total) {
        const em = new T.MeshStandardMaterial({ color: C(0x4D9BF0), emissive: C(0x2F7FE0), emissiveIntensity: st.lens === 'elektron' ? 1.4 : 0.6, transparent: st.lens !== 'elektron', opacity: st.lens === 'elektron' ? 1 : 0.5, roughness: 0.3 }); em.userData.own = true;
        elecMesh = new T.InstancedMesh(new T.SphereGeometry(0.095, 14, 10), em, total); elecMesh.instanceMatrix.setUsage(T.DynamicDrawUsage); dyn.add(elecMesh);
      }
      if (st.lens === 'elektron' && !st.removed.L1 && !st.burnt.L1) {
        const c = g.cnt; const dz = st.mode === 'seri' ? 0.75 : 0; counters = [label('Masuk L1: 0', 'cnt', v3([c.in[0], c.in[1] + dz], 0.5)), label('Keluar L1: 0', 'cnt', v3([c.out[0], c.out[1] + dz], 0.5))]; cntVal = 0;
      }
      if (st.lens === 'energi') {
        const N = 260; const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(new Float32Array(N * 3), 3));
        const pm = new T.PointsMaterial({ color: C(0xFFC93C), size: 0.09, transparent: true, opacity: 0.95, blending: T.AdditiveBlending, depthWrite: false }); pm.userData.own = true;
        sparks = { pts: new T.Points(geo, pm), life: new Float32Array(N), vel: new Float32Array(N * 3), N }; sparks.life.fill(0); dyn.add(sparks.pts);
      }
    }
    function build(r) {
      disposeDyn();
      buildWires(r); buildBattery(r); buildSwitch(); buildLamps(r); buildMeters(r); buildFlows(r);
      zc.style.display = st.lens === 'zoom' ? 'block' : 'none';
    }

    /* ---------- zoom inset ---------- */
    const atoms = []; for (let i = 0; i < 7; i++) for (let j = 0; j < 4; j++) atoms.push({ x: 40 + i * 60 + (j % 2) * 8, y: 45 + j * 62, ph: Math.random() * 6 });
    const zel = Array.from({ length: 24 }, () => ({ x: Math.random() * 440, y: Math.random() * 280, vx: 0, vy: 0 }));
    function drawZoom(dt, t) {
      const I = R0 ? R0.L.L1.I : 0, heat = Math.min(1, I / 0.3);
      zx.fillStyle = `rgb(${27 + heat * 70},${42 + heat * 10},${78 - heat * 35})`; zx.fillRect(0, 0, 440, 280);
      atoms.forEach(a => { const amp = 1.5 + heat * 5; a.cx = a.x + Math.sin(t * 14 + a.ph) * amp; a.cy = a.y + Math.cos(t * 12 + a.ph) * amp; zx.beginPath(); zx.arc(a.cx, a.cy, 13, 0, 7); zx.fillStyle = heat > 0.5 ? '#F0997B' : '#B4B2A9'; zx.fill(); });
      zel.forEach(e => {
        e.vx += (Math.random() - 0.5) * 90 * dt; e.vy += (Math.random() - 0.5) * 90 * dt; e.vx *= 0.96; e.vy *= 0.96;
        e.x += (e.vx - I * 260) * dt * 3; e.y += e.vy * dt * 3;
        atoms.forEach(a => { const dx = e.x - a.cx, dy = e.y - a.cy, d = Math.hypot(dx, dy); if (d < 18 && d > 0) { e.vx = dx / d * 60; e.vy = dy / d * 60; if (I > 0) { zx.beginPath(); zx.arc(a.cx, a.cy, 19, 0, 7); zx.strokeStyle = 'rgba(250,199,117,.85)'; zx.lineWidth = 3; zx.stroke(); } } });
        if (e.x < 0) e.x += 440; if (e.x > 440) e.x -= 440; if (e.y < 5) e.y = 275; if (e.y > 275) e.y = 5;
        zx.beginPath(); zx.arc(e.x, e.y, 6, 0, 7); zx.fillStyle = '#4D9BF0'; zx.fill(); zx.fillStyle = '#fff'; zx.font = '700 11px sans-serif'; zx.fillText('−', e.x - 3, e.y + 4);
      });
      zx.fillStyle = 'rgba(255,255,255,.95)'; zx.font = '600 18px sans-serif'; zx.fillText('Di dalam filamen L1', 12, 24);
    }

    /* ---------- interaction ---------- */
    const ray = new T.Raycaster(), mouse = new T.Vector2(); let down = null;
    lr.domElement.addEventListener('pointerdown', e => down = [e.clientX, e.clientY]);
    lr.domElement.addEventListener('pointerup', e => {
      if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
      const b = lr.domElement.getBoundingClientRect(); mouse.set((e.clientX - b.left) / b.width * 2 - 1, -(e.clientY - b.top) / b.height * 2 + 1);
      ray.setFromCamera(mouse, cam);
      const h = ray.intersectObjects(bulbs.concat(clickables), false);
      if (!h.length) return;
      const o = h[0].object;
      if (o.userData.lamp) { const k = o.userData.lamp; if (st.burnt[k]) { opts.onEvent && opts.onEvent('info', `Lampu ${k} sudah putus. Tekan "Ganti lampu" untuk memasang lampu baru.`); return; } st.removed[k] = !st.removed[k]; stats.aksi++; update('lamp'); }
      else if (o.userData.act === 'sw') { st.sw = !st.sw; stats.aksi++; update('sw'); }
    });

    /* ---------- loop ---------- */
    const dummy = new T.Object3D(), tmp = new T.Vector3();
    let raf = 0, last = performance.now(), tt = 0, cntT = 0, alive = true;
    function loop(now) {
      if (!alive) return;
      let dt = Math.min(0.05, (now - last) / 1000); last = now; if (st.slow) dt *= 0.3; tt += dt;
      if (elecMesh) {
        let idx = 0;
        flows.forEach(f => { f.s += f.v * dt; for (let i = 0; i < f.n; i++) { f.P.at(f.P.L - ((i * 0.55 + f.s) % f.P.L), tmp); dummy.position.copy(tmp); dummy.updateMatrix(); elecMesh.setMatrixAt(idx++, dummy.matrix); } });
        elecMesh.instanceMatrix.needsUpdate = true;
      }
      arrows.forEach(c => c.material.emissiveIntensity = 0.45 + 0.35 * Math.sin(tt * 4));
      if (counters) { const f = flows.find(f => f.pi === 0); cntVal += (f ? f.v / 0.55 : 0) * dt; cntT += dt; if (cntT > 0.2) { cntT = 0; const n = Math.floor(cntVal); counters[0].element.textContent = 'Masuk L1: ' + n; counters[1].element.textContent = 'Keluar L1: ' + n; } }
      if (sparks) {
        const pos = sparks.pts.geometry.attributes.position.array;
        const lit = Object.values(lampFx).filter(f => f.P > 0);
        for (let i = 0; i < sparks.N; i++) {
          if (sparks.life[i] <= 0) {
            const f = lit[i % Math.max(1, lit.length)];
            if (f && Math.random() < f.P * dt * 14) { sparks.life[i] = 1; pos[i * 3] = f.pos.x + (Math.random() - 0.5) * 0.15; pos[i * 3 + 1] = f.pos.y; pos[i * 3 + 2] = f.pos.z + (Math.random() - 0.5) * 0.15; sparks.vel[i * 3] = (Math.random() - 0.5) * 1.6; sparks.vel[i * 3 + 1] = 0.5 + Math.random() * 1.3; sparks.vel[i * 3 + 2] = (Math.random() - 0.5) * 1.6; }
            else { pos[i * 3 + 1] = -50; }
          } else { sparks.life[i] -= dt * 1.1; pos[i * 3] += sparks.vel[i * 3] * dt; pos[i * 3 + 1] += sparks.vel[i * 3 + 1] * dt; pos[i * 3 + 2] += sparks.vel[i * 3 + 2] * dt; if (sparks.life[i] <= 0) pos[i * 3 + 1] = -50; }
        }
        sparks.pts.geometry.attributes.position.needsUpdate = true;
      }
      if (st.lens === 'zoom') drawZoom(dt, tt);
      if (flashT > 0) { flashT -= dt; flashL.intensity = Math.max(0, flashT) * 14; } else flashL.intensity = 0;
      ctr.update();
      if (composer) composer.render(); else renderer.render(scene, cam);
      lr.render(scene, cam);
      raf = requestAnimationFrame(loop);
    }
    function resize() { renderer.setSize(W(), H()); lr.setSize(W(), H()); if (composer) composer.setSize(W(), H()); frameCam(); }
    const ro = new ResizeObserver(resize); ro.observe(wrap);

    update('init'); raf = requestAnimationFrame(loop);

    /* ---------- API ---------- */
    return {
      set(key, val) {
        if (key === 'mode') { if (st.mode === val) return; st.mode = val; st.ammPos = 'none'; st.ammBrk = false; stats.mode[val] = 1; }
        else if (key === 'cells') st.cells = val;
        else if (key === 'R') st.R = val;
        else if (key === 'sw') st.sw = val;
        else if (key === 'ammPos') { st.ammPos = val; st.ammBrk = false; if (val !== 'none') stats.posA[st.mode + ':' + val] = 1; }
        else if (key === 'vmPos') st.vmPos = val;
        else if (key === 'lens') st.lens = val;
        else if (key === 'slow') { st.slow = val; return; }
        stats.aksi++; update(key);
      },
      repair() { st.burnt = { L1: false, L2: false }; st.removed = { L1: false, L2: false }; st.ammBrk = false; update('repair'); },
      readings, ammNames: () => G[st.mode].ammNames, state: () => ({ ...st }),
      dispose() { alive = false; cancelAnimationFrame(raf); ro.disconnect(); disposeDyn(); ctr.dispose(); renderer.dispose(); pmrem.dispose(); wrap.remove(); }
    };
  }
  window.Lab3D = { create };
})();
