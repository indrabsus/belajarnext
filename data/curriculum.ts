export interface Topic {
  id: string;
  title: string;
  badge?: string;
  summary: string;
  content: string; // Markdown or rich structured text
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
    slug: "persiapan-dan-mindset",
    level: 0,
    title: "Modul 0: Orientasi & Lingkungan Koding",
    tagline: "Persiapan mental, pemahaman cara kerja web, dan setup tools wajib.",
    estimatedTime: "1-2 Hari",
    color: "slate",
    iconName: "Compass",
    description: "Sebelum menulis kode pertama, penting bagi siswa memahami bagaimana browser bekerja dan menyiapkan 'bengkel kerja' (tools) yang nyaman dan standar industri.",
    learningOutcomes: [
      "Memahami relasi Client (Browser), Server, dan file web (HTML, CSS, JS).",
      "Menginstal VS Code dan mengkonfigurasi ekstensi esensial.",
      "Mampu menggunakan Developer Tools (Inspect Element) pada browser.",
      "Membangun mentalitas pemecah masalah (debugging & membaca pesan error)."
    ],
    topics: [
      {
        id: "cara-kerja-web",
        title: "Bagaimana Web Bekerja di Belakang Layar?",
        summary: "Analogi sederhana: Rumah makan, Koki, dan Menu.",
        content: `Ketika kita membuka sebuah website (misal: google.com), ada 3 pilar utama:
1. **HTML (Kerangka):** Seperti rangka beton dan dinding rumah. Menentukan mana judul, paragraf, tombol, atau gambar.
2. **CSS (Dekorasi):** Cat dinding, gorden, lampu, dan perabot. Mengatur warna, tata letak, ukuran, dan keindahan.
3. **JavaScript (Interaktivitas):** Saklar lampu, pintu otomatis, keran air. Memberikan fungsi logika dan reaksi ketika tombol diklik.
4. **Tailwind CSS & Next.js:** Nanti kita pelajari sebagai alat bantu modern agar kita bisa membangun 'rumah' ini jauh lebih cepat dan kokoh!`,
        tips: [
          "Ingat: Browser seperti Chrome hanya membaca HTML, CSS, dan JavaScript.",
          "Semua framework canggih (React, Next.js) pada akhirnya akan diubah menjadi HTML, CSS, dan JS agar bisa dibaca browser."
        ]
      },
      {
        id: "setup-tools",
        title: "Setup VS Code & Ekstensi Wajib",
        badge: "Wajib Praktik",
        summary: "Menyiapkan aplikasi editor koding yang nyaman.",
        content: `Instal aplikasi berikut di laptop:
1. **VS Code (Visual Studio Code):** Download resmi di code.visualstudio.com.
2. **Ekstensi VS Code yang Wajib Diinstal:**
   - **Live Server:** Menjalankan file HTML langsung di browser dengan auto-reload setiap kali file disimpan.
   - **Prettier - Code Formatter:** Merapikan kode secara otomatis saat klik simpan (Save).
   - **Auto Rename Tag:** Mengubah tag penutup secara otomatis jika tag pembuka diedit.
   - **Tailwind CSS IntelliSense:** Menampilkan saran nama class otomatis saat mengetik class Tailwind.
3. **Node.js LTS:** Download di nodejs.org (akan kita gunakan untuk Tailwind & Next.js).`,
        tips: [
          "Buka VS Code > Settings (Ctrl+, atau Cmd+,) > Cari 'Format On Save' > Centang opsi tersebut agar kode otomatis rapi saat disimpan."
        ],
        pitfalls: [
          "Jangan gunakan Notepad biasa atau Microsoft Word untuk koding karena akan menyisipkan format karakter yang merusak script."
        ]
      },
      {
        id: "inspect-element",
        title: "Sahabat Sejati Programmer: Inspect Element",
        summary: "Mengintip dan menguji kode langsung di browser.",
        content: `Setiap web developer wajib menguasai Inspect Element di Google Chrome:
- **Cara Buka:** Klik kanan di sembarang halaman web > pilih **Inspect** (atau tekan F12 / Cmd+Opt+I).
- **Tab Elements:** Melihat struktur HTML dan gaya CSS yang sedang aktif. Siswa bisa mengubah teks atau warna langsung di sini untuk uji coba kilat!
- **Tab Console:** Tempat melihat error JavaScript dan pesan debug (melalui console.log).`,
        exercise: {
          title: "Eksperimen Ubah Web Favoritmu",
          instruction: "Buka halaman Wikipedia atau Google, klik kanan pada logo atau judulnya, pilih Inspect, lalu ubah teksnya di panel Elements. Lihat bagaimana teks di layar langsung berubah!",
          hint: "Double click pada teks yang ada di dalam tag HTML di panel Elements untuk mengeditnya."
        }
      }
    ],
    finalProject: {
      title: "Ceklis Kesiapan Belajar",
      description: "Pastikan seluruh tools telah terpasang dengan baik dan siswa siap memasuki Modul 1.",
      requirements: [
        "VS Code terinstal dan tema nyaman dipilih",
        "Ekstensi Live Server & Prettier aktif",
        "Node.js terpasang (cek via terminal: node -v)",
        "Siswa berhasil membuka Inspect Element di browser"
      ],
      submissionTip: "Kirim screenshot layar VS Code dengan file index.html terbuka di browser via Live Server."
    }
  },
  {
    id: "modul-1",
    slug: "html-css-modern",
    level: 1,
    title: "Modul 1: Fondasi HTML5 & CSS Modern",
    tagline: "Kuasai kerangka semantik, Box Model, dan Flexbox layouting.",
    estimatedTime: "1-2 Minggu",
    color: "amber",
    iconName: "Layout",
    description: "Modul ini adalah pondasi terpenting. Jangan terburu-buru ke Tailwind sebelum siswa benar-benar paham Box Model dan Flexbox, karena Tailwind hanyalah penyingkat dari aturan CSS ini.",
    learningOutcomes: [
      "Menulis struktur HTML5 semantik yang ramah aksesibilitas dan SEO.",
      "Menguasai Box Model (Content, Padding, Border, Margin) tanpa tebak-tebak ukuran.",
      "Menguasai Flexbox secara intuitif untuk tata letak baris, kolom, dan posisi tengah.",
      "Membuat desain web yang responsif (tampil rapi di layar HP dan Laptop)."
    ],
    topics: [
      {
        id: "html5-semantik",
        title: "1.1 HTML5 & Elemen Semantik",
        badge: "Struktur",
        summary: "Gunakan tag sesuai artinya, hindari 'Div Soup'.",
        content: `Banyak pemula membungkus semua elemen dengan <div>. Padahal HTML5 menyediakan tag semantik yang membuat kode mudah dibaca manusia dan mesin pencari (SEO):
- \`<header>\`: Bagian kepala halaman (logo, judul web).
- \`<nav>\`: Navigasi menu / tautan.
- \`<main>\`: Konten inti dari satu halaman.
- \`<section>\`: Bagian-bagian topik spesifik di dalam main.
- \`<article>\`: Konten mandiri (misal: 1 kartu artikel berita, ulasan).
- \`<footer>\`: Bagian kaki halaman (hak cipta, link sosial).
- Elemen interaktif: Gunakan \`<button>\` untuk aksi klik (bukan div yang diberi klik), dan \`<a>\` untuk perpindahan URL.`,
        codeSnippet: {
          language: "html",
          filename: "index.html",
          code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profil Saya</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Halo, Saya Budi!</h1>
    <p>Calon Frontend Developer Handal</p>
  </header>
  
  <main>
    <section class="card">
      <h2>Tentang Saya</h2>
      <p>Sedang belajar web dari nol hingga menguasai Next.js.</p>
      <button type="button">Hubungi Saya</button>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Budi Santoso</p>
  </footer>
</body>
</html>`
        },
        tips: [
          "Aturan Emas: Kalau bisa diklik untuk pindah halaman, pakai <a>. Kalau untuk memicu aksi (popup, kirim form, ganti tema), pakai <button>."
        ],
        pitfalls: [
          "Jangan gunakan <div> untuk tombol karena pembaca tunanetra (Screen Reader) tidak akan tahu bahwa itu bisa diklik."
        ]
      },
      {
        id: "css-box-model",
        title: "1.2 CSS Box Model: Rahasia Ukuran Elemen",
        badge: "Konsep Inti",
        summary: "Setiap elemen di layar adalah sebuah kotak berlapis.",
        content: `Semua elemen web berbentuk kotak persegi panjang. Box Model terdiri dari 4 lapisan (dari dalam ke luar):
1. **Content:** Teks atau gambar asli.
2. **Padding:** Ruang kosong di DALAM batas kotak (jarak antara teks ke bingkai).
3. **Border:** Garis bingkai pembatas kotak.
4. **Margin:** Ruang kosong di LUAR kotak (jarak antara kotak ini dengan kotak tetangganya).

**Aturan Wajib Modern:**
Selalu tambahkan \`box-sizing: border-box;\` di bagian atas CSS agar padding tidak menambah total lebar elemen.`,
        codeSnippet: {
          language: "css",
          filename: "style.css",
          code: `/* Reset wajib untuk semua proyek CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.card {
  width: 300px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 24px;   /* Ruang di dalam kotak */
  margin: 16px;    /* Jarak ke elemen sebelah */
  border-radius: 8px;
}`
        },
        tips: [
          "Analogi bungkusan paket: Content adalah barangnya, Padding adalah bubble wrap, Border adalah kardusnya, Margin adalah jarak kardus dengan paket lain di truk pengiriman."
        ]
      },
      {
        id: "css-flexbox",
        title: "1.3 Flexbox: Tata Letak Modern Serbaguna",
        badge: "Wajib Kuasai",
        summary: "Lupakan float & position! Flexbox menyelesaikan 90% masalah layout.",
        content: `Flexbox diaktifkan pada elemen pembungkus (Parent Container) dengan \`display: flex;\`.

**Properti Parent yang Paling Sering Dipakai:**
- \`display: flex;\` -> Mengubah anak-anaknya menjadi berjejer horizontal (satu baris).
- \`flex-direction: column;\` -> Mengubah alur anak menjadi vertikal (satu kolom).
- \`justify-content: ...\` (Alur Utama / Horizontal):
  - \`center\`: ke tengah.
  - \`space-between\`: anak terpisah saling dorong ke pinggir kiri dan kanan.
- \`align-items: center;\` (Alur Silang / Vertikal): Menyejajarkan anak tepat di tengah vertikal.
- \`gap: 16px;\`: Memberikan jarak bersih antar anak tanpa perlu ribet margin kanan/kiri!`,
        codeSnippet: {
          language: "css",
          filename: "navbar.css",
          code: `.navbar {
  display: flex;
  justify-content: space-between; /* Logo di kiri, Menu di kanan */
  align-items: center;            /* Sejajar tengah vertikal */
  padding: 16px 24px;
  background-color: #0f172a;
  color: white;
}

.nav-links {
  display: flex;
  gap: 20px;                      /* Jarak antar link menu */
  list-style: none;
}`
        },
        tips: [
          "Mau bikin elemen tepat di tengah layar? Cukup 3 baris: display: flex; justify-content: center; align-items: center; min-height: 100vh;"
        ]
      },
      {
        id: "responsive-design",
        title: "1.4 Responsive Design & Media Query",
        summary: "Satu website yang pas di layar HP (Mobile) maupun Layar Monitor (Desktop).",
        content: `Lebih dari 60% pengguna internet membuka web lewat smartphone. Oleh karena itu, kita belajar filosofi **Mobile-First**:
1. Buat tampilan untuk layar kecil (HP) terlebih dahulu secara default.
2. Gunakan Media Query untuk menyesuaikan tampilan jika layar membesar (Desktop).`,
        codeSnippet: {
          language: "css",
          filename: "responsive.css",
          code: `/* Default untuk HP (1 kolom tumpuk ke bawah) */
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Jika lebar layar minimal 768px (Tablet / Laptop), ubah jadi 2 kolom */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}`
        }
      }
    ],
    finalProject: {
      title: "Proyek Modul 1: Halaman Bio Linktree Pribadi",
      description: "Buat halaman web profil pribadi yang berisi foto, nama, bio singkat, dan 4 tombol tautan media sosial (GitHub, LinkedIn, Instagram, Email).",
      requirements: [
        "Menggunakan tag HTML5 semantik (<header>, <main>, <section>, <footer>, <a>)",
        "Menggunakan Box Model (box-sizing: border-box)",
        "Tata letak tombol dan avatar rapi di tengah menggunakan Flexbox",
        "Responsif: Tampil elegan di layar HP (360px) dan layar laptop (1200px)"
      ],
      submissionTip: "Buka halaman di browser, lalu tekan F12 > klik ikon HP (Toggle Device Toolbar) untuk menguji tampilan mobile."
    }
  },
  {
    id: "modul-2",
    slug: "javascript-modern-es6",
    level: 2,
    title: "Modul 2: JavaScript Modern (ES6+)",
    tagline: "Logika pemrograman, manipulasi data array, dan koneksi ke internet (Fetch API).",
    estimatedTime: "2 Minggu",
    color: "emerald",
    iconName: "Code2",
    description: "Sebelum masuk ke React dan Next.js, siswa wajib nyaman dengan JavaScript modern. React bukanlah bahasa baru, melainkan JavaScript dengan sintaks JSX.",
    learningOutcomes: [
      "Memahami perbedaan const dan let serta menghindari var.",
      "Menguasai Arrow Function dan penulisan kode ringkas.",
      "Menguasai fungsi sakti array: .map() dan .filter() yang menjadi tulang punggung React.",
      "Menggunakan Object Destructuring dan Spread Operator (...).",
      "Mengambil data publik dari internet secara Asynchronous menggunakan async/await & fetch()."
    ],
    topics: [
      {
        id: "const-let-arrow",
        title: "2.1 const, let & Arrow Function",
        badge: "Fondasi",
        summary: "Standar penulisan variabel dan fungsi masa kini.",
        content: `**Aturan Variabel:**
- Gunakan \`const\` untuk variabel yang nilainya tidak pernah di-assign ulang (90% kasus koding kita).
- Gunakan \`let\` jika nilainya memang akan berubah (misal: penghitung counter).
- Jangan pernah pakai \`var\` lagi karena memiliki masalah scoping yang sering memicu bug tersembunyi.

**Arrow Function:**
Bentuk ringkas dari fungsi biasa yang membuat kode jauh lebih bersih.`,
        codeSnippet: {
          language: "javascript",
          filename: "functions.js",
          code: `// Fungsi gaya lama
function sapaLama(nama) {
  return "Halo " + nama;
}

// Arrow function modern
const sapaModern = (nama) => {
  return \`Halo \${nama}!\`;
};

// Arrow function 1 baris (otomatis return)
const kaliDua = (x) => x * 2;

console.log(sapaModern("Siswa")); // Halo Siswa!
console.log(kaliDua(5));          // 10`
        }
      },
      {
        id: "array-map-filter",
        title: "2.2 Array Methods: .map() & .filter()",
        badge: "Wajib React",
        summary: "Dua metode ini akan digunakan ratusan kali saat membuat UI di React & Next.js.",
        content: `Di web modern, data dari server hampir selalu berbentuk Array of Objects.
1. **\`.map()\`:** Mengubah setiap item di dalam array menjadi bentuk baru (di React: mengubah data menjadi elemen tampilan HTML).
2. **\`.filter()\`:** Menyaring item yang memenuhi kriteria tertentu (misal: fitur pencarian produk).`,
        codeSnippet: {
          language: "javascript",
          filename: "arrayMethods.js",
          code: `const siswa = [
  { id: 1, nama: "Budi", nilai: 85 },
  { id: 2, nama: "Siti", nilai: 60 },
  { id: 3, nama: "Andi", nilai: 90 }
];

// .map(): Mengambil hanya nama siswa
const daftarNama = siswa.map((s) => s.nama);
console.log(daftarNama); // ["Budi", "Siti", "Andi"]

// .filter(): Mengambil siswa yang nilainya di atas 70
const siswaLulus = siswa.filter((s) => s.nilai >= 70);
console.log(siswaLulus); // Budi (85) dan Andi (90)`
        },
        tips: [
          "Ingat: .map() dan .filter() TIDAK merusak array asli, melainkan mengembalikan array baru yang bersih."
        ]
      },
      {
        id: "destructuring-spread",
        title: "2.3 Destructuring & Spread Operator (...)",
        summary: "Trik mengambil data dan menduplikasi data tanpa repot.",
        content: `**Object Destructuring:**
Mengambil nilai properti langsung menjadi nama variabel.

**Spread Operator (\`...\`):**
Membuka isi bungkusan array atau object untuk digabungkan dengan data baru tanpa mengubah data lama (*immutability*).`,
        codeSnippet: {
          language: "javascript",
          filename: "spread.js",
          code: `// Destructuring
const produk = { id: 101, judul: "Sepatu Keren", harga: 250000 };
const { judul, harga } = produk;
console.log(judul); // "Sepatu Keren"

// Spread Operator pada Array
const buah1 = ["Apel", "Jeruk"];
const semuaBuah = [...buah1, "Mangga", "Pisang"];
console.log(semuaBuah); // ["Apel", "Jeruk", "Mangga", "Pisang"]

// Spread Operator pada Object
const updateHarga = { ...produk, harga: 200000, diskon: true };
console.log(updateHarga);`
        }
      },
      {
        id: "async-await-fetch",
        title: "2.4 Async/Await & Fetch API",
        badge: "Koneksi API",
        summary: "Mengambil data sungguhan dari server internet.",
        content: `Aplikasi web modern mengambil data dari API (Application Programming Interface). Karena proses download data butuh waktu, kita memakai \`async\` dan \`await\`.`,
        codeSnippet: {
          language: "javascript",
          filename: "fetchData.js",
          code: `// Mengambil daftar produk dari API publik gratis
const ambilDataProduk = async () => {
  try {
    const respon = await fetch("https://dummyjson.com/products?limit=3");
    const data = await respon.json();
    console.log("Data berhasil diambil:", data.products);
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
};

ambilDataProduk();`
        }
      }
    ],
    finalProject: {
      title: "Proyek Modul 2: Aplikasi To-Do List Interaktif",
      description: "Buat aplikasi daftar tugas sederhana: pengguna bisa mengetik tugas, menekan tombol Tambah, menandai tugas yang selesai dicoret, dan menghapus tugas.",
      requirements: [
        "Data tugas disimpan dalam array of objects [{ id, teks, selesai }]",
        "Menggunakan .map() atau perulangan untuk menampilkan daftar tugas",
        "Menggunakan .filter() untuk fitur hapus tugas",
        "Menghindari penggunaan 'var'"
      ],
      submissionTip: "Coba tambahkan fitur filter: 'Tampilkan Semua', 'Hanya yang Belum Selesai', dan 'Sudah Selesai'."
    }
  },
  {
    id: "modul-3",
    slug: "tailwind-css",
    level: 3,
    title: "Modul 3: Tailwind CSS (Styling Modern)",
    tagline: "Desain cepat, konsisten, dan responsif langsung di class HTML.",
    estimatedTime: "1-2 Minggu",
    color: "cyan",
    iconName: "Palette",
    description: "Setelah paham CSS dasar, siswa akan merasakan keajaiban Tailwind CSS: tidak perlu lagi bingung memberi nama class (seperti card-container-wrapper-inner) dan tidak perlu bolak-balik buka file CSS terpisah.",
    learningOutcomes: [
      "Memahami filosofi Utility-First CSS.",
      "Mampu menerjemahkan aturan CSS murni ke dalam class Tailwind secara lancar.",
      "Menguasai responsive utility (sm:, md:, lg:) dengan pendekatan Mobile-First.",
      "Membuat interaksi dinamis dengan state hover:, focus:, dan transition.",
      "Membangun komponen UI siap pakai (Badge, Card, Button, Navbar)."
    ],
    topics: [
      {
        id: "utility-first-concept",
        title: "3.1 Konsep Utility-First: Mengapa Tailwind?",
        badge: "Paradigma Baru",
        summary: "Membangun tampilan dari balok-balok lego kecil yang konsisten.",
        content: `Di CSS biasa, kita membuat file terpisah lalu memikirkan nama class:
\`\`\`css
/* CSS Biasa */
.tombol-biru-besar {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}
\`\`\`
Di Tailwind CSS, kita cukup memasang class langsung di HTML:
\`\`\`html
<!-- Tailwind CSS -->
<button class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
  Klik Saya
</button>
\`\`\`
**Keuntungan Besar:**
1. Desain konsisten (skala warna, jarak margin/padding sudah dirancang harmonis).
2. Ukuran file hasil produksi sangat kecil karena Tailwind otomatis membuang class yang tidak terpakai.
3. Tidak ada efek domino bug: mengubah satu tombol tidak akan merusak tombol di halaman lain!`,
        tips: [
          "Buka tailwindcss.com dan manfaatkan fitur Search (Ctrl+K) untuk mencari nama class kapan pun lupa."
        ]
      },
      {
        id: "kamus-tailwind-css",
        title: "3.2 Kamus Terjemahan: CSS Biasa vs Tailwind",
        badge: "Contekan Praktis",
        summary: "Hubungan langsung antara sintaks CSS yang sudah dipelajari dengan class Tailwind.",
        content: `Gunakan tabel contekan ini untuk memahami pola penamaan Tailwind:

| Konsep CSS Biasa | Sintaks CSS Murni | Class Tailwind |
| :--- | :--- | :--- |
| **Padding** | \`padding: 16px;\` | \`p-4\` |
| **Padding Horizontal** | \`padding-left: 24px; padding-right: 24px;\` | \`px-6\` |
| **Margin Bottom** | \`margin-bottom: 8px;\` | \`mb-2\` |
| **Warna Teks & Ukuran** | \`color: #0f172a; font-size: 20px; font-weight: bold;\` | \`text-slate-900 text-xl font-bold\` |
| **Flexbox Center** | \`display: flex; justify-content: center; align-items: center;\` | \`flex justify-center items-center\` |
| **Jarak Antar Item** | \`gap: 16px;\` | \`gap-4\` |
| **Border Radius** | \`border-radius: 12px;\` | \`rounded-xl\` |
| **Shadow / Bayangan** | \`box-shadow: 0 4px 6px ...\` | \`shadow-md\` |`,
        tips: [
          "Rumus skala jarak di Tailwind: Angka dikali 4px! Contoh: p-1 = 4px, p-2 = 8px, p-4 = 16px, p-6 = 24px, p-8 = 32px."
        ]
      },
      {
        id: "tailwind-responsive-state",
        title: "3.3 Responsif & Efek Hover di Tailwind",
        badge: "Kekuatan Utama",
        summary: "Membuat tampilan adaptif hanya dengan menambahkan awalan (prefix).",
        content: `**Breakpoint Layar di Tailwind:**
- Default (tanpa prefix) = Layar Smartphone (Mobile).
- \`md:\` = Layar Tablet (lebar >= 768px).
- \`lg:\` = Layar Laptop/Komputer (lebar >= 1024px).

**Efek Interaksi (States):**
- \`hover:\` = Efek saat kursor mouse melintas di atasnya.
- \`focus:\` = Efek saat input form sedang diketik.
- \`active:\` = Efek saat tombol sedang ditekan klik.`,
        codeSnippet: {
          language: "html",
          filename: "responsive-card.html",
          code: `<!-- Kartu ini akan 1 kolom di HP, tapi 2 kolom di Laptop -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-4xl mx-auto">
  <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
    <span class="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">Frontend</span>
    <h3 class="text-xl font-bold text-slate-800 mt-3">Belajar Tailwind CSS</h3>
    <p class="text-slate-600 mt-2 text-sm leading-relaxed">
      Siswa dapat mendesain antarmuka web modern dalam hitungan menit tanpa repot menulis ratusan baris CSS manual.
    </p>
    <button class="mt-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
      Mulai Belajar &rarr;
    </button>
  </div>
</div>`
        }
      }
    ],
    finalProject: {
      title: "Proyek Modul 3: Landing Page Produk / Kursus Modern",
      description: "Bangun satu halaman Landing Page lengkap menggunakan Tailwind CSS yang terdiri dari: Navbar responsif, Hero Section (Judul besar + Tombol CTA), Grid 3 Kartu Fitur, dan Footer.",
      requirements: [
        "100% styling menggunakan class Tailwind CSS",
        "Layout Hero Section responsif (tumpuk di HP, bersandingan teks & ilustrasi di Desktop)",
        "Efek hover yang halus pada semua tombol dan kartu (transition)",
        "Menggunakan kombinasi warna yang kontras dan nyaman dibaca (misal: slate + indigo / emerald)"
      ],
      submissionTip: "Pastikan teks tidak menempel ke tepi layar HP dengan memberikan padding pembungkus px-4 atau px-6."
    }
  },
  {
    id: "modul-4",
    slug: "react-js-dasar",
    level: 4,
    title: "Modul 4: React.js (Fondasi Komponen & State)",
    tagline: "Memecah UI menjadi komponen modular dan mengelola data interaktif.",
    estimatedTime: "2 Minggu",
    color: "blue",
    iconName: "Atom",
    description: "Next.js adalah framework yang berjalan di atas React. Di modul ini siswa belajar cara berpikir secara deklaratif berbasis komponen, props, dan state sebelum masuk ke Next.js.",
    learningOutcomes: [
      "Memahami mental model React (UI as a function of State).",
      "Menulis JSX (penggabungan HTML dan JavaScript yang aman).",
      "Memecah antarmuka menjadi komponen reusable dan mengirim data via Props.",
      "Mengelola status interaktif dengan hook useState.",
      "Mengambil data saat halaman dibuka menggunakan hook useEffect."
    ],
    topics: [
      {
        id: "mental-model-komponen",
        title: "4.1 Mental Model Komponen & JSX",
        badge: "Konsep Inti",
        summary: "UI dipecah seperti kepingan puzzle lego.",
        content: `Di era web lama, kita membuat satu file HTML raksasa yang panjangnya ribuan baris.
Di React, kita memecah tampilan menjadi fungsi-fungsi kecil bernama **Komponen**:
- Komponen Navbar (\`Navbar.jsx\`)
- Komponen Kartu Produk (\`ProductCard.jsx\`)
- Komponen Tombol (\`Button.jsx\`)

**Aturan Penulisan JSX:**
1. Nama fungsi komponen **wajib diawali huruf kapital** (misal: \`Header\`, bukan \`header\`).
2. Setiap komponen harus mengembalikan (return) satu elemen pembungkus utama (atau gunakan fragment \`<></>\`).
3. Gunakan atribut \`className\` untuk class CSS (bukan \`class\`).
4. Sisipkan variabel JavaScript ke dalam JSX menggunakan kurung kurawal tunggal \`{ namaVariabel }\`.`,
        codeSnippet: {
          language: "jsx",
          filename: "Card.jsx",
          code: `// Komponen sederhana di React
export default function UserCard() {
  const nama = "Ahmad Dani";
  const status = "Aktif Belajar";

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border border-slate-100">
      <h2 className="text-lg font-bold text-slate-800">{nama}</h2>
      <p className="text-sm text-emerald-600 font-medium">{status}</p>
    </div>
  );
}`
        }
      },
      {
        id: "props-reusable",
        title: "4.2 Props: Membuat Komponen Fleksibel",
        badge: "Reusable",
        summary: "Mengirim parameter dari komponen induk (Parent) ke komponen anak (Child).",
        content: `Komponen yang baik adalah komponen yang bisa dipakai berulang kali dengan data yang berbeda-beda. Caranya adalah menggunakan **Props** (singkatan dari properties).`,
        codeSnippet: {
          language: "jsx",
          filename: "ProductBadge.jsx",
          code: `// Komponen Anak: Menerima props
function Badge({ label, warna = "blue" }) {
  const warnaClass = warna === "emerald" 
    ? "bg-emerald-100 text-emerald-700" 
    : "bg-blue-100 text-blue-700";

  return (
    <span className={\`text-xs font-semibold px-2.5 py-1 rounded-full \${warnaClass}\`}>
      {label}
    </span>
  );
}

// Komponen Induk: Menggunakan Badge berkali-kali
export default function App() {
  return (
    <div className="flex gap-2">
      <Badge label="Diskon 50%" warna="emerald" />
      <Badge label="Terlaris" warna="blue" />
    </div>
  );
}`
        }
      },
      {
        id: "usestate-interaktif",
        title: "4.3 useState: Menghidupkan Interaksi",
        badge: "Wajib Paham",
        summary: "Menyimpan data yang bisa berubah dan otomatis memperbarui tampilan layar.",
        content: `Di JavaScript biasa, jika ada variabel berubah, kita harus repot menulis \`document.getElementById().innerText = ...\`.
Di React, cukup simpan data ke dalam \`useState\`. Begitu nilai state diubah dengan fungsi setternya, React **otomatis me-render ulang tampilan** dengan data terbaru!`,
        codeSnippet: {
          language: "jsx",
          filename: "Counter.jsx",
          code: `import { useState } from "react";

export default function Counter() {
  // state: count (angka sekarang), setCount (fungsi untuk mengubahnya)
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 bg-slate-50 rounded-xl text-center">
      <p className="text-slate-500 text-sm">Total Klik:</p>
      <h1 className="text-4xl font-extrabold text-slate-900 my-2">{count}</h1>
      
      <div className="flex justify-center gap-3">
        <button 
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-bold"
        >
          - Kurang
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
        >
          + Tambah
        </button>
      </div>
    </div>
  );
}`
        },
        pitfalls: [
          "DILARANG KERAS mengubah state langsung seperti 'count = count + 1'. Selalu gunakan fungsi setter 'setCount(count + 1)' agar React tahu harus memperbarui layar."
        ]
      },
      {
        id: "useeffect-fetch",
        title: "4.4 useEffect: Mengambil Data dari API",
        summary: "Menjalankan kode otomatis saat komponen pertama kali muncul di layar.",
        content: `Kapan kita butuh \`useEffect\`? Saat ingin menjalankan operasi di luar React, seperti mengambil data dari server, memasang timer, atau mendengarkan event keyboard.`,
        codeSnippet: {
          language: "jsx",
          filename: "UserList.jsx",
          code: `import { useState, useEffect } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dijalankan 1 kali saat komponen pertama kali dimuat
    fetch("https://dummyjson.com/users?limit=3")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      });
  }, []); // Array dependensi kosong [] artinya hanya jalankan sekali

  if (loading) return <p className="text-slate-500">Memuat data pengguna...</p>;

  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li key={user.id} className="p-3 bg-white border rounded-lg shadow-sm">
          <p className="font-bold text-slate-800">{user.firstName} {user.lastName}</p>
          <p className="text-xs text-slate-500">{user.email}</p>
        </li>
      ))}
    </ul>
  );
}`
        }
      }
    ],
    finalProject: {
      title: "Proyek Modul 4: Katalog Produk dengan Keranjang Belanja (Mini Cart)",
      description: "Bangun aplikasi katalog produk: menampilkan daftar barang dari API atau data lokal, tombol 'Beli', dan panel keranjang belanja yang menghitung total belanja secara real-time.",
      requirements: [
        "Memisahkan UI menjadi minimal 3 komponen terpisah (Navbar, ProductCard, CartSummary)",
        "Menggunakan useState untuk mengelola daftar barang yang ada di keranjang",
        "Menampilkan total harga belanjaan secara otomatis",
        "Styling rapi menggunakan Tailwind CSS"
      ],
      submissionTip: "Siswa bisa menguji fungsionalitas dengan mencoba menambah item, menghapus item dari keranjang, dan memastikan angka total harga selalu akurat."
    }
  },
  {
    id: "modul-5",
    slug: "nextjs-mastery",
    level: 5,
    title: "Modul 5: Next.js App Router (Tujuan Akhir)",
    tagline: "Framework standar industri untuk produksi web cepat, SEO-friendly, dan siap deploy.",
    estimatedTime: "2-3 Minggu",
    color: "violet",
    iconName: "Rocket",
    description: "Puncak dari roadmap ini! Siswa menggabungkan seluruh keahlian HTML, CSS, JS, Tailwind, dan React ke dalam Next.js (App Router). Siswa akan belajar cara kerja Server Components, routing berbasis folder, hingga mendeploy web langsung ke internet secara gratis.",
    learningOutcomes: [
      "Menginisialisasi proyek Next.js dengan Tailwind CSS terintegrasi.",
      "Memahami sistem navigasi berbasis folder (App Router).",
      "Membedakan kapan menggunakan Server Component dan Client Component ('use client').",
      "Membuat Dynamic Routing (contoh: halaman detail artikel /blog/[id]).",
      "Mendeploy aplikasi web ke platform Vercel sehingga bisa diakses publik."
    ],
    topics: [
      {
        id: "kenapa-nextjs",
        title: "5.1 Mengapa Dunia Memilih Next.js?",
        badge: "Gambaran Besar",
        summary: "Kelebihan Next.js dibanding React biasa (CRA/Vite).",
        content: `Jika React biasa seperti 'mesin mobil', maka **Next.js adalah mobil mewah yang sudah siap jalan**:
1. **File-based Routing:** Tidak perlu menginstal pustaka router terpisah. Cukup buat folder baru, langsung otomatis jadi rute URL baru!
2. **Server-Side Rendering (SSR) & Server Components:** Halaman dirender di server, sehingga saat dibuka langsung cepat dan disukai oleh Google Search (SEO Bagus).
3. **Image Optimization:** Komponen \`<Image />\` otomatis mengubah ukuran dan format gambar menjadi WebP agar loading super kilat.
4. **Fullstack Capabilities:** Bisa membuat API backend di dalam folder yang sama tanpa perlu bikin server Express terpisah.`,
        tips: [
          "Banyak startup unicorn dan perusahaan teknologi papan atas menggunakan Next.js (seperti TikTok, Twitch, Notion, Nike)."
        ]
      },
      {
        id: "struktur-folder-app-router",
        title: "5.2 Peta Folder App Router",
        badge: "Wajib Paham",
        summary: "Aturan nama file sakral di Next.js App Router.",
        content: `Di Next.js versi modern (App Router), struktur folder \`app/\` menentukan URL website:

\`\`\`
app/
├── layout.tsx         # Template pembungkus (Navbar & Footer tetap sama di semua halaman)
├── page.tsx           # Halaman utama beranda (URL: /)
├── about/
│   └── page.tsx       # Halaman Tentang Kami (URL: /about)
├── kontak/
│   └── page.tsx       # Halaman Kontak (URL: /kontak)
└── artikel/
    ├── page.tsx       # Daftar artikel (URL: /artikel)
    └── [id]/
        └── page.tsx   # Halaman detail dinamis (URL: /artikel/1, /artikel/belajar-html)
\`\`\`

**Aturan Emas:** Sebuah folder HANYA akan menjadi halaman URL jika di dalamnya ada file bernama \`page.tsx\` (atau \`page.js\`).`,
        codeSnippet: {
          language: "tsx",
          filename: "app/about/page.tsx",
          code: `import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-extrabold text-slate-900">Tentang Kami</h1>
      <p className="mt-4 text-slate-600 leading-relaxed">
        Ini adalah halaman yang otomatis terbentuk berkat file-system routing di Next.js!
      </p>

      {/* Navigasi cepat tanpa reload halaman menggunakan Link */}
      <Link 
        href="/" 
        className="inline-block mt-6 text-sm font-semibold text-blue-600 hover:underline"
      >
        &larr; Kembali ke Beranda
      </Link>
    </main>
  );
}`
        }
      },
      {
        id: "server-vs-client-components",
        title: "5.3 Server Components vs Client Components",
        badge: "Kunci Next.js",
        summary: "Kapan memakai kode di Server, dan kapan harus menambahkan 'use client'?",
        content: `Ini adalah konsep paling penting di Next.js modern:

**1. Server Component (DEFAULT):**
- Berjalan di server komputer Next.js.
- Sangat aman untuk menyembunyikan API key / database credential.
- Loading instan dan ukuran JavaScript ke browser 0 KB.
- **Bisa langsung mengambil data dengan async/await tanpa useEffect!**

**2. Client Component (Perlu ditambah 'use client' di baris paling atas):**
- Berjalan di browser pengguna.
- **Wajib dipakai HANYA JIKA:**
  - Butuh interaksi pengguna: tombol dengan \`onClick\`, form dengan \`onChange\`.
  - Butuh React Hooks: \`useState\`, \`useEffect\`.
  - Butuh akses browser: \`localStorage\`, \`window.location\`.`,
        codeSnippet: {
          language: "tsx",
          filename: "app/berita/page.tsx",
          code: `// CONTOH SERVER COMPONENT: Fetching data langsung di komponen!
// Tidak perlu useState dan useEffect lagi!
export default async function BeritaPage() {
  const res = await fetch("https://dummyjson.com/posts?limit=3");
  const data = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Berita Terkini</h1>
      <div className="grid gap-4">
        {data.posts.map((post: any) => (
          <article key={post.id} className="p-4 bg-white border rounded-xl shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">{post.title}</h2>
            <p className="text-slate-600 text-sm mt-1">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}`
        },
        tips: [
          "Prinsip praktis: Mulai selalu dari Server Component. Hanya tambahkan 'use client' pada tombol atau komponen kecil yang memang butuh klik/state."
        ]
      },
      {
        id: "deploy-ke-vercel",
        title: "5.4 Deploy Web Gratis ke Seluruh Dunia (Vercel)",
        badge: "Go Online!",
        summary: "Membuat karya siswa bisa dibuka oleh siapa saja lewat link internet resmi.",
        content: `Setelah web selesai dibuat, siswa bisa menerbitkannya ke internet hanya dalam 3 menit gratis:
1. Buat akun di **github.com** dan simpan kode proyek ke dalam repository GitHub.
2. Buka **vercel.com** (perusahaan pembuat Next.js).
3. Klik tombol **'Add New Project'** dan hubungkan akun GitHub.
4. Pilih repository web kamu, lalu klik **'Deploy'**.
5. Tunggu 1 menit, web kamu langsung hidup dengan domain keren: \`nama-proyek.vercel.app\` dan sertifikat SSL (HTTPS) aman otomatis!`,
        tips: [
          "Setiap kali siswa meng-update kodingan dan melakukan 'git push', Vercel akan otomatis meng-update web online dalam beberapa detik!"
        ]
      }
    ],
    finalProject: {
      title: "Final Capstone Project: Web Portal Berita & Blog Portofolio",
      description: "Bangun website komprehensif menggunakan Next.js + Tailwind CSS yang siap dipajang di CV/LinkedIn siswa.",
      requirements: [
        "Menggunakan Next.js App Router dengan layout bersama (Navbar & Footer)",
        "Memiliki minimal 3 halaman: Beranda, Daftar Artikel/Proyek, dan Detail Artikel Dinamis ([id])",
        "Menggabungkan Server Component (untuk memuat data) dan Client Component (untuk fitur pencarian / filter / dark mode)",
        "Desain modern, 100% responsif di HP dan Laptop dengan Tailwind CSS",
        "Ter-deploy online di Vercel dan link bisa dibuka publik"
      ],
      submissionTip: "Sertakan tautan repository GitHub dan tautan domain live .vercel.app sebagai bukti portofolio kelulusan siswa."
    }
  }
];

