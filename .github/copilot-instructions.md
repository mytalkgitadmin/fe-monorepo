# GitHub Copilot Instructions

## FSD 아키텍처 핵심

### 레이어 구조

```
shared → entities → features → widgets → views → app
```

### 네이밍

- 파일/폴더: `kebab-case`
- 컴포넌트: `PascalCase/index.tsx`
- 훅: `useXxx`
- 타입: `PascalCase`

### Import 패턴

- **외부**: `@/features/friend-list` (Public API만)
- **내부**: `./ui/Component` (상대경로)
- **shared/ui**: `@/shared/ui/button` (그룹별)

### 핵심 규칙

- Public API: 슬라이스 루트 `index.ts`만
- `export *` 금지
- 세그먼트 중첩 index 금지
- 순환 참조 방지

### 코드 스타일

- 가드절 패턴 선호
- Props 구조분해
- `prefer-const`
- 명시적 반환 타입 (공개 API)
