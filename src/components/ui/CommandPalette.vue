<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  Search,
  Command,
  ArrowRight,
  FolderGit2,
  Mail,
  Download,
  Moon,
  Sun,
  Languages,
  Check,
  X,
  Compass,
  FileText
} from 'lucide-vue-next'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  c: { type: Object, required: true },
  projects: { type: Array, required: true },
  themePref: { type: String, required: true },
  lang: { type: String, required: true }
})

const emit = defineEmits([
  'close',
  'goToSection',
  'selectProject',
  'applyTheme',
  'toggleLang'
])

const searchQuery = ref('')
const selectedIndex = ref(0)
const inputRef = ref(null)
const listContainerRef = ref(null)
const emailCopied = ref(false)

const sections = [
  { id: 'home', labelKey: 'homeLabel', icon: Compass },
  { id: 'about', labelKey: 'aboutLabel', icon: Compass },
  { id: 'works', labelKey: 'worksLabel', icon: FolderGit2 },
  { id: 'skills', labelKey: 'skillsLabel', icon: Compass },
  { id: 'experience', labelKey: 'experienceLabel', icon: Compass },
  { id: 'contact', labelKey: 'contactLabel', icon: Mail }
]

const filteredItems = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  const items = []

  // 1. Navigation items (Section Links)
  sections.forEach((sec) => {
    const label = props.c[sec.labelKey] || sec.id
    if (!q || label.toLowerCase().includes(q) || sec.id.toLowerCase().includes(q)) {
      items.push({
        id: `nav-${sec.id}`,
        group: props.lang === 'id' ? 'Navigasi Halaman' : 'Navigation',
        label: label,
        sublabel: `#${sec.id}`,
        icon: sec.icon,
        action: () => {
          emit('goToSection', sec.id)
          emit('close')
        }
      })
    }
  })

  // 2. Project items (Annisa's 4 Projects)
  props.projects.forEach((proj) => {
    const titleMatch = proj.title.toLowerCase().includes(q)
    const tagsMatch = proj.tags?.some((t) => t.toLowerCase().includes(q))
    if (!q || titleMatch || tagsMatch) {
      items.push({
        id: `proj-${proj.title}`,
        group: props.lang === 'id' ? 'Portofolio Proyek' : 'Projects',
        label: proj.title,
        sublabel: proj.role || proj.year,
        icon: FolderGit2,
        action: () => {
          emit('selectProject', proj)
          emit('close')
        }
      })
    }
  })

  // 3. Action items (Email, CV, LinkedIn, Theme, Lang)
  const actions = [
    {
      id: 'act-copy-email',
      group: props.lang === 'id' ? 'Aksi Cepat' : 'Quick Actions',
      label: props.c.cmdCopyEmail || 'Salin Email',
      sublabel: 'annisa.m.sabilla@gmail.com',
      icon: emailCopied.value ? Check : Mail,
      action: async () => {
        try {
          await navigator.clipboard.writeText('annisa.m.sabilla@gmail.com')
          emailCopied.value = true
          setTimeout(() => {
            emailCopied.value = false
            emit('close')
          }, 800)
        } catch (_) {}
      }
    },
    {
      id: 'act-download-cv',
      group: props.lang === 'id' ? 'Aksi Cepat' : 'Quick Actions',
      label: props.c.ctaDownloadCv || 'Unduh CV ATS (PDF)',
      sublabel: 'CV Annisa Maulana Sabilla ATS.pdf',
      icon: Download,
      action: () => {
        window.open('/cv.pdf', '_blank')
        emit('close')
      }
    },
    {
      id: 'act-toggle-lang',
      group: props.lang === 'id' ? 'Aksi Cepat' : 'Quick Actions',
      label: props.c.cmdToggleLang || 'Ganti Bahasa',
      sublabel: props.lang === 'id' ? 'Bahasa Indonesia → English' : 'English → Bahasa Indonesia',
      icon: Languages,
      action: () => {
        emit('toggleLang')
      }
    }
  ]

  actions.forEach((act) => {
    if (!q || act.label.toLowerCase().includes(q) || act.sublabel.toLowerCase().includes(q)) {
      items.push(act)
    }
  })

  return items
})

const groupedItems = computed(() => {
  const groups = {}
  filteredItems.value.forEach((item, index) => {
    if (!groups[item.group]) groups[item.group] = []
    groups[item.group].push({ ...item, globalIndex: index })
  })
  return groups
})

const handleKeyDown = (e) => {
  if (!props.isOpen) return

  if (e.key === 'Escape') {
    emit('close')
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (filteredItems.value.length === 0) return
    selectedIndex.value = (selectedIndex.value + 1) % filteredItems.value.length
    scrollToSelected()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (filteredItems.value.length === 0) return
    selectedIndex.value =
      (selectedIndex.value - 1 + filteredItems.value.length) % filteredItems.value.length
    scrollToSelected()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const item = filteredItems.value[selectedIndex.value]
    if (item) item.action()
  }
}

