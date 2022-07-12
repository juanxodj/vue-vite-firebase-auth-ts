import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import { defineConfig } from 'vite'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from "unplugin-vue-components/vite"
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
      ],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true,
    }),
    vueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve(__dirname, 'src/locales/**')],
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
      dts: 'src/components.d.ts',
    }),
  ]
})
