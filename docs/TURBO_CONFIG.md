# 🔧 Turborepo 설정 파일 (`turbo.json`) 상세 설명

> 이 파일은 Turborepo가 어떻게 빌드, 린트, 타입 체크 등을 실행할지 정의하는 설정 파일입니다.

## 📋 주요 설정 항목

### 🔗 `$schema`

```json
"$schema": "https://turborepo.com/schema.json"
```

- **역할**: VS Code에서 자동완성과 검증 기능 제공
- **왜 필요한가**: 타이핑 실수를 줄이고, 사용 가능한 옵션들을 자동완성으로 확인 가능

### 🎨 `ui`

```json
"ui": "tui"
```

- **역할**: 터미널에서 빌드 상황을 예쁜 UI로 표시
- **TUI란**: Text User Interface의 줄임말
- **효과**: 여러 앱을 동시에 빌드할 때 각각의 상황을 시각적으로 확인 가능

## 🛠️ Tasks (작업) 상세 설명

### 📦 `build` - 프로덕션 빌드

```json
"build": {
  "dependsOn": ["^build", "check-types"],
  "inputs": ["$TURBO_DEFAULT$", ".env*", "!README.md", "!**/*.test.*"],
  "outputs": [".next/**", "!.next/cache/**", "dist/**", "build/**"]
}
```

**🔗 dependsOn (의존성)**:

- `"^build"`: 현재 패키지를 빌드하기 전에 의존하는 다른 패키지들의 `build`를 먼저 실행
- `"check-types"`: 빌드 전에 TypeScript 타입 검사를 먼저 실행
- **왜 필요한가**: 공통 패키지(`shared-ui` 등)가 먼저 빌드되어야 앱에서 사용 가능

**📥 inputs (입력 파일)**:

- `"$TURBO_DEFAULT$"`: 기본 파일들 (`src/**`, `package.json` 등)
- `".env*"`: 환경변수 파일들 (`.env`, `.env.local` 등)
- `"!README.md"`: README 파일은 빌드에 영향 안줌 (제외)
- `"!**/*.test.*"`: 테스트 파일들도 빌드에 영향 안줌 (제외)
- **효과**: 이 파일들이 변경되면 캐시를 무효화하고 다시 빌드

**📤 outputs (출력 파일)**:

- `".next/**"`: Next.js 빌드 결과물
- `"!.next/cache/**"`: Next.js 캐시는 제외 (너무 자주 변경됨)
- `"dist/**"`: Vite 빌드 결과물
- `"build/**"`: 기타 빌드 폴더
- **효과**: 이 폴더들이 캐시되어 같은 조건에서 재빌드 시 재사용

### 🏗️ `build:dev` / `build:prod` - 환경별 빌드

```json
"build:dev": {
  "dependsOn": ["^build:dev"],
  "inputs": ["$TURBO_DEFAULT$", ".env*"],
  "outputs": ["dist/**", "build/**"]
}
```

- **용도**: 개발용/프로덕션용 빌드를 구분
- **예시**: FETA, FamilyTown, Admin 앱에서 사용
- **명령어**: `npm run build:dev` 또는 `npm run build:prod`

### 🧹 `lint` - 코드 품질 검사

```json
"lint": {
  "dependsOn": ["^build"],
  "inputs": ["$TURBO_DEFAULT$", ".eslintrc.*", ".eslintignore"]
}
```

- **역할**: ESLint로 코드 스타일과 오류 검사
- **의존성**: 공통 패키지가 먼저 빌드되어야 함 (ESLint 설정을 가져다 쓰기 때문)
- **inputs**: ESLint 설정 파일들도 포함하여 설정이 바뀌면 다시 검사

### 🔍 `check-types` - TypeScript 타입 검사

```json
"check-types": {
  "dependsOn": ["^check-types"],
  "inputs": ["$TURBO_DEFAULT$", "tsconfig.json", "**/*.ts", "**/*.tsx"]
}
```

- **역할**: TypeScript 컴파일러로 타입 오류 검사
- **inputs**: TS 설정 파일과 모든 TS/TSX 파일을 포함

### 🚀 `dev` / `start` - 개발 서버

```json
"dev": {
  "cache": false,
  "persistent": true
}
```

- **cache: false**: 개발 서버는 캐시하면 안됨 (항상 최신 코드 반영)
- **persistent: true**: 지속여부 설정. 계속 실행되는 프로세스 (서버가 계속 켜져있어야 함)

## 💡 실제 사용 예시

### 🎯 특정 앱만 빌드

```bash
turbo build --filter=feta
# → feta 앱과 그것이 의존하는 패키지들만 빌드
```

### 🎯 환경별 빌드

```bash
turbo build:dev --filter=admin
# → admin 앱을 개발 모드로 빌드
```

### 🎯 모든 앱 동시 개발

```bash
turbo dev
# → 모든 앱의 개발 서버를 동시에 실행
```

### 🎯 캐시 무시하고 빌드

```bash
turbo build --force
# → 캐시를 무시하고 모든 앱을 처음부터 다시 빌드
```

## ⚡ 캐싱의 장점

1. **빠른 빌드**: 변경되지 않은 패키지는 캐시된 결과를 재사용
2. **효율성**: 팀원들 간에 빌드 캐시 공유 가능 (원격 캐시 설정 시)
3. **CI/CD 최적화**: GitHub Actions 등에서 빌드 시간 단축

## 🚨 주의사항

- **JSON 형식**: 주석 사용 불가 (이 파일로 대신 설명)
- **의존성 순서**: `dependsOn` 설정을 잘못하면 무한 루프 발생 가능
- **캐시 키**: `inputs`에 포함된 파일들이 변경되면 캐시가 무효화됨
