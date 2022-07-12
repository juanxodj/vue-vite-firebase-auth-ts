import { createI18n } from "vue-i18n"
import es from "@/locales/es.json"
import en from "@/locales/en.json"

const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_APP_I18N_LOCALE || "en",
  messages: { es, en }
})

export default i18n
