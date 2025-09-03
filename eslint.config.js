import js from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 기본 무시 패턴
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/dev-dist/**',
      '**/.turbo/**',
    ],
  },

  // 기본 JavaScript/TypeScript 규칙
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        // 모노레포 환경에서 TypeScript 파서 설정 - 프로젝트별로 개별 처리
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      import: pluginImport,
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: [
            './apps/*/tsconfig.json',
            './packages/*/tsconfig.json',
          ],
          noWarnOnMultipleProjects: true,
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },

    rules: {
      // === FSD 아키텍처 규칙 ===

      // Import 경로 규칙 (FSD 의존성 방향 준수)
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // app 레이어는 모든 하위 레이어 접근 가능
            { target: './apps/*/src/app', from: './apps/*/src/app' },

            // pages는 widgets, features, entities, shared만 접근 가능
            { target: './apps/*/src/pages', from: './apps/*/src/app' },

            // widgets는 features, entities, shared만 접근 가능
            { target: './apps/*/src/widgets', from: './apps/*/src/app' },
            { target: './apps/*/src/widgets', from: './apps/*/src/pages' },

            // features는 entities, shared만 접근 가능
            { target: './apps/*/src/features', from: './apps/*/src/app' },
            { target: './apps/*/src/features', from: './apps/*/src/pages' },
            { target: './apps/*/src/features', from: './apps/*/src/widgets' },

            // entities는 shared만 접근 가능
            { target: './apps/*/src/entities', from: './apps/*/src/app' },
            { target: './apps/*/src/entities', from: './apps/*/src/pages' },
            { target: './apps/*/src/entities', from: './apps/*/src/widgets' },
            { target: './apps/*/src/entities', from: './apps/*/src/features' },
          ],
        },
      ],

      // 슬라이스 내부 파일 직접 접근 금지 (Public API 강제)
      'import/no-internal-modules': [
        'error',
        {
          allow: [
            // shared는 컴포넌트 그룹별 접근 허용
            '**/shared/ui/*',
            '**/shared/lib/*',
            '**/shared/api/*',
            '**/shared/config/*',
            // 상대경로는 허용 (슬라이스 내부)
            './*',
            '../*',
            // 패키지는 허용
            '@repo/*',
            // 외부 라이브러리는 허용 (firebase, react 등)
            'firebase/*',
            'react/*',
            '@tanstack/*',
            '@radix-ui/*',
            'lucide-react/*',
          ],
        },
      ],

      // 순환 참조 및 Import 관련
      'import/no-cycle': 'error',
      'import/no-self-import': 'error',
      'import/no-duplicates': 'error',

      // === TypeScript 규칙 ===
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // 공개 API 명시적 반환 타입
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],

      // === React 규칙 ===
      'react/react-in-jsx-scope': 'off', // React 17+
      'react/prop-types': 'off', // TypeScript 사용시 불필요
      'react/destructuring-assignment': ['warn', 'always'],
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-key': 'error',

      // React Hooks 규칙
      ...pluginReactHooks.configs.recommended.rules,

      // === 코드 품질 규칙 ===
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-else-return': 'warn',
      'object-shorthand': 'warn',
    },
  },

  // FSD entities 레이어 특화 규칙
  {
    files: ['apps/*/src/entities/**/*.{ts,tsx}'],
    rules: {
      'no-console': 'error', // entities에서 디버깅 금지
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },

  // FSD features 레이어 특화 규칙
  {
    files: ['apps/*/src/features/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error', // 비즈니스 로직 타입 필수
    },
  }
);
