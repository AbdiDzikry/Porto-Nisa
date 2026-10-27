<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { copy } from './data/locales.js'
import { getProjectsByLanguage } from './data/projects'
import Navbar from './components/layout/Navbar.vue'
import BriefProjects from './components/sections/BriefProjects.vue'
import Footer from './components/layout/Footer.vue'
import CommandPalette from './components/ui/CommandPalette.vue'

gsap.registerPlugin(ScrollTrigger)

const currentYear = new Date().getFullYear()
const lang = ref('id')
const themePref = ref('retro')
const resolvedTheme = ref('retro')
const activeSection = ref('briefs')
const isCommandPaletteOpen = ref(false)

const c = computed(() => copy[lang.value])
const projects = computed(() => getProjectsByLanguage(lang.value))

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

    <!-- Main Content Section: Brief Projek Standalone Page -->
    <main class="flex-grow pt-8 pb-16">
      <BriefProjects />
    </main>

    <!-- Footer -->
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
