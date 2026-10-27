<script setup>
import { Camera, Sparkles, Building2 } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true }
})

const galleryItems = [
  {
    src: '/gallery/pelind0.jpg',
    title: 'PT Pelabuhan Indonesia (Persero)',
    role: 'Archive & HRIS Intern',
    desc: 'Penataan arsip dokumen kepegawaian inaktif dan digitalisasi sistem kearsipan di lingkungan kantor Pelindo.',
    tag: 'BUMN Pelindo'
  },
  {
    src: '/gallery/bps.jpeg',
    role: 'Design & Spatial Data Intern',
    title: 'Badan Pusat Statistik (BPS)',
    desc: 'Dokumentasi kegiatan pengolahan data statistik daerah dan diseminasi informasi publik MATCHAPRO.',
    tag: 'Instansi Pemerintah'
  },
  {
    src: '/gallery/ahm.jpg',
    title: 'PT Astra Honda Motor (AHM)',
    role: 'Quality Control Intern',
    desc: 'Aktivitas inspeksi mutu komponen machining dan automasi rekapitulasi data QC menggunakan VBA.',
    tag: 'Industri Otomotif'
  },
  {
    src: '/gallery/bbvp.jpg',
    title: 'BBPVP Bekasi (Kemnaker RI)',
    role: 'Sertifikasi BNSP',
    desc: 'Pelatihan intensif IT Software Programming for Business dan uji kompetensi profesi nasional.',
    tag: 'Sertifikasi BNSP'
  },
  {
    src: '/gallery/foto pertama.jpg',
    title: 'Dokumentasi & Portret Profesional',
    role: 'Annisa Maulana Sabilla',
    desc: 'Dedikasi dalam rekayasa sistem informasi, analisis data spasial, dan digitalisasi organisasi.',
    tag: 'Profil'
  }
]
</script>

<template>
  <section id="gallery" class="section-container" aria-labelledby="gallery-heading">
    <!-- Header -->
    <div class="mb-10">
      <span class="comic-chapter-badge bg-[var(--brand-sun)] text-slate-950 mb-4 inline-flex items-center gap-2">
        <Camera class="w-3.5 h-3.5 text-slate-950" />
        <span>{{ c.galleryMeta || 'Dokumentasi & Jejak Lapangan' }}</span>
      </span>
      <h2 id="gallery-heading" class="display-section">
        {{ c.galleryTitle || 'Galeri Dokumentasi Aktivitas' }}
      </h2>
      <p class="text-[var(--ink-muted)] text-sm sm:text-base max-w-2xl mt-2 font-medium">
        {{ c.gallerySubtitle || 'Momen dokumentasi kegiatan kerja praktik, magang industri di BUMN & manufaktur, serta pelatihan vokasi kompetensi.' }}
      </p>
    </div>

    <!-- Gallery Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(item, idx) in galleryItems"
        :key="idx"
        :class="[
          'comic-panel bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] shadow-comic overflow-hidden flex flex-col group hover:-translate-y-1 transition-all',
          idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
        ]"
      >
        <!-- Image Container -->
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
        </div>

        <!-- Info Content -->
        <div class="p-4 sm:p-5 flex flex-col flex-grow justify-between">
          <div>
            <span class="font-mono text-xs font-bold text-[var(--brand-coral)] block mb-1">
              {{ item.role }}
            </span>
            <h3 class="text-base sm:text-lg font-black text-[var(--ink-primary)] mb-1.5 tracking-tight">
              {{ item.title }}
            </h3>
            <p class="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed font-medium">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
