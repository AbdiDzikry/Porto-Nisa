<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { copy } from './data/locales.js'
import { getProjectsByLanguage } from './data/projects'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import CommandPalette from './components/ui/CommandPalette.vue'
import ErdDiagramVisualizer from './components/sections/ErdDiagramVisualizer.vue'
import UserFlowVisualizer from './components/sections/UserFlowVisualizer.vue'
import { newArmadaBriefs } from './data/newArmadaBriefs'
import { 
  Building2, 
  Calendar, 
  ShieldCheck, 
  FileCheck, 
  Users, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  AlertTriangle, 
  Layers, 
  Sparkles,
  TrendingUp,
  Database,
  Network,
  Share2,
  GitFork,
  Copy,
  Check,
  FileCode2
} from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

const currentYear = new Date().getFullYear()
const lang = ref('id')
const themePref = ref('retro')
const resolvedTheme = ref('retro')
const activeSection = ref('briefs')
const isCommandPaletteOpen = ref(false)

const c = computed(() => copy[lang.value])
const projects = computed(() => getProjectsByLanguage(lang.value))
const briefs = newArmadaBriefs

const currentProject = ref(briefs.projects[0])
const isStitchCopied = ref(false)

const copyStitchPrompt = async () => {
  const promptText = `Design an industrial modern visitor management and factory safety check-in system for PT Mekar Armada Jaya coachbuilding plant.

Theme: Clean industrial UI, high-contrast typography, Emerald Green (#10B981) and Safety Coral (#FF5E5B) accents, Slate dark header (#0F172A).

Screen 1 (Tablet Landscape 10.1" for Security Gate):
- Split layout: Left 45% quick registration form with large touch targets, number pad for phone autofill, webcam portrait snapshot preview, and host employee searchable selector. Right 55% live card queue showing 'Waiting Host Approval (with 3-minute countdown ring)', 'APPROVED by Host (bright green banner with badge number assignment input)', and 'Active Guest Check-Out button'.

Screen 2 (Mobile PWA 390x844 for Employee Host):
- Instant visitor approval card: Displays webcam face photo from gate, visitor name, company, arrival timestamp, and visit purpose. Prominent primary green 'Approve' button and red 'Reject with Reason' button with a 3-minute escalation countdown bar.

Screen 3 (Tablet/Desktop for Industrial Safety K3 Officer):
- Emergency evacuation roll call dashboard: Real-time headcount badge showing total external visitors inside production plant. Fast filter by Assembly Point A/B, with one-tap toggle to mark guests as 'Verified Safe' during fire drills. High-contrast emergency red header.`

  try {
    await navigator.clipboard.writeText(promptText)
    isStitchCopied.value = true
    setTimeout(() => {
      isStitchCopied.value = false
    }, 2500)
  } catch (err) {
    console.error('Failed to copy stitch prompt:', err)
  }
}

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
}

const goToSection = (id) => {
  window.location.href = `/porto-2.0/#${id}`
}

