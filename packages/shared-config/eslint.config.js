import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // 🔍 어떤 파일을 검사할지 설정
  { ignores: ['dist', 'node_modules', '*.config.js'] },
  
  {
    // 📁 모든 JS/TS/JSX/TSX 파일 대상
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  
  // 🎯 JavaScript 기본 규칙
  js.configs.recommended,
  
  // 🔷 TypeScript 규칙  
  ...tseslint.configs.recommended,
  
  {
    // ⚛️ React 관련 규칙
    files: ['**/*.{ts,tsx,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // React Hooks 규칙 (매우 중요!)
      ...reactHooks.configs.recommended.rules,
      
      // React Refresh 규칙 (HMR을 위해)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // 🧹 코드 품질 규칙
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { 
          argsIgnorePattern: '^_',  // _로 시작하는 매개변수 무시
          varsIgnorePattern: '^_'   // _로 시작하는 변수 무시
        }
      ],
      
      // 🚀 성능 관련 규칙
      'prefer-const': 'warn',
      'no-var': 'error',
      
      // 📝 코드 스타일 규칙  
      'no-console': 'warn',  // console.log 경고 (production에선 제거해야 함)
      'no-debugger': 'error', // debugger 문 금지
    },
  },
)
