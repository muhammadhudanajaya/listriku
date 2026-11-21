/**
 * LISTRIKU — penerima jawaban siswa ke Google Sheet.
 * Cara pasang: lihat PANDUAN-SHEET.md. Tempel seluruh isi file ini di Apps Script,
 * lalu Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 *
 * Tab "Rekap"     : 1 baris = 1 siswa, diurutkan per kelas lalu nomor absen.
 * Tab "Butir Tes" : jawaban benar(1)/salah(0) tiap butir pre-test dan post-test,
 *                   untuk analisis validitas butir, KR-20, tingkat kesukaran, dan daya beda.
 */
const TOKEN = 'listriku-2026';   // harus sama dengan sheetToken di js/data.js

const REKAP = ['Kelas', 'Absen', 'Nama', 'Jalur', 'Pre-test', 'Dugaan awal',
  'Prediksi 1', 'Prediksi 2', 'Prediksi 3', 'Alasan prediksi',
  'Seri: nyala', 'Seri: arus (A)', 'Seri: V tiap lampu', 'Seri: 1 lampu dilepas',
  'Paralel: nyala', 'Paralel: arus (A)', 'Paralel: V tiap lampu', 'Paralel: 1 lampu dilepas',
  'Aktivitas lab', 'Penjelasan (Explain)', 'Post-test', 'N-Gain', 'Kategori N-Gain',
  'Kuis PG (benar)', 'Esai 1', 'Esai 2', 'Status', 'Terakhir diperbarui'];

function doGet() {
  return ContentService.createTextOutput('LISTRIKU: penerima data aktif.');
}

function doPost(e) {
  let d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return out('format salah'); }
  if (!d || d.token !== TOKEN || !d.siswa) return out('ditolak');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    upsertRekap(ss, d);
    (d.butir || []).forEach(b => upsertButir(ss, d.siswa, b));
  } finally {
    lock.releaseLock();
  }
  return out('ok');
}

function out(t) { return ContentService.createTextOutput(t); }

function sheet(ss, name, header) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold').setBackground('#1B2A4E').setFontColor('#FFFFFF');
    sh.setFrozenRows(1);
    sh.getRange('B:B').setNumberFormat('@');
  }
  return sh;
}

function keyOf(s) { return [s.kelas, s.absen, String(s.nama).trim().toLowerCase()].join('|'); }

function findRow(sh, key, keyCols) {
  const n = sh.getLastRow();
  if (n < 2) return 0;
  const vals = sh.getRange(2, 1, n - 1, keyCols).getValues();
  for (let i = 0; i < vals.length; i++) {
    const k = keyCols === 3 ? [vals[i][0], vals[i][1], String(vals[i][2]).trim().toLowerCase()].join('|')
                            : [vals[i][0], vals[i][1], String(vals[i][2]).trim().toLowerCase(), vals[i][3]].join('|');
    if (k === key) return i + 2;
  }
  return 0;
}

function sortSheet(sh, cols) {
  const n = sh.getLastRow();
  if (n > 2) sh.getRange(2, 1, n - 1, cols).sort([{ column: 1, ascending: true }, { column: 2, ascending: true }]);
}

function upsertRekap(ss, d) {
  const sh = sheet(ss, 'Rekap', REKAP);
  const s = d.siswa, r = d.rekap || {};
  const row = [s.kelas, s.absen, s.nama, s.jalur].concat(REKAP.slice(4, -1).map(h => r[h] == null ? '' : r[h]));
  row.push(new Date());
  const at = findRow(sh, keyOf(s), 3);
  if (at) {
    // jangan menimpa isian lama dengan sel kosong
    const old = sh.getRange(at, 1, 1, REKAP.length).getValues()[0];
    for (let i = 0; i < row.length; i++) if (row[i] === '' && old[i] !== '') row[i] = old[i];
    sh.getRange(at, 1, 1, REKAP.length).setValues([row]);
  } else {
    sh.appendRow(row);
  }
  sortSheet(sh, REKAP.length);
}

function upsertButir(ss, s, b) {
  const head = ['Kelas', 'Absen', 'Nama', 'Tes'].concat(b.items.map((_, i) => 'B' + (i + 1))).concat(['Skor']);
  const sh = sheet(ss, 'Butir Tes', head);
  const row = [s.kelas, s.absen, s.nama, b.tes].concat(b.items).concat([b.skor]);
  const at = findRow(sh, keyOf(s) + '|' + b.tes, 4);
  if (at) sh.getRange(at, 1, 1, row.length).setValues([row]);
  else sh.appendRow(row);
  sortSheet(sh, row.length);
}