const switchProject = (code) => {
  const found = briefs.projects.find(p => p.code.toLowerCase() === code.toLowerCase())
  if (found) {
    currentProject.value = found
    window.history.replaceState({}, '', `/porto-2.0/brief-detail?id=${found.code.toLowerCase()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const onGlobalKeyDown = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    isCommandPaletteOpen.value = !isCommandPaletteOpen.value
  }
}

let lenis = null
let lenisTicker = null

onMounted(() => {
  const saved = localStorage.getItem('portfolio-theme')
  if (saved) applyTheme(saved)
  else applyTheme('retro')

  window.addEventListener('keydown', onGlobalKeyDown)

  const params = new URLSearchParams(window.location.search)
  const idParam = params.get('id') || params.get('code')
  if (idParam) {
    const found = briefs.projects.find(p => p.code.toLowerCase() === idParam.toLowerCase())
    if (found) currentProject.value = found
  }

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  })
  lenisTicker = (time) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(lenisTicker)
  gsap.ticker.lagSmoothing(0)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeyDown)
  if (lenis) lenis.destroy()
  if (lenisTicker) gsap.ticker.remove(lenisTicker)
})
</script>

<template>
  <div class="min-h-screen bg-[var(--canvas-bg)] text-[var(--ink-primary)] font-sans flex flex-col selection:bg-[var(--brand-sun)] selection:text-slate-950">
    
    <!-- Navbar Floating Konsisten -->
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

    <!-- Main Container -->
    <main class="flex-grow pt-8 pb-20">
      <div class="section-container">
        
        <!-- Top Back Breadcrumb & Project Switcher Tabs -->
        <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--comic-border)]/20 pb-6">
          <div class="flex items-center gap-3">
            <a
              href="/porto-2.0/briefs"
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface-panel)] hover:bg-[var(--surface-subtle)] border border-[var(--comic-border)] shadow-[1.5px_1.5px_0px_var(--comic-border)] text-xs font-bold font-mono text-[var(--ink-primary)] hover:text-[var(--brand-coral)] transition-all"
            >
              <ArrowLeft class="w-3.5 h-3.5 text-[var(--brand-coral)]" />
              <span>← Kembali ke Daftar Brief</span>
            </a>
            <span class="text-xs font-mono text-[var(--ink-muted)] hidden sm:inline">/</span>
            <span class="text-xs font-mono font-bold text-[var(--brand-coral)] hidden sm:inline">
              Detail Spesifikasi & ERD {{ currentProject.code }}
            </span>
          </div>

          <!-- Project Quick Switcher Pills -->
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-mono text-[var(--ink-muted)] hidden lg:inline">Pilih Projek:</span>
            <button
              v-for="p in briefs.projects"
              :key="p.code"
              @click="switchProject(p.code)"
              :class="[
                'px-3 py-1 rounded-xl text-xs font-mono font-black border transition-all cursor-pointer',
                currentProject.code === p.code
                  ? 'bg-[var(--brand-coral)] text-white border-[var(--comic-border)] shadow-[2px_2px_0px_var(--comic-border)]'
                  : 'bg-[var(--surface-panel)] text-[var(--ink-muted)] border-[var(--comic-border)] hover:bg-[var(--surface-subtle)]'
              ]"
            >
              {{ p.code }}
            </button>
          </div>
        </div>

        <!-- Project Header Hero Card -->
        <div class="comic-panel p-6 sm:p-10 bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] shadow-comic mb-10">
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span class="font-mono text-2xl font-black px-4 py-1 rounded-xl bg-[var(--canvas-bg)] text-[var(--brand-coral)] border-2 border-[var(--comic-border)] shadow-[2.5px_2.5px_0px_var(--comic-border)]">
              {{ currentProject.code }}
            </span>
            <span class="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[var(--brand-mint)] text-slate-950 border border-[var(--comic-border)]">
              {{ currentProject.priority }}
            </span>
            <span class="text-xs font-mono text-[var(--ink-muted)] ml-auto">
              Status: <strong class="text-[var(--ink-primary)]">{{ currentProject.status }}</strong>
            </span>
          </div>

          <h1 class="display-section mb-3 text-[var(--ink-primary)] leading-tight">
            {{ currentProject.title }}
          </h1>

          <p class="text-base sm:text-lg font-mono text-[var(--brand-coral)] mb-6 font-bold">
            // {{ currentProject.tagline }}
          </p>

          <!-- Executive Meta Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[var(--canvas-bg)] border-2 border-[var(--comic-border)] text-xs font-mono">
            <div>
              <span class="text-[var(--ink-muted)] block mb-0.5">Perusahaan</span>
              <span class="font-bold text-[var(--ink-primary)]">PT Mekar Armada Jaya</span>
            </div>
            <div>
              <span class="text-[var(--ink-muted)] block mb-0.5">Estimasi Durasi</span>
              <span class="font-bold text-[var(--brand-coral)]">{{ currentProject.effort }}</span>
            </div>
            <div>
              <span class="text-[var(--ink-muted)] block mb-0.5">Nilai Strategis</span>
              <span class="font-bold text-[var(--brand-mint)]">{{ currentProject.strategicValue }}</span>
            </div>
            <div>
              <span class="text-[var(--ink-muted)] block mb-0.5">Kapasitas Alokasi</span>
              <span class="font-bold text-[var(--ink-primary)]">Solo Dev (50%)</span>
            </div>
          </div>
        </div>

        <!-- Top Grid: Section 1 & Right Sidebar (Metrics & Governance) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          <!-- Left Column (8 Cols): Section 1 Problem & Root Cause -->
          <div class="lg:col-span-8">
            <div class="comic-panel p-6 sm:p-8 bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] shadow-comic h-full">
              <h2 class="text-lg font-black text-[var(--ink-primary)] font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
                <AlertTriangle class="w-5 h-5 text-[var(--brand-coral)]" />
                1. Temuan Genba Lapangan & Masalah Utama
              </h2>
              
              <div class="p-4 rounded-xl bg-[var(--canvas-bg)] border-2 border-[var(--comic-border)] mb-4">
                <p class="text-sm text-[var(--ink-primary)] leading-relaxed">
                  {{ currentProject.background.problem }}
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div class="p-3.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--comic-border)]">
                  <span class="text-[var(--brand-coral)] font-bold block mb-1">Akar Masalah (Root Cause):</span>
                  <p class="text-[var(--ink-muted)] font-sans">{{ currentProject.background.rootCause }}</p>
                </div>
                <div class="p-3.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--comic-border)]">
                  <span class="text-[var(--brand-mint)] font-bold block mb-1">Dampak Kritis (Impact):</span>
                  <p class="text-[var(--ink-muted)] font-sans">{{ currentProject.background.impact }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column (4 Cols): Metrics & Execution Safeguards -->
          <div class="lg:col-span-4 space-y-6">
            
            <!-- Target Key Metrics Card -->
            <div class="comic-panel p-6 bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] shadow-comic">
              <h3 class="text-sm font-mono font-black uppercase tracking-wider text-[var(--ink-primary)] mb-4 flex items-center gap-2">
                <TrendingUp class="w-4 h-4 text-[var(--brand-coral)]" />
                Target Indikator Keberhasilan
              </h3>

              <div class="space-y-3">
                <div 
                  v-for="(metric, idx) in currentProject.metrics" 
                  :key="idx"
                  class="p-3.5 rounded-xl bg-[var(--canvas-bg)] border-2 border-[var(--comic-border)]"
                >
                  <div class="text-[10px] font-mono text-[var(--ink-muted)] mb-0.5">
                    {{ metric.label }}
                  </div>
                  <div class="text-xl font-black text-[var(--brand-coral)] font-mono mb-0.5">
                    {{ metric.value }}
                  </div>
                  <div class="text-[11px] text-[var(--ink-muted)]">
                    {{ metric.desc }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Operational Governance Checklist -->
            <div class="comic-panel p-5 bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] shadow-comic">
              <h3 class="text-xs font-mono font-black uppercase tracking-wider text-[var(--ink-primary)] mb-3 flex items-center gap-2">
                <ShieldCheck class="w-4 h-4 text-[var(--brand-mint)]" />
                Disiplin Operasional (K3 & Legal)
              </h3>
              
              <ul class="space-y-2 text-xs text-[var(--ink-muted)]">
                <li class="flex items-start gap-2">
                  <span class="text-[var(--brand-coral)] font-bold">✓</span>
                  <span>Kepatuhan UU PDP (Masking NIK & foto setelah 6 bulan).</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-[var(--brand-coral)] font-bold">✓</span>
                  <span>Offline-first resilience (Pencatatan pos tetap jalan saat offline).</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-[var(--brand-coral)] font-bold">✓</span>
                  <span>Audit-ready timestamps (Otentikasi persetujuan & waktu keluar).</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        <!-- FULL-WIDTH SECTION 2: VISUAL ERD DIAGRAM WORKSPACE (LEBAR PENUH TANPA TERTUTUP SIDEBAR) -->
        <div class="mb-10">
          <div class="comic-panel p-6 sm:p-8 bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] shadow-comic">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h2 class="text-lg sm:text-xl font-black text-[var(--ink-primary)] font-mono uppercase tracking-wider flex items-center gap-2">
                  <Database class="w-5 h-5 text-[var(--brand-coral)]" />
                  2. Visual ERD Schema & Kebutuhan Data (Supabase / MySQL Style)
                </h2>
                <p class="text-xs font-mono text-[var(--ink-muted)] mt-1">
                  Area workspace kanvas penuh: Skema tabel relasional lengkap dengan Primary Key, Foreign Key, dan garis koneksi berpanah.
                </p>
              </div>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--brand-mint)]/20 text-[var(--brand-mint)] border border-[var(--brand-mint)] text-xs font-mono font-bold shrink-0 self-start sm:self-auto">
                Full-Width Workspace
              </span>
            </div>

            <!-- Komponen Visual ERD Diagram -->
            <ErdDiagramVisualizer v-if="currentProject.code === 'P1'" />

            <!-- Fallback Text List untuk Projek Lain -->
            <div v-else class="space-y-4">
              <div 
                v-for="(ent, idx) in currentProject.dataRequirements" 
                :key="idx"
                class="p-4 rounded-xl bg-[var(--canvas-bg)] border-2 border-[var(--comic-border)]"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-xs font-black text-[var(--brand-coral)] uppercase">
                    {{ ent.entity }}
                  </span>
                </div>
                <p class="text-xs text-[var(--ink-muted)] mb-3 font-medium">
                  {{ ent.role }}
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-[11px] font-mono">
                  <div 
                    v-for="(fld, fIdx) in ent.fields" 
                    :key="fIdx"
                    class="p-2 rounded-lg bg-[var(--surface-panel)] border border-[var(--comic-border)]/40 flex flex-col justify-between"
                  >
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-[var(--ink-primary)]">{{ fld.name }}</span>
                      <span class="text-[10px] text-[var(--brand-mint)]">{{ fld.type }}</span>
                    </div>
                    <span class="text-[10px] text-[var(--ink-muted)] mt-1 font-sans">{{ fld.desc }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FULL-WIDTH SECTION 3: VISUAL USER FLOW WORKSPACE (LEBAR PENUH) -->
        <div v-if="currentProject.code === 'P1'" class="mb-10">
          <div class="comic-panel p-6 sm:p-8 bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] shadow-comic">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h2 class="text-lg sm:text-xl font-black text-[var(--ink-primary)] font-mono uppercase tracking-wider flex items-center gap-2">
                  <GitFork class="w-5 h-5 text-[var(--brand-mint)]" />
                  3. End-to-End User Flow & Arsitektur Proses
                </h2>
                <p class="text-xs font-mono text-[var(--ink-muted)] mt-1">
                  Area workspace kanvas penuh: Diagram alur interaksi multi-aktor (Satpam, Tamu, Host Karyawan, dan K3 Safety) bebas geser & zoom.
                </p>
              </div>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--brand-coral)] text-white border border-[var(--comic-border)] text-xs font-mono font-bold shrink-0 self-start sm:self-auto">
                Interactive Swimlane
              </span>
            </div>

            <!-- Komponen Visual User Flow Diagram -->
            <UserFlowVisualizer />
          </div>
        </div>

        <!-- Section 6: Google Stitch UI/UX Prompt Box (Untuk Pembuatan Mockup) -->
        <div v-if="currentProject.code === 'P1'" class="mb-10">
          <div class="comic-panel p-6 sm:p-8 bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] shadow-comic">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-[var(--brand-sun)] text-slate-950 font-bold flex items-center justify-center border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]">
                  <FileCode2 class="w-4 h-4" />
                </div>
                <div>
                  <h3 class="text-base sm:text-lg font-black font-mono uppercase text-[var(--ink-primary)]">
                    UI/UX Design Specification & Prompt Google Stitch
                  </h3>
                  <p class="text-xs font-mono text-[var(--ink-muted)]">
                    Salin spesifikasi markdown ini ke Google Stitch / AI visual generator untuk membuat mockup UI Tablet Pos & Mobile Host.
                  </p>
                </div>
              </div>

              <button
                @click="copyStitchPrompt"
                class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border-2 border-[var(--comic-border)] shadow-[2px_2px_0px_var(--comic-border)] active:scale-95 shrink-0"
                :class="isStitchCopied ? 'bg-[var(--brand-mint)] text-slate-950' : 'bg-[var(--brand-coral)] text-white hover:opacity-95'"
              >
                <component :is="isStitchCopied ? Check : Copy" class="w-4 h-4" />
                <span>{{ isStitchCopied ? 'Tersalin ke Clipboard!' : 'Salin Prompt Stitch' }}</span>
              </button>
            </div>

            <div class="p-4 rounded-xl bg-[var(--canvas-bg)] border-2 border-[var(--comic-border)] font-mono text-xs text-[var(--ink-primary)] space-y-3">
              <div class="flex items-center justify-between border-b border-[var(--comic-border)]/20 pb-2">
                <span class="text-[11px] text-[var(--brand-coral)] font-bold">// Target Platform</span>
                <span class="text-[11px] text-[var(--ink-muted)]">Tablet Pos (10.1") • Mobile Host (PWA) • K3 Evacuation Dashboard</span>
              </div>
              <p class="text-xs font-sans text-[var(--ink-muted)] leading-relaxed">
                Dokumentasi markdown spesifikasi lengkap layar pos satpam, mobile one-click approval, dan dashboard K3 darurat telah disimpan di file:
                <strong class="font-mono text-[var(--ink-primary)]"> `content/projects/11. Guest Book K3/UI_MOCKUP_SPECIFICATION.md`</strong>.
              </p>
              <div class="p-3 bg-[var(--surface-panel)] rounded-lg border border-[var(--comic-border)]/50 text-[11px] text-[var(--ink-muted)] font-mono">
                <code>Design an industrial modern visitor management and factory safety check-in system for PT Mekar Armada Jaya coachbuilding plant...</code>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          <!-- Left Column (7 Cols): Section 4 Scope of Work -->
          <div class="lg:col-span-7">
            <div class="comic-panel p-6 sm:p-8 bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] shadow-comic h-full">
              <h2 class="text-lg font-black text-[var(--ink-primary)] font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 class="w-5 h-5 text-[var(--brand-mint)]" />
                4. Ruang Lingkup Sistem (MVP Functional Scope)
              </h2>

              <div class="space-y-3 mb-6">
                <div 
                  v-for="(item, idx) in currentProject.scope.inScope" 
                  :key="idx"
                  class="flex items-start gap-3 p-3.5 rounded-xl bg-[var(--canvas-bg)] border border-[var(--comic-border)] text-xs sm:text-sm text-[var(--ink-primary)] font-medium"
                >
                  <span class="w-5 h-5 rounded-full bg-[var(--brand-mint)] text-slate-950 font-mono text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {{ idx + 1 }}
                  </span>
                  <span>{{ item }}</span>
                </div>
              </div>

              <div v-if="currentProject.scope.outOfScope?.length" class="p-4 rounded-xl bg-[var(--surface-subtle)] border border-[var(--comic-border)]">
                <span class="text-xs font-mono font-bold text-[var(--ink-muted)] uppercase block mb-2">
                  Di Luar Ruang Lingkup MVP (Fase Berikutnya):
                </span>
                <ul class="list-disc list-inside text-xs text-[var(--ink-muted)] space-y-1">
                  <li v-for="(out, idx) in currentProject.scope.outOfScope" :key="idx">
                    {{ out }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Right Column (5 Cols): Section 5 Architecture & Tech Stack -->
          <div class="lg:col-span-5">
            <div class="comic-panel p-6 sm:p-8 bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] shadow-comic h-full">
              <h2 class="text-lg font-black text-[var(--ink-primary)] font-mono uppercase tracking-wider mb-2 flex items-center gap-2">
                <Cpu class="w-5 h-5 text-[var(--brand-coral)]" />
                5. Arsitektur & Spesifikasi Teknologi
              </h2>
              <p class="text-xs font-mono text-[var(--ink-muted)] mb-5">
                Prinsip AGENTS.md: Mengutamakan kesederhanaan dan zero-overhead maintenance untuk kapasitas solo dev.
              </p>

              <div class="space-y-3">
                <div 
                  v-for="(stack, idx) in currentProject.techStack" 
                  :key="idx"
                  class="p-3.5 rounded-xl bg-[var(--canvas-bg)] border-2 border-[var(--comic-border)] shadow-[1.5px_1.5px_0px_var(--comic-border)]"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-[11px] font-mono font-bold text-[var(--brand-coral)] uppercase">
                      {{ stack.name }}
                    </span>
                    <span class="text-xs font-black text-[var(--ink-primary)] font-mono">
                      {{ stack.tech }}
                    </span>
                  </div>
                  <div class="text-xs text-[var(--ink-muted)] leading-relaxed">
                    {{ stack.desc }}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>

    <!-- Global Footer -->
    <Footer :c="c" :currentYear="currentYear" />

    <!-- Command Palette Modal (Cmd+K / Index Button) -->
    <CommandPalette
      :isOpen="isCommandPaletteOpen"
      :c="c"
      :projects="projects"
      :themePref="themePref"
      :lang="lang"
      @close="isCommandPaletteOpen = false"
      @goToSection="goToSection"
      @selectProject="(p) => { isCommandPaletteOpen = false }"
      @applyTheme="applyTheme"
      @toggleLang="toggleLang"
    />

  </div>
</template>
