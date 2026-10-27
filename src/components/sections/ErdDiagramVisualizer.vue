<script setup>
import { ref, reactive, onMounted } from 'vue'
import { 
  Database, Key, Link2, ZoomIn, ZoomOut, RotateCcw, 
  Move, Maximize2, Sparkles, CheckCircle2, ChevronRight, Eye
} from 'lucide-vue-next'

// --- Workspace / Canvas Pan & Zoom State ---
const canvasRef = ref(null)
const zoom = ref(0.9)
const pan = reactive({ x: 30, y: 20 })
const isDragging = ref(false)
const dragStart = reactive({ x: 0, y: 0 })
const activeTable = ref(null)
const activeConnection = ref(null)

// Zoom Controls
const zoomIn = () => {
  zoom.value = Math.min(zoom.value + 0.15, 2.0)
}
const zoomOut = () => {
  zoom.value = Math.max(zoom.value - 0.15, 0.4)
}
const resetView = () => {
  zoom.value = 0.9
  pan.x = 30
  pan.y = 20
  activeTable.value = null
  activeConnection.value = null
}

// Mouse Drag / Pan Handling
const onMouseDown = (e) => {
  if (e.button !== 0) return
  isDragging.value = true
  dragStart.x = e.clientX - pan.x
  dragStart.y = e.clientY - pan.y
}

const onMouseMove = (e) => {
  if (!isDragging.value) return
  pan.x = e.clientX - dragStart.x
  pan.y = e.clientY - dragStart.y
}

const onMouseUp = () => {
  isDragging.value = false
}

// Wheel zoom handling with prevention of page scrolling inside workspace
const onWheel = (e) => {
  e.preventDefault()
  const delta = e.deltaY < 0 ? 0.08 : -0.08
  const newZoom = Math.min(Math.max(zoom.value + delta, 0.4), 2.0)
  zoom.value = Number(newZoom.toFixed(2))
}

