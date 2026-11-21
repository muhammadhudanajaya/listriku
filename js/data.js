/* Data konten LISTRIKU. Ubah teks soal, TP, atau identitas di file ini saja. */
window.DATA = {
  kodeKelas: ['IPA2026'],
  // Tempel URL Web App dari Google Apps Script di sini (lihat google-apps-script/PANDUAN-SHEET.md).
  sheetURL: 'https://script.google.com/macros/s/AKfycbxhX-rAgvCt1InGMPvWWbXHBMKIoVGVX2n3hr1FWsISiczz1WH4ivJjxMMZmPAXEZDm/exec',
  sheetToken: 'listriku-2026',
  pengembang: { nama: 'Muhammad Huda Najaya', nim: '260351860728', prodi: 'Pendidikan IPA', foto: 'assets/foto-pengembang.jpg' },
  cp: 'Peserta didik menganalisis gejala kemagnetan dan kelistrikan untuk menyelesaikan tantangan yang dihadapi dalam kehidupan sehari-hari termasuk pemanfaatan sumber energi listrik ramah lingkungan.',
  tp: [
    'Memprediksi lalu membuktikan perbedaan nyala lampu, besar arus, dan tegangan pada rangkaian seri dan paralel melalui percobaan di lab rangkaian 3D.',
    'Menganalisis hubungan arus dan tegangan dengan nyala lampu pada rangkaian seri dan paralel setelah mengamati lensa elektron, arus, dan tegangan.',
    'Menerapkan konsep rangkaian paralel untuk menjelaskan alasan instalasi listrik rumah menggunakan rangkaian paralel.'
  ],
  // Pre-test dan post-test memakai butir yang sama. kunci = indeks opsi (0 = A).
  tes: [
    { id: 't1', q: 'Seorang siswa ingin mengukur arus yang melewati lampu L1 sekaligus tegangan pada lampu L1. Cara memasang alat ukur yang benar adalah …',
      o: ['amperemeter dipasang paralel dengan L1, voltmeter dipasang seri dengan L1', 'amperemeter dipasang seri dengan L1, voltmeter dipasang paralel dengan L1', 'amperemeter dan voltmeter sama-sama dipasang seri dengan L1', 'amperemeter dan voltmeter sama-sama dipasang paralel dengan L1'], k: 1,
      bahas: 'Amperemeter harus dilalui arus yang sama dengan lampu, jadi dipasang seri. Voltmeter mengukur beda tegangan di kedua ujung lampu, jadi dipasang paralel.' },
    { id: 't2', q: 'Sebuah lampu dihubungkan ke baterai dan menyala. Kemudian satu lampu identik ditambahkan secara seri. Dibanding saat hanya ada satu lampu, nyala kedua lampu sekarang …',
      o: ['lebih terang, karena jumlah lampu bertambah', 'sama terang, karena baterainya sama', 'lampu pertama tetap terang, lampu kedua lebih redup', 'keduanya lebih redup'], k: 3,
      bahas: 'Tegangan baterai terbagi ke dua lampu dan arus mengecil, sehingga keduanya redup sama.' },
    { id: 't3', q: 'Dua lampu identik dirangkai seri dengan baterai. Amperemeter X dipasang di antara baterai dan L1, sedangkan amperemeter Y dipasang di antara L1 dan L2. Jika X menunjukkan 0,15 A, maka Y menunjukkan …',
      o: ['0,15 A', '0,075 A', '0 A', '0,30 A'], k: 0,
      bahas: 'Rangkaian seri hanya punya satu jalur, sehingga arus di semua titik sama. Arus tidak habis dipakai lampu.' },
    { id: 't4', q: 'Dua lampu identik dirangkai seri dengan baterai 3 V. Tegangan pada masing-masing lampu adalah …',
      o: ['3 V', '6 V', '1,5 V', '0,75 V'], k: 2,
      bahas: 'Tegangan 3 V terbagi sama besar ke dua lampu identik: 3 V ÷ 2 = 1,5 V.' },
    { id: 't5', q: 'Dua lampu identik dirangkai paralel dengan baterai 3 V. Tegangan pada masing-masing lampu adalah …',
      o: ['1,5 V pada setiap lampu', '3 V pada setiap lampu', '6 V pada setiap lampu', '3 V pada lampu yang lebih dekat ke baterai, 1,5 V pada lampu yang lebih jauh'], k: 1,
      bahas: 'Setiap cabang paralel terhubung langsung ke kedua kutub baterai, jadi tiap lampu mendapat tegangan penuh 3 V.' },
    { id: 't6', q: 'Dua lampu identik dirangkai paralel. Arus yang melewati masing-masing lampu 0,3 A. Arus yang keluar dari baterai adalah …',
      o: ['0,15 A', '0,3 A', '0,9 A', '0,6 A'], k: 3,
      bahas: 'Arus total paralel = jumlah arus tiap cabang: 0,3 A + 0,3 A = 0,6 A.' },
    { id: 't7', q: 'Tiga lampu identik L1, L2, dan L3 dirangkai seri berurutan dari kutub positif baterai. Jika L2 putus, maka …',
      o: ['L1 tetap menyala, L3 padam', 'L1 dan L3 menyala lebih terang', 'L1 dan L3 padam', 'L1 dan L3 tetap menyala seperti semula'], k: 2,
      bahas: 'Lampu yang putus memutus satu-satunya jalur, sehingga elektron di seluruh rangkaian berhenti.' },
    { id: 't8', q: 'Dua lampu identik dirangkai paralel dengan baterai. Kemudian lampu ketiga yang identik ditambahkan secara paralel. Nyala dua lampu yang pertama menjadi …',
      o: ['tetap sama terang, karena tegangan tiap lampu tetap sama', 'lebih redup, karena arus harus dibagi tiga', 'lebih terang, karena jumlah lampu bertambah', 'padam, karena baterai kelebihan beban'], k: 0,
      bahas: 'Pada baterai ideal, tiap cabang tetap mendapat tegangan penuh; yang bertambah hanya arus total dari baterai.' },
    { id: 't9', q: 'Pernyataan yang benar tentang arah arus listrik dan arah gerak elektron di dalam kabel adalah …',
      o: ['arus dan elektron sama-sama bergerak dari kutub + ke kutub −', 'arus dan elektron sama-sama bergerak dari kutub − ke kutub +', 'arus dari kutub − ke +, elektron dari kutub + ke −', 'arus dari kutub + ke −, elektron dari kutub − ke +'], k: 3,
      bahas: 'Arah arus konvensional disepakati dari + ke −, sedangkan elektron (bermuatan negatif) bergerak berlawanan, dari − ke +.' },
    { id: 't10', q: 'Lampu, kipas angin, dan televisi di rumah dipasang secara paralel. Alasan yang paling tepat adalah …',
      o: ['agar kabel yang dibutuhkan lebih sedikit', 'agar setiap alat mendapat tegangan yang sama dan dapat dinyalakan atau dimatikan sendiri-sendiri', 'agar arus yang mengalir ke setiap alat selalu sama besar', 'agar energi listrik yang terpakai lebih sedikit'], k: 1,
      bahas: 'Setiap alat berada di cabangnya sendiri dengan tegangan penuh, sehingga bisa dinyalakan dan dimatikan sendiri-sendiri.' }
  ],
  kuisPG: [
    { id: 'k1', q: 'Dua lampu identik dirangkai seri dengan baterai 6 V. Tegangan pada setiap lampu adalah …', o: ['6 V', '3 V', '12 V', '2 V'], k: 1,
      bahas: 'Pada rangkaian seri, tegangan baterai terbagi ke setiap lampu. Dua lampu identik mendapat bagian sama: 6 V ÷ 2 = 3 V. Ingat lensa Tegangan: warna berubah bertahap di setiap lampu.' },
    { id: 'k2', q: 'Pada rangkaian paralel dua cabang, arus pada cabang pertama 0,2 A dan arus total dari baterai 0,5 A. Arus pada cabang kedua adalah …', o: ['0,2 A', '0,5 A', '0,3 A', '0,7 A'], k: 2,
      bahas: 'Arus total paralel sama dengan jumlah arus semua cabang. Jadi arus cabang kedua = 0,5 A − 0,2 A = 0,3 A.' },
    { id: 'k3', q: 'Rangkaian lampu hias seri berisi 10 lampu kecil. Satu lampu kecil copot dari dudukannya. Yang terjadi adalah …', o: ['sembilan lampu lain menyala lebih terang', 'semua lampu padam', 'hanya lampu sebelum yang copot yang menyala', 'sembilan lampu lain menyala seperti biasa'], k: 1,
      bahas: 'Rangkaian seri hanya punya satu jalur. Satu lampu copot memutus jalur itu, sehingga elektron di seluruh rangkaian berhenti dan semua lampu padam, seperti lampu hias di video pemantik.' },
    { id: 'k4', q: 'Saat lampu menyala, partikel yang bergerak di dalam kabel tembaga adalah …', o: ['elektron', 'proton', 'atom tembaga', 'cahaya'], k: 0,
      bahas: 'Yang bergerak di dalam kabel logam adalah elektron bebas. Proton dan atom tembaga tetap di tempatnya. Kamu bisa melihatnya dengan lensa Elektron di lab 3D.' },
    { id: 'k5', q: 'Dua lampu identik dirangkai seri dengan baterai. Kemudian lampu ketiga yang identik ditambahkan secara seri. Nyala lampu-lampu itu menjadi …', o: ['lebih terang', 'tetap sama', 'lebih redup', 'padam semua'], k: 2,
      bahas: 'Tegangan baterai kini terbagi ke tiga lampu, sehingga tegangan tiap lampu lebih kecil dan arus juga mengecil. Akibatnya semua lampu lebih redup.' },
    { id: 'k6', q: 'Dua lampu identik dirangkai paralel. Arus pada setiap lampu 0,25 A. Jika satu lampu dilepas, amperemeter di dekat baterai menunjukkan …', o: ['0 A', '0,5 A', '0,125 A', '0,25 A'], k: 3,
      bahas: 'Sebelum dilepas, arus total = 0,25 A + 0,25 A = 0,5 A. Setelah satu lampu dilepas, tinggal satu cabang, sehingga arus total menjadi 0,25 A. Lampu yang tersisa tetap menyala seperti semula.' },
    { id: 'k7', q: 'Untuk mengukur tegangan pada sebuah lampu, voltmeter harus dipasang …', o: ['paralel dengan lampu', 'seri dengan lampu', 'di antara dua baterai', 'tanpa dihubungkan ke rangkaian'], k: 0,
      bahas: 'Voltmeter mengukur beda potensial antara dua ujung lampu, jadi kedua kakinya dipasang di ujung-ujung lampu (paralel). Amperemeterlah yang dipasang seri.' },
    { id: 'k8', q: 'Dua lampu identik dengan baterai yang sama lebih terang jika dirangkai paralel daripada seri. Alasannya adalah …', o: ['elektron di rangkaian paralel lebih banyak jenisnya', 'arus di rangkaian paralel mengalir lebih lambat', 'lampu pada rangkaian paralel lebih baru', 'setiap lampu paralel mendapat tegangan penuh dari baterai'], k: 3,
      bahas: 'Pada paralel, setiap lampu terhubung langsung ke kedua kutub baterai sehingga mendapat tegangan penuh. Pada seri, tegangan itu dibagi, sehingga lampu lebih redup.' },
    { id: 'k9', q: 'Saat elektron melewati filamen lampu, yang terjadi adalah …', o: ['elektron habis di dalam filamen', 'elektron berubah menjadi cahaya', 'energi listrik diubah menjadi cahaya dan panas, sedangkan elektron tetap mengalir', 'arus berhenti di dalam filamen'], k: 2,
      bahas: 'Elektron tidak habis dan tidak berubah menjadi cahaya. Yang berubah adalah energinya: energi listrik menjadi cahaya dan panas di filamen, lalu elektron terus mengalir kembali ke baterai. Lihat lensa Energi dan Zoom.' },
    { id: 'k10', q: 'Di rumah Sinta, lampu kamar dimatikan tetapi lampu dapur tetap menyala. Hal ini menunjukkan bahwa lampu-lampu di rumah Sinta …', o: ['memakai baterai yang berbeda-beda', 'hanya dialiri arus ke dapur', 'dirangkai seri', 'dirangkai paralel'], k: 3,
      bahas: 'Pada rangkaian paralel, setiap lampu punya cabang dan sakelarnya sendiri. Mematikan satu cabang tidak memutus cabang lain, jadi lampu dapur tetap menyala.' }
  ],
  predict: [
    { id: 'p1', mode: 'seri', q: 'Dua lampu identik dirangkai seri. Dibanding satu lampu saja, nyalanya …', o: ['Lebih terang', 'Sama terang', 'Lebih redup'], k: 2,
      jelas: 'Pada seri, tegangan 3 V terbagi: tiap lampu hanya 1,5 V, sehingga lebih redup.' },
    { id: 'p2', mode: 'paralel', q: 'Jika satu lampu pada rangkaian paralel dilepas, lampu lainnya …', o: ['Ikut padam', 'Tetap menyala', 'Menjadi redup'], k: 1,
      jelas: 'Pada paralel, setiap lampu punya jalurnya sendiri ke baterai, jadi lampu lain tetap menyala.' },
    { id: 'p3', mode: 'seri', q: 'Pada rangkaian seri, besar arus yang melewati L1 dibanding L2 …', o: ['Lebih besar di L1', 'Sama besar', 'Lebih besar di L2'], k: 1,
      jelas: 'Pada seri hanya ada satu jalur, jadi arus di L1 dan L2 sama besar. Arus tidak habis dipakai lampu.' }
  ],
  referensi: [
    { t: 'PhET Interactive Simulations, University of Colorado Boulder. Circuit Construction Kit: DC. Lisensi CC-BY 4.0.', url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_all.html' },
    { t: 'Video pemantik dan lab rangkaian 3D: dikembangkan oleh pengembang.' }
  ]
};
