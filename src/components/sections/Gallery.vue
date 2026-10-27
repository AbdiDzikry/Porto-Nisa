<script setup>
import { ref } from 'vue'
import { Camera, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true }
})

// Urutan dari yang paling baru:
// 1. Dokumentasi Profil Profesional
// 2. PT Pelabuhan Indonesia (Persero) (Jan 2026 - Okt 2026)
// 3. Badan Pusat Statistik / BPS (Okt 2025 - Des 2025)
// 4. PT Astra Honda Motor / AHM (2024 / 2025)
// 5. BBPVP Bekasi - Pelatihan & Uji BNSP (Mar 2022 - Jun 2022)
const galleryItems = [
  {
    src: '/gallery/avatar-annisa.jpg',
    title: 'Annisa Maulana Sabilla',
    role: 'Information Systems & HRIS Specialist',
    desc: 'Portret profesional dan dedikasi dalam tata kelola sistem informasi, administrasi kearsipan digital, dan analisis spasial.',
    tag: 'Dokumentasi Utama'
  },
  {
    src: '/gallery/pelind0.jpg',
    title: 'PT Pelabuhan Indonesia (Persero)',
    role: 'Archive & HRIS Intern (Jan 2026 – Okt 2026)',
    desc: 'Penataan 1.027 box arsip, 1.979 map, 9.164 folder dokumen inaktif, dan penyelesaian 95.748 entri arsip kepegawaian digital.',
    tag: '2026 • BUMN Pelindo'
  },
  {
    src: '/gallery/bps.jpeg',
    title: 'Badan Pusat Statistik (BPS) Kab. Bekasi',
    role: 'Design & Spatial Data Intern (Okt 2025 – Des 2025)',
    desc: 'Pengolahan dan visualisasi data statistik daerah serta perancangan media diseminasi publik resmi.',
    tag: '2025 • BPS'
  },
  {
    src: '/gallery/ahm.jpg',
    title: 'PT Astra Honda Motor (AHM)',
    role: 'Quality Control Intern (2024 / 2025)',
    desc: 'Inspeksi kualitas komponen permesinan dan pengembangan otomasi rekapitulasi data QC dengan Excel VBA Macro.',
    tag: '2024/2025 • Manufaktur Otomotif'
  },
  {
    src: '/gallery/bbvp.jpg',
    title: 'BBPVP Bekasi (Kemnaker RI)',
    role: 'IT Software Programming for Business (Mar 2022 – Jun 2022)',
    desc: 'Pelatihan pemrograman bisnis intensif dan sertifikasi kompetensi profesi dari Badan Nasional Sertifikasi Profesi (BNSP).',
    tag: '2022 • BNSP'
  }
]

// Modal Lightbox state
const activeIndex = ref(null)

const openModal = (idx) => {
  activeIndex.value = idx
}

const closeModal = () => {
  activeIndex.value = null
}

const nextImage = () => {
  if (activeIndex.value !== null) {
    activeIndex.value = (activeIndex.value + 1) % galleryItems.length
  }
}

const prevImage = () => {
  if (activeIndex.value !== null) {
    activeIndex.value = (activeIndex.value - 1 + galleryItems.length) % galleryItems.length
  }
}

const onKeyDown = (e) => {
  if (activeIndex.value === null) return
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}
</script>