// --- Data Model: 5 ERD Tables with Absolute Coordinates in Workspace ---
// Canvas virtual size: 1350px x 780px
const tables = [
  {
    id: 'guests',
    name: 'guests',
    title: 'GUESTS',
    category: 'Master Data',
    x: 40,
    y: 50,
    width: 290,
    accent: '#10B981', // emerald
    fields: [
      { name: 'id', type: 'UUID', isPk: true, isFk: false, desc: 'Primary Key' },
      { name: 'phone_number', type: 'VARCHAR(20)', isPk: false, isFk: false, isUk: true, desc: 'Kunci Autofill Pos' },
      { name: 'full_name', type: 'VARCHAR(150)', isPk: false, isFk: false, desc: 'Nama Pengunjung' },
      { name: 'company_name', type: 'VARCHAR(150)', isPk: false, isFk: false, desc: 'Perusahaan / Vendor' },
      { name: 'id_card_number', type: 'TEXT (Encrypted)', isPk: false, isFk: false, desc: 'UU PDP 2022' },
      { name: 'created_at', type: 'TIMESTAMPTZ', isPk: false, isFk: false, desc: 'Waktu Daftar' }
    ]
  },
  {
    id: 'employees',
    name: 'employees',
    title: 'EMPLOYEES',
    category: 'Master Data',
    x: 40,
    y: 380,
    width: 290,
    accent: '#3B82F6', // blue
    fields: [
      { name: 'id', type: 'UUID', isPk: true, isFk: false, desc: 'Primary Key' },
      { name: 'npk', type: 'VARCHAR(30)', isPk: false, isFk: false, isUk: true, desc: 'NPK Karyawan' },
      { name: 'full_name', type: 'VARCHAR(150)', isPk: false, isFk: false, desc: 'Nama Karyawan' },
      { name: 'department', type: 'VARCHAR(100)', isPk: false, isFk: false, desc: 'Dept (QA, Produksi)' },
      { name: 'phone_number', type: 'VARCHAR(20)', isPk: false, isFk: false, desc: 'WhatsApp Notifikasi' },
      { name: 'supervisor_id', type: 'UUID', isPk: false, isFk: true, desc: 'FK Self (Eskalasi 3m)' }
    ]
  },
  {
    id: 'visits',
    name: 'visits',
    title: 'VISITS (Transaction Core)',
    category: 'Core Entity',
    x: 490,
    y: 110,
    width: 320,
    accent: '#FF5E5B', // coral brand
    isHighlighted: true,
    fields: [
      { name: 'id', type: 'UUID', isPk: true, isFk: false, desc: 'Primary Key' },
      { name: 'guest_id', type: 'UUID', isPk: false, isFk: true, desc: 'FK -> guests.id' },
      { name: 'host_id', type: 'UUID', isPk: false, isFk: true, desc: 'FK -> employees.id' },
      { name: 'actual_approver_id', type: 'UUID', isPk: false, isFk: true, desc: 'FK -> employees.id' },
      { name: 'security_in_id', type: 'UUID', isPk: false, isFk: true, desc: 'FK -> security_guards.id' },
      { name: 'visitor_badge_no', type: 'VARCHAR(30)', isPk: false, isFk: false, desc: 'Nomor Kalung Fisik' },
      { name: 'status', type: 'ENUM', isPk: false, isFk: false, desc: 'APPROVED | IN | OUT' },
      { name: 'check_in_at', type: 'TIMESTAMPTZ', isPk: false, isFk: false, desc: 'Jam Masuk Pabrik' },
      { name: 'check_out_at', type: 'TIMESTAMPTZ', isPk: false, isFk: false, desc: 'Jam Keluar Pabrik' }
    ]
  },
  {
    id: 'security_guards',
    name: 'security_guards',
    title: 'SECURITY_GUARDS',
    category: 'Master Satpam',
    x: 940,
    y: 50,
    width: 280,
    accent: '#F59E0B', // amber
    fields: [
      { name: 'id', type: 'UUID', isPk: true, isFk: false, desc: 'Primary Key' },
      { name: 'npk', type: 'VARCHAR(30)', isPk: false, isFk: false, isUk: true, desc: 'NPK Petugas' },
      { name: 'full_name', type: 'VARCHAR(150)', isPk: false, isFk: false, desc: 'Nama Petugas Satpam' },
      { name: 'gate_location', type: 'VARCHAR(50)', isPk: false, isFk: false, desc: 'Pos Utama / Barat' }
    ]
  },
  {
    id: 'evacuation_logs',
    name: 'evacuation_logs',
    title: 'EVACUATION_LOGS',
    category: 'HSE Safety K3',
    x: 940,
    y: 350,
    width: 290,
    accent: '#EC4899', // pink
    fields: [
      { name: 'id', type: 'UUID', isPk: true, isFk: false, desc: 'Primary Key' },
      { name: 'incident_title', type: 'VARCHAR(150)', isPk: false, isFk: false, desc: 'Alarm Darurat Kebakaran' },
      { name: 'visit_id', type: 'UUID', isPk: false, isFk: true, desc: 'FK -> visits.id' },
      { name: 'assembly_point', type: 'VARCHAR(50)', isPk: false, isFk: false, desc: 'Titik Kumpul A / B' },
      { name: 'is_safe', type: 'BOOLEAN', isPk: false, isFk: false, desc: 'Status Headcount K3' },
      { name: 'verified_at', type: 'TIMESTAMPTZ', isPk: false, isFk: false, desc: 'Waktu Roll-Call' }
    ]
  }
]