export const CHEATSHEETS = [
  {
    category: "HTML Semantik",
    items: [
      { code: "<header>", desc: "Area kepala website / judul" },
      { code: "<nav>", desc: "Kumpulan link menu navigasi" },
      { code: "<main>", desc: "Konten utama halaman (hanya 1 per halaman)" },
      { code: "<section>", desc: "Grup konten dengan tema tertentu" },
      { code: "<article>", desc: "Konten mandiri (kartu berita/postingan)" },
      { code: "<footer>", desc: "Bagian kaki / info hak cipta" }
    ]
  },
  {
    category: "CSS Flexbox",
    items: [
      { code: "display: flex;", desc: "Mengaktifkan mode flexbox" },
      { code: "justify-content: center;", desc: "Meratakan anak ke tengah horizontal" },
      { code: "justify-content: space-between;", desc: "Mendorong anak ke tepi kiri & kanan" },
      { code: "align-items: center;", desc: "Meratakan anak ke tengah vertikal" },
      { code: "flex-direction: column;", desc: "Mengubah alur menjadi ke bawah (kolom)" },
      { code: "gap: 16px;", desc: "Memberi jarak bersih antar anak" }
    ]
  },
  {
    category: "Tailwind Classes Populer",
    items: [
      { code: "flex items-center justify-between", desc: "Layout navbar sejajar rapi" },
      { code: "grid grid-cols-1 md:grid-cols-3 gap-6", desc: "Grid 1 kolom di HP, 3 kolom di Desktop" },
      { code: "p-4 / px-6 / py-2", desc: "Padding dalam elemen (skala x 4px)" },
      { code: "rounded-xl shadow-md border", desc: "Gaya kartu modern dengan sudut melengkung" },
      { code: "hover:bg-blue-600 transition", desc: "Efek animasi warna saat kursor melintas" },
      { code: "text-slate-800 text-sm font-semibold", desc: "Tipografi warna & ketebalan teks" }
    ]
  },
  {
    category: "Next.js App Router Files",
    items: [
      { code: "app/layout.tsx", desc: "Template utama pembungkus seluruh halaman" },
      { code: "app/page.tsx", desc: "Komponen tampilan untuk halaman beranda (/)" },
      { code: "app/[slug]/page.tsx", desc: "Rute dinamis berdasarkan parameter URL" },
      { code: "'use client'", desc: "Wajib di baris 1 jika butuh useState/onClick" },
      { code: "<Link href='/'>", desc: "Pindah halaman instan tanpa refresh browser" },
      { code: "<Image src='' alt='' />", desc: "Komponen gambar teroptimasi otomatis" }
    ]
  }
];
