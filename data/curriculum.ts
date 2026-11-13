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
    slug: "arsitektur-web-dan-tooling",
    level: 0,
    title: "Modul 0: Arsitektur Browser, Critical Rendering Path & Modern Tooling",
    tagline: "Bedah mendalam cara kerja engine browser, siklus rendering dari bit data hingga pixel layar, dan standar setup industri.",
    estimatedTime: "3-4 Hari",
    color: "slate",
    iconName: "Compass",
    description: "Sebelum mengetik kode, seorang frontend engineer kelas atas wajib memahami apa yang terjadi di balik layar ketika URL ditekan: DNS resolution, TCP/TLS handshake, penguraian byte menjadi token, pembangunan DOM/CSSOM Tree, hingga perhitungan reflow dan compositing di GPU.",
    learningOutcomes: [
      "Memahami Critical Rendering Path (CRP) secara detail: Parse, DOM Tree, CSSOM Tree, Render Tree, Layout (Reflow), dan Paint (Repaint).",
      "Memahami perbedaan Render Blocking Resource (CSS & JS) dan dampaknya terhadap Core Web Vitals (FCP, LCP, CLS).",
      "Memahami mengapa manipulasi DOM manual itu lambat dan alasan konseptual di balik Virtual DOM / React Reconciliation.",
      "Menguasai Chrome DevTools Performance Profiler, Network Waterfall, dan Memory Leak Inspection.",
      "Setup lingkungan kerja standar industri: Node.js, strict TypeScript environment, Git semantic branching, dan Prettier/ESLint automations."
    ],
    topics: [
      {
        id: "critical-rendering-path",
        title: "0.1 Anatomi Critical Rendering Path (CRP) di Browser Engine",
        badge: "Arsitektur Engine",
        summary: "Bagaimana browser (Blink/V8, Gecko, WebKit) mengubah byte data mentah menjadi pixel nyata di layar.",
        content: `Ketika browser menerima respon HTTP berupa file HTML, terjadi tahapan berurutan yang disebut **Critical Rendering Path (CRP)**:

1. **Conversion & Tokenization:**
   Browser membaca raw byte (misal: \`3C 68 74 6D 6C...\`), menerjemahkannya berdasarkan karakter encoding (UTF-8), lalu Tokenizer memecahnya menjadi token-token standar HTML (\`<html>\`, \`<body>\`, \`<div>\`).

2. **DOM Tree Construction:**
   Token diubah menjadi Node Objek dengan properti spesifik. Berdasarkan relasi sarang (nesting), node-node ini dihubungkan menjadi struktur pohon hierarki: **Document Object Model (DOM)**.

3. **CSSOM Tree Construction (Render-Blocking):**
   Saat parser menemukan tag \`<link rel="stylesheet">\`, browser mengunduh dan mem-parse aturan CSS menjadi **CSS Object Model (CSSOM)**. CSS bersifat *render-blocking* karena browser menolak menampilkan halaman setengah jadi sebelum mengetahui aturan gaya visual seluruh elemen.

4. **Render Tree Generation:**
   DOM dan CSSOM digabungkan menjadi **Render Tree**. 
   > ⚠️ **Catatan Kritis:** Elemen dengan \`display: none\` dan tag metadata (\`<head>\`, \`<script>\`) **TIDAK** masuk ke dalam Render Tree. Namun, elemen dengan \`visibility: hidden\` atau \`opacity: 0\` **tetap masuk** ke Render Tree karena masih memakan ruang geometris!

5. **Layout Phase (Reflow):**
   Browser menghitung geometri pasti dari setiap node di Render Tree: posisi koordinat (X, Y) dan ukuran presisi (Width, Height) relatif terhadap ukuran viewport layar.

6. **Paint Phase (Repaint):**
   Mengubah node yang telah memiliki posisi geometri menjadi pixel nyata di layar (mengisi warna background, teks, border, bayangan).

7. **Compositing:**
   Elemen yang berada di layer terpisah (misal karena \`transform: translateZ()\` atau \`will-change\`) disatukan oleh GPU menjadi gambar akhir di monitor.`,
        tips: [
          "Setiap kali JavaScript memanipulasi geometri elemen (misal membaca offsetHeight atau mengubah width), browser terpaksa memicu Reflow & Repaint ulang. Ini adalah operasi yang sangat mahal dan sering menyebabkan patah-patah (layout jank / FPS drop)."
        ],
        pitfalls: [
          "Jebakan Reflow: Mengakses properti seperti 'element.offsetWidth' berulang-ulang di dalam perulangan (loop) akan memaksa browser melakukan 'Forced Synchronous Layout' yang membuat performa website hancur."
        ]
      },
      {
        id: "chrome-devtools-deepdive",
        title: "0.2 Chrome DevTools Deep Dive: Profiler, Memory, & Network Waterfall",
        badge: "Diagnostik Industri",
        summary: "Bukan sekadar 'Inspect Element', melainkan alat analisis performa, memory leak, dan audit Core Web Vitals.",
        content: `Frontend Engineer profesional menggunakan DevTools sebagai laboratorium diagnosa:

- **Network Tab & Waterfall Analysis:**
  - **Queueing / Stalled:** Waktu tunggu antrean koneksi HTTP/1.1 (maksimal 6 koneksi simultan per host) vs HTTP/2 multiplexing.
  - **TTFB (Time to First Byte):** Mengukur kecepatan respon server dan latensi jaringan.
  - **Content Download:** Mengukur durasi pengunduhan payload data.
  
- **Performance Panel & CPU Throttling:**
  - Menguji performa web dengan menyimulasikan CPU lambat (4x/6x slowdown) dan jaringan lambat (Fast 3G/Slow 3G).
  - Melacak *Long Tasks* (tugas JavaScript yang berjalan lebih dari 50ms dan memblokir thread interaksi utama pengguna).

- **Console & Memory Heap Snapshot:**
  - Menginspeksi kebocoran memori (*Memory Leak*) yang disebabkan oleh event listener yang lupa di-remove saat komponen unmount atau referensi closure yang tertahan.`,
        codeSnippet: {
          language: "javascript",
          filename: "memory-leak-example.js",
          code: `// CONTOH KASUS MEMORY LEAK NYATA YANG SERING DIBUAT PEMULA:
function attachEventBug() {
  const bigDataArray = new Array(1000000).fill("Data berat di memori");
  
  const handleScroll = () => {
    // bigDataArray tertahan di memori karena closure
    console.log("Scrolled, item length:", bigDataArray.length);
  };

  window.addEventListener("scroll", handleScroll);
  
  // BAHAYA: Jika fungsi pembersih removeEventListener tidak dipanggil saat komponen hancur,
  // bigDataArray tidak akan pernah bisa dibersihkan oleh Garbage Collector!
}

// SOLUSI BERSIH:
function attachEventClean() {
  const handleScroll = () => { /* ... */ };
  window.addEventListener("scroll", handleScroll);

  // Return fungsi cleanup
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}`
        }
      },
      {
        id: "tooling-dan-git-workflow",
        title: "0.3 Standar Lingkungan Koding & Git Branching Strategy",
        badge: "Workflow Tim",
        summary: "Mempersiapkan pipeline development modern: ESLint AST rules, Prettier formatting, dan Git Feature Branching.",
        content: `Di lingkungan perusahaan teknologi, koding dilakukan secara kolaboratif dengan aturan ketat:

1. **Static Analysis & Linters:**
   - **ESLint:** Menganalisis Abstract Syntax Tree (AST) kode untuk mencegah bug sebelum runtime (misal: mendeteksi variabel tak terpakai atau aturan react hooks yang dilanggar).
   - **Prettier:** Memastikan seluruh anggota tim memiliki gaya indentasi, koma penutup (*trailing commas*), dan format spasi yang identik 100%.

2. **Git Semantic Workflow (Trunk-Based vs GitFlow):**
   - Siswa tidak boleh langsung melakukan push ke branch \`main\`.
   - Setiap fitur baru dibuat di branch terisolasi: \`feature/nama-fitur\` atau \`fix/nama-bug\`.
   - Menggunakan format commit standar (*Conventional Commits*):
     - \`feat: menambah validasi form pendaftaran\`
     - \`fix: memperbaiki bug scrolling horizontal di mobile\`
     - \`refactor: mengoptimalkan fungsi perhitungan cart\`
     - \`chore: upgrade dependensi package.json\``,
        exercise: {
          title: "Audit Performa Web Publik dengan DevTools",
          instruction: "Buka DevTools di salah satu website e-commerce populer. Buka panel Performance, aktifkan 4x CPU Slowdown, klik Record, lalu lakukan scroll halaman selama 5 detik. Perhatikan apakah muncul bar merah bertuliskan 'Long Task' di Main Thread.",
          hint: "Bar warna merah segitiga kecil di timeline menandakan frame rate turun di bawah 60 FPS (terjadi dropped frame)."
        }
      }
    ],
    finalProject: {
      title: "Proyek Modul 0: Laporan Analisis Critical Rendering Path & Audit Profiler",
      description: "Siswa membuat dokumen teknis singkat hasil audit sebuah website sederhana, mencatat durasi TTFB, jumlah request blocking CSS/JS, dan membuktikan pemahaman lifecycle rendering browser.",
      requirements: [
        "Mampu menjelaskan diagram alur dari HTML byte hingga GPU Compositing",
        "Menyertakan screenshot waterfall network dan mengidentifikasi aset terbesar",
        "Membuktikan setup VS Code dengan ESLint, Prettier, dan Tailwind IntelliSense berjalan aktif",
        "Membuat 1 repository Git lokal dengan branch terpisah (bukan direct push ke main)"
      ],
      submissionTip: "Ajarkan siswa membiasakan membaca tab Performance daripada hanya tab Console."
    }
  },
  {
    id: "modul-1",
    slug: "html5-css-deep-dive",
    level: 1,
    title: "Modul 1: HTML5 Semantik, Aksesibilitas (a11y), & CSS Engine Mendalam",
    tagline: "Kuasai Specificity, Stacking Context, Matematika Flexbox (Grow/Shrink/Basis), dan CSS Grid 2 Dimensi.",
    estimatedTime: "2 Minggu",
    color: "amber",
    iconName: "Layout",
    description: "Modul ini membedah mekanisme internal CSS yang sering membingungkan developer selama bertahun-tahun: algoritma kalkulasi spesifisitas, mengapa z-index sering rusak akibat stacking context baru, dan rumus matematika distribusi ruang pada Flexbox.",
    learningOutcomes: [
      "Menguasai pohon spesifisitas CSS (Inline > ID > Class/Attribute/Pseudo-class > Element) dan cara menghitung bobotnya.",
      "Memahami Stacking Context dan properti pemicunya (opacity, transform, filter, will-change, isolation: isolate).",
      "Menguasai rumus matematika Flexbox: flex-grow, flex-shrink, dan flex-basis dalam menghitung alokasi sisa pixel.",
      "Membangun layout CSS Grid 2D dinamis: repeat(auto-fit, minmax(...)), grid-template-areas, dan implicit vs explicit grid.",
      "Mengimplementasikan standar aksesibilitas web WAI-ARIA (aria-label, role, tab-index, keyboard navigable)."
    ],
    topics: [
      {
        id: "css-specificity-cascade",
        title: "1.1 Algoritma Spesifisitas CSS & Cascade Resolution",
        badge: "Mekanisme CSS",
        summary: "Bagaimana browser menentukan aturan mana yang menang saat terjadi konflik selektor.",
        content: `Spesifisitas dihitung menggunakan sistem bobot berbasis 4 tingkat angka: \`(Inline, ID, Class, Element)\`:

1. **Inline Style (\`style="..."\`):** Bobot \`(1, 0, 0, 0)\` = Menang mutlak terhadap selektor file stylesheet biasa.
2. **ID Selector (\`#header\`):** Bobot \`(0, 1, 0, 0)\`.
3. **Class, Pseudo-Class & Attribute (\`.btn\`, \`:hover\`, \`[type="text"]\`):** Bobot \`(0, 0, 1, 0)\`.
4. **Element & Pseudo-Element (\`div\`, \`h1\`, \`::before\`):** Bobot \`(0, 0, 0, 1)\`.
5. **Universal Selector (\`*\`), combinator (\`+\`, \`>\`, \`~\`):** Bobot \`(0, 0, 0, 0)\` (tidak menambah spesifisitas).

**Urutan Prioritas Penentuan (The Cascade):**
1. Origin & Importance (\`!important\` milik browser vs user vs author).
2. Spesifisitas tertinggi.
3. Order of Appearance: Jika bobotnya sama persis, aturan yang ditulis paling akhir (paling bawah di file CSS) yang akan menang!`,
        codeSnippet: {
          language: "css",
          filename: "specificity.css",
          code: `/* Bobot: (0, 0, 0, 1) - Kalah */
nav { color: black; }

/* Bobot: (0, 0, 1, 1) - Kalah */
nav.primary { color: gray; }

/* Bobot: (0, 1, 1, 2) - MENANG! */
#main-nav.primary ul li { color: blue; }

/* HINDARI PENGGUNAAN !important KARENA MERUSAK CASCADE ALGORITHM: */
/* .button { color: red !important; } */`
        },
        pitfalls: [
          "Penggunaan '!important' adalah hutang teknis (technical debt) terbesar di CSS. Jika kamu butuh menimpa aturan, naikkan spesifisitasnya secara terstruktur atau perbaiki hierarki penulisan class."
        ]
      },
      {
        id: "stacking-context-zindex",
        title: "1.2 Misteri Stacking Context & Mengapa z-index Sering Gagal",
        badge: "Penyebab Bug Terbanyak",
        summary: "Mengapa elemen dengan z-index: 999999 tetap tertutup oleh elemen ber-z-index: 1?",
        content: `Banyak pemula mengira seluruh elemen di halaman berbagi satu urutan 3D (Z-axis) yang sama. Ini keliru!

Browser membagi elemen menjadi kelompok-kelompok 3D terisolasi yang disebut **Stacking Context**.
Jika sebuah elemen berada di dalam Parent Stacking Context dengan prioritas rendah di halaman, anak di dalamnya tidak akan pernah bisa menembus keluar, berapapun nilai \`z-index\` yang diberikan!

**Hal-hal yang Menciptakan Stacking Context Baru:**
1. Elemen dengan \`position: absolute\` atau \`relative\` dan memiliki nilai \`z-index\` selain \`auto\`.
2. Elemen dengan \`position: fixed\` atau \`sticky\`.
3. Elemen dengan \`opacity\` kurang dari \`1\`.
4. Elemen dengan \`transform\`, \`filter\`, \`perspective\`, atau \`clip-path\` yang aktif.
5. Elemen yang diberi deklarasi eksplisit: \`isolation: isolate;\` (Teknik modern untuk mencegah z-index bocor).`,
        codeSnippet: {
          language: "css",
          filename: "stacking-context.css",
          code: `/* KASUS RUSAK: */
.modal-wrapper {
  position: relative;
  z-index: 1; /* Parent ini terkunci di layer 1 */
}

.modal-content {
  position: absolute;
  z-index: 999999; /* PERCUMA! Anak ini tetap berada di dalam layer 1 */
}

.header-bar {
  position: relative;
  z-index: 2; /* Header layer 2 ini akan TETAP MENUTUPI modal-content! */
}

/* SOLUSI MODERN: Gunakan isolation untuk mengunci stacking context lokal */
.card-component {
  isolation: isolate; /* Seluruh z-index anak hanya berlaku di dalam kartu ini saja */
}`
        }
      },
      {
        id: "flexbox-mathematics",
        title: "1.3 Matematika Flexbox: Alokasi Ruang flex-grow, shrink, & basis",
        badge: "Algoritma Layout",
        summary: "Memahami rumus eksak bagaimana flex container mendistribusikan sisa pixel.",
        content: `Flexbox bukan tebak-tebakan. Ada rumus pasti di baliknya:

Shorthand: \`flex: [flex-grow] [flex-shrink] [flex-basis]\`

- **\`flex-basis\`:** Ukuran awal elemen di sepanjang Main Axis sebelum ruang kosong didistribusikan.
- **\`flex-grow\`:** Rasio pembagian **ruang sisa positif** jika ukuran container lebih besar dari total flex-basis anak.
  - **Rumus:** \`Lebar Tambahan = Ruang Kosong Sisa * (grow_elemen / total_grow)\`
- **\`flex-shrink\`:** Rasio pemotongan **ruang defisit negatif** jika ukuran container menyempit dan tidak cukup menampung anak-anaknya.
  - Nilai default \`flex-shrink: 1\` (elemen otomatis menyusut jika sempit).
  - Berikan \`flex-shrink: 0\` jika elemen TIDAK BOLEH gepeng/menyusut sama sekali (contoh: ikon avatar atau badge).`,
        codeSnippet: {
          language: "css",
          filename: "flex-math.css",
          code: `.container {
  display: flex;
  width: 1000px;
}

/* Elemen A: basis 200px, grow 1 */
.item-a {
  flex: 1 1 200px; 
}

/* Elemen B: basis 200px, grow 3 */
.item-b {
  flex: 3 1 200px; 
}

/* 
ANALISIS MATEMATIKA:
Total basis = 200px + 200px = 400px.
Sisa ruang kosong = 1000px - 400px = 600px.
Total grow = 1 + 3 = 4 bagian.
Nilai per 1 grow = 600px / 4 = 150px.

Ukuran akhir:
- Item A = 200px + (1 * 150px) = 350px
- Item B = 200px + (3 * 150px) = 650px
Total = 350px + 650px = 1000px (Sempurna & Presisi!)
*/`
        }
      },
      {
        id: "css-grid-mastery",
        title: "1.4 CSS Grid: Responsive Layout 2D Tanpa Media Query",
        badge: "Modern Grid",
        summary: "Kombinasi repeat, auto-fit, minmax, dan fractional unit (fr).",
        content: `Flexbox adalah sistem layout 1 Dimensi (baris ATAU kolom). Sementara **CSS Grid adalah sistem layout 2 Dimensi (baris DAN kolom sekaligus)**.

Salah satu pola CSS Grid paling sakti di industri adalah membuat kartu produk otomatis responsif tanpa perlu menulis 1 baris pun \`@media query\`:

\`\`\`css
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
\`\`\`

**Cara Kerja Algoritma Ini:**
1. \`minmax(280px, 1fr)\`: Tiap kolom memiliki lebar minimal 280px. Jika ada sisa ruang, lebarnya boleh melebar proporsional (\`1fr\`).
2. \`auto-fit\`: Container akan menghitung berapa banyak kolom berukuran minimal 280px yang muat di layar saat ini. Jika muat 4 kolom, dibuat 4 kolom. Jika layar mengecil ke HP sehingga cuma muat 1 kolom, otomatis menjadi 1 kolom tanpa breakpoint manual!`,
        codeSnippet: {
          language: "css",
          filename: "grid-layout.css",
          code: `.dashboard-grid {
  display: grid;
  /* Responsif otomatis dari 1 kolom di HP hingga 4+ kolom di Desktop */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

/* Mengatur tata letak halaman rumit dengan grid-template-areas */
.app-layout {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  grid-template-columns: 260px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.site-header  { grid-area: header; }
.site-sidebar { grid-area: sidebar; }
.site-main    { grid-area: main; }
.site-footer  { grid-area: footer; }`
        }
      }
    ],
    finalProject: {
      title: "Proyek Modul 1: Dashboard UI Multi-Layout Responsif & Bebas Bug Z-Index",
      description: "Membangun layout dashboard aplikasi web lengkap dengan Header fixed, Collapsible Sidebar, Main View berupa Responsive CSS Grid 2D, dan Floating Modal yang diisolasi dengan stacking context mandiri.",
      requirements: [
        "Layout kartu konten menggunakan repeat(auto-fit, minmax(280px, 1fr))",
        "Komponen Avatar/Badge diproteksi dengan flex-shrink: 0 agar tidak gepeng",
        "Komponen Floating Modal atau Dropdown Menu menggunakan isolation: isolate",
        "Lulus uji aksesibilitas: tombol memiliki aria-label dan dapat dinavigasi dengan tombol TAB pada keyboard"
      ],
      submissionTip: "Uji coba dengan mengubah resolusi layar dari 320px sampai 2560px untuk memastikan tidak ada horizontal scrollbar yang bocor."
    }
  },
  {
    id: "modul-2",
    slug: "javascript-engine-deep-dive",
    level: 2,
    title: "Modul 2: JavaScript Engine, Event Loop, Closures, & Async Architecture",
    tagline: "Bedah V8 Engine: Call Stack, Microtask vs Macrotask, Prototype Chain, AbortController, dan Immutability Patterns.",
    estimatedTime: "2-3 Minggu",
    color: "emerald",
    iconName: "Code2",
    description: "Modul ini membawa siswa ke balik tirai JavaScript V8 Engine. Siswa akan memahami siklus eksekusi Event Loop, mengapa Promise dieksekusi lebih dulu daripada setTimeout, bagaimana Closures bekerja di level memori, serta teknik menangani asynchronous HTTP request dengan pembatalan request (AbortController).",
    learningOutcomes: [
      "Memahami siklus hidup Event Loop: Call Stack, Web APIs, Microtask Queue (Promise), dan Macrotask Queue (setTimeout/setInterval).",
      "Menguasai Closures, Lexical Environment, dan penggunaannya dalam Memoization dan Data Encapsulation.",
      "Memahami binding konteks 'this' (implicit, explicit via call/apply/bind, dan lexical binding pada arrow function).",
      "Memahami Immutability mendalam: perbandingan Shallow Copy (spread operator / Object.assign) vs Deep Copy (structuredClone).",
      "Menguasai orkestrasi asinkron tingkat tinggi: Promise.all, Promise.allSettled, penanganan race conditions, dan AbortController."
    ],
    topics: [
      {
        id: "event-loop-concurrency",
        title: "2.1 Bedah Arsitektur Event Loop: Call Stack vs Microtask vs Macrotask",
        badge: "Engine V8",
        summary: "Mengapa JavaScript yang single-threaded bisa menangani ribuan operasi I/O tanpa macet?",
        content: `JavaScript berjalan di atas **Single Thread** (hanya punya satu Call Stack). Namun, browser menyediakan **Web APIs** (Timer, Fetch, DOM Events) di luar thread JavaScript utama.

**Aturan Antrean Eksekusi Event Loop:**
1. **Call Stack:** Mengeksekusi kode sinkron baris demi baris hingga kosong (*LIFO - Last In First Out*).
2. **Microtask Queue:** Antrean prioritas tinggi. Berisi callback dari \`Promise\` (\`.then\`, \`await\`), \`queueMicrotask\`, dan \`MutationObserver\`.
3. **Macrotask / Task Queue:** Antrean prioritas standar. Berisi callback dari \`setTimeout\`, \`setInterval\`, dan I/O event.

> ⚡ **HUKUM EVENT LOOP:** 
> Setiap kali Call Stack kosong, browser akan **MENGURAS HABIS SELURUH Microtask Queue** sebelum mengambil SATU Macrotask berikutnya!`,
        codeSnippet: {
          language: "javascript",
          filename: "event-loop-puzzle.js",
          code: `console.log("1. Sinkron Pertama");

setTimeout(() => {
  console.log("2. Macrotask (setTimeout 0ms)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask (Promise)");
});

queueMicrotask(() => {
  console.log("4. Microtask Kedua (queueMicrotask)");
});

console.log("5. Sinkron Terakhir");

/*
URUTAN OUTPUT YANG TERCETAK DI CONSOLE:
1. Sinkron Pertama
5. Sinkron Terakhir
3. Microtask (Promise)           <-- Microtask dieksekusi SEMUA dulu!
4. Microtask Kedua (queueMicrotask)
2. Macrotask (setTimeout 0ms)    <-- Macrotask baru dieksekusi setelah microtask bersih!
*/`
        },
        pitfalls: [
          "Banyak developer mengira setTimeout(fn, 0) berarti 'jalan dalam 0 detik sekarang juga'. Padahal setTimeout(fn, 0) hanya menjadwalkan eksekusi ke antrean Macrotask yang baru akan dipanggil setelah Call Stack dan SELURUH Promise Microtasks selesai."
        ]
      },
      {
        id: "closures-and-lexical-scope",
        title: "2.2 Closures, Lexical Environment, & Practical Memoization",
        badge: "Pilar Fungsional",
        summary: "Bagaimana fungsi mengingat variabel di tempat ia dilahirkan, dan implementasi cache fungsi murni.",
        content: `**Closure** adalah kemampuan sebuah fungsi untuk 'mengingat' dan mengakses variabel dari lingkup leksikal (*Lexical Environment*) tempat fungsi itu dideklarasikan, meskipun fungsi tersebut telah dieksekusi di luar lingkup aslinya.

**Penerapan Nyata di Industri:**
1. **Private State (Enkapsulasi):** Membuat variabel yang tidak bisa dimodifikasi dari luar secara sembarangan.
2. **Memoization:** Menyimpan hasil kalkulasi berat dari fungsi murni (*pure function*) ke dalam cache internal agar pemanggilan fungsi berikutnya dengan argumen yang sama langsung mengembalikan hasil tanpa proses hitung ulang.`,
        codeSnippet: {
          language: "javascript",
          filename: "memoize.js",
          code: `// Implementasi Closure untuk Memoization (Cache Fungsi):
function createMemoizedFunction(fn) {
  // Objek cache ini terisolasi di dalam Lexical Scope Closure
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log("Mengambil dari cache memori untuk input:", key);
      return cache.get(key);
    }

    console.log("Menghitung hasil baru untuk input:", key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Simulasi kalkulasi berat:
const hitungFaktorial = (n) => (n <= 1 ? 1 : n * hitungFaktorial(n - 1));
const memoizedFaktorial = createMemoizedFunction(hitungFaktorial);

console.log(memoizedFaktorial(50)); // Menghitung hasil baru...
console.log(memoizedFaktorial(50)); // Langsung instan dari cache!`
        }
      },
      {
        id: "immutability-deep-vs-shallow",
        title: "2.3 Immutability: Jebakan Shallow Copy vs Deep Copy",
        badge: "Krusial di React",
        summary: "Mengapa spread operator (...) gagal mengamankan data bertingkat (nested objects).",
        content: `Di React dan Redux, aturan nomor satu adalah: **State bersifat Immutable (Tidak Boleh Dimutasi Langsung)**.

Banyak developer mengira spread operator (\`{ ...obj }\` atau \`[ ...arr ]\`) sudah menyalin seluruh data. **Ini keliru!** Spread operator hanya melakukan **Shallow Copy (Salinan Dangkal Tingkat Pertama)**.
Jika di dalam objek ada objek lain (*nested object*), referensi memori dari objek dalam tersebut **masih tetap sama**!

**Solusi Standar Modern:**
Gunakan fungsi bawaan browser modern: \`structuredClone(data)\` yang aman menangani deep cloning tanpa masalah serialisasi \`JSON.parse(JSON.stringify())\`.`,
        codeSnippet: {
          language: "javascript",
          filename: "immutability.js",
          code: `const userAsli = {
  id: 1,
  nama: "Budi",
  alamat: { kota: "Jakarta", kodePos: 12345 } // <-- Nested object
};

// SALAH: Shallow Copy dengan spread
const userShallow = { ...userAsli };
userShallow.nama = "Andi";               // Aman, userAsli.nama tetap "Budi"
userShallow.alamat.kota = "Bandung";     // BAHAYA! userAsli.alamat.kota IKUT BERUBAH jadi "Bandung"!

// BENAR: Deep Clone dengan structuredClone bawaan JavaScript modern
const userDeep = structuredClone(userAsli);
userDeep.alamat.kota = "Surabaya";        // 100% Terisolasi! userAsli.alamat.kota tetap "Jakarta"`
        }
      },
      {
        id: "async-abort-controller",
        title: "2.4 Asynchronous Lanjutan & Pembatalan Request dengan AbortController",
        badge: "Standar Produksi",
        summary: "Mencegah Race Conditions dan kebocoran request jaringan saat pengguna berpindah halaman.",
        content: `Ketika pengguna mengetik di kotak pencarian (*Search Auto-complete*), setiap ketukan huruf memicu request HTTP baru.
Jika request huruf pertama (lambat) selesai **setelah** request huruf ketiga (cepat), hasil di layar akan menampilkan data lama yang keliru (*Race Condition*).

**Solusi Industri:**
Gunakan **\`AbortController\`** untuk membatalkan sinyal request yang sedang berjalan ketika ada request baru atau saat komponen di-unmount.`,
        codeSnippet: {
          language: "javascript",
          filename: "abortController.js",
          code: `let controllerAktif = null;

async function cariProduk(query) {
  // Jika ada request sebelumnya yang masih 'gantung', batalkan segera!
  if (controllerAktif) {
    controllerAktif.abort();
    console.log("Request pencarian sebelumnya berhasil dibatalkan.");
  }

  // Buat controller baru untuk request yang sekarang
  controllerAktif = new AbortController();
  const { signal } = controllerAktif;

  try {
    const res = await fetch(\`https://dummyjson.com/products/search?q=\${query}\`, { signal });
    const data = await res.json();
    console.log("Hasil pencarian terkini:", data.products);
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Request dibatalkan secara sengaja oleh AbortController.");
    } else {
      console.error("Error jaringan sungguhan:", err);
    }
  }
}`
        }
      }
    ],
    finalProject: {
      title: "Proyek Modul 2: Modul Data-Fetching Engine dengan Cache & Debounce AbortController",
      description: "Membangun fungsi data-fetching mandiri yang memiliki fitur: Debounce otomatis 300ms, AbortController untuk membatalkan request lama yang belum selesai, dan in-memory cache menggunakan Closures.",
      requirements: [
        "Mencegah Race Condition saat user mengetik cepat dengan AbortController",
        "Menyimpan hasil response API di dalam Map cache closure",
        "Menangani Promise rejections dan membedakan jenis error AbortError vs NetworkError",
        "100% menggunakan structuredClone untuk mutasi data array"
      ],
      submissionTip: "Buka tab Network di DevTools saat mengetik cepat; siswa harus melihat status 'canceled' pada request sebelumnya yang tertimpa."
    }
  },
  {
    id: "modul-3",
    slug: "tailwind-arsitektur-dan-design-system",
    level: 3,
    title: "Modul 3: Tailwind CSS v4 & Arsitektur Design System Skalabel",
    tagline: "Kuasai Tailwind v4 CSS Variables integration, CVA (Class Variance Authority), cn() utility, dan Component Library patterns.",
    estimatedTime: "2 Minggu",
    color: "cyan",
    iconName: "Palette",
    description: "Tailwind CSS bukan hanya kumpulan class singkat. Di modul ini siswa belajar cara merancang Design System berskala perusahaan (seperti shadcn/ui): arsitektur token warna berbasis CSS variables, kombinasi library CVA untuk varian komponen yang type-safe, serta manipulasi class anti-bentrok menggunakan tailwind-merge.",
    learningOutcomes: [
      "Memahami arsitektur Tailwind CSS v4 yang baru berbasis CSS Variables dan deklarasi @theme/@utility.",
      "Menguasai Class Variance Authority (CVA) untuk membuat varian komponen (Primary, Destructive, Outline, Ghost).",
      "Memahami fungsi utilitas sakti cn() (kombinasi clsx + tailwind-merge) untuk menyelesaikan bentrok prioritas class.",
      "Menguasai teknik Child Selector [&>p], Data Attribute states [data-state=open], dan nested groups (group/sidebar).",
      "Membangun satu set UI Library mandiri (Button, Input, Modal, Badge) yang siap digunakan di React & Next.js."
    ],
    topics: [
      {
        id: "tailwind-v4-architecture",
        title: "3.1 Arsitektur Tailwind v4 & Integrasi CSS Variables Modern",
        badge: "Generasi Baru v4",
        summary: "Mengapa Tailwind v4 tidak lagi butuh tailwind.config.js dan langsung menyatu dengan CSS native.",
        content: `Tailwind CSS v4 dibangun ulang dari nol menggunakan engine baru (Oxide engine berbasis Rust) yang mem-parse CSS 10x lebih cepat.
Di v4, konfigurasi tidak lagi ditulis di file JavaScript terpisah (\`tailwind.config.js\`), melainkan langsung di dalam file CSS utama menggunakan direktif:

1. **\`@import "tailwindcss";\`**: Memuat seluruh utilitas Tailwind secara otomatis.
2. **\`@theme { ... }\`**: Mendeklarasikan token sistem desain (warna primer, radius, font) menggunakan CSS variables native.
3. Keuntungannya: Kamu bisa mengubah variabel tema secara dinamis saat runtime (misal saat ganti tema Dark/Light) tanpa perlu rebuild JavaScript!`,
        codeSnippet: {
          language: "css",
          filename: "app/globals.css",
          code: `@import "tailwindcss";

@theme {
  --color-brand-primary: #2563eb;
  --color-brand-accent: #10b981;
  --radius-custom: 1rem;
}

/* Menggunakan CSS variables untuk dark mode dinamis */
:root {
  --background: #ffffff;
  --foreground: #0f172a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #020617;
    --foreground: #f8fafc;
  }
}`
        }
      },
      {
        id: "cva-and-cn-utility",
        title: "3.2 Standar Industri: Helper cn() & Class Variance Authority (CVA)",
        badge: "Pola shadcn/ui",
        summary: "Cara profesional membuat komponen React dengan ratusan kombinasi varian warna dan ukuran tanpa konflik class.",
        content: `Ketika kita membuat komponen tombol yang fleksibel, kita ingin pengguna bisa mengubah warna: \`<Button variant="danger" size="sm" className="p-8">Click</Button>\`.

**Masalah Besar:**
Jika di dalam tombol ada class default \`p-4\`, dan dari luar dikirim prop \`className="p-8"\`, class mana yang menang?
Di CSS biasa, pemenangnya ditentukan oleh urutan file CSS, BUKAN urutan teks di atribut class! Bisa saja \`p-4\` yang menang dan \`p-8\` diabaikan.

**Solusi Standar Industri (dipakai shadcn/ui & Radix UI):**
1. **\`clsx\`**: Menggabungkan class secara kondisional berdasarkan boolean.
2. **\`tailwind-merge\`**: Secara cerdas mengetahui bahwa \`p-8\` menimpa \`p-4\`, sehingga \`p-4\` otomatis dihapus dari string akhir!
3. Kombinasi keduanya disatukan dalam fungsi sakti: **\`cn()\`**.`,
        codeSnippet: {
          language: "tsx",
          filename: "lib/utils.ts",
          code: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Fungsi utilitas terpenting di era web modern:
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*
CONTOH KEAJAIBAN twMerge:
cn("p-4 bg-red-500", "p-8") 
HASIL: "bg-red-500 p-8" (p-4 otomatis dibuang, anti-konflik!)
*/`
        }
      },
      {
        id: "reusable-button-cva",
        title: "3.3 Pembuatan Komponen Button Reusable dengan CVA",
        badge: "Kode Produksi",
        summary: "Membangun komponen Button dengan sistem type-safe yang elegan.",
        content: `Berikut adalah implementasi nyata bagaimana sebuah komponen Button dibuat di perusahaan teknologi modern menggunakan CVA:`,
        codeSnippet: {
          language: "tsx",
          filename: "components/ui/Button.tsx",
          code: `import React from "react";
import { cn } from "@/lib/utils";

// Definisi varian tombol secara deklaratif
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "destructive" | "ghost";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/20",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200",
    destructive: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm shadow-rose-500/20",
    ghost: "hover:bg-slate-100 text-slate-700"
  };

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5"
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    />
  );
}`
        }
      },
      {
        id: "advanced-tailwind-variants",
        title: "3.4 Selektor Kompleks: Arbitrary Variants & Nested Groups",
        badge: "Fitur Sakti",
        summary: "Mengendalikan tampilan anak, saudara, dan parent state tanpa menulis file CSS baru.",
        content: `Tailwind menyediakan selektor tingkat tinggi:
- **Child Selector (\`[&>p]\`):** Mengatur styling seluruh tag \`<p>\` yang merupakan anak langsung dari div.
- **Nested Groups (\`group/card\`, \`group/sidebar\`):** Ketika kamu punya kartu di dalam sidebar, dan hover pada kartu tidak boleh mengganggu hover sidebar.
- **Peer States (\`peer-checked:\`):** Mengubah tampilan elemen tetangga saat input checkbox/radio aktif (sangat berguna untuk custom toggle switch tanpa JavaScript!).`,
        codeSnippet: {
          language: "html",
          filename: "custom-toggle.html",
          code: `<!-- Custom Toggle Switch 100% Tailwind tanpa JavaScript -->
<label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" class="sr-only peer" />
  <!-- Track Switch -->
  <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
  <span class="ml-3 text-sm font-medium text-slate-700">Aktifkan Fitur</span>
</label>`
        }
      }
    ],
    finalProject: {
      title: "Proyek Modul 3: Membangun Mini Design System Component Library (UI Kit)",
      description: "Membuat mini library komponen UI mandiri menggunakan Tailwind CSS yang terdiri dari: Button (4 varian), Badge (4 varian warna), Input Text dengan validasi error state, dan Modal Dialog yang ter-isolasi dengan animasi halus.",
      requirements: [
        "Wajib menggunakan helper cn() (clsx + tailwind-merge) untuk meresolusi bentrok class",
        "Mendukung Dark Mode menggunakan CSS variables",
        "Komponen Button memiliki status loading (spinner) dan disabled state yang tepat",
        "Didesain dengan transisi halus (transition-all, active:scale-95)"
      ],
      submissionTip: "Pastikan komponen Button bisa ditimpa ukurannya lewat prop className tanpa merusak style dasarnya."
    }
  },
  {
    id: "modul-4",
    slug: "react-engine-and-advanced-patterns",
    level: 4,
    title: "Modul 4: React Engine (Fiber, Reconciliation, Hooks Deep Dive)",
    tagline: "Bedah siklus render React, Virtual DOM vs Real DOM, useReducer state machine, useCallback/useMemo referential equality, dan Custom Hooks.",
    estimatedTime: "2-3 Minggu",
    color: "blue",
    iconName: "Atom",
    description: "Di modul ini siswa tidak hanya belajar cara memanggil hooks, melainkan memahami BAGAIMANA React bekerja: arsitektur React Fiber, algoritma rekonsiliasi berbasis Diffing, mengapa re-render terjadi, bahaya memory leak pada useEffect, dan cara memisahkan Business Logic dari antarmuka menggunakan Custom Hooks.",
    learningOutcomes: [
      "Memahami algoritma React Reconciliation (Fiber Tree, Diffing Rules, dan peran krusial properti key).",
      "Memahami aturan re-render dan automatic batching pembaruan state di React 18/19.",
      "Menguasai useReducer untuk mengelola state kompleks dengan pola Redux-like State Machine.",
      "Menguasai useRef untuk memegang nilai persisten tanpa memicu re-render dan manipulasi DOM imperatif.",
      "Memahami kapan useMemo & useCallback benar-benar dibutuhkan (Referential Equality) vs kapan menjadi premature optimization.",
      "Merancang Custom Hooks modular (contoh: useDebounce, useLocalStorage, useFetchWithAbort)."
    ],
    topics: [
      {
        id: "react-fiber-reconciliation",
        title: "4.1 React Fiber, Virtual DOM, & Algoritma Diffing",
        badge: "Mesin React",
        summary: "Bagaimana React membandingkan 2 pohon elemen dan menentukan perubahan minimal ke Real DOM.",
        content: `**Virtual DOM (VDOM)** adalah representasi objek JavaScript ringan dari Real DOM.
Ketika state berubah, React melakukan proses **Reconciliation**:
1. React membuat pohon Virtual DOM baru hasil render fungsi komponen.
2. Algoritma **Diffing (O(n))** membandingkan pohon lama dengan pohon baru.
3. React menghitung perubahan terkecil (*patch*) lalu menerapkannya sekaligus ke Real DOM di browser (**Commit Phase**).

**Aturan Emas Properti \`key\` pada List:**
- Jangan pernah memakai \`key={index}\` pada data yang bisa ditambah, dihapus, atau diurutkan!
- Jika urutan array berubah, index akan bergeser sehingga React salah mencocokkan state komponen anak dengan item data yang keliru. Selalu gunakan ID unik yang permanen (misal: \`item.id\`).`,
        codeSnippet: {
          language: "jsx",
          filename: "diffingRules.jsx",
          code: `// BAHAYA: Menggunakan index sebagai key pada daftar yang dinamis
{items.map((item, index) => (
  // Jika item pertama dihapus, item kedua akan mewarisi index 0 beserta input statenya yang lama!
  <TodoItem key={index} data={item} />
))}

// BENAR: Menggunakan ID unik yang stabil
{items.map((item) => (
  <TodoItem key={item.id} data={item} />
))}`
        }
      },
      {
        id: "usereducer-state-machine",
        title: "4.2 useReducer: Mengelola State Kompleks dengan State Machine",
        badge: "Pola Skalabel",
        summary: "Alternatif terstruktur untuk useState saat sebuah perubahan state memicu banyak variabel sekaligus.",
        content: `Ketika state komponen memiliki relasi erat (misal: \`isLoading\`, \`error\`, \`data\`, \`isSuccess\`), mengelolanya dengan 4 \`useState\` terpisah sering kali memicu kondisi inkonsisten (*impossible states*—misal data sudah ada tapi isLoading masih true).

**Gunakan \`useReducer\`:**
Pola yang memisahkan **'Apa yang terjadi' (Dispatch Action)** dari **'Bagaimana state diperbarui' (Reducer Function)**. Pola ini murni, mudah di-unit test, dan anti-bug.`,
        codeSnippet: {
          language: "jsx",
          filename: "useReducerCart.jsx",
          code: `import { useReducer } from "react";

// 1. Initial State
const initialState = {
  items: [],
  totalPrice: 0,
};

// 2. Pure Reducer Function
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const updatedItems = [...state.items, action.payload];
      const newTotal = updatedItems.reduce((acc, item) => acc + item.price, 0);
      return { ...state, items: updatedItems, totalPrice: newTotal };
    }
    case "REMOVE_ITEM": {
      const filtered = state.items.filter((item) => item.id !== action.payload.id);
      const newTotal = filtered.reduce((acc, item) => acc + item.price, 0);
      return { ...state, items: filtered, totalPrice: newTotal };
    }
    case "CLEAR_CART":
      return initialState;
    default:
      throw new Error(\`Action type \${action.type} tidak dikenali.\`);
  }
}

// 3. Komponen Pengguna
export default function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <div>
      <h2>Total Belanja: Rp {state.totalPrice.toLocaleString()}</h2>
      <button onClick={() => dispatch({ type: "ADD_ITEM", payload: { id: Date.now(), name: "Sepatu", price: 200000 } })}>
        + Tambah Sepatu
      </button>
      <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
        Kosongkan
      </button>
    </div>
  );
}`
        }
      },
      {
        id: "usecallback-usememo-deep",
        title: "4.3 Optimasi Performa: Kapan Wajib useMemo & useCallback?",
        badge: "Kinerja Tinggi",
        summary: "Mencegah re-render yang tidak perlu berdasarkan Referential Equality.",
        content: `Setiap kali komponen React me-render ulang:
- Semua fungsi di dalamnya **dibuat ulang dengan alamat memori baru** (\`() => {}\` != \`() => {}\`).
- Semua kalkulasi di dalamnya dihitung ulang dari awal.

**Kapan Wajib Pakai:**
1. **\`useCallback\`**: Hanya berguna jika fungsi tersebut dikirim sebagai prop ke komponen anak yang sudah dibungkus dengan \`React.memo()\`. Jika anak tidak di-memoize, pembungkusan useCallback sia-sia.
2. **\`useMemo\`**: Hanya berguna untuk operasi komputasi array besar (ribuan item) atau objek referensi yang dimasukkan ke dalam dependency array \`useEffect\` lain.

> ⚠️ **Peringatan:** Menyelimuti semua kode dengan useMemo/useCallback tanpa alasan justru memperlambat aplikasi karena React harus mengalokasikan memori ekstra untuk melacak dependency array!`,
        codeSnippet: {
          language: "jsx",
          filename: "memoExample.jsx",
          code: `import { useState, useMemo, useCallback, memo } from "react";

// Komponen Anak yang diproteksi dengan React.memo
const TombolAksi = memo(function TombolAksi({ onKlik, label }) {
  console.log("Komponen Tombol di-render ulang!");
  return <button onClick={onKlik}>{label}</button>;
});

export default function ParentApp() {
  const [count, setCount] = useState(0);
  const [angkaLain, setAngkaLain] = useState(10);

  // useCallback mengunci alamat memori fungsi agar TombolAksi TIDAK ikut re-render
  // saat state 'angkaLain' berubah!
  const handleKlikStabil = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <TombolAksi onKlik={handleKlikStabil} label="Klik Saya" />
      <button onClick={() => setAngkaLain(angkaLain + 1)}>Ubah Angka Lain: {angkaLain}</button>
    </div>
  );
}`
        }
      },
      {
        id: "custom-hooks-architecture",
        title: "4.4 Merancang Custom Hook Standar Industri: useDebounce",
        badge: "Pemisahan Logika",
        summary: "Mengekstrak business logic murni agar bisa dipakai ulang di puluhan komponen berbeda.",
        content: `Custom Hook adalah fungsi JavaScript biasa yang namanya diawali dengan kata \`use\` dan di dalamnya memanggil hooks resmi React (\`useState\`, \`useEffect\`, dll).

Contoh klasik: **\`useDebounce\`**. Hook ini menunda pembaruan nilai input hingga pengguna berhenti mengetik selama durasi tertentu (misal 500ms) untuk menghemat ribuan panggilan API yang tidak perlu.`,
        codeSnippet: {
          language: "tsx",
          filename: "hooks/useDebounce.ts",
          code: `import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Buat timer untuk mengupdate debouncedValue setelah durasi delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // CLEANUP FUNCTION: Batalkan timer lama jika value berubah sebelum delay habis!
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// CARA PAKAI DI KOMPONEN SEARCH:
/*
const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search, 400);

useEffect(() => {
  // Hanya menembak API saat user SELESAI mengetik selama 400ms!
  if (debouncedSearch) fetchSearchAPI(debouncedSearch);
}, [debouncedSearch]);
*/`
        }
      }
    ],
    finalProject: {
      title: "Proyek Modul 4: Mini E-Commerce Engine dengan useReducer & Custom useDebounce",
      description: "Membangun aplikasi katalog dan keranjang belanja lengkap: pencarian produk otomatis dengan debounce, manajemen mutasi keranjang belanja menggunakan useReducer (ADD, REMOVE, UPDATE_QTY, APPLY_DISCOUNT), dan optimasi rendering dengan React.memo.",
      requirements: [
        "Seluruh state transaksi cart dikelola secara eksklusif menggunakan useReducer",
        "Pencarian produk wajib menggunakan custom hook useDebounce",
        "Daftar item menggunakan key unik (bukan index array)",
        "Fungsi kalkulasi diskon dioptimalkan dengan useMemo"
      ],
      submissionTip: "Buka React Profiler di browser untuk membuktikan bahwa mengetik di input search tidak memicu re-render pada komponen list cart yang sedang diam."
    }
  },
  {
    id: "modul-5",
    slug: "nextjs-app-router-produksi",
    level: 5,
    title: "Modul 5: Next.js App Router Arsitektur Produksi & Fullstack Frontend",
    tagline: "Server Components vs Client Components, Data Fetching & Caching Deep Dive, Server Actions, Dynamic Routing, dan Deployment.",
    estimatedTime: "3-4 Minggu",
    color: "violet",
    iconName: "Rocket",
    description: "Puncak keahlian frontend modern! Membedah cara kerja internal Next.js App Router: arsitektur React Server Components (RSC), aturan serialisasi perbatasan Server-Client, mekanisme 4 lapisan Caching Next.js (Request Memoization, Data Cache, Full Route Cache, Router Cache), Server Actions untuk mutasi database tanpa API routes terpisah, hingga deployment siap produksi di Vercel.",
    learningOutcomes: [
      "Menguasai mental model React Server Components (RSC) vs Client Components dan Serialization Boundary.",
      "Memahami pola komposisi 'Passing Server Components as Children' untuk meminimalisir ukuran bundle JS browser.",
      "Menguasai 4 lapisan Caching Next.js serta mekanisme revalidasi: Time-based (revalidate) dan On-demand (revalidateTag / revalidatePath).",
      "Mengimplementasikan Server Actions untuk mutasi data form yang aman dan type-safe.",
      "Menguasai Dynamic Routing, Catch-all Routes ([...slug]), Intercepting Routes, dan Parallel Routes.",
      "Menerapkan Streaming UI dengan React Suspense dan file loading.tsx untuk skor Core Web Vitals optimal."
    ],
    topics: [
      {
        id: "rsc-architecture-serialization",
        title: "5.1 Arsitektur React Server Components (RSC) & Serialization Boundary",
        badge: "Pondasi Next.js",
        summary: "Mengapa Server Components adalah lompatan terbesar dalam sejarah web modern.",
        content: `Di Next.js App Router, **seluruh komponen secara default adalah Server Component**.
Server Component dieksekusi di Node.js server, diubah menjadi format biner virtual (*RSC Payload*), lalu dikirim ke browser bersama HTML statis.

**Keuntungan Kritis Server Component:**
1. **0 KB Ukuran JavaScript di Browser:** Dependensi berat (misal: library Markdown parser 200KB atau library manipulasi tanggal) diproses di server dan TIDAK PERNAH dikirim ke browser pengguna!
2. **Akses Langsung ke Database & Backend:** Bisa langsung melakukan koneksi SQL/Prisma atau memanggil API tanpa perlu membuat endpoint API publik perantara.

**Aturan Keras Serialization Boundary:**
Saat Server Component mengirim data ke Client Component (komponen ber-\`'use client'\`), data tersebut harus **Serializable** (bisa diubah menjadi format JSON/teks).
> ❌ DILARANG mengirim: Fungsi, instance Class (seperti Date objek mentah atau Database Connection pool).
> ✅ HANYA BOLEH: String, Number, Boolean, Array, dan Plain Object.`,
        codeSnippet: {
          language: "tsx",
          filename: "app/dashboard/page.tsx",
          code: `// SERVER COMPONENT (Default - Berjalan di Server)
import ClientSearchBar from "./ClientSearchBar";

// Bisa langsung async/await untuk mengambil data dari server secara instan!
export default async function DashboardPage() {
  const res = await fetch("https://dummyjson.com/products?limit=5", {
    // Next.js Data Cache: Simpan cache selama 60 detik (ISR)
    next: { revalidate: 60 }
  });
  const data = await res.json();

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6">Dashboard Produk</h1>
      
      {/* Mengirim data serializable (string/array) ke Client Component */}
      <ClientSearchBar initialCount={data.products.length} />

      <div className="grid gap-4 mt-6">
        {data.products.map((item: any) => (
          <div key={item.id} className="p-4 bg-white border rounded-xl shadow-xs">
            <h2 className="font-bold text-slate-800">{item.title}</h2>
            <p className="text-sm text-slate-500">Rp {item.price * 15000}</p>
          </div>
        ))}
      </div>
    </main>
  );
}`
        }
      },
      {
        id: "server-client-composition-pattern",
        title: "5.2 Pola Komposisi: Memasukkan Server Component ke Dalam Client Component",
        badge: "Trik Arsitektur",
        summary: "Bagaimana cara membungkus Server Component di dalam Client Component tanpa merusak status Server-nya?",
        content: `Banyak developer pemula mengira: jika sebuah komponen diberi tag \`'use client'\`, maka seluruh komponen yang diimpor di dalamnya akan otomatis berubah menjadi Client Component. **Ini benar jika diimpor langsung!**

**Solusi Pola Desain (Passing as Children):**
Jangan impor Server Component di dalam Client Component. Melainkan, buat Client Component sebagai **Container Pembungkus** yang menerima \`children: React.ReactNode\`. 
Dengan begitu, komponen anak tetap berstatus Server Component dan tidak menambah beban bundle JavaScript browser!`,
        codeSnippet: {
          language: "tsx",
          filename: "components/ClientModalWrapper.tsx",
          code: `"use client";
import { useState } from "react";

// Client Component hanya mengurus logika buka/tutup modal
export default function ClientModalWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        Buka Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl max-w-lg w-full">
            {/* 'children' di sini TETAP DIRENDER DI SERVER! Ukuran JS 0 KB ke browser! */}
            {children}
            <button onClick={() => setIsOpen(false)} className="mt-4 text-xs font-bold text-slate-500">
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`
        }
      },
      {
        id: "caching-and-revalidation",
        title: "5.3 Deep Dive 4 Lapisan Caching Next.js & Revalidation",
        badge: "Kinerja Ekstrem",
        summary: "Memahami Request Memoization, Data Cache, Full Route Cache, dan On-Demand Revalidation.",
        content: `Next.js memiliki sistem caching terkuat di dunia web, terbagi dalam 4 lapisan:

1. **Request Memoization:** Jika fungsi \`fetch('url-sama')\` dipanggil di 3 komponen berbeda dalam 1 kali render halaman, Next.js otomatis hanya menembak 1 kali HTTP request ke server.
2. **Data Cache (Persistent):** Menyimpan response data antar permintaan user yang berbeda di server.
   - \`fetch(url, { cache: 'force-cache' })\`: Cache selamanya (Statis).
   - \`fetch(url, { next: { revalidate: 3600 } })\`: Cache 1 jam, lalu update di background (ISR - Incremental Static Regeneration).
   - \`fetch(url, { cache: 'no-store' })\`: Selalu fetch baru setiap kali dibuka (Dinamis).
3. **On-Demand Revalidation:**
   Menghapus cache seketika saat ada admin yang mempublikasikan artikel baru:
   - \`revalidatePath('/artikel')\`
   - \`revalidateTag('daftar-produk')\``,
        codeSnippet: {
          language: "typescript",
          filename: "app/actions/productActions.ts",
          code: `"use server";
import { revalidatePath, revalidateTag } from "next/cache";

// Server Action: Mutasi data yang berjalan murni di server
export async function tambahProdukBaru(formData: FormData) {
  const nama = formData.get("namaProduk") as string;
  const harga = formData.get("harga") as string;

  // 1. Simpan ke Database
  console.log("Menyimpan ke DB di server:", { nama, harga });

  // 2. Beri tahu Next.js untuk membuang cache lama dan membangun halaman baru secara instan!
  revalidatePath("/produk");
  
  return { success: true };
}`
        }
      },
      {
        id: "streaming-suspense-loading",
        title: "5.4 Streaming UI dengan React Suspense & loading.tsx",
        badge: "User Experience",
        summary: "Menghilangkan layar putih; tampilkan layout seketika sementara data berat di-stream menyusul.",
        content: `Di web konvensional, jika ada satu komponen lambat (misal mengambil data analitik butuh 3 detik), seluruh halaman akan macet menunggu 3 detik sebelum browser bisa menampilkan apa pun (*TTFB lambat*).

Di Next.js App Router:
1. Buat file \`loading.tsx\` untuk skeleton loading instan.
2. Bungkus komponen lambat dengan **\`<Suspense fallback={<Skeleton />}>\`**.
3. Browser akan menerima Header dan Navbar dalam **0.1 detik**, lalu bagian data analitik akan di-*streaming* melalui koneksi HTTP yang sama begitu datanya siap!`,
        codeSnippet: {
          language: "tsx",
          filename: "app/analytics/page.tsx",
          code: `import { Suspense } from "react";

// Komponen lambat (simulasi 3 detik)
async function SlowAnalyticsWidget() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl">Analitik Penjualan: Rp 45.000.000</div>;
}

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Laporan Bisnis</h1>
      
      {/* Bagian ini tidak menahan render halaman utama! */}
      <Suspense fallback={<div className="p-4 bg-slate-100 animate-pulse rounded-xl">Memuat data analitik...</div>}>
        <SlowAnalyticsWidget />
      </Suspense>
    </div>
  );
}`
        }
      }
    ],
    finalProject: {
      title: "Final Capstone Project: Fullstack Platform Web Blog & Katalog Modern (Next.js App Router)",
      description: "Membangun aplikasi web fullstack tingkat produksi menggunakan Next.js App Router dan Tailwind CSS: Dynamic Routes (/blog/[slug]), Server Component untuk SEO & Data Fetching cepat, Client Component dengan useOptimistic/useState untuk interaksi real-time, Server Actions untuk submit data form, serta streaming dengan Suspense.",
      requirements: [
        "Menerapkan struktur folder App Router dengan layout bersama, loading.tsx, dan not-found.tsx",
        "Menerapkan komposisi Server Component dan Client Component yang hemat bundle size",
        "Menggunakan Server Actions untuk submit komentar atau artikel baru dengan revalidatePath",
        "Menyediakan dynamic route dinamis /artikel/[slug] dengan meta data dinamis (generateMetadata) untuk SEO",
        "Berhasil di-deploy online ke Vercel dengan skor Lighthouse performa di atas 90"
      ],
      submissionTip: "Periksa tab Network di browser pada hasil build produksi untuk membuktikan bahwa tidak ada dependensi server yang bocor ke bundle client."
    }
  }
];