// --- Directed Relationship Arrows (Lines with arrowheads) ---
const connections = [
  {
    id: 'c1',
    fromTable: 'guests',
    toTable: 'visits',
    fromField: 'guests.id',
    toField: 'visits.guest_id',
    type: '1 : N (One-to-Many)',
    path: 'M 330 115 C 410 115, 410 180, 480 180',
    color: '#10B981',
    label: '1 : N',
    labelX: 410,
    labelY: 145,
    desc: 'Satu tamu dapat memiliki banyak riwayat kunjungan tanpa pendaftaran ulang'
  },
  {
    id: 'c2',
    fromTable: 'employees',
    toTable: 'visits',
    fromField: 'employees.id',
    toField: 'visits.host_id',
    type: '1 : N (One-to-Many)',
    path: 'M 330 445 C 415 445, 410 210, 480 210',
    color: '#3B82F6',
    label: '1 : N',
    labelX: 410,
    labelY: 330,
    desc: 'Karyawan internal menerima push notifikasi WA untuk approve tamu'
  },
  {
    id: 'c3',
    fromTable: 'security_guards',
    toTable: 'visits',
    fromField: 'security_guards.id',
    toField: 'visits.security_in_id',
    type: '1 : N (One-to-Many)',
    path: 'M 940 115 C 870 115, 880 270, 818 270',
    color: '#F59E0B',
    label: '1 : N',
    labelX: 875,
    labelY: 190,
    desc: 'Audit trail satpam yang mencetak badge & mengambil foto webcam tamu'
  },
  {
    id: 'c4',
    fromTable: 'visits',
    toTable: 'evacuation_logs',
    fromField: 'visits.id',
    toField: 'evacuation_logs.visit_id',
    type: '1 : N (One-to-Many)',
    path: 'M 810 150 C 875 150, 875 445, 930 445',
    color: '#EC4899',
    label: '1 : N',
    labelX: 875,
    labelY: 300,
    desc: 'Roll call evakuasi darurat K3 mencocokkan tamu yang berstatus CHECKED_IN'
  },
  {
    id: 'c5',
    fromTable: 'employees',
    toTable: 'employees',
    fromField: 'employees.supervisor_id',
    toField: 'employees.id',
    type: 'Self-Referencing 1:N',
    path: 'M 40 535 C -20 535, -20 445, 30 445',
    color: '#818CF8',
    label: 'Self FK',
    labelX: -15,
    labelY: 490,
    desc: 'Eskalasi otomatis 3 menit ke atasan langsung jika host utama tidak merespons'
  }
]

onMounted(() => {
  resetView()
})
</script>

