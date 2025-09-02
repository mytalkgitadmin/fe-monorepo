module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
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
          { target: './src/app', from: './src/app' },

          // views는 widgets, features, entities, shared만 접근 가능
          { target: './src/views', from: './src/app' },

          // widgets는 features, entities, shared만 접근 가능
          { target: './src/widgets', from: './src/app' },
          { target: './src/widgets', from: './src/views' },

          // features는 entities, shared만 접근 가능
          { target: './src/features', from: './src/app' },
          { target: './src/features', from: './src/views' },
          { target: './src/features', from: './src/widgets' },

          // entities는 shared만 접근 가능
          { target: './src/entities', from: './src/app' },
          { target: './src/entities', from: './src/views' },
          { target: './src/entities', from: './src/widgets' },
          { target: './src/entities', from: './src/features' },

          // shared는 외부 접근 불가
          { target: './src/shared', from: './src/app' },
          { target: './src/shared', from: './src/views' },
          { target: './src/shared', from: './src/widgets' },
          { target: './src/shared', from: './src/features' },
          { target: './src/shared', from: './src/entities' },
        ],
      },
    ],

    // 슬라이스 내부 파일 직접 접근 금지
    'import/no-internal-modules': [
      'error',
      {
        allow: [
          // shared는 컴포넌트 그룹별 접근 허용
          '**/shared/ui/*',
          '**/shared/lib/*',
          '**/shared/api/*',
          // 상대경로는 허용 (슬라이스 내부)
          './*',
          '../*',
        ],
      },
    ],

    // 순환 참조 및 Import 관련
    'import/no-cycle': 'error', // 순환 참조 금지
    'import/no-self-import': 'error', // 자기 자신 import 금지
    'import/no-duplicates': 'error', // 중복 import 금지
    'import/no-unresolved': 'error', // 존재하지 않는 모듈 import 금지

    // Import 순서 (기본 규칙)
    'import/order': [
      'warn',
      {
        groups: [
          'builtin', // Node.js 내장
          'external', // npm 패키지
          'internal', // @/* 절대경로
          'parent', // ../
          'sibling', // ./
          'index', // ./index
        ],
        'newlines-between': 'always',
      },
    ],

    // === TypeScript 규칙 ===

    // 사용하지 않는 변수 금지
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    // 공개 API 명시적 반환 타입 (FSD 컨벤션)
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],

    // any 타입 경고
    '@typescript-eslint/no-explicit-any': 'warn',

    // 네이밍 컨벤션 (FSD 준수)
    '@typescript-eslint/naming-convention': [
      'error',
      // 컴포넌트: PascalCase
      {
        selector: 'function',
        filter: { regex: '^[A-Z]', match: true },
        format: ['PascalCase'],
      },
      // 훅: useXxx
      {
        selector: 'function',
        filter: { regex: '^use[A-Z]', match: true },
        format: ['camelCase'],
      },
      // 상수: UPPER_SNAKE_CASE
      {
        selector: 'variable',
        modifiers: ['const', 'global'],
        format: ['UPPER_SNAKE_CASE', 'camelCase'],
      },
      // 타입/인터페이스: PascalCase
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],

    // === React 규칙 ===

    // React import 불필요 (React 17+)
    'react/react-in-jsx-scope': 'off', // React import 불필요 (React 17+)
    'react/prop-types': 'off', // TypeScript 사용시 불필요
    // Props 구조분해 권장
    'react/destructuring-assignment': ['warn', 'always'],

    // JSX 최적화
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-key': 'error',
    'react/jsx-no-bind': 'warn', // 인라인 함수 금지 (성능)
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never', // 문자열은 중괄호 금지
        children: 'never',
      },
    ],

    // React Hooks 규칙
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // === 코드 품질 규칙 ===

    // 가드절 패턴 권장
    'no-else-return': 'warn',

    // 코드 정리
    'no-console': 'warn', // console.log 경고
    'no-debugger': 'error',

    // 불필요한 코드 제거
    'no-unused-expressions': 'error',
    'no-unreachable': 'error',

    // 일관성
    'prefer-const': 'error', // let 대신 const 권장
    'object-shorthand': 'warn', // { name: name } => { name }
  },

  // 특정 파일/폴더별 규칙 override
  overrides: [
    {
      // 테스트 파일
      files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'no-console': 'off',
      },
    },
    {
      // Storybook 파일
      files: ['**/*.stories.{ts,tsx}'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    {
      // 설정 파일들
      files: ['*.config.{js,ts}', '.eslintrc.js'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'no-console': 'off',
      },
    },
    {
      // FSD entities 레이어 (프리미티브만)
      files: ['src/entities/**/*.{ts,tsx}'],
      rules: {
        'react/jsx-no-bind': 'error', // entities에서 상호작용 로직 완전 금지
        'no-console': 'error', // entities에서 디버깅 코드 금지
      },
    },
    {
      // FSD features 레이어
      files: ['src/features/**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error', // 비즈니스 로직은 타입 명시 필수
      },
    },
  ],
};