export const CHEATSHEETS = [
  {
    category: "CSS Engine & Specificity",
    items: [
      { code: "isolation: isolate;", desc: "Menciptakan Stacking Context baru untuk mengisolasi z-index anak" },
      { code: "flex: 1 1 0%;", desc: "flex-grow: 1, flex-shrink: 1, basis: 0 (distribusi ruang sama rata)" },
      { code: "flex-shrink: 0;", desc: "Mengunci elemen agar TIDAK BOLEH menyusut/gepeng saat sempit" },
      { code: "repeat(auto-fit, minmax(280px, 1fr))", desc: "Grid responsif otomatis 1 sampai n kolom tanpa media query" },
      { code: "will-change: transform;", desc: "Memberi tahu GPU untuk memindahkan rendering ke layer compositing terpisah" }
    ]
  },
  {
    category: "JavaScript Engine & Asynchronous",
    items: [
      { code: "queueMicrotask(() => {})", desc: "Menjadwalkan callback dengan prioritas tinggi sebelum render frame berikutnya" },
      { code: "structuredClone(obj)", desc: "Deep clone objek/array secara aman tanpa bug nested reference spread" },
      { code: "new AbortController()", desc: "Membatalkan sinyal request fetch HTTP saat input baru masuk / unmount" },
      { code: "Promise.allSettled([...])", desc: "Menjalankan banyak promise paralel tanpa gugur jika 1 gagal" },
      { code: "Object.freeze(obj)", desc: "Mencegah mutasi properti tingkat pertama pada objek" }
    ]
  },
  {
    category: "Tailwind v4 & CVA Patterns",
    items: [
      { code: "cn(...inputs)", desc: "twMerge(clsx(inputs)) untuk resolusi bentrok class dinamis" },
      { code: "@theme { --color-brand: ... }", desc: "Konfigurasi token design system native di Tailwind v4" },
      { code: "[&>p]:text-slate-600", desc: "Arbitrary child selector untuk menata seluruh tag p anak langsung" },
      { code: "group-hover/card:scale-105", desc: "Named nested group state untuk interaksi bersarang" },
      { code: "peer-checked:bg-blue-600", desc: "Mengubah style saudara saat checkbox/radio aktif" }
    ]
  },
  {
    category: "React Engine & Hooks",
    items: [
      { code: "useReducer(reducer, initial)", desc: "State machine deklaratif untuk transaksi data kompleks" },
      { code: "useRef(null)", desc: "Menyimpan referensi DOM atau mutable value tanpa memicu re-render" },
      { code: "useCallback(fn, deps)", desc: "Mengunci identitas fungsi untuk props anak yang di-memoize" },
      { code: "React.memo(Component)", desc: "Mencegah re-render jika props tidak berubah secara referensial" },
      { code: "key={item.id}", desc: "Identitas stabil mutlak untuk algoritma diffing rekonsiliasi React" }
    ]
  },
  {
    category: "Next.js App Router Arsitektur",
    items: [
      { code: "async function Page()", desc: "Server Component bawaan: fetch data langsung tanpa useEffect / useState" },
      { code: "'use client'", desc: "Menandai batas serialisasi untuk interaktivitas pengguna & React Hooks" },
      { code: "'use server'", desc: "Menandai Server Action: mutasi data form langsung di Node.js server" },
      { code: "revalidatePath('/path')", desc: "On-demand purge cache untuk memperbarui halaman seketika setelah mutasi" },
      { code: "<Suspense fallback={<Skeleton />}>", desc: "Streaming UI: render layout instan tanpa menunggu data lambat" },
      { code: "export async function generateMetadata()", desc: "SEO dinamis untuk halaman dinamis /artikel/[id]" }
    ]
  }
];
