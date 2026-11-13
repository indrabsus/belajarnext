export interface Topic {
  id: string;
  title: string;
  badge?: string;
  summary: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    filename?: string;
  };
  tips?: string[];
  pitfalls?: string[];
  exercise?: {
    title: string;
    instruction: string;
    hint: string;
  };
}

export interface Module {
  id: string;
  slug: string;
  level: number;
  title: string;
  tagline: string;
  estimatedTime: string;
  color: string;
  iconName: string;
  description: string;
  learningOutcomes: string[];
  topics: Topic[];
  finalProject: {
    title: string;
    description: string;
    requirements: string[];
    submissionTip: string;
  };
}

export const CURRICULUM_DATA: Module[] = [
  {
    id: "modul-0",
    slug: "persiapan-dan-arsitektur-browser",
    level: 0,
    title: "Modul 0: Orientasi, Arsitektur Browser & Setup Lingkungan",
    tagline: "Bedah alur Critical Rendering Path, kerja engine browser, dan konfigurasi VS Code.",
    estimatedTime: "2-3 Hari",
    color: "slate",
    iconName: "Compass",
    description: "Sebelum mengetik kode pertama, siswa wajib memahami siklus dari byte data hingga pixel di layar, fungsi developer tools, dan standard tooling industri.",
    learningOutcomes: [
      "Memahami siklus Critical Rendering Path: Parsing, DOM, CSSOM, Render Tree, Layout, Paint, Compositing.",
      "Mampu menggunakan Chrome DevTools (Elements, Console, Network, dan Device Toolbar).",
      "Menginstal VS Code dengan ekstensi penting: Live Server, Prettier, Tailwind CSS IntelliSense."
    ],
    topics: [
      {
        id: "crp-engine",
        title: "0.1 Bagaimana Browser Mengubah Kode Jadi Website (Critical Rendering Path)",
        badge: "Teori Mesin",
        summary: "Perjalanan dari file teks mentah menjadi antarmuka visual di monitor.",
        content: `Ketika kita membuka file HTML di browser (Chrome/Firefox/Safari):
1. **Conversion & Tokenization:** Browser membaca raw byte karakter (UTF-8) dan memecahnya menjadi token tag (\`<html>\`, \`<body>\`, \`<h1>\`).
2. **DOM Tree:** Token disusun menjadi struktur pohon bersarang (Document Object Model).
3. **CSSOM Tree:** File CSS diuraikan menjadi CSS Object Model. CSS bersifat render-blocking karena browser menolak menampilkan halaman sebelum aturan style siap.
4. **Render Tree:** Menggabungkan DOM dan CSSOM. Elemen dengan \`display: none\` dibuang dari Render Tree, sedangkan \`visibility: hidden\` tetap dimasukkan.
5. **Layout / Reflow:** Menghitung koordinat (X, Y) dan ukuran (Width, Height) setiap kotak di layar.
6. **Paint / Repaint:** Mengisi pixel warna, teks, gambar, dan border.
7. **Compositing:** Layer-layer yang diproses GPU disatukan menjadi tampilan final.`,
        tips: [
          "Hindari mengubah geometri elemen berulang-ulang via JavaScript karena memicu Reflow & Repaint yang memberatkan performa."
        ]
      },
      {
        id: "devtools-guide",
        title: "0.2 Menguasai Chrome DevTools untuk Pemula",
        badge: "Tool Wajib",
        summary: "Panel Elements, Console, dan Responsive Device Simulator.",
        content: `Buka DevTools dengan klik kanan > **Inspect** (atau F12):
- **Elements Tab:** Menginspeksi DOM, mengedit teks langsung, melihat Box Model di panel kanan.
- **Console Tab:** Tempat melihat error JavaScript dan menjalankan ekspresi kode langsung.
- **Toggle Device Toolbar (Ctrl+Shift+M / Cmd+Shift+M):** Mensimulasikan berbagai ukuran layar HP (iPhone, Samsung Galaxy, iPad) untuk uji responsif.`,
        exercise: {
          title: "Uji Coba Inspect Element",
          instruction: "Buka website favoritmu, klik kanan judul utamanya, pilih Inspect, lalu ganti teksnya di panel Elements menjadi namamu sendiri.",
          hint: "Double click tepat pada teks di dalam tag HTML di panel Elements."
        }
      }
    ],
    finalProject: {
      title: "Proyek Modul 0: Ceklis Kesiapan Kerja",
      description: "Pastikan seluruh tools telah terpasang dan siswa memahami alur browser.",
      requirements: [
        "VS Code terinstal dengan ekstensi Live Server & Prettier",
        "Node.js LTS terinstal di laptop",
        "Siswa mampu membuka dan menjelaskan fungsi panel Elements & Console di DevTools"
      ],
      submissionTip: "Screenshot VS Code dengan file index.html terbuka di browser via Live Server."
    }
  },
  {
    id: "modul-1",
    slug: "html5-lengkap-w3schools",
    level: 1,
    title: "Modul 1: Ensiklopedia HTML5 Lengkap (W3Schools Style)",
    tagline: "Kuasai seluruh elemen HTML5: Sintaks, Teks, Hyperlink, Gambar, Tabel, Form Lengkap, Semantik, dan Dialog.",
    estimatedTime: "1-2 Minggu",
    color: "amber",
    iconName: "FileCode",
    description: "Kamus referensi lengkap HTML5 dari A sampai Z. Membahas seluruh tag yang sering dipakai di industri: elemen teks, tabel terstruktur, form input lengkap beserta atribut validasi, multimedia audio/video, hingga elemen modern dialog dan semantik.",
    learningOutcomes: [
      "Menguasai anatomi tag HTML, atribut global (id, class, style, title, lang, hidden, data-*).",
      "Memahami elemen teks, formatting, headings, quote, dan entitas karakter.",
      "Mampu membuat link navigasi: internal anchor (#id), external, email (mailto:), dan telpon (tel:).",
      "Menguasai multimedia: img (srcset & lazy loading), picture, video, audio, dan iframe.",
      "Mampu menyusun tabel terstruktur dengan thead, tbody, tfoot, colspan, dan rowspan.",
      "Menguasai Form Masterclass: 15+ input types, select, textarea, datalist, fieldset, dan validasi regex.",
      "Menguasai HTML5 Semantik lengkap: header, nav, main, section, article, aside, footer, details, summary, dialog."
    ],
    topics: [
      {
        id: "html-anatomi-atribut",
        title: "1.1 Anatomi Tag HTML & Atribut Global",
        badge: "Dasar Mutlak",
        summary: "Tag pembuka, isi, tag penutup, void elements, dan atribut global.",
        content: `**1. Anatomi Tag:**
Sebagian besar elemen memiliki tag pembuka, isi, dan tag penutup:
\`<tag nama-atribut="nilai">Konten</tag>\`

**2. Void Elements (Self-closing):**
Elemen yang tidak memiliki tag penutup dan tidak membungkus teks:
\`<br>\` (baris baru), \`<hr>\` (garis horizontal), \`<img>\`, \`<input>\`, \`<meta>\`, \`<link>\`.

**3. Atribut Global (Bisa dipasang di semua elemen):**
- \`id\`: Pengenal unik (hanya boleh 1 ID yang sama per halaman).
- \`class\`: Pengenal kelompok (bisa dipakai berkali-kali untuk styling CSS).
- \`title\`: Menampilkan tooltip saat kursor melintas di atas elemen.
- \`hidden\`: Menyembunyikan elemen dari layar.
- \`tabindex\`: Menentukan urutan navigasi tombol TAB keyboard.
- \`data-*\`: Atribut custom buatan developer untuk menyimpan data cadangan (misal: \`data-id="101"\`).`,
        codeSnippet: {
          language: "html",
          filename: "anatomi.html",
          code: `<!-- Elemen standar dengan atribut -->
<p id="paragraf-satu" class="teks-tebal" title="Ini keterangan tooltip">
  Halo dunia, ini paragraf pertama!
</p>

<!-- Void element (tanpa penutup) -->
<hr>

<!-- Menyimpan data khusus menggunakan data-* -->
<div data-user-role="admin" data-user-id="99">
  Panel Pengguna
</div>`
        }
      },
      {
        id: "html-teks-formatting",
        title: "1.2 Tipografi, Formatting Teks & Entitas Karakter",
        badge: "Konten Teks",
        summary: "Heading h1-h6, paragraf, bold/strong, italic/em, mark, del, ins, dan kode sumber.",
        content: `HTML menyediakan tag spesifik untuk format teks dengan makna (semantik):

| Tag | Makna / Arti Semantik | Tampilan Default |
| :--- | :--- | :--- |
| \`<h1>\` s/d \`<h6>\` | Hierarki Judul (h1 paling utama, hanya 1 per halaman) | Teks besar tebal |
| \`<p>\` | Paragraf teks | Blok teks dengan margin |
| \`<strong>\` | Teks sangat penting / darurat | Tebal (Bold) |
| \`<em>\` | Teks dengan penekanan ucapan | Miring (Italic) |
| \`<mark>\` | Teks yang distabilo / disorot | Latar belakang kuning |
| \`<del>\` | Teks yang dicoret (harga lama/dihapus) | Coret tengah (Strikethrough) |
| \`<ins>\` | Teks tambahan baru (harga diskon) | Garis bawah (Underline) |
| \`<sub>\` & \`<sup>\` | Subscript (rumus kimia: H₂O) & Superscript (kuadrat: x²) | Teks kecil bawah/atas |
| \`<code>\` & \`<pre>\` | Potongan kode komputer & Teks preformatted (spasi dipertahankan) | Huruf Monospace |
| \`<blockquote cite="">\` | Kutipan panjang dari sumber luar | Menjorok ke dalam |

**Entitas Karakter (Simbol Khusus):**
- \`&nbsp;\` = Spasi yang tidak memecah baris
- \`&lt;\` = Simbol lebih kecil (\`<\`)
- \`&gt;\` = Simbol lebih besar (\`>\`)
- \`&amp;\` = Simbol ampersand (\`&\`)
- \`&copy;\` = Simbol Hak Cipta (©)
- \`&times;\` = Tanda perkalian / silang (×)`,
        codeSnippet: {
          language: "html",
          filename: "formatting.html",
          code: `<article>
  <h1>Diskon Akhir Tahun!</h1>
  <p>Harga resmi: <del>Rp 500.000</del> <ins><strong>Rp 250.000</strong></ins></p>
  <p>Rumus air adalah H<sub>2</sub>O dan rumus luas persegi adalah s<sup>2</sup>.</p>
  <p>Ingat rumus koding: <code>const nama = "Budi";</code></p>
  <p>&copy; 2026 Hak Cipta Dilindungi &amp; Aman.</p>
</article>`
        }
      },
      {
        id: "html-links-hyperlinks",
        title: "1.3 Hyperlink & Navigasi: Eksternal, Internal Anchor, Email & Telpon",
        badge: "Navigasi",
        summary: "Tag <a>, atribut href, target=_blank, rel=noopener, mailto:, tel:, dan anchor bookmark (#).",
        content: `Hyperlink dibuat dengan tag \`<a href="...">\`.

**1. Jenis Nilai pada atribut \`href\`:**
- **URL Absolut (Eksternal):** \`href="https://google.com"\`
- **URL Relatif (Internal):** \`href="/tentang.html"\` atau \`href="./kontak.html"\`
- **Internal Bookmark (Anchor link):** \`href="#section-kontak"\` (langsung scroll ke elemen dengan \`id="section-kontak"\`).
- **Trigger Aplikasi:**
  - Kirim Email: \`href="mailto:halo@budi.com?subject=Tanya%20Kursus"\`
  - Telepon: \`href="tel:+628123456789"\`
  - WhatsApp: \`href="https://wa.me/628123456789"\`

**2. Atribut Keamanan Wajib untuk Tab Baru:**
Ketika membuka link di tab baru dengan \`target="_blank"\`, **WAJIB sertakan \`rel="noopener noreferrer"\`** untuk mencegah celah keamanan phishing (*Tabnabbing*).`,
        codeSnippet: {
          language: "html",
          filename: "links.html",
          code: `<!-- Link ke tab baru yang aman -->
<a href="https://github.com" target="_blank" rel="noopener noreferrer">
  Buka GitHub Saya (Tab Baru)
</a>

<!-- Link kirim email dan telepon -->
<a href="mailto:admin@sekolah.sch.id">Kirim Email</a>
<a href="tel:+628123456789">Telepon CS</a>

<!-- Link lompat ke bagian bawah halaman -->
<a href="#faq-section">Lompat ke Pertanyaan Umum</a>
<!-- ... konten panjang ... -->
<section id="faq-section">
  <h2>Pertanyaan Umum</h2>
</section>`
        }
      },
      {
        id: "html-gambar-multimedia",
        title: "1.4 Gambar & Multimedia: img, picture, audio, video, dan iframe",
        badge: "Media Modern",
        summary: "Optimasi alt, loading=lazy, srcset, elemen <video>, <audio>, dan embed <iframe>.",
        content: `**1. Elemen Gambar \`<img>\`:**
- \`src\`: Alamat gambar.
- \`alt\`: Teks deskripsi gambar (**Wajib!** Dibaca oleh tuna netra dan mesin pencari jika gambar gagal dimuat).
- \`loading="lazy"\`: Menunda download gambar hingga pengguna men-scroll mendekatinya (menghemat kuota!).
- \`width\` & \`height\`: Memberitahu rasio dimensi ke browser sejak awal untuk mencegah lonjakan layout (*Cumulative Layout Shift - CLS*).

**2. Elemen Responsif \`<picture>\`:**
Menampilkan format gambar modern (WebP/AVIF) dengan fallback ke JPG:
\`\`\`html
<picture>
  <source srcset="foto.avif" type="image/avif">
  <source srcset="foto.webp" type="image/webp">
  <img src="foto.jpg" alt="Pemandangan" loading="lazy">
</picture>
\`\`\`

**3. Video & Audio Native:**
\`\`\`html
<video controls width="400" poster="cover.jpg">
  <source src="video.mp4" type="video/mp4">
  Browser Anda tidak mendukung tag video.
</video>
\`\`\`

**4. Iframe (Menyisipkan Web Lain / YouTube / Google Maps):**
Gunakan atribut \`loading="lazy"\` dan \`title\` untuk aksesibilitas.`,
        codeSnippet: {
          language: "html",
          filename: "media.html",
          code: `<!-- Gambar optimal standar industri -->
<figure>
  <img 
    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
    alt="Laptop koding di meja kerja"
    width="600" 
    height="400" 
    loading="lazy"
  >
  <figcaption>Suasana kerja frontend developer modern.</figcaption>
</figure>

<!-- Audio player native -->
<audio controls>
  <source src="podcast.mp3" type="audio/mpeg">
</audio>`
        }
      },
      {
        id: "html-tabel-terstruktur",
        title: "1.5 Tabel HTML Terstruktur: thead, tbody, tfoot, colspan, & rowspan",
        badge: "Data Tabular",
        summary: "Menyusun data tabular yang rapi dan semantik untuk laporan atau daftar harga.",
        content: `Tabel di HTML digunakan **hanya untuk data tabular** (bukan untuk membuat tata letak layout web!).

**Struktur Hirarki Tabel Lengkap:**
- \`<table>\`: Pembungkus utama tabel.
- \`<caption>\`: Judul/deskripsi tabel.
- \`<thead>\`: Area kepala tabel.
- \`<tbody>\`: Area badan konten data tabel.
- \`<tfoot>\`: Area kaki/rangkuman total data.
- \`<tr>\` (Table Row): Satu baris horizontal.
- \`<th>\` (Table Header): Sel judul kolom (otomatis tebal dan di tengah). Atribut \`scope="col"\` atau \`scope="row"\`.
- \`<td>\` (Table Data): Sel isi data biasa.

**Menggabungkan Kolom & Baris:**
- \`colspan="2"\`: Menggabungkan 2 kolom horizontal menjadi satu.
- \`rowspan="2"\`: Menggabungkan 2 baris vertikal menjadi satu.`,
        codeSnippet: {
          language: "html",
          filename: "tabel.html",
          code: `<table border="1" cellpadding="8">
  <caption>Daftar Nilai Siswa Frontend</caption>
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Nama Siswa</th>
      <th scope="col">Nilai HTML</th>
      <th scope="col">Nilai CSS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Budi Santoso</td>
      <td>90</td>
      <td>85</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Siti Rahma</td>
      <td colspan="2" align="center">95 (Sempurna)</td> <!-- Menggabung 2 kolom -->
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th colspan="2">Rata-rata Kelas</th>
      <td colspan="2">90</td>
    </tr>
  </tfoot>
</table>`
        }
      },
      {
        id: "html-form-masterclass",
        title: "1.6 Form Input Masterclass: 15+ Tipe Input, Atribut Validasi & Kontrol",
        badge: "Wajib Interaksi",
        summary: "Semua varian input, label, select, textarea, datalist, fieldset, dan validasi form bawaan.",
        content: `Form adalah pintu masuk interaksi pengguna mengirim data ke server.

**1. Elemen Pembungkus:**
\`<form action="/api/simpan" method="POST" autocomplete="on">\`

**2. Relasi Label & Input (Sangat Penting!):**
Selalu hubungkan \`<label for="id-input">\` dengan \`<input id="id-input">\`. Ketika teks label diklik, kursor otomatis aktif di dalam kotak input!

**3. Tipe-Tipe Input Populer:**
- \`type="text"\`: Teks biasa.
- \`type="password"\`: Teks tersembunyi (bintang/titik).
- \`type="email"\`: Validasi otomatis format email (@).
- \`type="number"\`: Angka dengan panah naik/turun (\`min="1" max="100" step="5"\`).
- \`type="date"\`: Kalender pemilih tanggal bawaan sistem operasi.
- \`type="color"\`: Color picker pemilih warna hex.
- \`type="range"\`: Slider penggeser nilai.
- \`type="checkbox"\`: Pilihan kotak centang (bisa pilih lebih dari satu).
- \`type="radio"\`: Pilihan bulat (hanya bisa pilih 1 dari kelompok nama yang sama).
- \`type="file"\`: Unggah dokumen (\`accept=".pdf,.png" multiple\`).
- \`type="hidden"\`: Data tersembunyi yang ikut terkirim ke server.

**4. Elemen Form Lainnya:**
- \`<textarea rows="4">\`: Kotak teks panjang multi-baris.
- \`<select>\` & \`<option>\`: Dropdown menu pilihan.
- \`<datalist>\`: Kotak input yang memiliki rekomendasi saran autocomplete.
- \`<fieldset>\` & \`<legend>\`: Mengelompokkan bagian form dalam satu bingkai.`,
        codeSnippet: {
          language: "html",
          filename: "form-lengkap.html",
          code: `<form action="/submit" method="POST">
  <fieldset>
    <legend>Informasi Pribadi</legend>
    
    <div>
      <label for="nama">Nama Lengkap (Wajib):</label>
      <input type="text" id="nama" name="nama" required minlength="3" placeholder="Contoh: Budi">
    </div>

    <div>
      <label for="email">Alamat Email:</label>
      <input type="email" id="email" name="email" required placeholder="budi@gmail.com">
    </div>

    <div>
      <label for="keahlian">Keahlian (Datalist):</label>
      <input list="daftar-keahlian" id="keahlian" name="keahlian">
      <datalist id="daftar-keahlian">
        <option value="HTML5">
        <option value="CSS3">
        <option value="Tailwind CSS">
        <option value="Next.js">
      </datalist>
    </div>

    <div>
      <label for="pesan">Pesan:</label>
      <textarea id="pesan" name="pesan" rows="3"></textarea>
    </div>

    <button type="submit">Kirim Formulir</button>
  </fieldset>
</form>`
        }
      },
      {
        id: "html-semantik-dialog",
        title: "1.7 HTML5 Semantik Lengkap & Tag Modern <dialog>",
        badge: "Modern Web",
        summary: "header, nav, main, section, article, aside, footer, details, summary, dan native modal dialog.",
        content: `**1. Peta Tata Letak Semantik:**
- \`<header>\`: Bagian pengantar atas (logo, tagline, menu utama).
- \`<nav>\`: Kumpulan tautan navigasi utama.
- \`<main>\`: Konten primer halaman (hanya boleh ada 1 tag \`<main>\` per halaman!).
- \`<section>\`: Bagian tematik dari suatu halaman (sebaiknya memiliki heading).
- \`<article>\`: Konten mandiri yang bisa disebarkan terpisah (artikel blog, ulasan produk, tweet).
- \`<aside>\`: Konten pendukung di sisi samping (sidebar, daftar artikel terkait).
- \`<footer>\`: Informasi penutup (hak cipta, tautan kebijakan privasi).

**2. Elemen Interaktif Tanpa JavaScript:**
- \`<details>\` & \`<summary>\`: Accordion buka-tutup (FAQ) murni bawaan browser!
- \`<dialog>\`: Modal popup resmi HTML5 modern yang bisa dibuka dengan perintah JavaScript sederhana: \`dialog.showModal()\`.`,
        codeSnippet: {
          language: "html",
          filename: "semantik-modern.html",
          code: `<!-- Accordion FAQ tanpa 1 baris pun JavaScript! -->
<details>
  <summary><strong>Apakah kursus ini cocok untuk pemula nol?</strong></summary>
  <p>Sangat cocok! Materi disusun dari dasar HTML, CSS, hingga framework Next.js.</p>
</details>

<!-- Native Modal Popup Dialog -->
<dialog id="modal-notif">
  <h3>Pemberitahuan</h3>
  <p>Formulir Anda berhasil terkirim.</p>
  <button onclick="document.getElementById('modal-notif').close()">Tutup</button>
</dialog>

<button onclick="document.getElementById('modal-notif').showModal()">Buka Modal</button>`
        }
      }
    ],
    finalProject: {
      title: "Proyek Modul 1: Portal Formulir Pendaftaran Siswa & Data Tabular Lengkap",
      description: "Membangun 1 file HTML5 murni tanpa CSS yang mencakup: Struktur semantik lengkap (header, nav, main, footer), tabel daftar kursus dengan thead/tbody/colspan, formulir pendaftaran interaktif (10+ macam input dengan atribut required/min/max/datalist), media gambar responsif, dan accordion FAQ menggunakan <details>.",
      requirements: [
        "100% lulus uji validasi W3C Validator",
        "Setiap input form memiliki pasangan <label for='...'> yang terhubung dengan id",
        "Menggunakan elemen semantik (bukan div soup)",
        "Menggunakan tabel dengan thead, tbody, th, dan colspan"
      ],
      submissionTip: "Uji coba mengklik label teks form: kursor harus otomatis aktif di kotak input terkait."
    }
  },
  {
    id: "modul-2",
    slug: "css-modern-lengkap-w3schools",
    level: 2,
    title: "Modul 2: Ensiklopedia CSS Modern Lengkap (W3Schools Style)",
    tagline: "Kuasai CSS dari Dasar, Selektor, Warna, Box Model, Position, Flexbox, Grid, Animasi, hingga CSS Variables.",
    estimatedTime: "2 Minggu",
    color: "blue",
    iconName: "Palette",
    description: "Katalog materi komprehensif CSS3 modern yang diajarkan di W3Schools dan MDN: hierarki selektor, tipografi rem/em, margin collapse, positioning (relative/absolute/fixed/sticky), Flexbox, Grid 2D, transisi, keyframes animasi, dan variabel CSS.",
    learningOutcomes: [
      "Memahami 3 cara memasang CSS: External, Internal, Inline.",
      "Menguasai selektor lanjutan: Combinator (> , +, ~), Attribute Selector, Pseudo-class (:nth-child), dan Pseudo-element (::before, ::after).",
      "Memahami sistem warna modern: HEX, RGB, HSL, RGBA, dan gradien linear/radial.",
      "Menguasai satuan ukuran web: px, rem, em, %, vw, vh, dvh, ch, dan fungsi calc()/clamp().",
      "Menguasai Box Model mendalam, margin collapse, border-box, dan outline.",
      "Menguasai sistem Position: static, relative, absolute, fixed, sticky, dan stacking context z-index.",
      "Menguasai Flexbox dan CSS Grid secara tuntas.",
      "Mampu membuat animasi halus dengan transition, transform, dan @keyframes."
    ],
    topics: [
      {
        id: "css-sintaks-selektor",
        title: "2.1 Sintaks CSS & Selektor Lanjutan (Combinators & Attributes)",
        badge: "Selektor",
        summary: "Class, ID, tag, combinator anak (>), tetangga (+), saudara (~), dan selektor atribut.",
        content: `**1. Tiga Cara Menghubungkan CSS:**
- **External CSS (Rekomendasi Utama):** \`<link rel="stylesheet" href="style.css">\`
- **Internal CSS:** Di dalam tag \`<style>\` di dalam \`<head>\`.
- **Inline CSS:** Atribut \`style="..."\` langsung di elemen (hindari kecuali darurat).

**2. Selektor Hubungan (Combinators):**
- **Descendant (Spasi):** \`div p\` &rarr; Memilih seluruh tag \`<p>\` yang ada di dalam \`<div>\` (anak, cucu, cicit).
- **Child (\`>\`):** \`div > p\` &rarr; HANYA memilih \`<p>\` yang merupakan anak langsung dari \`<div>\`.
- **Adjacent Sibling (\`+\`):** \`h2 + p\` &rarr; Memilih tepat SATU tag \`<p>\` yang berada langsung setelah \`<h2>\`.
- **General Sibling (\`~\`):** \`h2 ~ p\` &rarr; Memilih SEMUA tag \`<p>\` yang berada setelah \`<h2>\` dalam level yang sama.

**3. Attribute Selector:**
- \`input[type="text"]\` &rarr; Memilih hanya input dengan tipe teks.
- \`a[href^="https"]\` &rarr; Memilih link yang URL-nya diawali dengan "https".
- \`a[href$=".pdf"]\` &rarr; Memilih link yang berakhiran file PDF.`,
        codeSnippet: {
          language: "css",
          filename: "selektor.css",
          code: `/* Memilih seluruh paragraf anak langsung dari kartu */
.card > p {
  color: #334155;
  line-height: 1.6;
}

/* Memilih input yang sedang disabled */
input[disabled] {
  background-color: #f1f5f9;
  cursor: not-allowed;
}

/* Memberikan ikon khusus untuk link dokumen PDF */
a[href$=".pdf"]::after {
  content: " 📄";
}`
        }
      },
      {
        id: "css-warna-background-gradien",
        title: "2.2 Warna, Background, dan Gradien Spektakuler",
        badge: "Visual",
        summary: "HEX, RGB, HSL, RGBA, background-image, background-size cover/contain, dan linear-gradient.",
        content: `**1. Model Warna di CSS:**
- **HEX:** \`#3b82f6\` (Merah, Hijau, Biru dalam heksadesimal).
- **RGB / RGBA:** \`rgba(59, 130, 246, 0.5)\` (A = Alpha/Transparansi dari 0.0 sampai 1.0).
- **HSL:** \`hsl(217, 91%, 60%)\` (Hue: sudut roda warna 0-360°, Saturation %, Lightness %).

**2. Properti Background:**
- \`background-color\`: Warna latar.
- \`background-image: url('gambar.jpg')\`
- \`background-size\`:
  - \`cover\`: Gambar mengisi seluruh layar tanpa gepeng (terpotong sebagian jika rasio beda).
  - \`contain\`: Seluruh gambar terlihat utuh di layar.
- \`background-position: center\`: Posisi titik tengah gambar.
- \`background-repeat: no-repeat\`: Mencegah gambar berulang-ulang seperti ubin.

**3. Gradien Warna:**
\`linear-gradient(direction, color1, color2)\``,
        codeSnippet: {
          language: "css",
          filename: "background.css",
          code: `.hero-banner {
  /* Gradien kombinasi warna modern */
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  padding: 60px 20px;
  text-align: center;
}

.card-cover {
  background-image: url('https://picsum.photos/800/400');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 250px;
  border-radius: 12px;
}`
        }
      },
      {
        id: "css-satuan-ukuran-tipografi",
        title: "2.3 Satuan Ukuran Web & Tipografi: px vs rem vs em vs dvh",
        badge: "Pondasi Ukuran",
        summary: "Perbedaan ukuran absolut vs relatif, Google Fonts, @font-face, dan rumus clamp().",
        content: `**1. Satuan Ukuran Absolut vs Relatif:**
- **\`px\` (Piksel):** Absolut, ukurannya kaku tidak berubah. Baik untuk border tipis (1px).
- **\`rem\` (Root EM) — STANDAR UTAMA:** Relatif terhadap font size elemen \`<html>\` (default browser: 16px).
  - 1rem = 16px | 1.5rem = 24px | 2rem = 32px.
  - *Kenapa wajib pakai rem?* Jika pengguna tunanetra memperbesar settingan font di komputernya, seluruh website kamu otomatis membesar proporsional!
- **\`em\`:** Relatif terhadap font size elemen induknya langsung (bagus untuk padding tombol yang ikut membesar jika teks tombol membesar).
- **\`vw\` & \`vh\`:** 1% dari lebar / tinggi viewport monitor.
- **\`dvh\` (Dynamic Viewport Height):** Solusi modern untuk layar smartphone! Mencegah layout terpotong akibat address bar browser HP yang muncul-tenggelam saat di-scroll.

**2. Tipografi Responsif dengan \`clamp()\`:**
\`font-size: clamp(min, val, max);\`
Contoh: \`font-size: clamp(1.5rem, 4vw, 3rem);\` &rarr; Teks otomatis mengecil di HP dan membesar halus di Laptop tanpa perlu media query!`,
        codeSnippet: {
          language: "css",
          filename: "typography.css",
          code: `html {
  font-size: 16px; /* Dasar 1rem */
}

/* Judul responsif otomatis tanpa media query */
h1 {
  font-size: clamp(1.75rem, 5vw, 3.5rem);
  font-family: 'Inter', system-ui, sans-serif;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

/* Mengisi tepat 1 layar penuh di smartphone tanpa bug address bar */
.full-screen-section {
  min-height: 100dvh;
}`
        }
      },
      {
        id: "css-box-model-margin-collapse",
        title: "2.4 Box Model, Margin Collapse & Box Sizing",
        badge: "Konsep Inti",
        summary: "Content, padding, border, margin, reset wajib border-box, dan fenomena margin collapse.",
        content: `**1. Reset Wajib Box-Sizing:**
Secara default (\`box-sizing: content-box\`), jika kamu memberi \`width: 200px\` lalu menambah \`padding: 20px\`, lebar total elemen membengkak jadi **240px**!
Tambahkan reset ini di baris pertama CSS:
\`\`\`css
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`
Dengan \`border-box\`, padding dan border dihitung di DALAM lebar yang ditentukan.

**2. Fenomena Aneh: Margin Collapse:**
Ketika dua elemen vertikal saling bertemu (misal elemen atas punya \`margin-bottom: 30px\` dan elemen bawah punya \`margin-top: 20px\`), margin mereka **TIDAK DIJUMLAHKAN (50px)**, melainkan **melebur menjadi satu mengambil nilai terbesar (30px)**!
*Catatan:* Margin collapse HANYA terjadi pada alur vertikal blok biasa, tidak terjadi pada elemen Flexbox atau Grid!`,
        codeSnippet: {
          language: "css",
          filename: "boxmodel.css",
          code: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.box {
  width: 100%;
  max-width: 400px;
  padding: 24px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  margin: 20px auto; /* Tengah horizontal */
}`
        }
      },
      {
        id: "css-display-position-deep",
        title: "2.5 Display & Position Masterclass: static, relative, absolute, fixed, sticky",
        badge: "Tata Letak",
        summary: "Membedah cara kerja koordinat top, left, right, bottom, dan kunci z-index.",
        content: `**1. Properti \`display\`:**
- \`block\`: Menempati 1 baris penuh, bisa diatur width dan height (contoh: div, p, h1).
- \`inline\`: Mengalir bersama teks, tidak bisa diatur width/height (contoh: span, a, strong).
- \`inline-block\`: Mengalir sejajar horizontal seperti teks TAPI bisa diatur width & height!
- \`none\`: Menghapus elemen dari tampilan dan dari alur halaman.

**2. Properti \`position\`:**
- **\`static\` (Default):** Elemen mengikuti alur dokumen normal (koordinat top/left tidak berfungsi).
- **\`relative\`:** Elemen tetap berada di alur normal, tapi bisa digeser dari posisi aslinya. Sering dijadikan **titik jangkar (patokan)** untuk anak yang berposisi absolute!
- **\`absolute\`:** Elemen keluar dari alur dokumen dan melayang bebas. Posisinya dihitung relatif terhadap parent terdekat yang memiliki \`position\` selain static.
- **\`fixed\`:** Menempel di layar monitor browser pengguna (tidak ikut bergerak saat halaman di-scroll). Cocok untuk tombol WhatsApp atau navbar fixed.
- **\`sticky\`:** Campuran relative dan fixed! Elemen bergerak normal saat di-scroll, lalu otomatis 'menempel' di layar saat mencapai batas koordinat tertentu (\`top: 0\`).`,
        codeSnippet: {
          language: "css",
          filename: "position.css",
          code: `/* Trik Populer: Parent Relative, Anak Absolute */
.card-produk {
  position: relative; /* Titik patokan jangkar */
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.badge-diskon {
  position: absolute;
  top: 10px;
  right: 10px;        /* Menempel di pojok kanan atas kartu */
  background: red;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}

/* Header yang menempel saat di-scroll */
.navbar-sticky {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
}`
        }
      },
      {
        id: "css-pseudoclasses-elements",
        title: "2.6 Pseudo-classes & Pseudo-elements: :hover, :nth-child, ::before, ::after",
        badge: "Interaksi & Hiasan",
        summary: "Status interaksi pengguna dan trik membuat elemen visual dekoratif tanpa merusak HTML.",
        content: `**1. Pseudo-classes (Status Khusus Elemen - Diawali satu titik dua \`:\`):**
- \`:hover\`: Saat kursor mouse melintas di atasnya.
- \`:focus\` & \`:focus-visible\`: Saat form input aktif atau tombol disorot keyboard TAB.
- \`:active\`: Saat tombol sedang ditekan klik mouse.
- \`:first-child\` & \`:last-child\`: Elemen pertama atau terakhir dalam wadah.
- \`:nth-child(2n)\` / \`:nth-child(odd)\`: Memilih baris genap/ganjil (sangat berguna untuk warna selang-seling tabel striping!).
- \`:not(.aktif)\`: Memilih seluruh elemen KECUALI yang memiliki class .aktif.

**2. Pseudo-elements (Bagian Tertentu Elemen - Diawali dua titik dua \`::\`):**
- \`::before\` & \`::after\`: Menyisipkan elemen dekoratif buatan di awal atau akhir konten (WAJIB menyertakan atribut \`content: ""\`).
- \`::placeholder\`: Mengatur gaya warna teks petunjuk di dalam kotak input.
- \`::selection\`: Mengatur warna highlight saat teks di halaman diblok mouse oleh pengguna.`,
        codeSnippet: {
          language: "css",
          filename: "pseudo.css",
          code: `/* Garis aksen cantik di bawah judul menggunakan ::after */
.judul-seksi {
  position: relative;
  margin-bottom: 24px;
}

.judul-seksi::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 50px;
  height: 4px;
  background-color: #3b82f6;
  border-radius: 2px;
}

/* Warna selang-seling tabel */
table tr:nth-child(even) {
  background-color: #f8fafc;
}`
        }
      },
      {
        id: "css-flexbox-masterclass",
        title: "2.7 Flexbox Masterclass Lengkap (Container & Item Properties)",
        badge: "Wajib Layout",
        summary: "Main axis, cross axis, justify-content, align-items, flex-wrap, gap, flex-grow, shrink, basis.",
        content: `Flexbox adalah sistem layout 1 Dimensi (baris ATAU kolom).

**1. Properti untuk Parent (Flex Container):**
- \`display: flex;\` (atau \`inline-flex\`).
- \`flex-direction\`: \`row\` (default horizontal), \`column\` (vertikal), \`row-reverse\`.
- \`flex-wrap\`: \`nowrap\` (memaksa 1 baris), \`wrap\` (otomatis turun ke bawah jika sempit).
- \`justify-content\` (Alur Utama / Main Axis): \`flex-start\`, \`center\`, \`flex-end\`, \`space-between\`, \`space-around\`, \`space-evenly\`.
- \`align-items\` (Alur Silang / Cross Axis): \`stretch\` (default), \`center\`, \`flex-start\`, \`flex-end\`.
- \`gap: 16px;\`: Jarak bersih antar item.

**2. Properti untuk Child (Flex Items):**
- \`flex-grow: 1\`: Kemampuan membesar mengambil sisa ruang kosong.
- \`flex-shrink: 0\`: Mencegah elemen mengecil/gepeng saat wadah sempit.
- \`flex-basis: 250px\`: Ukuran awal elemen sebelum sisa ruang dibagikan.
- \`align-self\`: Mengatur perataan satu anak khusus agar beda dari saudara-saudaranya.`,
        codeSnippet: {
          language: "css",
          filename: "flexbox-lengkap.css",
          code: `.kartu-container {
  display: flex;
  flex-wrap: wrap; /* Turun ke baris baru jika layar HP */
  gap: 20px;
  justify-content: center;
}

.kartu-item {
  /* grow: 1, shrink: 1, basis: 280px */
  flex: 1 1 280px; 
  background: white;
  padding: 20px;
  border-radius: 8px;
}`
        }
      },
      {
        id: "css-grid-masterclass",
        title: "2.8 CSS Grid Masterclass: 2 Dimensi Baris & Kolom",
        badge: "Grid Modern",
        summary: "grid-template-columns, fr unit, repeat, auto-fit, minmax, dan grid-template-areas.",
        content: `Jika Flexbox untuk 1 dimensi, **CSS Grid adalah penguasa layout 2 Dimensi (baris dan kolom sekaligus)**.

**Konsep Utama:**
- \`display: grid;\`
- \`grid-template-columns: 1fr 2fr 1fr;\`: Membagi menjadi 3 kolom dengan rasio pecahan (\`fr\` = fraction).
- \`repeat(3, 1fr)\`: Penulisan singkat untuk membuat 3 kolom berukuran sama rata.
- \`repeat(auto-fit, minmax(250px, 1fr))\`: Pola sakti membuat kolom produk otomatis responsif tanpa media query!
- \`grid-column: 1 / 3\`: Elemen melebar dari garis kolom 1 sampai garis 3 (memakan 2 kolom).`,
        codeSnippet: {
          language: "css",
          filename: "grid.css",
          code: `.galeri-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

/* Banner promosi yang memakan 2 kolom sekaligus */
.item-unggulan {
  grid-column: span 2;
}`
        }
      },
      {
        id: "css-animasi-transisi",
        title: "2.9 Transisi, Transformasi, dan Animasi Keyframes",
        badge: "Animasi Halus",
        summary: "transition property, duration, timing-function, transform (scale, rotate, translate), dan @keyframes.",
        content: `**1. CSS Transitions (Animasi Antara Dua Status):**
\`transition: [property] [duration] [timing-function] [delay];\`
Contoh: \`transition: all 0.3s ease-in-out;\`

**2. CSS Transform (Manipulasi Bentuk/Posisi 2D):**
- \`transform: scale(1.05);\`: Memperbesar ukuran 5%.
- \`transform: translateY(-5px);\`: Mengangkat elemen ke atas 5 pixel.
- \`transform: rotate(45deg);\`: Memutar 45 derajat.

**3. Animasi Mandiri Berkelanjutan (\`@keyframes\`):**
Membuat animasi yang berjalan otomatis tanpa perlu kursor hover pengguna.`,
        codeSnippet: {
          language: "css",
          filename: "animasi.css",
          code: `/* Tombol interaktif dengan transisi halus */
.btn-modern {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.btn-modern:hover {
  background-color: #2563eb;
  transform: translateY(-2px); /* Efek tombol melayang naik */
}

/* Animasi Putar Loading Spinner */
@keyframes putar {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  width: 30px;
  height: 30px;
  border: 4px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: putar 1s linear infinite;
}`
        }
      },
      {
        id: "css-variabel-kalkulasi",
        title: "2.10 CSS Variables (Custom Properties) & Fungsi Matematika calc()",
        badge: "Standar Masa Kini",
        summary: "Mendeklarasikan variabel --warna-utama, var(), dan rumus perhitungan dinamis calc().",
        content: `**1. Variabel CSS Native (Custom Properties):**
Dideklarasikan dengan awalan dua strip \`--\` di dalam selektor \`:root\` agar bisa diakses di seluruh file:
\`\`\`css
:root {
  --primary-color: #3b82f6;
  --radius-card: 16px;
}

.tombol {
  background-color: var(--primary-color);
  border-radius: var(--radius-card);
}
\`\`\`
*Keuntungan Dahsyat:* Ketika ingin membuat Dark Mode, kamu cukup mengganti nilai variabel di satu tempat!

**2. Fungsi Matematika \`calc()\`, \`min()\`, \`max()\`, \`clamp()\`:**
Menghitung ukuran campuran antar satuan yang berbeda:
\`width: calc(100% - 40px);\` (lebar penuh dikurangi 40px).`,
        codeSnippet: {
          language: "css",
          filename: "variables.css",
          code: `:root {
  --bg-color: #ffffff;
  --text-color: #0f172a;
  --primary: #2563eb;
}

/* Mengubah variabel saat mode gelap */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #0f172a;
    --text-color: #f8fafc;
    --primary: #60a5fa;
  }
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}`
        }
      }
    ],
    finalProject: {
      title: "Proyek Modul 2: Website Katalog Produk Responsif dengan Animasi & CSS Variables",
      description: "Membangun 1 website landing page lengkap murni CSS3: Header sticky dengan navbar, Hero banner gradien, Grid galeri produk responsif menggunakan repeat(auto-fit, minmax(280px, 1fr)), efek kartu melayang dengan transition/transform, kartu diskon dengan position absolute, serta mendukung Dark Mode menggunakan CSS Variables.",
      requirements: [
        "100% menggunakan CSS murni (tanpa framework)",
        "Menggunakan sistem Flexbox dan CSS Grid pada tempat yang tepat",
        "Menggunakan satuan rem dan variabel CSS (--primary, --bg)",
        "Memiliki efek transisi hover pada tombol dan kartu",
        "Responsif di layar HP (360px) tanpa scroll horizontal bocor"
      ],
      submissionTip: "Uji coba toggle dark mode di sistem operasi laptopmu dan pastikan warna website berubah otomatis berkat CSS Variables."
    }
  },
  {
    id: "modul-3",
    slug: "javascript-modern-es6-lengkap",
    level: 3,
    title: "Modul 3: JavaScript Modern (ES6+) & Engine V8",
    tagline: "Variabel const/let, Arrow Function, Array Methods (.map/.filter), Destructuring, Async/Await, dan Event Loop.",
    estimatedTime: "2 Minggu",
    color: "emerald",
    iconName: "Code2",
    description: "Fondasi logika sebelum masuk ke React dan Next.js. Siswa menguasai sintaks modern ES6, manipulasi array of objects, asinkronisasi data internet via Fetch API, hingga pemahaman Event Loop V8.",
    learningOutcomes: [
      "Menguasai const, let, template literals, dan arrow function.",
      "Menguasai fungsi sakti array: .map(), .filter(), .find(), .reduce().",
      "Menguasai Object/Array Destructuring dan Rest/Spread Operator (...).",
      "Menguasai Asynchronous JS: Promise, async/await, dan pengambilan data via fetch().",
      "Memahami Event Loop: Call Stack, Microtasks (Promise), dan Macrotasks (setTimeout)."
    ],
    topics: [
      {
        id: "js-es6-dasar",
        title: "3.1 Variabel Modern, Template Literals & Arrow Function",
        badge: "Sintaks ES6",
        summary: "Perbedaan const vs let, template literal `${var}`, dan kelebihan arrow function.",
        content: `**1. Variabel Modern:**
- \`const\`: Untuk nilai tetap yang tidak di-assign ulang (gunakan secara default).
- \`let\`: Untuk nilai yang akan diubah (misal: loop counter).
- Jangan gunakan \`var\` lagi karena memiliki masalah hoisting dan function scoping yang rawan bug.

**2. Template Literals:**
Gunakan tanda backtick (\`\`) untuk menggabungkan variabel dan teks tanpa repot tanda tambah (+):
\`const pesan = \`Halo \${nama}, umurmu \${umur} tahun\`;\`

**3. Arrow Function:**
Bentuk fungsi ringkas masa kini:
\`const tambah = (a, b) => a + b;\``,
        codeSnippet: {
          language: "javascript",
          filename: "es6-dasar.js",
          code: `const nama = "Budi";
const role = "Frontend Engineer";

// Arrow function satu baris dengan template literal
const sapaPengguna = (n, r) => \`Selamat datang \${n}, Anda login sebagai \${r}.\`;

console.log(sapaPengguna(nama, role));`
        }
      },
      {
        id: "js-array-methods-sakti",
        title: "3.2 Array Methods Sakti: .map(), .filter(), .reduce(), .find()",
        badge: "Tulang Punggung React",
        summary: "Metode fungsional memanipulasi data tanpa mengubah data asli (immutability).",
        content: `Di React dan Next.js, 90% manipulasi data tampilan menggunakan 2 fungsi ini:
1. **\`.map()\`:** Mengubah setiap item array menjadi item baru (misal: mengubah data objek produk menjadi elemen kartu JSX).
2. **\`.filter()\`:** Menyaring data berdasarkan syarat tertentu (misal: pencarian produk atau hapus data).
3. **\`.find()\`:** Mengambil 1 item pertama yang cocok.
4. **\`.reduce()\`:** Mengakumulasi seluruh nilai array menjadi 1 nilai akhir (misal: menghitung total harga keranjang).`,
        codeSnippet: {
          language: "javascript",
          filename: "arrayMethods.js",
          code: `const produk = [
  { id: 1, nama: "Laptop", harga: 8000000, stok: 5 },
  { id: 2, nama: "Mouse", harga: 150000, stok: 0 },
  { id: 3, nama: "Keyboard", harga: 500000, stok: 10 }
];

// 1. Ambil hanya produk yang ada stoknya (.filter)
const produkTersedia = produk.filter((p) => p.stok > 0);

// 2. Format teks harga produk (.map)
const daftarHarga = produkTersedia.map((p) => \`\${p.nama}: Rp \${p.harga.toLocaleString()}\`);
console.log(daftarHarga);

// 3. Hitung total nilai inventaris (.reduce)
const totalAset = produk.reduce((total, p) => total + (p.harga * p.stok), 0);
console.log("Total Aset Toko: Rp", totalAset.toLocaleString());`
        }
      },
      {
        id: "js-destructuring-spread",
        title: "3.3 Destructuring & Spread Operator (...) pada Objek & Array",
        badge: "Paling Populer",
        summary: "Mengekstrak data bersih dan membuat salinan data baru tanpa mutasi.",
        content: `**1. Destructuring:**
Membongkar isi properti objek langsung ke nama variabel:
\`const { judul, harga } = produk;\`

**2. Spread Operator (\`...\`):**
Membuka isi bungkusan array atau objek untuk digabungkan dengan data baru:
\`const updateHarga = { ...produk, harga: 7500000 };\``,
        codeSnippet: {
          language: "javascript",
          filename: "spread.js",
          code: `const user = { id: 1, nama: "Andi", kota: "Jakarta" };

// Destructuring
const { nama, kota } = user;
console.log(nama, kota);

// Menambah data array secara immutable
const listLama = ["Tugas 1", "Tugas 2"];
const listBaru = [...listLama, "Tugas 3"];
console.log(listBaru);`
        }
      },
      {
        id: "js-async-fetch-eventloop",
        title: "3.4 Asynchronous JS, Fetch API, & Arsitektur Event Loop",
        badge: "Koneksi API",
        summary: "Promise, async/await, mengambil data JSON publik, dan pemahaman urutan eksekusi.",
        content: `JavaScript berjalan single-threaded. Saat mengambil data dari server internet, kita menggunakan \`async\` dan \`await\` agar browser tidak hang membeku saat menunggu respon server.

**Siklus Event Loop:**
Kode sinkron &rarr; Microtasks (\`Promise\`, \`await\`) &rarr; Macrotasks (\`setTimeout\`).`,
        codeSnippet: {
          language: "javascript",
          filename: "fetchAsync.js",
          code: `// Mengambil data dari API publik secara asinkron
async function ambilDataUser() {
  try {
    const respon = await fetch("https://dummyjson.com/users?limit=3");
    if (!respon.ok) throw new Error("Gagal mengambil data dari server");
    
    const data = await respon.json();
    console.log("Daftar Pengguna:", data.users);
  } catch (err) {
    console.error("Terjadi Error:", err.message);
  }
}

ambilDataUser();`
        }
      }
    ],
    finalProject: {
      title: "Proyek Modul 3: Dashboard Data Publik dengan Filter & Pencarian Instan",
      description: "Membuat aplikasi web yang mengambil data dari REST API publik (misal DummyJSON), menampilkan daftar kartu produk dengan .map(), menyediakan input pencarian real-time dengan .filter(), dan menghitung total harga dengan .reduce().",
      requirements: [
        "Data diambil menggunakan async/await dan fetch() dengan penanganan try/catch",
        "Menampilkan status Loading saat data sedang diunduh",
        "Fitur pencarian instan memfilter array tanpa merusak data asli",
        "100% menggunakan sintaks ES6 (const, arrow function, destructuring)"
      ],
      submissionTip: "Coba simulasikan jaringan Offline di DevTools tab Network untuk menguji apakah pesan error ditangkap dengan baik oleh try/catch."
    }
  },
  {
    id: "modul-4",
    slug: "tailwind-css-v4-mastery",
    level: 4,
    title: "Modul 4: Tailwind CSS v4 & Arsitektur Design System",
    tagline: "Styling utility-first cepat, sistem breakpoint, token desain @theme, dan helper cn() / CVA.",
    estimatedTime: "1-2 Minggu",
    color: "cyan",
    iconName: "Palette",
    description: "Setelah paham CSS murni, siswa belajar Tailwind CSS v4: utility-first, token variabel desain, responsive breakpoints (sm/md/lg), pseudo-classes, dan teknik komponen reusable bebas konflik dengan clsx dan tailwind-merge.",
    learningOutcomes: [
      "Memahami filosofi Utility-First CSS dan padanan aturan CSS biasa ke class Tailwind.",
      "Menguasai sistem jarak proporsional Tailwind (skala x 4px: p-1, p-2, p-4, p-6).",
      "Menguasai responsive breakpoint mobile-first: sm:, md:, lg:, xl:.",
      "Mampu membuat interaksi hover:, focus:, active:, dan transisi animasi.",
      "Menguasai helper cn() dan Class Variance Authority (CVA) untuk membuat UI Kit profesional."
    ],
    topics: [
      {
        id: "tailwind-filosofi-kamus",
        title: "4.1 Filosofi Utility-First & Kamus Padanan CSS ke Tailwind",
        badge: "Pondasi Tailwind",
        summary: "Mengapa tidak perlu lagi memikirkan nama class aneh, dan tabel terjemahan CSS murni ke Tailwind.",
        content: `Di Tailwind, alih-alih membuat file CSS baru dan pusing memberi nama class (seperti \`.card-wrapper-item-inner\`), kita merakit tampilan langsung di file HTML/JSX menggunakan class utilitas kecil.

| CSS Murni | Class Tailwind | Penjelasan |
| :--- | :--- | :--- |
| \`display: flex; justify-content: center; align-items: center;\` | \`flex justify-center items-center\` | Posisi tengah flexbox |
| \`display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;\` | \`grid grid-cols-3 gap-4\` | Grid 3 kolom berjarak |
| \`padding: 16px;\` | \`p-4\` | Jarak dalam (skala 4 x 4px = 16px) |
| \`padding-left: 24px; padding-right: 24px;\` | \`px-6\` | Jarak horizontal 24px |
| \`margin: 0 auto;\` | \`mx-auto\` | Tengah horizontal |
| \`font-size: 24px; font-weight: bold;\` | \`text-2xl font-bold\` | Ukuran dan ketebalan teks |
| \`border-radius: 12px;\` | \`rounded-xl\` | Sudut membulat |
| \`box-shadow: 0 4px 6px ...;\` | \`shadow-md\` | Bayangan kartu |`,
        tips: [
          "Rumus angka jarak di Tailwind: Angka selalu dikali 4px! (p-1 = 4px, p-2 = 8px, p-4 = 16px, p-6 = 24px, p-8 = 32px)."
        ]
      },
      {
        id: "tailwind-responsive-states",
        title: "4.2 Responsive Breakpoints & Efek State (Hover, Focus, Dark)",
        badge: "Interaktivitas",
        summary: "Mobile-first breakpoints sm:, md:, lg:, dan efek interaktif hover:, focus:, active:.",
        content: `**1. Breakpoints Responsif (Mobile-First):**
- Default (tanpa awalan) = Layar Smartphone (Mobile).
- \`sm:\` = Layar >= 640px.
- \`md:\` = Layar Tablet >= 768px.
- \`lg:\` = Layar Komputer / Laptop >= 1024px.
- \`xl:\` = Layar Monitor Lebar >= 1280px.

Contoh: \`w-full md:w-1/2 lg:w-1/3\` &rarr; Lebar penuh di HP, setengah layar di Tablet, sepertiga layar di Laptop!

**2. Efek State & Pseudo-Classes:**
- \`hover:bg-blue-700\`: Berubah warna saat mouse melintas.
- \`focus:ring-2 focus:ring-blue-500\`: Garis cincin saat input sedang diketik.
- \`active:scale-95\`: Efek tombol sedikit mengecil saat ditekan klik.
- \`transition duration-200\`: Memastikan semua perubahan warna/skala berjalan mulus.`,
        codeSnippet: {
          language: "html",
          filename: "responsive-card.html",
          code: `<!-- Kartu Responsif + Hover Animation -->
<div class="w-full md:w-80 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
  <span class="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">Materi Baru</span>
  <h3 class="text-lg font-bold text-slate-900 mt-3">Tailwind CSS Responsif</h3>
  <p class="text-sm text-slate-600 mt-2 leading-relaxed">
    Desain antarmuka web modern langsung di class tanpa menulis ratusan baris CSS manual.
  </p>
  <button class="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl transition">
    Pelajari Lebih Lanjut &rarr;
  </button>
</div>`
        }
      },
      {
        id: "tailwind-cva-cn",
        title: "4.3 Komponen Reusable Bebas Bentrok: Helper cn() & CVA (Pola shadcn/ui)",
        badge: "Standar Industri",
        summary: "Kombinasi clsx dan tailwind-merge untuk membuat komponen yang class-nya bisa ditimpa dari luar.",
        content: `Di React, saat kita membuat komponen tombol yang memiliki class default \`p-4\`, lalu dari luar kita memberi prop \`className="p-8"\`, class mana yang menang?
Di CSS biasa sering terjadi konflik.

Solusinya adalah fungsi **\`cn()\`** (menggunakan library \`clsx\` + \`tailwind-merge\`):
Fungsi ini cerdas mengetahui bahwa \`p-8\` menimpa \`p-4\`, sehingga \`p-4\` otomatis dihapus dari string akhir!`,
        codeSnippet: {
          language: "tsx",
          filename: "lib/utils.ts",
          code: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// CONTOH PEMAKAIAN PADA KOMPONEN:
/*
function Button({ className, children }) {
  return (
    <button className={cn("px-4 py-2 bg-blue-600 text-white rounded-lg", className)}>
      {children}
    </button>
  );
}
*/`
        }
      }
    ],
    finalProject: {
      title: "Proyek Modul 4: Landing Page Produk Modern 100% Tailwind CSS",
      description: "Membangun 1 halaman landing page lengkap menggunakan Tailwind CSS: Navbar responsif dengan menu mobile, Hero Section dengan tombol Call to Action, Grid Fitur 3 kolom di desktop, dan Footer.",
      requirements: [
        "100% styling menggunakan class Tailwind CSS",
        "Layout responsif (tampil rapi di layar 360px sampai 1440px)",
        "Memiliki efek transisi dan hover di semua tombol dan link",
        "Memiliki kombinasi kontras warna teks dan latar yang nyaman dibaca"
      ],
      submissionTip: "Pastikan kontainer utama dibungkus dengan max-w-6xl mx-auto px-4 agar konten tidak melebar tanpa batas di monitor ultra-wide."
    }
  },
  {
    id: "modul-5",
    slug: "react-js-fondasi-komponen",
    level: 5,
    title: "Modul 5: React.js (Fondasi Komponen, Props, & State)",
    tagline: "Mental model puzzle komponen, JSX, Props, useState, useEffect, useReducer, dan Custom Hooks.",
    estimatedTime: "2 Minggu",
    color: "violet",
    iconName: "Atom",
    description: "Next.js adalah framework di atas React. Siswa belajar cara berpikir deklaratif: memecah UI menjadi komponen mandiri, mengirim data via Props, mengelola interaktivitas dengan useState, mengambil data via useEffect, dan mengelola state kompleks dengan useReducer.",
    learningOutcomes: [
      "Memahami konsep UI = f(State) dan sintaks JSX.",
      "Mampu membuat komponen modular dan mengirim data via Props.",
      "Menguasai pengelolaan status dinamis dengan hook useState.",
      "Mengambil data API saat komponen dimuat menggunakan hook useEffect.",
      "Menguasai useReducer untuk transaksi data kompleks (keranjang belanja)."
    ],
    topics: [
      {
        id: "react-komponen-props",
        title: "5.1 Mental Model Komponen, JSX, & Props Reusable",
        badge: "Pondasi React",
        summary: "Memecah halaman jadi kepingan puzzle lego dan mengirim parameter props.",
        content: `Di React:
1. **Komponen:** Fungsi JavaScript yang mengembalikan kode tampilan (JSX). Nama fungsi WAJIB huruf kapital (contoh: \`Navbar\`, bukan \`navbar\`).
2. **JSX:** Menulis struktur HTML langsung di dalam JavaScript. Atribut class diganti menjadi \`className\`.
3. **Props:** Parameter yang dikirim dari komponen induk (Parent) ke komponen anak (Child) agar komponen bisa dipakai berulang kali dengan isi berbeda.`,
        codeSnippet: {
          language: "jsx",
          filename: "KartuProfil.jsx",
          code: `// Komponen Anak: Menerima props
function KartuSiswa({ nama, jurusan, nilai }) {
  return (
    <div className="p-4 bg-white border rounded-xl shadow-xs">
      <h3 className="font-bold text-slate-800">{nama}</h3>
      <p className="text-sm text-slate-500">{jurusan}</p>
      <span className="inline-block mt-2 px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full">
        Nilai: {nilai}
      </span>
    </div>
  );
}

// Komponen Induk: Memanggil komponen berkali-kali
export default function DaftarKelas() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <KartuSiswa nama="Budi" jurusan="Frontend" nilai={90} />
      <KartuSiswa nama="Siti" jurusan="Fullstack" nilai={95} />
    </div>
  );
}`
        }
      },
      {
        id: "react-usestate-interaktif",
        title: "5.2 useState: Mengelola Status Dinamis & Interaksi Pengguna",
        badge: "Wajib Kuasai",
        summary: "Bagaimana mengubah tampilan layar otomatis saat data berubah tanpa utak-atik DOM manual.",
        content: `Ketika variabel biasa berubah, React tidak tahu bahwa layar harus diperbarui.
Dengan \`useState\`, begitu kita memanggil fungsi setter-nya (misal: \`setCount(count + 1)\`), React **otomatis me-render ulang tampilan** dengan data baru!`,
        codeSnippet: {
          language: "jsx",
          filename: "Counter.jsx",
          code: `import { useState } from "react";

export default function Counter() {
  const [jumlah, setJumlah] = useState(0);

  return (
    <div className="p-6 bg-slate-50 rounded-xl text-center">
      <p className="text-sm text-slate-500">Jumlah Klik:</p>
      <h2 className="text-4xl font-extrabold my-2">{jumlah}</h2>
      
      <div className="flex justify-center gap-2">
        <button 
          onClick={() => setJumlah(jumlah - 1)}
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 font-bold rounded-lg"
        >
          - Kurang
        </button>
        <button 
          onClick={() => setJumlah(jumlah + 1)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
        >
          + Tambah
        </button>
      </div>
    </div>
  );
}`
        },
        pitfalls: [
          "DILARANG mengubah state langsung: 'jumlah = jumlah + 1'. Selalu gunakan setter 'setJumlah(jumlah + 1)'."
        ]
      },
      {
        id: "react-useeffect-fetch",
        title: "5.3 useEffect: Menghubungkan Komponen ke Dunia Luar (Fetch API)",
        badge: "Efek Samping",
        summary: "Mengambil data saat halaman dibuka dan memahami array dependensi [].",
        content: `Kapan kita butuh \`useEffect\`? Saat ingin menjalankan kode otomatis di luar alur render React, seperti:
- Mengambil data dari server API saat halaman pertama kali muncul.
- Memasang timer / interval.
- Mengubah judul tab browser (\`document.title\`).

**Aturan Dependency Array:**
- \`[]\` (kosong): Efek hanya berjalan **SATU KALI** saat komponen pertama kali lahir (*mount*).
- \`[id]\`: Efek berjalan ulang setiap kali nilai variabel \`id\` berubah.`,
        codeSnippet: {
          language: "jsx",
          filename: "DaftarUser.jsx",
          code: `import { useState, useEffect } from "react";

export default function DaftarUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=3")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      });
  }, []); // Array kosong = hanya jalankan 1x saat buka halaman

  if (loading) return <p className="text-slate-500">Sedang memuat data...</p>;

  return (
    <ul className="space-y-2">
      {users.map((u) => (
        <li key={u.id} className="p-3 bg-white border rounded-lg">
          <p className="font-bold">{u.firstName} {u.lastName}</p>
          <p className="text-xs text-slate-500">{u.email}</p>
        </li>
      ))}
    </ul>
  );
}`
        }
      }
    ],
    finalProject: {
      title: "Proyek Modul 5: Mini E-Commerce Shopping Cart dengan React & Tailwind",
      description: "Membangun aplikasi katalog barang: Menampilkan data produk dari API, tombol 'Tambah ke Keranjang', dan panel ringkasan belanja yang menghitung total item dan total harga belanjaan secara otomatis.",
      requirements: [
        "Memisahkan UI menjadi minimal 3 komponen terpisah",
        "Menggunakan useState untuk menyimpan barang di keranjang",
        "Menggunakan useEffect untuk mengambil data produk di awal",
        "Styling rapi menggunakan Tailwind CSS"
      ],
      submissionTip: "Pastikan list barang dirender dengan key={item.id} yang stabil (bukan index array)."
    }
  },
  {
    id: "modul-6",
    slug: "nextjs-app-router-mastery",
    level: 6,
    title: "Modul 6: Next.js App Router (Tujuan Akhir & Fullstack Frontend)",
    tagline: "File-system routing, Server Components vs Client Components, Dynamic Routes, Caching, Server Actions, dan Deploy ke Vercel.",
    estimatedTime: "2-3 Minggu",
    color: "indigo",
    iconName: "Rocket",
    description: "Puncak dari roadmap belajar! Siswa menggabungkan seluruh keahlian HTML, CSS, JavaScript, Tailwind, dan React ke dalam Next.js App Router: arsitektur Server Component (0 KB JS ke browser), dynamic routing, data fetching langsung di komponen, hingga mendeploy web online ke Vercel.",
    learningOutcomes: [
      "Menguasai struktur folder App Router (layout.tsx, page.tsx, not-found.tsx, loading.tsx).",
      "Memahami perbedaan mutlak Server Components (default) vs Client Components ('use client').",
      "Mampu membuat Dynamic Routing (contoh: halaman detail artikel /artikel/[id]).",
      "Memahami strategi Caching dan Revalidation data di Next.js.",
      "Menguasai deployment gratis ke platform Vercel dari repository GitHub."
    ],
    topics: [
      {
        id: "nextjs-arsitektur-app-router",
        title: "6.1 Arsitektur Folder App Router & Navigasi Cepat",
        badge: "Routing Otomatis",
        summary: "Struktur folder menentukan URL web secara otomatis tanpa library tambahan.",
        content: `Di Next.js App Router:
- \`app/page.tsx\` &rarr; Halaman utama beranda (URL: \`/\`)
- \`app/about/page.tsx\` &rarr; Halaman Tentang (URL: \`/about\`)
- \`app/kontak/page.tsx\` &rarr; Halaman Kontak (URL: \`/kontak\`)
- \`app/layout.tsx\` &rarr; Template bersama (Navbar & Footer tetap ada di semua halaman)

Gunakan komponen **\`<Link href="...">\`** pengganti tag \`<a>\` agar perpindahan halaman berlangsung instan tanpa reload browser!`,
        codeSnippet: {
          language: "tsx",
          filename: "app/layout.tsx",
          code: `import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-900">
        <nav className="p-4 bg-white border-b flex justify-between items-center max-w-5xl mx-auto">
          <Link href="/" className="font-extrabold text-blue-600">MyWebsite</Link>
          <div className="flex gap-4 text-sm font-medium">
            <Link href="/" className="hover:text-blue-600">Beranda</Link>
            <Link href="/about" className="hover:text-blue-600">Tentang</Link>
          </div>
        </nav>
        
        <main className="max-w-5xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}`
        }
      },
      {
        id: "nextjs-server-vs-client",
        title: "6.2 Server Components vs Client Components ('use client')",
        badge: "Kunci Next.js",
        summary: "Kapan kode berjalan di Server (cepat & aman), dan kapan butuh 'use client' di browser.",
        content: `**1. Server Component (DEFAULT):**
- Berjalan di server komputer Next.js.
- Ukuran JavaScript yang dikirim ke browser pengguna adalah **0 KB**!
- Bisa langsung mengambil data dengan \`async/await\` tanpa butuh \`useEffect\` atau \`useState\`.

**2. Client Component (Wajib tulis 'use client' di baris paling atas):**
- Berjalan di browser pengguna.
- **Hanya dipakai jika butuh:**
  - Interaksi klik: \`onClick\`, \`onSubmit\`.
  - State React: \`useState\`, \`useReducer\`.
  - Efek browser: \`useEffect\`, \`localStorage\`.`,
        codeSnippet: {
          language: "tsx",
          filename: "app/produk/page.tsx",
          code: `// SERVER COMPONENT: Mengambil data langsung di server!
// Tidak perlu useState dan useEffect lagi!
export default async function HalamanProduk() {
  const res = await fetch("https://dummyjson.com/products?limit=3");
  const data = await res.json();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daftar Produk Unggulan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.products.map((item: any) => (
          <div key={item.id} className="p-4 bg-white border rounded-xl shadow-xs">
            <h2 className="font-bold">{item.title}</h2>
            <p className="text-sm text-slate-500 mt-1">Rp {item.price * 15000}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`
        }
      },
      {
        id: "nextjs-dynamic-routes",
        title: "6.3 Dynamic Routes: Halaman Detail Artikel Dinamis [id]",
        badge: "Rute Dinamis",
        summary: "Membuat URL dinamis seperti /blog/1, /blog/belajar-html dengan folder [slug].",
        content: `Ketika kita memiliki ribuan artikel, kita tidak mungkin membuat ribuan folder manual.
Solusinya: Buat nama folder dengan kurung siku: **\`app/artikel/[id]/page.tsx\`**.
Next.js otomatis memberikan parameter URL tersebut ke dalam komponen!`,
        codeSnippet: {
          language: "tsx",
          filename: "app/artikel/[id]/page.tsx",
          code: `// Halaman ini otomatis menangani URL: /artikel/1, /artikel/100, dll.
export default async function DetailArtikel({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const res = await fetch(\`https://dummyjson.com/posts/\${id}\`);
  const artikel = await res.json();

  return (
    <article className="max-w-2xl mx-auto py-8">
      <span className="text-xs font-bold text-blue-600 uppercase">Artikel #{id}</span>
      <h1 className="text-3xl font-extrabold text-slate-900 mt-2">{artikel.title}</h1>
      <p className="mt-4 text-slate-700 leading-relaxed">{artikel.body}</p>
    </article>
  );
}`
        }
      },
      {
        id: "nextjs-deploy-vercel",
        title: "6.4 Deploy Web Gratis ke Seluruh Dunia (Vercel)",
        badge: "Go Live!",
        summary: "Menghubungkan repository GitHub ke Vercel agar website bisa diakses semua orang.",
        content: `Langkah menerbitkan website ke internet dalam 3 menit:
1. Simpan kode ke repository GitHub kamu.
2. Buka **vercel.com** & login dengan akun GitHub.
3. Klik tombol **Add New Project** > pilih repository kamu.
4. Klik tombol **Deploy**.
5. Selesai! Web kamu langsung memiliki domain online resmi: \`nama-proyek.vercel.app\` lengkap dengan HTTPS aman gratis!`,
        tips: [
          "Setiap kali kamu melakukan 'git push' ke GitHub, Vercel otomatis meng-update website online dalam beberapa detik!"
        ]
      }
    ],
    finalProject: {
      title: "Final Capstone Project: Web Portal Berita & Blog Portofolio Fullstack Frontend",
      description: "Membangun website lengkap siap produksi menggunakan Next.js App Router dan Tailwind CSS: Beranda dengan layout bersama (Navbar & Footer), Halaman Daftar Berita dengan Server Component data fetching, Halaman Detail Dinamis (/berita/[id]), Fitur Pencarian di sisi Client, dan ter-deploy online di Vercel.",
      requirements: [
        "Menggunakan Next.js App Router dengan layout bersama",
        "Memiliki dynamic route (/artikel/[id])",
        "Menggabungkan Server Component dan Client Component secara tepat",
        "Desain 100% responsif di HP dan Laptop dengan Tailwind CSS",
        "Ter-deploy online di Vercel dan link bisa dibuka publik"
      ],
      submissionTip: "Sertakan tautan repository GitHub dan tautan domain live .vercel.app sebagai portofolio kelulusan siswa."
    }
  }
];

export const CHEATSHEETS = [
  {
    category: "HTML5 Elemen & Semantik",
    items: [
      { code: "<header> & <nav>", desc: "Area kepala website dan menu navigasi" },
      { code: "<main> & <section>", desc: "Konten utama halaman dan seksi tematik" },
      { code: "<article> & <aside>", desc: "Konten mandiri (kartu berita) dan sidebar" },
      { code: "<details> & <summary>", desc: "Accordion buka-tutup native tanpa JavaScript" },
      { code: "<dialog id='x'>", desc: "Native modal dialog (dialog.showModal())" },
      { code: "<picture> & <source>", desc: "Gambar responsif dengan format AVIF/WebP" }
    ]
  },
  {
    category: "HTML Form & Validasi",
    items: [
      { code: "<label for='id'>", desc: "Menghubungkan label teks ke input (wajib a11y)" },
      { code: "<input type='email' required>", desc: "Validasi otomatis format email dan kolom wajib" },
      { code: "<input list='id-datalist'>", desc: "Input teks dengan saran autocomplete rekomendasi" },
      { code: "<select> & <option>", desc: "Menu dropdown pilihan" },
      { code: "pattern='[0-9]{10}'", desc: "Validasi input menggunakan ekspresi Regex" }
    ]
  },
  {
    category: "CSS Layout, Flex & Grid",
    items: [
      { code: "*, *::before { box-sizing: border-box; }", desc: "Reset wajib agar padding tidak membengkakkan elemen" },
      { code: "display: flex; gap: 16px;", desc: "Flexbox container dengan jarak bersih antar anak" },
      { code: "flex: 1 1 250px;", desc: "flex-grow: 1, flex-shrink: 1, basis: 250px" },
      { code: "flex-shrink: 0;", desc: "Mengunci elemen agar tidak gepeng saat sempit" },
      { code: "repeat(auto-fit, minmax(280px, 1fr))", desc: "Grid 2D responsif otomatis tanpa media query" },
      { code: "position: sticky; top: 0;", desc: "Elemen menempel saat halaman di-scroll" }
    ]
  },
  {
    category: "CSS Modern & Animasi",
    items: [
      { code: "font-size: clamp(1rem, 4vw, 2.5rem);", desc: "Tipografi responsif halus tanpa media query" },
      { code: "min-height: 100dvh;", desc: "Tinggi layar penuh akurat di HP (Dynamic Viewport)" },
      { code: "transition: all 0.3s ease;", desc: "Transisi animasi perubahan style yang mulus" },
      { code: "@keyframes putar { to { transform: rotate(360deg); } }", desc: "Animasi keyframes rotasi mandiri" },
      { code: ":root { --warna: #2563eb; }", desc: "Mendeklarasikan CSS Variables native" }
    ]
  },
  {
    category: "Tailwind & React & Next.js",
    items: [
      { code: "p-4 / px-6 / py-2", desc: "Padding skala 4px (p-4 = 16px)" },
      { code: "cn('p-4', className)", desc: "twMerge + clsx untuk resolusi bentrok class" },
      { code: "const [data, setData] = useState(0)", desc: "State management interaktif di React" },
      { code: "useEffect(() => {}, [])", desc: "Efek samping dijalankan 1x saat buka halaman" },
      { code: "async function Page()", desc: "Server Component: data fetching langsung di server" },
      { code: "<Link href='/about'>", desc: "Navigasi instan Next.js tanpa refresh browser" }
    ]
  }
];
