<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { copy } from './data/locales'
import { getProjectsByLanguage } from './data/projects'
import { getProjectDetail, getAllProjectDetails } from './data/projectDetails'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import CommandPalette from './components/ui/CommandPalette.vue'
import { 
  Building2, 
  Calendar, 
  ShieldCheck, 
  FileCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  ExternalLink,
  FolderGit2,
  Sparkles
} from 'lucide-vue-next'

const lang = ref('id')
const themePref = ref('soft')
const resolvedTheme = ref('soft')
const activeSection = ref('works')
const isCommandPaletteOpen = ref(false)

const c = computed(() => copy[lang.value])
const projects = computed(() => getProjectsByLanguage(lang.value))
const allDetails = getAllProjectDetails()

const currentProject = ref(allDetails[0])

const applyTheme = (pref) => {
  themePref.value = pref
  const matches = window.matchMedia('(prefers-color-scheme: dark)').matches
  const next = pref === 'auto' ? (matches ? 'dark' : 'light') : pref
  resolvedTheme.value = next
  document.documentElement.setAttribute('data-theme', next)
  document.documentElement.setAttribute('data-theme-pref', pref)
  try {
    localStorage.setItem('portfolio-theme', pref)
  } catch (_) {}
}

const toggleLang = () => {
  lang.value = lang.value === 'id' ? 'en' : 'id'
  try {
    localStorage.setItem('portfolio-lang', lang.value)
  } catch (_) {}
}

const goToSection = (sec) => {
  window.location.href = `/#${sec}`
}

const switchProject = (code) => {
  currentProject.value = getProjectDetail(code)
  window.history.replaceState({}, '', `/brief-detail/?id=${code}`)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

let lenis = null
let lenisTicker = null

onMounted(async () => {
  try {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved) applyTheme(saved)
  } catch (_) {}

  const urlParams = new URLSearchParams(window.location.search)
  const idParam = urlParams.get('id')
  if (idParam) {
    currentProject.value = getProjectDetail(idParam)
  }

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  })
  lenisTicker = (time) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(lenisTicker)
})

onUnmounted(() => {
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
  if (lenisTicker) {
    gsap.ticker.remove(lenisTicker)
  }
})
</script>

