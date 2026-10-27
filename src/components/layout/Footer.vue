<script setup>
import { ArrowUp } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true },
  currentYear: { type: Number, required: true }
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="border-t-2 border-[var(--comic-border)] bg-[var(--surface-panel)] py-6 px-6 md:px-12 relative z-10" role="contentinfo">
    <div class="max-w-[1220px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm font-bold text-[var(--ink-muted)]">
      
      <!-- Brand & Tagline -->
      <div class="flex items-center gap-2 text-center sm:text-left">
        <span class="font-black text-base text-[var(--ink-primary)] tracking-tight">
          ANNISA MAULANA SABILLA<span class="text-[var(--brand-coral)] font-black">;</span>
        </span>
        <span class="text-[var(--comic-border)]">•</span>
        <span class="text-[var(--ink-muted)] font-medium">Information Systems &amp; HRIS</span>
      </div>

      <!-- Center: Button Kembali ke Atas -->
      <div class="flex items-center justify-center">
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 bg-[var(--surface-subtle)] hover:bg-[var(--brand-coral)] hover:text-white text-[var(--ink-primary)] border border-[var(--comic-border)] rounded-xl shadow-[1.5px_1.5px_0px_var(--comic-border)] transition-all font-mono text-xs font-bold cursor-pointer"
          @click="scrollToTop"
          aria-label="Scroll back to top"
        >
          <ArrowUp class="w-3.5 h-3.5" />
          <span>Kembali ke Atas</span>
        </button>
      </div>

      <!-- Right: Copyright -->
      <div class="flex items-center text-center sm:text-right">
        <div class="font-mono text-xs">
          <span>© {{ currentYear }} <strong class="text-[var(--ink-primary)]">Annisa Maulana Sabilla</strong></span>
        </div>
      </div>

    </div>
  </footer>
</template>
