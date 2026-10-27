<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { Mail, Github, Linkedin, Copy, Check, Clock, Video, ArrowUpRight, Send, MessageCircle } from 'lucide-vue-next'

const props = defineProps({
  c: { type: Object, required: true },
  profile: { type: Object, required: true }
})

const formState = ref({ name: '', email: '', message: '' })
const formStatus = ref(null) // 'sending' | 'success' | 'error'
const emailCopied = ref(false)
const currentTimeJakarta = ref('')

let clockTimer = null

const updateJakartaTime = () => {
  try {
    const now = new Date()
    currentTimeJakarta.value = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(now)
  } catch (_) {
    currentTimeJakarta.value = 'UTC+7'
  }
}

const copyEmailToClipboard = async () => {
  try {
    const targetEmail = props.profile?.contactActions?.emailValue || 'annisa.m.sabilla@gmail.com'; await navigator.clipboard.writeText(targetEmail)
    emailCopied.value = true
    setTimeout(() => {
      emailCopied.value = false
    }, 2500)
  } catch (_) {}
}

const handleFormSubmit = () => {
  if (!formState.value.name || !formState.value.email || !formState.value.message) {
    formStatus.value = 'error'
    return
  }

  formStatus.value = 'sending'

  const targetEmail = props.profile?.contactActions?.emailValue || 'annisa.m.sabilla@gmail.com'
  const subjectText = `Inquiry / Diskusi Projek dari ${formState.value.name.trim()}`
  const bodyText = `Halo,\n\nNama: ${formState.value.name.trim()}\nEmail: ${formState.value.email.trim()}\n\nPesan / Kebutuhan Projek:\n${formState.value.message.trim()}\n\n---\nDikirim dari Formulir Portfolio`

  const subject = encodeURIComponent(subjectText)
  const body = encodeURIComponent(bodyText)

  // 1. URL Mailto resmi
  const mailtoUri = `mailto:${targetEmail}?subject=${subject}&body=${body}`

  // 2. URL Webmail Gmail Compose (fallback jika browser tidak memiliki local mail client terkonfigurasi)
  const gmailComposeUri = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${subject}&body=${body}`

  // Eksekusi mailto via window.location.href (standar pembuka protocol handler di browser tanpa trigger blocker)
  try {
    const popup = window.open(gmailComposeUri, '_blank')
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      // Jika pop-up webmail dicegah browser, arahkan ke native mailto client
      window.location.href = mailtoUri
    }
  } catch (_) {
    window.location.href = mailtoUri
  }

  formStatus.value = 'success'
  formState.value = { name: '', email: '', message: '' }
  setTimeout(() => { formStatus.value = null }, 5000)
}

onMounted(() => {
  updateJakartaTime()
  clockTimer = setInterval(updateJakartaTime, 1000)
})

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer)
})
</script>

<template>
  <section id="contact" class="section-container" aria-labelledby="contact-heading">
    <div class="mb-10">
      <span class="comic-chapter-badge bg-[var(--brand-coral)] text-white mb-4">
        <MessageCircle class="w-3.5 h-3.5" />
        {{ c.contactMeta }}
      </span>
      <h2 id="contact-heading" class="display-section">{{ c.contactTitle }}</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      <!-- Left Column: Friendly Pitch & Channels -->
      <div class="lg:col-span-6 flex flex-col gap-6">
        
        <div class="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink-primary)] tracking-tight leading-tight">
          <span>{{ c.contactHeading1 || 'Mari Mulai Diskusi' }}</span><br />
          <span class="text-[var(--brand-coral)]">{{ c.contactHeading2 || 'Untuk Proyek Anda;' }}</span>
        </div>

        <p class="text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed max-w-lg">
          {{ c.contactBody }}
        </p>
        
        <!-- Live Jakarta Timezone Capsule Widget -->
        <div class="comic-panel p-4 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] flex items-center justify-between max-w-md shadow-comic">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-[var(--surface-subtle)] border border-[var(--comic-border)] flex items-center justify-center text-[var(--brand-coral)] shrink-0">
              <Clock class="w-4 h-4" />
            </div>
            <div class="flex flex-col">
              <span class="text-xs font-bold text-[var(--ink-muted)]">
                {{ c.contactLocation || 'Jakarta, Indonesia (WIB / UTC+7)' }}
              </span>
              <span class="font-mono text-sm font-bold text-[var(--ink-primary)]">
                {{ currentTimeJakarta }} WIB
              </span>
            </div>
          </div>
          <span class="font-mono text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 px-2 py-0.5 rounded-full">
            Online
          </span>
        </div>

        <!-- Direct Contact Links -->
        <div class="flex flex-col gap-3 max-w-md">
          <!-- Copy Email Action -->
          <div class="comic-panel p-3 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] flex items-center justify-between">
            <a :href="`mailto:${profile.contactActions.emailValue}`" class="flex items-center gap-3 text-[var(--ink-primary)] hover:text-[var(--brand-coral)] font-bold text-sm transition-colors truncate">
              <div class="w-8 h-8 rounded-lg bg-[var(--surface-subtle)] border border-[var(--comic-border)] flex items-center justify-center shrink-0">
                <Mail class="w-4 h-4 text-[var(--brand-coral)]" />
              </div>
              <span class="truncate">{{ profile.contactActions.emailValue }}</span>
            </a>
            <button
              type="button"
              class="p-2 rounded-lg text-[var(--ink-primary)] hover:bg-[var(--surface-subtle)] border border-[var(--comic-border)] transition-colors text-xs font-mono font-bold flex items-center gap-1.5 shrink-0 ml-2"
              @click="copyEmailToClipboard"
              :aria-label="c.contactCopyEmailAction || 'Copy Email'"
            >
              <Check v-if="emailCopied" class="w-3.5 h-3.5 text-emerald-600" />
              <Copy v-else class="w-3.5 h-3.5" />
              <span>
                {{ emailCopied ? (c.contactEmailCopied || 'Copied!') : (c.contactCopyEmailAction || 'Copy') }}
              </span>
            </button>
          </div>

          <!-- Google Meet / Video Call -->
          <a
            :href="profile.contactActions.meetingUrl || 'https://calendar.app.google/yND5q1Mz91fp9CP8A'"
            target="_blank"
            rel="noreferrer"
            class="comic-panel p-3 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] hover:border-[var(--brand-coral)] flex items-center justify-between transition-all"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-[var(--surface-subtle)] border border-[var(--comic-border)] flex items-center justify-center shrink-0 text-emerald-600">
                <Video class="w-4 h-4" />
              </div>
              <div class="flex flex-col">
                <span class="font-bold text-sm text-[var(--ink-primary)]">{{ profile.contactActions.meetingLabel || 'Jadwalkan Panggilan (Google Meet)' }}</span>
                <span class="text-xs text-[var(--ink-muted)]">{{ c.contactMeetingSub || '30 menit diskusi teknis' }}</span>
              </div>
            </div>
            <ArrowUpRight class="w-4 h-4 text-[var(--ink-muted)] shrink-0" />
          </a>

          <!-- GitHub Profile -->
          <a
            :href="`https://${profile.contactActions.githubValue || 'annisamsabilla.netlify.app'}`"
            target="_blank"
            rel="noreferrer"
            class="comic-panel p-3 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] hover:border-[var(--brand-coral)] flex items-center justify-between transition-all"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-[var(--surface-subtle)] border border-[var(--comic-border)] flex items-center justify-center shrink-0 text-[var(--ink-primary)]">
                <Github class="w-4 h-4" />
              </div>
              <span class="font-bold text-sm text-[var(--ink-primary)]">GitHub Profile (Annisa Maulana)</span>
            </div>
            <ArrowUpRight class="w-4 h-4 text-[var(--ink-muted)] shrink-0" />
          </a>

          <!-- LinkedIn -->
          <a
            href="https://linkedin.com/in/annisamaulanasabilla"
            target="_blank"
            rel="noreferrer"
            class="comic-panel p-3 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] hover:border-[var(--brand-coral)] flex items-center justify-between transition-all"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-[var(--surface-subtle)] border border-[var(--comic-border)] flex items-center justify-center shrink-0 text-sky-600">
                <Linkedin class="w-4 h-4" />
              </div>
              <span class="font-bold text-sm text-[var(--ink-primary)]">LinkedIn Profile (annisamaulanasabilla)</span>
            </div>
            <ArrowUpRight class="w-4 h-4 text-[var(--ink-muted)] shrink-0" />
          </a>
        </div>
      </div>

      <!-- Right Column: Clean Form -->
      <div class="lg:col-span-6 w-full">
        <form class="comic-panel p-6 sm:p-8 bg-[var(--surface-panel)] border-[1.5px] border-[var(--comic-border)] shadow-comic flex flex-col gap-4" @submit.prevent="handleFormSubmit">
          <div class="border-b border-[var(--comic-border)]/20 pb-3 flex items-center justify-between">
            <h3 class="font-black text-sm text-[var(--ink-primary)]">
              {{ c.formTitle || 'Kirim Pesan Langsung' }}
            </h3>
            <span class="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--brand-sun)] text-slate-950 border border-[var(--comic-border)]">
              {{ c.formBadge || 'PESAN' }}
            </span>
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="form-name" class="font-bold text-xs sm:text-sm text-[var(--ink-primary)]">{{ c.formName }}</label>
            <input 
              id="form-name"
              :placeholder="c.formNamePlaceholder || 'Misal: Budi Santoso'" 
              type="text" 
              class="bg-[var(--canvas-bg)] border-[1.5px] border-[var(--comic-border)] focus:border-[var(--brand-coral)] focus:outline-none rounded-xl px-4 py-2.5 text-[var(--ink-primary)] w-full font-medium transition-colors" 
              v-model="formState.name"
              required 
            />
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="form-email" class="font-bold text-xs sm:text-sm text-[var(--ink-primary)]">{{ c.formEmail }}</label>
            <input 
              id="form-email"
              :placeholder="c.formEmailPlaceholder || 'nama@perusahaan.com'" 
              type="email" 
              class="bg-[var(--canvas-bg)] border-[1.5px] border-[var(--comic-border)] focus:border-[var(--brand-coral)] focus:outline-none rounded-xl px-4 py-2.5 text-[var(--ink-primary)] w-full font-medium transition-colors" 
              v-model="formState.email"
              required 
            />
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="form-message" class="font-bold text-xs sm:text-sm text-[var(--ink-primary)]">{{ c.formMessage }}</label>
            <textarea 
              id="form-message"
              :placeholder="c.formMessagePlaceholder || 'Tuliskan pesan, pertanyaan, atau detail proyek Anda...'" 
              rows="4"
              class="bg-[var(--canvas-bg)] border-[1.5px] border-[var(--comic-border)] focus:border-[var(--brand-coral)] focus:outline-none rounded-xl px-4 py-2.5 text-[var(--ink-primary)] w-full font-medium resize-none transition-colors" 
              v-model="formState.message"
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            class="btn-comic-primary w-full py-3.5 text-sm sm:text-base mt-2"
            :disabled="formStatus === 'sending'"
          >
            <Send class="w-4 h-4 mr-1.5" />
            <span>{{ formStatus === 'sending' ? c.formSending : c.formSend }}</span>
          </button>

          <div v-if="formStatus === 'success'" class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500 text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-200 text-center" role="status">
            {{ c.formSuccess }}
          </div>
          <div v-if="formStatus === 'error'" class="p-3 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-500 text-xs sm:text-sm font-bold text-red-900 dark:text-red-200 text-center" role="status">
            {{ c.formError }}
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