const scrollToSelected = () => {
  nextTick(() => {
    const container = listContainerRef.value
    if (!container) return
    const selectedEl = container.querySelector('[aria-selected="true"]')
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' })
    }
  })
}

watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      searchQuery.value = ''
      selectedIndex.value = 0
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      nextTick(() => {
        if (inputRef.value) inputRef.value.focus()
      })
    } else {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }
)

watch(searchQuery, () => {
  selectedIndex.value = 0
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[300] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm"
      @click="emit('close')"
      @wheel.stop
      @touchmove.stop
      role="dialog"
      aria-modal="true"
      aria-labelledby="cmd-palette-title"
      data-lenis-prevent
    >
      <div
        class="w-full max-w-[620px] bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] rounded-2xl shadow-comic-lg flex flex-col overflow-hidden animate-fadeIn"
        @click.stop
        data-lenis-prevent
      >
        <!-- Search Input Bar -->
        <div class="p-4 border-b-2 border-[var(--comic-border)] flex items-center gap-3 bg-[var(--surface-subtle)]">
          <Search class="w-5 h-5 text-[var(--brand-coral)] shrink-0" aria-hidden="true" />
          <input
            ref="inputRef"
            v-model="searchQuery"
            type="text"
            id="cmd-palette-title"
            class="w-full bg-transparent font-medium text-[var(--ink-primary)] placeholder-[var(--ink-muted)] text-sm sm:text-base outline-none"
            :placeholder="c.cmdPrompt || 'Cari proyek, keahlian, aksi...'"
            autocomplete="off"
            spellcheck="false"
          />
          <kbd class="font-mono text-[10px] font-bold bg-[var(--surface-panel)] border border-[var(--comic-border)] px-1.5 py-0.5 rounded text-[var(--ink-muted)] shrink-0">
            ESC
          </kbd>
        </div>

        <!-- Scrollable Results Container -->
        <div
          ref="listContainerRef"
          class="max-h-[380px] overflow-y-auto p-2.5 flex flex-col gap-3 custom-scrollbar overscroll-contain"
          role="listbox"
          data-lenis-prevent
          @wheel.stop
        >
          <!-- Empty State -->
          <div
            v-if="filteredItems.length === 0"
            class="p-8 text-center text-xs sm:text-sm text-[var(--ink-muted)] font-mono"
          >
            {{ c.cmdNoResults || 'Tidak ada hasil untuk' }} "{{ searchQuery }}"
          </div>

          <!-- Grouped Results -->
          <div
            v-for="(groupList, groupName) in groupedItems"
            :key="groupName"
            class="flex flex-col gap-1"
          >
            <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--ink-muted)] px-3 py-1">
              // {{ groupName }}
            </span>

            <button
              v-for="item in groupList"
              :key="item.id"
              type="button"
              :aria-selected="selectedIndex === item.globalIndex"
              :class="[
                'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left border transition-all cursor-pointer',
                selectedIndex === item.globalIndex
                  ? 'bg-[var(--brand-coral)] text-white border-[var(--comic-border)] shadow-[2px_2px_0px_var(--comic-border)] scale-[1.01]'
                  : 'bg-[var(--surface-panel)] hover:bg-[var(--surface-subtle)] text-[var(--ink-primary)] border-transparent'
              ]"
              @click="item.action"
              @mouseenter="selectedIndex = item.globalIndex"
            >
              <div class="flex items-center gap-3 min-w-0">
                <div
                  :class="[
                    'w-7 h-7 rounded-lg border flex items-center justify-center shrink-0',
                    selectedIndex === item.globalIndex
                      ? 'bg-white text-[var(--brand-coral)] border-white'
                      : 'bg-[var(--canvas-bg)] text-[var(--brand-coral)] border-[var(--comic-border)]'
                  ]"
                >
                  <component :is="item.icon" class="w-3.5 h-3.5" />
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-bold truncate">
                    {{ item.label }}
                  </span>
                  <span
                    :class="[
                      'text-[10px] font-mono truncate',
                      selectedIndex === item.globalIndex ? 'text-white/80' : 'text-[var(--ink-muted)]'
                    ]"
                  >
                    {{ item.sublabel }}
                  </span>
                </div>
              </div>

              <ArrowRight
                :class="[
                  'w-3.5 h-3.5 shrink-0 transition-transform',
                  selectedIndex === item.globalIndex ? 'opacity-100 translate-x-0.5' : 'opacity-0'
                ]"
              />
            </button>
          </div>
        </div>

        <!-- Command Palette Footer Instructions -->
        <div class="px-4 py-2 border-t border-[var(--comic-border)]/20 bg-[var(--canvas-bg)] flex items-center justify-between text-[11px] font-mono text-[var(--ink-muted)] shrink-0">
          <div class="flex items-center gap-2">
            <span>↑↓ Navigasi</span>
            <span>↵ Pilih</span>
          </div>
          <span>Annisa Maulana Sabilla • Portfolio</span>
        </div>
      </div>
    </div>
  </Transition>
</template>
