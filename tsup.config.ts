import { defineConfig } from 'tsup'

export default defineConfig ({
    //arquivos para converter de ts para js
    entry: [
        './src/**/*.ts',
    ],
    //formato da build
    format: 'esm',
    outDir: 'dist',
    //deleta o dist antes de criar de novo
    clean: true,
})