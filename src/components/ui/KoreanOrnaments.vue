<script setup>
defineProps({
  themePref: { type: String, required: true }
})
</script>

<template>
  <!-- Korean Ornaments for Matcha ('rose') and Soft Pastel ('soft') -->
  <div
    v-if="themePref === 'rose' || themePref === 'soft'"
    class="korean-ornaments-root pointer-events-none select-none z-20"
    aria-hidden="true"
  >
    <!-- 1. Top-Right Floating Korean Decal Sticker (Aesthetic Webtoon Pill) -->
    <div class="fixed top-24 right-4 sm:right-8 z-30 transition-transform hover:scale-105 duration-300">
      <div class="flex items-center gap-2 bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] px-3.5 py-1.5 rounded-full shadow-comic">
        <span class="w-2.5 h-2.5 rounded-full bg-[var(--brand-mint)] border border-[var(--comic-border)] animate-pulse"></span>
        <span class="font-bold text-xs text-[var(--ink-primary)] font-sans tracking-wide">
          {{ themePref === 'rose' ? '말차 • Matcha Mood' : '소프트 • Soft Mood' }}
        </span>
        <span class="text-[10px] bg-[var(--brand-coral)] text-white font-mono px-1.5 py-0.5 rounded border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]">KR</span>
      </div>
    </div>

    <!-- 2. Korean Plum Blossom (Maehwa 5-Petals Floral) on Left Bottom -->
    <div class="fixed bottom-24 left-4 sm:left-8 z-30">
      <div class="relative w-14 h-14 flex items-center justify-center p-1 bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] rounded-2xl shadow-comic">
        <svg viewBox="0 0 100 100" class="w-full h-full text-[var(--brand-pink)] animate-spin-very-slow fill-current">
          <circle cx="50" cy="24" r="19" fill="var(--brand-pink)" stroke="var(--comic-border)" stroke-width="2.5" />
          <circle cx="75" cy="42" r="19" fill="var(--brand-pink)" stroke="var(--comic-border)" stroke-width="2.5" />
          <circle cx="65" cy="73" r="19" fill="var(--brand-pink)" stroke="var(--comic-border)" stroke-width="2.5" />
          <circle cx="35" cy="73" r="19" fill="var(--brand-pink)" stroke="var(--comic-border)" stroke-width="2.5" />
          <circle cx="25" cy="42" r="19" fill="var(--brand-pink)" stroke="var(--comic-border)" stroke-width="2.5" />
          <circle cx="50" cy="50" r="13" fill="var(--brand-butter)" stroke="var(--comic-border)" stroke-width="3" />
        </svg>
      </div>
    </div>

    <!-- 3. Korean Traditional Cloud (Gureum) Floating Ambient Decor (Mid Right) -->
    <div class="fixed top-1/2 right-4 -translate-y-1/2 z-20 hidden md:block">
      <div class="bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] rounded-2xl p-2.5 shadow-comic flex items-center gap-2">
        <svg width="44" height="28" viewBox="0 0 68 42" fill="none" class="text-[var(--brand-mint)]">
          <path
            d="M16 34C10.4772 34 6 29.5228 6 24C6 19.3431 9.18247 15.4312 13.5 14.3033C14.7176 8.35821 19.9861 4 26.25 4C32.062 4 37.0182 7.76569 38.6471 13.067C40.0901 12.383 41.7246 12 43.4444 12C49.2741 12 54 16.701 54 22.5C54 23.0159 53.963 23.5232 53.8916 24.0192C57.4042 24.8967 60 28.0583 60 31.8182C60 36.3368 56.3262 40 51.7931 40H16C12.6863 40 10 37.3137 10 34"
            stroke="var(--comic-border)"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="var(--surface-subtle)"
          />
        </svg>
        <span class="font-mono text-[11px] font-black text-[var(--ink-primary)]">구름;</span>
      </div>
    </div>

    <!-- 4. Korean Dojang (Traditional Red Seal Stamp) on Bottom Right -->
    <div class="fixed bottom-6 right-6 z-30">
      <div class="w-11 h-11 border-2 border-[var(--brand-coral)] rounded-xl flex flex-col items-center justify-center bg-[var(--surface-panel)] text-[var(--brand-coral)] shadow-comic">
        <span class="font-black text-[13px] leading-tight">안사</span>
        <span class="font-mono text-[7px] font-bold uppercase tracking-wider text-[var(--ink-primary)]">SEAL</span>
      </div>
    </div>

    <!-- 5. Korean Lattice (Changhoji) Corner Ornament (Top Left) -->
    <div class="fixed top-20 left-4 z-20 hidden lg:block">
      <div class="w-10 h-10 border-t-2 border-l-2 border-[var(--brand-mint)] relative">
        <div class="absolute top-1.5 left-1.5 w-5 h-5 border-t border-l border-[var(--brand-pink)]"></div>
        <div class="absolute top-3.5 left-3.5 w-2 h-2 rounded-full bg-[var(--brand-coral)]"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spinVerySlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-very-slow {
  animation: spinVerySlow 35s linear infinite;
}
</style>
