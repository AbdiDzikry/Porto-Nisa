<script setup>
// Korean Ornaments - Only visible and active when theme is 'rose' (Matcha Blush)
</script>

<template>
  <div class="korean-ornaments-root pointer-events-none select-none" aria-hidden="true">
    <!-- Top-Right Floating Korean Cloud & Hangul Decal -->
    <div class="fixed top-24 right-4 sm:right-10 z-0 opacity-40 hover:opacity-80 transition-opacity duration-300">
      <div class="flex flex-col items-center gap-1.5 font-mono text-[11px] font-black tracking-widest text-[var(--brand-mint)] bg-[var(--surface-panel)] border border-[var(--comic-border)] px-2.5 py-2 rounded-2xl shadow-[2px_2px_0px_var(--comic-border)]">
        <span class="text-xs">말차</span>
        <span class="w-1.5 h-1.5 rounded-full bg-[var(--brand-pink)]"></span>
        <span class="text-[9px] uppercase tracking-normal font-sans text-[var(--ink-muted)]">Matcha</span>
      </div>
    </div>

    <!-- Korean Floral / Plum Blossom (Maehwa) Floating Accent Left -->
    <div class="fixed bottom-28 left-4 sm:left-8 z-0 opacity-45">
      <div class="relative w-12 h-12 flex items-center justify-center">
        <!-- SVG 5-Petal Korean Blossom -->
        <svg viewBox="0 0 100 100" class="w-full h-full text-[var(--brand-pink)] drop-shadow-[1px_1px_0px_var(--comic-border)] animate-spin-very-slow fill-current">
          <circle cx="50" cy="28" r="18" fill="currentColor" />
          <circle cx="71" cy="43" r="18" fill="currentColor" />
          <circle cx="63" cy="68" r="18" fill="currentColor" />
          <circle cx="37" cy="68" r="18" fill="currentColor" />
          <circle cx="29" cy="43" r="18" fill="currentColor" />
          <circle cx="50" cy="50" r="11" fill="var(--brand-butter)" stroke="var(--comic-border)" stroke-width="3" />
        </svg>
      </div>
    </div>

    <!-- Korean Traditional Cloud (Gureum) Floating Ambient Decor (Right Mid) -->
    <div class="fixed top-1/2 right-3 sm:right-6 -translate-y-1/2 z-0 opacity-35 hidden md:block">
      <svg width="68" height="42" viewBox="0 0 68 42" fill="none" class="text-[var(--brand-mint)]">
        <path
          d="M16 34C10.4772 34 6 29.5228 6 24C6 19.3431 9.18247 15.4312 13.5 14.3033C14.7176 8.35821 19.9861 4 26.25 4C32.062 4 37.0182 7.76569 38.6471 13.067C40.0901 12.383 41.7246 12 43.4444 12C49.2741 12 54 16.701 54 22.5C54 23.0159 53.963 23.5232 53.8916 24.0192C57.4042 24.8967 60 28.0583 60 31.8182C60 36.3368 56.3262 40 51.7931 40H16C12.6863 40 10 37.3137 10 34"
          stroke="var(--comic-border)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="var(--surface-subtle)"
        />
      </svg>
    </div>

    <!-- Korean Traditional Corner Lattice Knot (Dancheong / Changhoji Grid Pattern Top-Left) -->
    <div class="fixed top-20 left-4 z-0 opacity-25 hidden lg:block">
      <div class="w-14 h-14 border-t-2 border-l-2 border-[var(--brand-mint)] relative">
        <div class="absolute top-1 left-1 w-6 h-6 border-t border-l border-[var(--brand-pink)]"></div>
        <div class="absolute top-3 left-3 w-2 h-2 rounded-full bg-[var(--brand-coral)]"></div>
      </div>
    </div>

    <!-- Korean Stamp Seal (Dojang) Floating Bottom-Right -->
    <div class="fixed bottom-8 right-6 z-0 opacity-40 hover:opacity-90 transition-opacity">
      <div class="w-9 h-9 border-[1.5px] border-[var(--brand-coral)] rounded-lg flex items-center justify-center bg-[var(--surface-panel)] text-[var(--brand-coral)] font-serif font-black text-xs shadow-[1.5px_1.5px_0px_var(--comic-border)]">
        안사
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hidden by default on non-rose themes */
.korean-ornaments-root {
  display: none;
}

/* Enabled strictly when theme is 'rose' (Matcha Blush) */
:global([data-theme="rose"]) .korean-ornaments-root {
  display: block;
}

@keyframes spinVerySlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-very-slow {
  animation: spinVerySlow 45s linear infinite;
}
</style>
