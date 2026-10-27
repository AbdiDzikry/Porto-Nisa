<script setup>
import { newArmadaBriefs } from '../../data/newArmadaBriefs'
import { 
  Building2, 
  Calendar, 
  ShieldCheck, 
  FileCheck, 
  Users, 
  ArrowRight, 
  Layers, 
  Sparkles
} from 'lucide-vue-next'

const briefs = newArmadaBriefs

const iconComponentFor = (iconName) => {
  switch (iconName) {
    case 'ShieldCheck': return ShieldCheck
    case 'FileCheck': return FileCheck
    case 'Users': return Users
    default: return Layers
  }
}
</script>

<template>
  <section class="section-container relative" aria-labelledby="briefs-heading">
    <!-- Header Section -->
    <div class="mb-10 border-b border-[var(--comic-border)]/20 pb-8 text-center sm:text-left">
      <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[var(--brand-sun)] text-slate-950 border border-[var(--comic-border)] shadow-[1.5px_1.5px_0px_var(--comic-border)]">
          <Building2 class="w-3.5 h-3.5" />
          {{ briefs.metadata.company }}
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider bg-[var(--surface-panel)] text-[var(--ink-muted)] border border-[var(--comic-border)]">
          <Calendar class="w-3.5 h-3.5 text-[var(--brand-coral)]" />
          {{ briefs.metadata.period.id }}
        </span>
      </div>

      <h1 id="briefs-heading" class="display-section mb-4">
        {{ briefs.metadata.title.id }}
      </h1>

      <p class="text-sm sm:text-base text-[var(--ink-muted)] max-w-3xl leading-relaxed">
        {{ briefs.metadata.summary.id }}
      </p>

      <div class="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono font-bold text-[var(--ink-muted)]">
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-[var(--brand-mint)]"></span>
          Role: <span class="text-[var(--ink-primary)]">{{ briefs.metadata.role }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-[var(--brand-coral)]"></span>
          Alokasi: <span class="text-[var(--ink-primary)]">{{ briefs.metadata.capacity }}</span>
        </div>
      </div>
    </div>

    <!-- Instructions / Subtitle -->
    <div class="mb-6 flex items-center justify-between">
      <span class="font-mono text-xs font-black uppercase tracking-wider text-[var(--ink-muted)] flex items-center gap-1.5">
        <Sparkles class="w-3.5 h-3.5 text-[var(--brand-coral)]" />
        Daftar Kandidat Projek (Klik salah satu kartu untuk membuka halaman detail spesifikasi)
      </span>
      <span class="font-mono text-xs font-bold text-[var(--brand-coral)] hidden sm:inline">
        Total: {{ briefs.projects.length }} Inisiatif
      </span>
    </div>

    <!-- List Projek (Cards yang Langsung Navigasi ke Halaman Baru /brief-detail) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <a 
        v-for="proj in briefs.projects" 
        :key="proj.code"
        :href="`/porto-2.0/brief-detail?id=${proj.code.toLowerCase()}`"
        class="comic-panel p-6 bg-[var(--surface-panel)] hover:bg-[var(--surface-subtle)] border-2 border-[var(--comic-border)] shadow-comic transition-all cursor-pointer group flex flex-col justify-between block no-underline text-inherit"
      >
        <div>
          <!-- Top Row -->
          <div class="flex items-center justify-between mb-4">
            <span class="font-mono text-xl font-black px-3 py-1 rounded-xl bg-[var(--canvas-bg)] text-[var(--brand-coral)] border-2 border-[var(--comic-border)] shadow-[2px_2px_0px_var(--comic-border)]">
              {{ proj.code }}
            </span>
            <span class="text-[11px] font-bold font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--brand-mint)] text-[var(--text-on-brand)] border border-[var(--comic-border)]">
              {{ proj.priority }}
            </span>
          </div>

          <!-- Icon & Title -->
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-[var(--canvas-bg)] border border-[var(--comic-border)] flex items-center justify-center text-[var(--brand-coral)] group-hover:scale-110 transition-transform shrink-0">
              <component :is="iconComponentFor(proj.icon)" class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-base sm:text-lg font-black text-[var(--ink-primary)] group-hover:text-[var(--brand-coral)] transition-colors leading-snug">
                {{ proj.title }}
              </h3>
            </div>
          </div>

          <p class="text-xs font-mono text-[var(--ink-muted)] mb-3">
            {{ proj.tagline }}
          </p>

          <p class="text-xs text-[var(--ink-muted)] leading-relaxed mb-6 line-clamp-3">
            {{ proj.background.problem }}
          </p>
        </div>

        <div>
          <!-- Quick Meta Pill -->
          <div class="grid grid-cols-2 gap-2 border-t border-[var(--comic-border)]/20 pt-4 mb-4 text-[11px] font-mono">
            <div>
              <span class="text-[var(--ink-muted)] block">Effort:</span>
              <span class="font-bold text-[var(--ink-primary)]">{{ proj.effort }}</span>
            </div>
            <div>
              <span class="text-[var(--ink-muted)] block">Impact:</span>
              <span class="font-bold text-[var(--brand-coral)]">{{ proj.strategicValue }}</span>
            </div>
          </div>

          <!-- Open New Page Button -->
          <div class="w-full py-2.5 px-4 rounded-xl bg-[var(--canvas-bg)] group-hover:bg-[var(--brand-coral)] group-hover:text-white border-2 border-[var(--comic-border)] text-[var(--ink-primary)] text-xs font-black font-mono flex items-center justify-between transition-all shadow-[1.5px_1.5px_0px_var(--comic-border)]">
            <span>Buka Halaman Spesifikasi</span>
            <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </a>
    </div>

  </section>
</template>