<template>
  <div class="min-h-screen bg-[var(--canvas-bg)] text-[var(--ink-primary)] font-sans antialiased selection:bg-[var(--brand-mint)] selection:text-slate-950">
    <Navbar
      :c="c"
      :themePref="themePref"
      :lang="lang"
      :activeSection="activeSection"
      @goToSection="goToSection"
      @applyTheme="applyTheme"
      @toggleLang="toggleLang"
      @openCmdPalette="isCommandPaletteOpen = true"
    />

    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Breadcrumb & Project Switcher Tabs -->
      <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--comic-border)]/20 pb-6">
        <div class="flex items-center gap-3">
          <a
            href="/"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-[var(--surface-panel)] border border-[var(--comic-border)] shadow-[1.5px_1.5px_0px_var(--comic-border)] hover:bg-[var(--surface-subtle)] hover:text-[var(--brand-coral)] transition-all cursor-pointer"
          >
            <ArrowLeft class="w-3.5 h-3.5 text-[var(--brand-coral)]" />
            <span>Kembali ke Portfolio</span>
          </a>
          <span class="text-xs font-mono text-[var(--ink-muted)]">/ Detail Studi Kasus</span>
        </div>

        <!-- Project Switcher Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <button
            v-for="proj in allDetails"
            :key="proj.code"
            type="button"
            :class="[
              'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-[var(--comic-border)] transition-all cursor-pointer whitespace-nowrap',
              currentProject.code === proj.code
                ? 'bg-[var(--brand-coral)] text-white shadow-[2px_2px_0px_var(--comic-border)] -translate-y-0.5'
                : 'bg-[var(--surface-panel)] text-[var(--ink-primary)] hover:bg-[var(--surface-subtle)] shadow-[1.5px_1.5px_0px_var(--comic-border)]'
            ]"
            @click="switchProject(proj.code)"
          >
            <span>#{{ proj.number }} {{ proj.code }}</span>
          </button>
        </div>
      </div>

      <!-- Hero Header -->
      <header class="comic-panel p-6 sm:p-10 bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] shadow-comic mb-10">
        <div class="flex flex-wrap items-center gap-2.5 mb-4">
          <span class="font-mono text-xs font-black uppercase px-2.5 py-1 rounded bg-[var(--brand-coral)] text-white border border-[var(--comic-border)] shadow-[1.5px_1.5px_0px_var(--comic-border)]">
            PROJEK #{{ currentProject.number }}
          </span>
          <span class="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--brand-sun)] text-slate-950 border border-[var(--comic-border)] shadow-[1.5px_1.5px_0px_var(--comic-border)]">
            {{ currentProject.status }}
          </span>
          <span class="font-mono text-xs text-[var(--ink-muted)] ml-auto flex items-center gap-1.5">
            <Calendar class="w-3.5 h-3.5 text-[var(--brand-coral)]" />
            {{ currentProject.period }}
          </span>
        </div>

        <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--ink-primary)] mb-4">
          {{ currentProject.title }}
        </h1>
        <p class="text-base sm:text-xl font-bold text-[var(--brand-coral)] mb-6">
          {{ currentProject.tagline }}
        </p>

        <!-- Screenshot Preview -->
        <div class="w-full rounded-2xl overflow-hidden border-2 border-[var(--comic-border)] shadow-comic bg-[var(--surface-subtle)] mb-8 aspect-video max-h-[460px]">
          <img
            :src="currentProject.screenshot"
            :alt="currentProject.title"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Metrics Highlights -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[var(--comic-border)]/20">
          <div
            v-for="(achieve, idx) in currentProject.achievements"
            :key="idx"
            class="p-4 rounded-xl bg-[var(--canvas-bg)] border border-[var(--comic-border)] shadow-[1.5px_1.5px_0px_var(--comic-border)]"
          >
            <span class="text-xs font-mono font-bold text-[var(--brand-coral)] block mb-1">
              // {{ achieve.label }}
            </span>
            <span class="text-lg sm:text-xl font-black text-[var(--ink-primary)] block mb-1">
              {{ achieve.value }}
            </span>
            <span class="text-xs text-[var(--ink-muted)] font-medium">
              {{ achieve.desc }}
            </span>
          </div>
        </div>
      </header>

      <!-- Executive Summary & Scope -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        <!-- Left: Summary & Scope (7 Cols) -->
        <div class="lg:col-span-7 flex flex-col gap-6">
          <div class="comic-panel p-6 sm:p-8 bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] shadow-comic">
            <h2 class="text-lg font-black text-[var(--ink-primary)] mb-3 flex items-center gap-2">
              <FileCheck class="w-5 h-5 text-[var(--brand-coral)]" />
              <span>Ringkasan Eksekutif & Solusi Rekayasa</span>
            </h2>
            <p class="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed">
              {{ currentProject.executiveSummary }}
            </p>
          </div>

          <div class="comic-panel p-6 sm:p-8 bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] shadow-comic">
            <h2 class="text-lg font-black text-[var(--ink-primary)] mb-4 flex items-center gap-2">
              <ShieldCheck class="w-5 h-5 text-[var(--brand-mint)]" />
              <span>Fitur & Ruang Lingkup Implementasi</span>
            </h2>
            <div class="space-y-2.5">
              <div
                v-for="(item, idx) in currentProject.scope.inScope"
                :key="idx"
                class="flex items-start gap-3 p-3 rounded-xl bg-[var(--canvas-bg)] border border-[var(--comic-border)] text-xs sm:text-sm font-medium text-[var(--ink-primary)]"
              >
                <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Tech Stack & Architecture (5 Cols) -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          <div class="comic-panel p-6 sm:p-8 bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] shadow-comic h-full">
            <h2 class="text-lg font-black text-[var(--ink-primary)] mb-4 flex items-center gap-2">
              <Cpu class="w-5 h-5 text-[var(--brand-sun)]" />
              <span>Arsitektur & Tech Stack</span>
            </h2>
            <div class="space-y-3">
              <div
                v-for="(st, idx) in currentProject.techStack"
                :key="idx"
                class="p-3.5 rounded-xl bg-[var(--canvas-bg)] border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)] flex items-center justify-between"
              >
                <span class="text-xs font-mono font-bold text-[var(--brand-coral)] uppercase">
                  {{ st.name }}
                </span>
                <span class="text-xs font-black font-mono text-[var(--ink-primary)]">
                  {{ st.tech }}
                </span>
              </div>
            </div>

            <!-- Client / Sponsor Box -->
            <div class="mt-8 pt-6 border-t border-[var(--comic-border)]/20">
              <span class="text-xs font-mono font-bold text-[var(--ink-muted)] block mb-1 uppercase">Institusi / Mitra Kerjasama</span>
              <p class="text-sm font-black text-[var(--ink-primary)]">{{ currentProject.client }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer :c="c" :currentYear="new Date().getFullYear()" />

    <CommandPalette
      :isOpen="isCommandPaletteOpen"
      :c="c"
      :projects="projects"
      :themePref="themePref"
      :lang="lang"
      @close="isCommandPaletteOpen = false"
      @goToSection="goToSection"
      @selectProject="() => { isCommandPaletteOpen = false }"
      @applyTheme="applyTheme"
      @toggleLang="toggleLang"
    />
  </div>
</template>
