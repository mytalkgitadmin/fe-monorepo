import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import * as path from 'path';

import tailwindcss from '@tailwindcss/vite';
import compression from 'vite-plugin-compression';

export default defineConfig({
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, './src'),
      '@/assets': path.resolve(__dirname, './src/assets'),

      // app
      '@/app': path.resolve(__dirname, './src/app'),
      '@/styles': path.resolve(__dirname, './src/app/styles'),
      '@/components': path.resolve(__dirname, './src/components'),
      // processes

      '@/routes': path.resolve(__dirname, './src/routes'),

      // pages
      '@/pages': path.resolve(__dirname, './src/pages'),

      // widgets
      '@/widgets': path.resolve(__dirname, './src/widgets'),

      // features
      '@/features': path.resolve(__dirname, './src/features'),

      // entities
      '@/entities': path.resolve(__dirname, './src/entities'),

      //lib
      '@/lib': path.resolve(__dirname, './src/lib'),

      // shared
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/constants': path.resolve(__dirname, './src/shared/constants'),
      '@/hooks': path.resolve(__dirname, './src/shared/hooks'),
    },
  },
  plugins: [
    tailwindcss(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    VitePWA({
      manifest: false,
      devOptions: {
        enabled: true, // 개발 모드에서도 PWA 활성화
      },
      // 서비스 워커 등록 방식 (prompt: 사용자에게 물어봄, autoUpdate: 자동 업데이트)
      registerType: 'autoUpdate',
      // 캐싱할 정적 자산 지정
      includeAssets: [
        'robots.txt',
        'favicon.ico',
        'apple-touch-icon.png',
        'manifest.json',
      ],
      workbox: {
        // 로깅 비활성화
        clientsClaim: true,
        skipWaiting: true,
        disableDevLogs: true, // 개발 로그 비활성화 (가장 중요)
        // 캐싱할 파일 패턴을 지정
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        globIgnores: ['**/firebase-messaging-sw.js'],
        // 특정 요청(api)을 서비스 워커가 처리하지 않도록 제외
        navigateFallbackDenylist: [/^\/api/, /\.[json|xml|csv|txt|md]$/],

        // 캐싱 전략 설정
        runtimeCaching: [
          {
            // 구글 폰트 캐싱:
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              // 만료 설정
              expiration: {
                maxEntries: 10, // 최대 파일 수 10개 제한
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1년
              },
              cacheableResponse: {
                statuses: [0, 200],
                /*
                  응답 상태 코드가 0 또는 200 인 요청만 캐시
                  200: 요청이 성공했음을 의미하는 표준 HTTP 상태 코드
                  0: 오프라인 상태에서 발생하는 상태 코드 또는 CORS 요청에 사용될 수 있음
                */
              },
            },
          },
          {
            // HTML 캐싱: 자주 변경 될 수 있음. - 네트워크 먼저 확인
            urlPattern: /\/index\.html$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              // Vary 헤더를 무시하도록 설정
              matchOptions: {
                ignoreVary: true, // Vary 헤더를 무시하고 URL만으로 캐시를 매칭(모바일과 데스크톱 브라우저에서 동일한 캐시 응답을 사용)
                /*
                  'Vary' 헤더는 서버가 응답을 캐시할 때 고려해야 할 추가 헤더를 지정
                  예: Vary: User-Agent는 각 다른 브라우저에 대해 별도로 응답을 캐시해야 함을 의미

                  불필요한 중복 캐싱 방지
                */
              },
            },
          },
          {
            // 정적 자산: JS, CSS, 이미지 등은 빠른 로딩을 위해 캐시를 먼저 확인
            urlPattern: /\.(?:js|css|json|png|jpg|jpeg|svg|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-assets',
              // 만료설정
              expiration: {
                maxEntries: 100, // 최대 파일 수 100개 제한
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30일 동안 캐시
              },
            },
          },
        ],
      },
    }),
    compression({
      algorithm: 'gzip',
      threshold: 1024, // 1KB 이상 파일만 압축
      deleteOriginFile: false, // 원본 파일 유지
      compressionOptions: {
        level: 9, // 최고 압축 레벨
      },
    }),

    // Brotli 압축 (더 높은 압축률)
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
      compressionOptions: {
        level: 11, // Brotli 최고 압축 레벨
        chunkSize: 32 * 1024, // 32KB 청크
      },
    }),
  ],
  css: {
    postcss: './postcss.config.js',
    modules: {
      localsConvention: 'camelCase',
    },
  },
  server: {
    host: true,
    port: 3002,
  },
  build: {
    target: 'es2015', // 타겟 브라우저 설정으로 폴리필 최소화
    sourcemap: false, // 소스맵 제거로 번들 크기 감소
    chunkSizeWarningLimit: 500, // 경고 임계값 조정(모바일 고려 - 500)
    minify: 'terser', // 압축 설정(가장 강력한 압축)
    terserOptions: {
      compress: {
        drop_console: true, // console.log 제거
        drop_debugger: true, // debugger 제거
        unused: true, // 사용하지 않는 변수/함수 제거
        dead_code: true, // 도달하지 않는 코드 제거
      },
    },
    // 프로젝트 완료후 전/후 비교
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',

        manualChunks: {
          react: ['react', 'react-dom'],
          tanstack: [
            '@tanstack/react-query',
            '@tanstack/react-router',
            '@tanstack/react-router-devtools',
          ],

          // 채팅 기능
          sendbird: ['@sendbird/uikit-react', '@sendbird/chat'],

          'pwa-core': ['zustand', 'axios'],
          // 'vendor-firebase': ['firebase/app', 'firebase/messaging'],

          ui: [
            '@iconify/react',
            'lucide-react',
            '@radix-ui/react-dialog',
            '@radix-ui/react-slot',
            'class-variance-authority',
            'sonner',
          ],
          utils: ['crypto-js', 'dayjs', 'qs', 'clsx', 'tailwind-merge'],
        },
      },
    },
  },
});
