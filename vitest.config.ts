/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: [
            'vitest-localstorage-mock',
            'src/__tests__/setupTest.ts',
        ],
        server: {
            deps: {
                inline: ['@mui/x-data-grid'],
            },
        },
        coverage: {
            provider: 'v8',
        },
    },
})