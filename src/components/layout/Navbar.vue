<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Search, Menu, X, FolderGit2, Compass, Mail, ChevronDown } from 'lucide-vue-next'

const props = defineProps({
  c: { type: Object, required: true },
  themePref: { type: String, required: true },
  lang: { type: String, required: true },
  activeSection: { type: String, required: true }
})

const emit = defineEmits(['goToSection', 'applyTheme', 'toggleLang', 'openCmdPalette'])

const isMobileMenuOpen = ref(false)

// Theme dropdown. One control instead of a button per theme keeps the navbar short.
const THEMES = [
  { id: 'soft', label: 'Soft', dot: '#B8E0D2' },
  { id: 'rose', label: 'Rose', dot: '#E07A5F' },
  { id: 'retro', label: 'Retro', dot: '#FFC038' },
  { id: 'memphis', label: 'Memphis', dot: '#FFCA3A' },
  { id: 'mono', label: 'Mono', dot: '#171717' }
]

const isThemeOpen = ref(false)
const themeMenuRef = ref(null)
const activeTheme = computed(() => THEMES.find((t) => t.id === props.themePref) || THEMES[0])

const pickTheme = (id) => {
  emit('applyTheme', id)
  isThemeOpen.value = false
}

const onDocumentClick = (e) => {
  if (isThemeOpen.value && themeMenuRef.value && !themeMenuRef.value.contains(e.target)) {
    isThemeOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleMobileNav = (section) => {
  isMobileMenuOpen.value = false
  emit('goToSection', section)
}
</script>

<template>
  <!-- Floating Top Nav (Sticky & Floating with Glassmorphism) -->
  <header class="top-nav sticky top-0 z-[100] transition-all" role="banner">
    <!-- Left: Brand Logo & Title -->
    <div class="flex items-center gap-3 sm:gap-4 shrink-0">
      <a
        href="/"
        class="text-xs sm:text-sm font-bold tracking-tight text-[var(--ink-primary)] hover:opacity-80 transition-opacity flex items-center gap-1.5"
        title="Portofolio"
      >
        <span class="font-mono hidden sm:inline uppercase">Sulthan Abdi Dzikry</span>
        <span class="font-mono sm:hidden">S.A.D</span>
        <span class="font-mono text-zinc-400">/</span>
        <span class="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--brand-sun)] text-slate-950 border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]">
          2.0
        </span>
      </a>

      <!-- Quick Index Trigger (Desktop) -->
      <button
        type="button"
        class="hidden xl:inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-[var(--surface-panel)] hover:bg-[var(--surface-subtle)] border border-[var(--comic-border)] shadow-[1.5px_1.5px_0px_var(--comic-border)] text-xs text-[var(--ink-muted)] hover:text-[var(--ink-primary)] transition-all"
        @click="emit('openCmdPalette')"
        aria-label="Open Navigator"
      >
        <Search class="w-3.5 h-3.5 text-[var(--brand-coral)]" />
        <span class="font-bold text-[var(--ink-primary)]">{{ c.cmdBadge || 'Index' }}</span>
        <kbd class="font-mono text-[10px] font-bold bg-[var(--canvas-bg)] border border-[var(--comic-border)] px-1.5 py-0.5 rounded text-[var(--ink-muted)]">⌘K</kbd>
      </button>
    </div>

    <!-- Center/Right: Desktop Navigation Menu -->
    <nav class="hidden lg:flex items-center gap-1.5 xl:gap-2" role="navigation" aria-label="Main Navigation">
      <button 
        type="button" 
        :class="[
          'inline-flex items-center justify-center min-w-[96px] h-8 px-3 rounded-full text-xs font-black uppercase tracking-wider border border-[var(--comic-border)] transition-all cursor-pointer',
          activeSection === 'home'
            ? 'bg-[var(--brand-coral)] text-white shadow-[2px_2px_0px_var(--comic-border)] -translate-y-0.5'
            : 'bg-[var(--surface-panel)] text-[var(--ink-primary)] hover:bg-[var(--surface-subtle)] hover:text-[var(--brand-coral)] shadow-[1.5px_1.5px_0px_var(--comic-border)] hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_var(--comic-border)]'
        ]" 
        @click="emit('goToSection', 'home')"
      >
        {{ c.homeLabel }}
      </button>
      <button 
        type="button" 
        :class="[
          'inline-flex items-center justify-center min-w-[96px] h-8 px-3 rounded-full text-xs font-black uppercase tracking-wider border border-[var(--comic-border)] transition-all cursor-pointer',
          activeSection === 'about'
            ? 'bg-[var(--brand-coral)] text-white shadow-[2px_2px_0px_var(--comic-border)] -translate-y-0.5'
            : 'bg-[var(--surface-panel)] text-[var(--ink-primary)] hover:bg-[var(--surface-subtle)] hover:text-[var(--brand-coral)] shadow-[1.5px_1.5px_0px_var(--comic-border)] hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_var(--comic-border)]'
        ]" 
        @click="emit('goToSection', 'about')"
      >
        {{ c.aboutLabel }}
      </button>
      <button 
        type="button" 
        :class="[
          'inline-flex items-center justify-center min-w-[96px] h-8 px-3 rounded-full text-xs font-black uppercase tracking-wider border border-[var(--comic-border)] transition-all cursor-pointer',
          activeSection === 'works'
            ? 'bg-[var(--brand-coral)] text-white shadow-[2px_2px_0px_var(--comic-border)] -translate-y-0.5'
            : 'bg-[var(--surface-panel)] text-[var(--ink-primary)] hover:bg-[var(--surface-subtle)] hover:text-[var(--brand-coral)] shadow-[1.5px_1.5px_0px_var(--comic-border)] hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_var(--comic-border)]'
        ]" 
        @click="emit('goToSection', 'works')"
      >
        {{ c.worksLabel }}
      </button>
      <button 
        type="button" 
        :class="[
          'inline-flex items-center justify-center min-w-[96px] h-8 px-3 rounded-full text-xs font-black uppercase tracking-wider border border-[var(--comic-border)] transition-all cursor-pointer',
          activeSection === 'skills'
            ? 'bg-[var(--brand-coral)] text-white shadow-[2px_2px_0px_var(--comic-border)] -translate-y-0.5'
            : 'bg-[var(--surface-panel)] text-[var(--ink-primary)] hover:bg-[var(--surface-subtle)] hover:text-[var(--brand-coral)] shadow-[1.5px_1.5px_0px_var(--comic-border)] hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_var(--comic-border)]'
        ]" 
        @click="emit('goToSection', 'skills')"
      >
        {{ c.skillsLabel }}
      </button>
      <button 
        type="button" 
        :class="[
          'inline-flex items-center justify-center min-w-[96px] h-8 px-3 rounded-full text-xs font-black uppercase tracking-wider border border-[var(--comic-border)] transition-all cursor-pointer',
          activeSection === 'experience'
            ? 'bg-[var(--brand-coral)] text-white shadow-[2px_2px_0px_var(--comic-border)] -translate-y-0.5'
            : 'bg-[var(--surface-panel)] text-[var(--ink-primary)] hover:bg-[var(--surface-subtle)] hover:text-[var(--brand-coral)] shadow-[1.5px_1.5px_0px_var(--comic-border)] hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_var(--comic-border)]'
        ]" 
        @click="emit('goToSection', 'experience')"
      >
        {{ c.experienceLabel }}
      </button>
    </nav>

    <!-- Right Controls: Theme Selector, Language Toggle, and Mobile Hamburger -->
    <div class="flex items-center gap-2 sm:gap-3">
      <!-- Theme Dropdown (all sizes) -->
      <div ref="themeMenuRef" class="relative">
        <button
          type="button"
          class="flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-[var(--surface-panel)] border border-[var(--comic-border)] shadow-[1.5px_1.5px_0px_var(--comic-border)] text-xs font-black text-[var(--ink-primary)] cursor-pointer hover:bg-[var(--surface-subtle)] transition-colors"
          aria-haspopup="menu"
          :aria-expanded="isThemeOpen"
          title="Ganti tema"
          @click="isThemeOpen = !isThemeOpen"
        >
          <span class="w-2.5 h-2.5 rounded-full border border-[var(--comic-border)]" :style="{ background: activeTheme.dot }"></span>
          <span class="hidden md:inline">{{ activeTheme.label }}</span>
          <ChevronDown class="w-3 h-3 transition-transform" :class="isThemeOpen ? 'rotate-180' : ''" />
        </button>

        <div
          v-if="isThemeOpen"
          role="menu"
          class="absolute right-0 mt-2 w-40 z-[120] rounded-xl bg-[var(--surface-panel)] border border-[var(--comic-border)] shadow-[3px_3px_0px_var(--comic-border)] p-1"
        >
          <button
            v-for="t in THEMES"
            :key="t.id"
            type="button"
            role="menuitem"
            :class="[
              'w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-bold text-left cursor-pointer transition-colors',
              themePref === t.id
                ? 'bg-[var(--surface-subtle)] text-[var(--ink-primary)]'
                : 'text-[var(--ink-muted)] hover:bg-[var(--surface-subtle)] hover:text-[var(--ink-primary)]'
            ]"
            @click="pickTheme(t.id)"
          >
            <span class="w-2 h-2 rounded-full border border-[var(--comic-border)]" :style="{ background: t.dot }"></span>
            <span>{{ t.label }}</span>
            <span v-if="themePref === t.id" class="ml-auto font-mono">✓</span>
          </button>
        </div>
      </div>

      <!-- Action Button Contact (Desktop) -->
      <button 
        type="button" 
        class="hidden sm:inline-flex btn-comic-primary text-xs py-1.5 px-3.5" 
        @click="emit('goToSection', 'contact')"
      >
        {{ c.contactLabel }}
      </button>

      <!-- Language Toggle -->
      <button
        type="button"
        class="font-mono text-xs font-black px-2 py-1.5 rounded-lg border border-[var(--comic-border)] bg-[var(--surface-panel)] hover:bg-[var(--surface-subtle)] shadow-[1.5px_1.5px_0px_var(--comic-border)] text-[var(--ink-primary)]"
        @click="emit('toggleLang')"
        aria-label="Switch language"
      >
        {{ lang === 'id' ? 'EN' : 'ID' }}
      </button>

      <!-- Mobile Search / Cmd+K Icon -->
      <button
        type="button"
        class="lg:hidden p-1.5 rounded-xl bg-[var(--surface-panel)] border border-[var(--comic-border)] shadow-[1.5px_1.5px_0px_var(--comic-border)] text-[var(--ink-primary)]"
        @click="emit('openCmdPalette')"
        aria-label="Open Navigator"
      >
        <Search class="w-4 h-4 text-[var(--brand-coral)]" />
      </button>

      <!-- Mobile Hamburger Button -->
      <button
        type="button"
        class="lg:hidden p-1.5 rounded-xl bg-[var(--surface-panel)] border border-[var(--comic-border)] shadow-[1.5px_1.5px_0px_var(--comic-border)] text-[var(--ink-primary)]"
        @click="toggleMobileMenu"
        aria-label="Toggle Mobile Menu"
      >
        <X v-if="isMobileMenuOpen" class="w-5 h-5 text-[var(--brand-coral)]" />
        <Menu v-else class="w-5 h-5 text-[var(--ink-primary)]" />
      </button>
    </div>

    <!-- Mobile Dropdown Slide-Down Menu (Floating Overlay) -->
    <Transition name="fade">
      <div 
        v-if="isMobileMenuOpen"
        class="lg:hidden absolute top-full left-0 w-full bg-[var(--surface-panel)] border-b-2 border-[var(--comic-border)] shadow-comic-lg p-5 z-[150] flex flex-col gap-4 animate-fadeIn"
      >
        <!-- Mobile Navigation Grid -->
        <div class="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
          <button 
            type="button"
            @click="handleMobileNav('home')"
            class="p-2.5 rounded-xl text-left border border-[var(--comic-border)] bg-[var(--canvas-bg)] flex items-center justify-between"
          >
            <span>{{ c.homeLabel }}</span>
            <Compass class="w-3.5 h-3.5 text-[var(--brand-coral)]" />
          </button>
          <button 
            type="button"
            @click="handleMobileNav('about')"
            class="p-2.5 rounded-xl text-left border border-[var(--comic-border)] bg-[var(--canvas-bg)] flex items-center justify-between"
          >
            <span>{{ c.aboutLabel }}</span>
            <Compass class="w-3.5 h-3.5 text-[var(--brand-coral)]" />
          </button>
          <button 
            type="button"
            @click="handleMobileNav('works')"
            class="p-2.5 rounded-xl text-left border border-[var(--comic-border)] bg-[var(--canvas-bg)] flex items-center justify-between"
          >
            <span>{{ c.worksLabel }}</span>
            <FolderGit2 class="w-3.5 h-3.5 text-[var(--brand-coral)]" />
          </button>
          <button 
            type="button"
            @click="handleMobileNav('skills')"
            class="p-2.5 rounded-xl text-left border border-[var(--comic-border)] bg-[var(--canvas-bg)] flex items-center justify-between"
          >
            <span>{{ c.skillsLabel }}</span>
            <Compass class="w-3.5 h-3.5 text-[var(--brand-coral)]" />
          </button>
          <button 
            type="button"
            @click="handleMobileNav('experience')"
            class="p-2.5 rounded-xl text-left border border-[var(--comic-border)] bg-[var(--canvas-bg)] flex items-center justify-between"
          >
            <span>{{ c.experienceLabel }}</span>
            <Compass class="w-3.5 h-3.5 text-[var(--brand-coral)]" />
          </button>
          <button 
            type="button"
            @click="handleMobileNav('contact')"
            class="p-2.5 rounded-xl text-left border border-[var(--comic-border)] bg-[var(--canvas-bg)] flex items-center justify-between"
          >
            <span>{{ c.contactLabel }}</span>
            <Mail class="w-3.5 h-3.5 text-[var(--brand-coral)]" />
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>
