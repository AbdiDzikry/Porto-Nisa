<script setup>
import { ref, reactive, onMounted } from 'vue'
import { 
  GitFork, ZoomIn, ZoomOut, RotateCcw, Move, Sparkles, 
  UserCheck, Shield, Smartphone, Bell, CheckCircle2, 
  XCircle, Clock, AlertTriangle, ArrowRight, CornerDownRight, LogOut
} from 'lucide-vue-next'

// --- Workspace Pan & Zoom State ---
const canvasRef = ref(null)
const zoom = ref(0.85)
const pan = reactive({ x: 40, y: 30 })
const isDragging = ref(false)
const dragStart = reactive({ x: 0, y: 0 })
const activeStep = ref(null)
const activeFlowMode = ref('all') // 'all', 'happy', 'escalation', 'k3'

// Zoom Controls
const zoomIn = () => {
  zoom.value = Math.min(zoom.value + 0.15, 2.0)
}
const zoomOut = () => {
  zoom.value = Math.max(zoom.value - 0.15, 0.4)
}
const resetView = () => {
  zoom.value = 0.85
  pan.x = 40
  pan.y = 30
  activeStep.value = null
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

// Wheel zoom with isolation
const onWheel = (e) => {
  e.preventDefault()
  const delta = e.deltaY < 0 ? 0.08 : -0.08
  const newZoom = Math.min(Math.max(zoom.value + delta, 0.4), 2.0)
  zoom.value = Number(newZoom.toFixed(2))
}

// --- User Flow Nodes Data (Actors: Tamu, Satpam, Host/Karyawan, K3 Safety) ---
// Virtual Workspace: 1400px x 820px
const swimlanes = [
  { id: 'pos', title: '1. POS SATPAM (GATEWAY INPUT)', color: '#FF5E5B', y: 40, height: 230 },
  { id: 'host', title: '2. HOST INTERNAL / ATASAN (APPROVAL)', color: '#3B82F6', y: 290, height: 230 },
  { id: 'k3', title: '3. K3 SAFETY & CHECK-OUT (MONITORING & EXIT)', color: '#10B981', y: 540, height: 230 }
]

const flowNodes = [
  // --- Lane 1: Pos Satpam ---
  {
    id: 'n1',
    lane: 'pos',
    x: 60,
    y: 90,
    width: 240,
    actor: 'Tamu & Satpam',
    title: '1. Tamu Tiba di Gerbang',
    desc: 'Satpam input Nomor WhatsApp di tablet pos.',
    badge: 'Input < 30s',
    highlight: 'Autofill Data Lama',
    borderColor: '#FF5E5B',
    isStart: true
  },
  {
    id: 'n2',
    lane: 'pos',
    x: 350,
    y: 90,
    width: 250,
    actor: 'Kamera Tablet Pos',
    title: '2. Snapshot & Pilih Host',
    desc: 'Webcam ambil foto wajah + pilih karyawan & departemen tujuan.',
    badge: 'Face Snapshot',
    highlight: 'NIK KTP Terenkripsi',
    borderColor: '#F59E0B'
  },
  {
    id: 'n3',
    lane: 'pos',
    x: 650,
    y: 90,
    width: 250,
    actor: 'Sistem Integrasi',
    title: '3. Push Notifikasi Approval',
    desc: 'Sistem kirim link approval instan via WA API & Web Push ke Host.',
    badge: 'Real-time WebSocket',
    highlight: 'Timer 3 Menit Aktif',
    borderColor: '#3B82F6'
  },
  // --- Lane 2: Host & Approval ---
  {
    id: 'n4_decision',
    lane: 'host',
    x: 650,
    y: 330,
    width: 260,
    actor: 'Host (Karyawan Tujuan)',
    title: '4. Respon Host',
    desc: 'Host memeriksa identitas tamu, foto pos, dan maksud kedatangan.',
    badge: 'Decision Point',
    highlight: 'Setujui / Tolak / Diam',
    borderColor: '#8B5CF6',
    isDecision: true
  },
  {
    id: 'n5_reject',
    lane: 'host',
    x: 350,
    y: 330,
    width: 240,
    actor: 'Host / Atasan',
    title: 'X. Kunjungan Ditolak',
    desc: 'Host isi alasan singkat (misal: Dinas Luar). Tablet pos merah.',
    badge: 'Rejection Path',
    highlight: 'Sopan & Tanpa Debat',
    borderColor: '#EF4444',
    isDanger: true
  },
  {
    id: 'n5_escalate',
    lane: 'host',
    x: 960,
    y: 330,
    width: 260,
    actor: 'Timer Auto-Eskalasi',
    title: '5. Eskalasi 3 Menit',
    desc: 'Host tidak respon? Otomatis eskalasi ke Supervisor/Dept Head.',
    badge: 'Anti Antrean Pos',
    highlight: 'Hirarki Organisasi',
    borderColor: '#F59E0B',
    isWarning: true
  },
  // --- Lane 3: K3 Check-in & Exit ---
  {
    id: 'n6_checkin',
    lane: 'k3',
    x: 650,
    y: 580,
    width: 260,
    actor: 'Satpam & Tamu',
    title: '6. Check-In & Beri ID Badge',
    desc: 'Layar pos HIJAU APPROVED. Satpam kalungkan badge bernomor.',
    badge: 'Status: CHECKED_IN',
    highlight: 'Masuk Live Headcount',
    borderColor: '#10B981',
    isSuccess: true
  },
  {
    id: 'n7_k3',
    lane: 'k3',
    x: 960,
    y: 580,
    width: 270,
    actor: 'Safety Officer (HSE)',
    title: '7. Live Headcount K3 (Darurat)',
    desc: 'Bila alarm kebakaran: Dashboard K3 tampilkan daftar orang luar di pabrik.',
    badge: 'SMK3 Emergency Drill',
    highlight: 'Roll-Call Assembly Pt',
    borderColor: '#EC4899',
    isSpecial: true
  },
  {
    id: 'n8_checkout',
    lane: 'k3',
    x: 350,
    y: 580,
    width: 250,
    actor: 'Satpam Gerbang Keluar',
    title: '8. Check-Out & Kembalikan Badge',
    desc: 'Tamu serahkan badge. Satpam klik Selesai. Occupancy otomatis berkurang.',
    badge: 'Status: CHECKED_OUT',
    highlight: 'Audit Trail Lengkap',
    borderColor: '#64748B'
  }
]

// Flow Connector Paths with Arrowheads & Condition Badges
const flowConnections = [
  // 1 -> 2
  {
    id: 'fc1',
    path: 'M 300 150 L 340 150',
    color: '#FF5E5B',
    label: 'Auto-fill',
    labelX: 320,
    labelY: 135
  },
  // 2 -> 3
  {
    id: 'fc2',
    path: 'M 600 150 L 640 150',
    color: '#F59E0B',
    label: 'Push Event',
    labelX: 620,
    labelY: 135
  },
  // 3 -> 4 (Turun ke Host)
  {
    id: 'fc3',
    path: 'M 780 200 L 780 320',
    color: '#3B82F6',
    label: 'Notif WA & App',
    labelX: 835,
    labelY: 260
  },
  // 4 -> 6 (Approved: Turun ke Check-In)
  {
    id: 'fc4',
    path: 'M 780 440 L 780 570',
    color: '#10B981',
    label: 'SETUJU (Approved)',
    labelX: 845,
    labelY: 510,
    type: 'happy'
  },
  // 4 -> n5_reject (Tolak: Kiri)
  {
    id: 'fc5',
    path: 'M 650 390 L 600 390',
    color: '#EF4444',
    label: 'TOLAK (Isi Alasan)',
    labelX: 625,
    labelY: 375,
    type: 'reject'
  },
  // 4 -> n5_escalate (Timeout: Kanan)
  {
    id: 'fc6',
    path: 'M 910 390 L 950 390',
    color: '#F59E0B',
    label: '> 3 Menit Idle',
    labelX: 935,
    labelY: 375,
    type: 'escalation'
  },
  // n5_escalate -> 6 (Atasan Setujui)
  {
    id: 'fc7',
    path: 'M 1040 440 C 1040 500, 930 520, 900 580',
    color: '#10B981',
    label: 'Atasan Setujui',
    labelX: 990,
    labelY: 520,
    type: 'escalation'
  },
  // 6 -> 7 (K3 Monitoring Realtime)
  {
    id: 'fc8',
    path: 'M 910 640 L 950 640',
    color: '#EC4899',
    label: 'Live Stream',
    labelX: 935,
    labelY: 625,
    type: 'k3'
  },
  // 6 -> 8 (Tamu Selesai & Check-Out)
  {
    id: 'fc9',
    path: 'M 650 640 L 610 640',
    color: '#64748B',
    label: 'Selesai Kunjungan',
    labelX: 630,
    labelY: 625,
    type: 'happy'
  }
]

onMounted(() => {
  resetView()
})
</script>

<template>
  <div class="space-y-4">
    <!-- Visual User Flow Canvas Header / Toolbar -->
    <div class="flex flex-wrap items-center justify-between gap-3 p-4 bg-[var(--surface-subtle)] border-2 border-[var(--comic-border)] rounded-2xl shadow-comic">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-[var(--brand-mint)] text-slate-950 font-bold flex items-center justify-center border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]">
          <GitFork class="w-4 h-4" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h4 class="text-sm font-black font-mono uppercase text-[var(--ink-primary)]">
              Interactive User Flow & Process Architecture
            </h4>
            <span class="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--brand-coral)] text-white font-bold">
              Multi-Actor Swimlane
            </span>
          </div>
          <p class="text-[11px] font-mono text-[var(--ink-muted)]">
            Alur End-to-End: Drag untuk geser kanvas • Scroll untuk zoom • Panah menunjukkan alur keputusan & eskalasi
          </p>
        </div>
      </div>

      <!-- Controls & Legend -->
      <div class="flex items-center gap-2 font-mono text-xs">
        <div class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--surface-panel)] border border-[var(--comic-border)] text-[var(--ink-muted)] text-[11px]">
          <Move class="w-3.5 h-3.5 text-[var(--brand-coral)]" />
          <span>Pan Drag</span>
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

    <!-- Active Step Detail Banner (When node is clicked) -->
    <div 
      v-if="activeStep"
      class="p-3 bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] rounded-xl flex items-center justify-between gap-3 text-xs font-mono animate-fadeIn shadow-comic"
    >
      <div class="flex items-center gap-3">
        <div class="w-3 h-8 rounded-full" :style="{ backgroundColor: activeStep.borderColor }"></div>
        <div>
          <span class="font-bold text-[var(--ink-primary)]">{{ activeStep.title }}</span>
          <span class="ml-2 px-2 py-0.5 rounded text-[10px] bg-[var(--surface-subtle)] text-[var(--ink-muted)] border border-[var(--comic-border)]">Aktor: {{ activeStep.actor }}</span>
          <p class="text-[11px] text-[var(--ink-primary)] font-sans mt-0.5">{{ activeStep.desc }}</p>
        </div>
      </div>
      <button 
        @click="activeStep = null"
        class="text-[10px] uppercase font-bold px-2 py-1 bg-[var(--surface-subtle)] border border-[var(--comic-border)] rounded-md hover:bg-[var(--canvas-bg)]"
      >
        Tutup
      </button>
    </div>

    <!-- WORKSPACE CANVAS (DRAGGABLE & ZOOMABLE) -->
    <div 
      ref="canvasRef"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseUp"
      @wheel="onWheel"
      data-lenis-prevent
      class="relative w-full h-[650px] overflow-hidden rounded-2xl border-2 border-[var(--comic-border)] bg-[var(--canvas-bg)] shadow-comic cursor-grab active:cursor-grabbing select-none"
      style="background-image: radial-gradient(var(--comic-border) 1.2px, transparent 1.2px); background-size: 24px 24px;"
    >
      <!-- Watermark / Coordinates badge -->
      <div class="absolute bottom-4 left-4 z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--surface-panel)]/90 backdrop-blur-sm border border-[var(--comic-border)] font-mono text-[10px] text-[var(--ink-muted)]">
        <span class="w-2 h-2 rounded-full bg-[var(--brand-mint)] animate-pulse"></span>
        <span>Swimlane Canvas: 1350 x 800 px • Pan ({{ Math.round(pan.x) }}, {{ Math.round(pan.y) }})</span>
      </div>

      <!-- Flow Path Legend Overlay -->
      <div class="absolute top-4 right-4 z-20 pointer-events-auto flex items-center gap-2 p-2 rounded-xl bg-[var(--surface-panel)]/95 backdrop-blur-sm border-2 border-[var(--comic-border)] font-mono text-[11px] shadow-comic">
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--brand-mint)] text-slate-950 font-bold border border-[var(--comic-border)]">
          ✓ Happy Path
        </span>
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--brand-sun)] text-slate-950 font-bold border border-[var(--comic-border)]">
          ⏱ Eskalasi 3m
        </span>
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-500 text-white font-bold border border-[var(--comic-border)]">
          ✕ Tolak
        </span>
      </div>

      <!-- TRANSFORM CONTAINER (ZOOM & PAN) -->
      <div 
        class="absolute origin-top-left transition-transform duration-75 will-change-transform"
        :style="{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          width: '1350px',
          height: '800px'
        }"
      >
        <!-- SWIMLANE ROW BACKGROUNDS -->
        <div 
          v-for="lane in swimlanes" 
          :key="lane.id"
          class="absolute left-4 right-4 rounded-xl border border-dashed border-[var(--comic-border)]/50 pointer-events-none bg-[var(--surface-subtle)]/30"
          :style="{
            top: `${lane.y}px`,
            height: `${lane.height}px`
          }"
        >
          <div 
            class="absolute top-2 left-3 px-2.5 py-0.5 rounded-md font-mono text-[10px] font-black uppercase tracking-wider"
            :style="{ 
              backgroundColor: lane.color,
              color: '#FFFFFF' 
            }"
          >
            {{ lane.title }}
          </div>
        </div>

        <!-- SVG LAYER FOR FLOW ARROWS -->
        <svg 
          class="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker 
              v-for="conn in flowConnections"
              :key="conn.id"
              :id="`flow-arrow-${conn.id}`" 
              viewBox="0 0 12 12" 
              refX="10" 
              refY="6" 
              markerWidth="8" 
              markerHeight="8" 
              orient="auto-start-reverse"
            >
              <path d="M 0 2 L 10 6 L 0 10 z" :fill="conn.color" />
            </marker>
          </defs>

          <!-- Draw Connection Paths with Arrowheads -->
          <g v-for="conn in flowConnections" :key="conn.id">
            <!-- Line Path -->
            <path 
              :d="conn.path" 
              fill="none" 
              :stroke="conn.color" 
              stroke-width="3" 
              stroke-dasharray="7,4"
              :marker-end="`url(#flow-arrow-${conn.id})`"
              class="transition-all duration-200"
            />

            <!-- Condition / Action Badge on Line Center -->
            <g :transform="`translate(${conn.labelX}, ${conn.labelY})`">
              <rect 
                x="-36" 
                y="-10" 
                width="72" 
                height="20" 
                rx="5" 
                :fill="conn.color"
                stroke="#1E293B"
                stroke-width="1.5"
                class="shadow-sm" 
              />
              <text 
                x="0" 
                y="3.5" 
                text-anchor="middle" 
                fill="#ffffff" 
                font-size="9" 
                font-family="monospace" 
                font-weight="bold"
              >
                {{ conn.label }}
              </text>
            </g>
          </g>
        </svg>

        <!-- FLOW NODES LAYER (HTML / VUE COMPONENTS) -->
        <div 
          v-for="node in flowNodes" 
          :key="node.id"
          @click.stop="activeStep = node"
          class="absolute rounded-xl border-2 overflow-hidden shadow-comic bg-[var(--surface-panel)] z-10 transition-all cursor-pointer"
          :class="[
            activeStep?.id === node.id ? 'ring-4 ring-[var(--brand-coral)] scale-[1.02]' : 'hover:scale-[1.01]',
            node.isStart ? 'border-[var(--brand-coral)]' : '',
            node.isDecision ? 'border-[var(--brand-sun)]' : '',
            node.isDanger ? 'border-red-500' : '',
            node.isSuccess ? 'border-[var(--brand-mint)]' : 'border-[var(--comic-border)]'
          ]"
          :style="{
            left: `${node.x}px`,
            top: `${node.y}px`,
            width: `${node.width}px`
          }"
        >
          <!-- Node Header -->
          <div 
            class="p-2.5 border-b-2 border-[var(--comic-border)] flex items-center justify-between"
            :style="{ 
              backgroundColor: node.borderColor,
              color: '#FFFFFF'
            }"
          >
            <span class="font-mono text-xs font-black truncate">
              {{ node.title }}
            </span>
            <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/30 text-white shrink-0">
              {{ node.badge }}
            </span>
          </div>

          <!-- Node Body Content -->
          <div class="p-3 bg-[var(--surface-panel)] font-mono text-xs space-y-1.5">
            <div class="text-[10px] text-[var(--ink-muted)] flex items-center gap-1">
              <Shield v-if="node.actor.includes('Satpam') || node.actor.includes('K3')" class="w-3 h-3 text-[var(--brand-coral)]" />
              <Smartphone v-else class="w-3 h-3 text-[var(--brand-mint)]" />
              <span>Aktor: <strong>{{ node.actor }}</strong></span>
            </div>
            
            <p class="text-[11px] text-[var(--ink-primary)] font-sans leading-snug">
              {{ node.desc }}
            </p>

            <!-- Key Feature Highlight Badge -->
            <div class="pt-1.5 border-t border-[var(--comic-border)]/30 flex items-center justify-between text-[10px]">
              <span class="text-[var(--brand-coral)] font-bold">// {{ node.highlight }}</span>
              <ArrowRight class="w-3 h-3 text-[var(--ink-muted)]" />
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Summary of User Flow Tracks -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
      <div class="comic-panel p-3 bg-[var(--canvas-bg)] border-2 border-[var(--brand-mint)] rounded-xl shadow-comic">
        <div class="flex items-center gap-2 mb-1 text-[var(--brand-mint)] font-bold">
          <CheckCircle2 class="w-4 h-4" />
          <span>Track 1: Happy Path (&lt; 2 Menit)</span>
        </div>
        <p class="text-[11px] text-[var(--ink-muted)] font-sans">
          Satpam input nomor HP ➔ Host terima push notifikasi WA ➔ Klik SETUJUI ➔ Tablet pos otomatis hijau ➔ Kalung badge diserahkan.
        </p>
      </div>

      <div class="comic-panel p-3 bg-[var(--canvas-bg)] border-2 border-[var(--brand-sun)] rounded-xl shadow-comic">
        <div class="flex items-center gap-2 mb-1 text-[var(--brand-sun)] font-bold">
          <Clock class="w-4 h-4" />
          <span>Track 2: Eskalasi 3 Menit (Zero Bottleneck)</span>
        </div>
        <p class="text-[11px] text-[var(--ink-muted)] font-sans">
          Jika host sedang di lini produksi/meeting, timer 3 menit mengarahkan approval ke Supervisor terkait agar tamu tidak menumpuk di pos.
        </p>
      </div>

      <div class="comic-panel p-3 bg-[var(--canvas-bg)] border-2 border-[var(--brand-coral)] rounded-xl shadow-comic">
        <div class="flex items-center gap-2 mb-1 text-[var(--brand-coral)] font-bold">
          <AlertTriangle class="w-4 h-4" />
          <span>Track 3: K3 Realtime Headcount</span>
        </div>
        <p class="text-[11px] text-[var(--ink-muted)] font-sans">
          Status 'CHECKED_IN' sinkron instan dengan tablet K3. Saat alarm evakuasi, petugas safety langsung tahu berapa orang luar di pabrik.
        </p>
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