<template>
  <section id="gallery" class="section-container" aria-labelledby="gallery-heading" @keydown="onKeyDown">
    <!-- Header -->
    <div class="mb-10">
      <span class="comic-chapter-badge bg-[var(--brand-sun)] text-slate-950 mb-4 inline-flex items-center gap-2">
        <Camera class="w-3.5 h-3.5 text-slate-950" />
        <span>{{ c.galleryMeta || 'Dokumentasi & Jejak Lapangan' }}</span>
      </span>
      <h2 id="gallery-heading" class="display-section">
        {{ c.galleryTitle || 'Galeri Aktivitas & Magang' }}
      </h2>
      <p class="text-[var(--ink-muted)] text-sm sm:text-base max-w-2xl mt-2 font-medium">
        {{ c.gallerySubtitle || 'Momen dokumentasi kegiatan kerja praktik di BUMN, instansi pemerintah, manufaktur, dan pelatihan vokasi kompetensi.' }}
      </p>
    </div>

    <!-- Gallery Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(item, idx) in galleryItems"
        :key="idx"
        class="comic-panel bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] shadow-comic overflow-hidden flex flex-col group hover:-translate-y-1 transition-all cursor-pointer"
        @click="openModal(idx)"
      >
        <!-- Image Container with Hover Zoom Overlay -->
        <div class="relative w-full aspect-video overflow-hidden bg-[var(--surface-subtle)] border-b-2 border-[var(--comic-border)]">
          <img
            :src="item.src"
            :alt="item.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute top-3 left-3">
            <span class="font-mono text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[var(--brand-coral)] text-white border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]">
              {{ item.tag }}
            </span>
          </div>

          <!-- Hover Hint Badge -->
          <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--surface-panel)]/90 backdrop-blur-sm border border-[var(--comic-border)] rounded-lg p-1.5 shadow-[1.5px_1.5px_0px_var(--comic-border)] text-[var(--ink-primary)]">
            <ZoomIn class="w-4 h-4" />
          </div>
        </div>

        <!-- Info Content -->
        <div class="p-4 sm:p-5 flex flex-col flex-grow justify-between">
          <div>
            <span class="font-mono text-xs font-bold text-[var(--brand-coral)] block mb-1">
              {{ item.role }}
            </span>
            <h3 class="text-base sm:text-lg font-black text-[var(--ink-primary)] mb-1.5 tracking-tight flex items-center justify-between">
              <span>{{ item.title }}</span>
              <span class="text-xs text-[var(--ink-muted)] group-hover:text-[var(--brand-coral)] font-mono">Klik Preview &rarr;</span>
            </h3>
            <p class="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed font-medium">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal Preview -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="activeIndex !== null"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
          @click.self="closeModal"
          tabindex="-1"
        >
          <!-- Modal Container -->
          <div class="relative w-full max-w-4xl max-h-[90vh] bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] rounded-2xl shadow-comic-lg overflow-hidden flex flex-col">
            
            <!-- Top Bar -->
            <div class="flex items-center justify-between px-4 sm:px-6 py-3 border-b-2 border-[var(--comic-border)] bg-[var(--surface-subtle)]">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[var(--brand-coral)] border border-[var(--comic-border)]"></span>
                <span class="w-3 h-3 rounded-full bg-[var(--brand-sun)] border border-[var(--comic-border)]"></span>
                <span class="w-3 h-3 rounded-full bg-[var(--brand-mint)] border border-[var(--comic-border)]"></span>
                <span class="font-mono text-xs font-bold text-[var(--ink-muted)] ml-2">
                  {{ activeIndex + 1 }} / {{ galleryItems.length }} • {{ galleryItems[activeIndex].tag }}
                </span>
              </div>
              <button
                type="button"
                class="p-1.5 rounded-lg border border-[var(--comic-border)] bg-[var(--surface-panel)] hover:bg-[var(--brand-coral)] hover:text-white transition-colors cursor-pointer"
                @click="closeModal"
                aria-label="Tutup preview"
              >
                <X class="w-4 h-4" />
              </button>
            </div>

            <!-- Image Viewport with Nav Arrows -->
            <div class="relative flex-grow flex items-center justify-center bg-black/90 p-2 sm:p-4 min-h-[300px] max-h-[62vh] overflow-hidden">
              <img
                :src="galleryItems[activeIndex].src"
                :alt="galleryItems[activeIndex].title"
                class="max-h-full max-w-full object-contain rounded-lg border border-[var(--comic-border)]"
              />

              <!-- Left Arrow -->
              <button
                type="button"
                class="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[var(--surface-panel)]/90 hover:bg-[var(--brand-sun)] border-2 border-[var(--comic-border)] text-slate-950 shadow-comic transition-all cursor-pointer"
                @click.stop="prevImage"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft class="w-5 h-5" />
              </button>

              <!-- Right Arrow -->
              <button
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[var(--surface-panel)]/90 hover:bg-[var(--brand-sun)] border-2 border-[var(--comic-border)] text-slate-950 shadow-comic transition-all cursor-pointer"
                @click.stop="nextImage"
                aria-label="Foto selanjutnya"
              >
                <ChevronRight class="w-5 h-5" />
              </button>
            </div>

            <!-- Bottom Description Details -->
            <div class="p-4 sm:p-5 border-t-2 border-[var(--comic-border)] bg-[var(--surface-panel)]">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                <h3 class="text-lg sm:text-xl font-black text-[var(--ink-primary)]">
                  {{ galleryItems[activeIndex].title }}
                </h3>
                <span class="font-mono text-xs font-bold text-[var(--brand-coral)]">
                  {{ galleryItems[activeIndex].role }}
                </span>
              </div>
              <p class="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed font-medium">
                {{ galleryItems[activeIndex].desc }}
              </p>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