<template>
  <div class="space-y-4">
    <!-- Visual Studio Schema Canvas Header / Toolbar -->
    <div class="flex flex-wrap items-center justify-between gap-3 p-4 bg-[var(--surface-subtle)] border-2 border-[var(--comic-border)] rounded-2xl shadow-comic">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-[var(--brand-coral)] text-white font-bold flex items-center justify-center border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]">
          <Database class="w-4 h-4" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h4 class="text-sm font-black font-mono uppercase text-[var(--ink-primary)]">
              Interactive ERD Diagram Workspace
            </h4>
            <span class="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--brand-mint)]/20 text-[var(--brand-mint)] border border-[var(--brand-mint)] font-bold">
              Supabase / MySQL Canvas
            </span>
          </div>
          <p class="text-[11px] font-mono text-[var(--ink-muted)]">
            Kanvas Interaktif: Klik & drag untuk geser (Pan) • Scroll mouse untuk Zoom • Klik panah untuk melihat relasi
          </p>
        </div>
      </div>

      <!-- Controls: Zoom In, Zoom Out, Reset, Hint -->
      <div class="flex items-center gap-2 font-mono text-xs">
        <div class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--surface-panel)] border border-[var(--comic-border)] text-[var(--ink-muted)] text-[11px]">
          <Move class="w-3.5 h-3.5 text-[var(--brand-coral)]" />
          <span>Pan (Drag Canvas)</span>
        </div>

        <button 
          @click="zoomOut" 
          title="Zoom Out"
          class="w-8 h-8 rounded-xl bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] flex items-center justify-center text-[var(--ink-primary)] hover:bg-[var(--surface-subtle)] active:scale-95 transition-all shadow-[1px_1px_0px_var(--comic-border)]"
        >
          <ZoomOut class="w-4 h-4" />
        </button>

        <span class="px-2.5 py-1 rounded-lg bg-[var(--surface-panel)] border border-[var(--comic-border)] font-bold text-xs min-w-[54px] text-center">
          {{ Math.round(zoom * 100) }}%
        </span>

        <button 
          @click="zoomIn" 
          title="Zoom In"
          class="w-8 h-8 rounded-xl bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] flex items-center justify-center text-[var(--ink-primary)] hover:bg-[var(--surface-subtle)] active:scale-95 transition-all shadow-[1px_1px_0px_var(--comic-border)]"
        >
          <ZoomIn class="w-4 h-4" />
        </button>

        <button 
          @click="resetView" 
          title="Reset Zoom & Position"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--brand-sun)] text-slate-950 font-bold border-2 border-[var(--comic-border)] hover:opacity-90 active:scale-95 transition-all shadow-[1px_1px_0px_var(--comic-border)]"
        >
          <RotateCcw class="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>

    <!-- Active Relationship Banner (When a line or table is clicked) -->
    <div 
      v-if="activeConnection"
      class="p-3 bg-[var(--brand-coral)]/10 border-2 border-[var(--brand-coral)] rounded-xl flex items-center justify-between gap-3 text-xs font-mono animate-fadeIn"
    >
      <div class="flex items-center gap-2">
        <Sparkles class="w-4 h-4 text-[var(--brand-coral)] shrink-0" />
        <div>
          <span class="font-bold text-[var(--ink-primary)]">Relasi Terpilih: {{ activeConnection.fromField }} ➔ {{ activeConnection.toField }}</span>
          <span class="ml-2 text-[var(--ink-muted)]">({{ activeConnection.type }})</span>
          <p class="text-[11px] text-[var(--ink-primary)] font-sans mt-0.5">{{ activeConnection.desc }}</p>
        </div>
      </div>
      <button 
        @click="activeConnection = null"
        class="text-[10px] uppercase font-bold px-2 py-1 bg-[var(--surface-panel)] border border-[var(--comic-border)] rounded-md hover:bg-[var(--canvas-bg)]"
      >
        Tutup
      </button>
    </div>

    <!-- WORKSPACE PLACEHOLDER CANVAS (DRAGGABLE & ZOOMABLE) -->
    <div 
      ref="canvasRef"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseUp"
      @wheel="onWheel"
      data-lenis-prevent
      class="relative w-full h-[640px] overflow-hidden rounded-2xl border-2 border-[var(--comic-border)] bg-[var(--canvas-bg)] shadow-comic cursor-grab active:cursor-grabbing select-none"
      style="background-image: radial-gradient(var(--comic-border) 1.2px, transparent 1.2px); background-size: 24px 24px;"
    >
      <!-- Mini Map / Canvas Watermark Badge -->
      <div class="absolute bottom-4 left-4 z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--surface-panel)]/90 backdrop-blur-sm border border-[var(--comic-border)] font-mono text-[10px] text-[var(--ink-muted)]">
        <span class="w-2 h-2 rounded-full bg-[var(--brand-mint)] animate-pulse"></span>
        <span>Canvas: 1350 x 780 px • Pan ({{ Math.round(pan.x) }}, {{ Math.round(pan.y) }})</span>
      </div>

      <!-- Legend Overlay -->
      <div class="absolute top-4 right-4 z-20 pointer-events-auto flex items-center gap-2 p-2 rounded-xl bg-[var(--surface-panel)]/95 backdrop-blur-sm border-2 border-[var(--comic-border)] font-mono text-[11px] shadow-comic">
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--brand-sun)] text-slate-950 font-bold border border-[var(--comic-border)]">
          <Key class="w-2.5 h-2.5" /> PK
        </span>
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--brand-coral)] text-white font-bold border border-[var(--comic-border)]">
          <Link2 class="w-2.5 h-2.5" /> FK
        </span>
        <span class="text-[var(--ink-muted)] text-[10px] pl-1 border-l border-[var(--comic-border)]">
          Panah: Relasi Foreign Key
        </span>
      </div>

      <!-- TRANSFORM CONTAINER (ZOOM & PAN APPLIED HERE) -->
      <div 
        class="absolute origin-top-left transition-transform duration-75 will-change-transform"
        :style="{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          width: '1350px',
          height: '780px'
        }"
      >
        <!-- SVG LAYER FOR RELATIONAL ARROWS (CONNECTOR LINES WITH HEADERS) -->
        <svg 
          class="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <!-- Marker Arrows for each connection -->
            <marker 
              v-for="conn in connections"
              :key="conn.id"
              :id="`arrowhead-${conn.id}`" 
              viewBox="0 0 12 12" 
              refX="10" 
              refY="6" 
              markerWidth="8" 
              markerHeight="8" 
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 10 6 L 0 10.5 z" :fill="conn.color" />
            </marker>
          </defs>

          <!-- Draw Connection Paths with Arrowheads -->
          <g v-for="conn in connections" :key="conn.id">
            <!-- Invisible wide clickable hit-box line -->
            <path 
              :d="conn.path" 
              fill="none" 
              stroke="transparent" 
              stroke-width="20" 
              class="cursor-pointer pointer-events-auto"
              @click.stop="activeConnection = conn"
            />

            <!-- Visible stylized connector line -->
            <path 
              :d="conn.path" 
              fill="none" 
              :stroke="conn.color" 
              :stroke-width="activeConnection?.id === conn.id ? '4' : '2.5'" 
              stroke-dasharray="6,4"
              :marker-end="`url(#arrowhead-${conn.id})`"
              :class="[
                'pointer-events-none transition-all duration-200',
                activeConnection?.id === conn.id ? 'animate-pulse' : ''
              ]"
            />

            <!-- Cardinality badge overlay on line center -->
            <g 
              :transform="`translate(${conn.labelX}, ${conn.labelY})`" 
              class="cursor-pointer pointer-events-auto"
              @click.stop="activeConnection = conn"
            >
              <rect 
                x="-22" 
                y="-11" 
                width="44" 
                height="22" 
                rx="6" 
                :fill="conn.color"
                stroke="#1E293B"
                stroke-width="1.5"
                class="shadow-sm" 
              />
              <text 
                x="0" 
                y="4" 
                text-anchor="middle" 
                fill="#ffffff" 
                font-size="10" 
                font-family="monospace" 
                font-weight="bold"
              >
                {{ conn.label }}
              </text>
            </g>
          </g>
        </svg>

        <!-- TABLE CARDS LAYER (HTML / VUE COMPONENTS) -->
        <div 
          v-for="tbl in tables" 
          :key="tbl.id"
          :id="`table-${tbl.id}`"
          @click.stop="activeTable = tbl.id"
          class="absolute rounded-2xl border-2 overflow-hidden shadow-comic bg-[var(--surface-panel)] z-10 transition-all select-none"
          :class="[
            activeTable === tbl.id ? 'ring-4 ring-[var(--brand-coral)]/40 scale-[1.01]' : '',
            tbl.isHighlighted ? 'border-[var(--brand-coral)]' : 'border-[var(--comic-border)]'
          ]"
          :style="{
            left: `${tbl.x}px`,
            top: `${tbl.y}px`,
            width: `${tbl.width}px`
          }"
        >
          <!-- Schema Table Header -->
          <div 
            class="p-3 border-b-2 border-[var(--comic-border)] flex items-center justify-between"
            :style="{ 
              backgroundColor: tbl.isHighlighted ? 'var(--brand-coral)' : 'var(--canvas-bg)',
              color: tbl.isHighlighted ? '#FFFFFF' : 'var(--ink-primary)'
            }"
          >
            <div class="flex items-center gap-2">
              <Database 
                class="w-4 h-4 shrink-0" 
                :class="tbl.isHighlighted ? 'text-white' : 'text-[var(--brand-coral)]'" 
              />
              <span class="font-mono text-xs font-black tracking-wider uppercase">
                {{ tbl.title }}
              </span>
            </div>
            <span 
              class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border"
              :class="tbl.isHighlighted ? 'bg-white text-slate-950 border-white' : 'bg-[var(--surface-subtle)] text-[var(--ink-muted)] border-[var(--comic-border)]'"
            >
              {{ tbl.category }}
            </span>
          </div>

          <!-- Table Attributes (Schema Columns) -->
          <div class="p-2.5 divide-y divide-[var(--comic-border)]/20 font-mono text-xs bg-[var(--surface-panel)]">
            <div 
              v-for="(fld, fIdx) in tbl.fields" 
              :key="fIdx"
              class="py-1.5 px-1 flex items-center justify-between gap-1.5 hover:bg-[var(--surface-subtle)] rounded transition-colors group"
            >
              <!-- Field Name & PK/FK Indicators -->
              <div class="flex items-center gap-1.5 min-w-0">
                <span 
                  v-if="fld.isPk" 
                  class="w-4 h-4 rounded bg-[var(--brand-sun)] text-slate-950 flex items-center justify-center shrink-0" 
                  title="Primary Key"
                >
                  <Key class="w-2.5 h-2.5" />
                </span>
                <span 
                  v-else-if="fld.isFk" 
                  class="w-4 h-4 rounded bg-[var(--brand-coral)] text-white flex items-center justify-center shrink-0" 
                  title="Foreign Key"
                >
                  <Link2 class="w-2.5 h-2.5" />
                </span>
                <span v-else class="w-4 h-4 flex items-center justify-center shrink-0 text-slate-400 text-[9px]">
                  •
                </span>

                <span 
                  class="truncate text-[11px]"
                  :class="[
                    fld.isPk ? 'font-black text-[var(--ink-primary)]' : '',
                    fld.isFk ? 'font-bold text-[var(--brand-coral)]' : 'text-[var(--ink-primary)]'
                  ]"
                >
                  {{ fld.name }}
                </span>
              </div>

              <!-- Field Data Type -->
              <div class="flex items-center gap-1 shrink-0">
                <span class="text-[9px] font-mono px-1 py-0.5 rounded bg-[var(--canvas-bg)] border border-[var(--comic-border)]/40 text-[var(--brand-mint)]">
                  {{ fld.type }}
                </span>
              </div>
            </div>
          </div>

          <!-- Table Bottom Bar -->
          <div class="p-2 border-t border-[var(--comic-border)]/30 bg-[var(--canvas-bg)] text-[9px] font-mono text-[var(--ink-muted)] flex items-center justify-between">
            <span>{{ tbl.fields.length }} kolom</span>
            <span class="text-[var(--brand-mint)]">Indexed</span>
          </div>
        </div>

      </div>
    </div>

    <!-- Active Relationship Connector Explanation Quick Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
      <div 
        v-for="c in connections.slice(0, 4)" 
        :key="c.id"
        @click="activeConnection = c"
        class="comic-panel p-3 bg-[var(--canvas-bg)] border-2 border-[var(--comic-border)] rounded-xl cursor-pointer hover:border-[var(--brand-coral)] transition-all shadow-comic flex items-start gap-2.5"
        :class="activeConnection?.id === c.id ? 'border-[var(--brand-coral)] ring-2 ring-[var(--brand-coral)]/30' : ''"
      >
        <div class="w-3 h-3 rounded-full mt-1 shrink-0" :style="{ backgroundColor: c.color }"></div>
        <div class="min-w-0">
          <div class="font-bold text-[var(--ink-primary)] truncate text-[11px]">
            {{ c.fromField }} ➔ {{ c.toField }}
          </div>
          <span class="text-[10px] text-[var(--brand-coral)] font-bold">{{ c.label }}</span>
          <p class="text-[10px] text-[var(--ink-muted)] font-sans mt-0.5 line-clamp-2">
            {{ c.desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
