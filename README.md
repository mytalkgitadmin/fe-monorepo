# 🏗️ Turborepo 모노레포

> **모노레포란?** 여러 개의 프로젝트를 하나의 저장소에서 관리하는 방식입니다.
> 공통 코드를 재사용하고, 의존성을 통합 관리할 수 있어요!

[![Turborepo](https://img.shields.io/badge/Built%20with-Turborepo-blueviolet)](https://turborepo.com)
[![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white)](https://typescriptlang.org)

## 📁 현재 프로젝트 구조

```
monorepo/
├── 📱 apps/                    # 실제 애플리케이션들
│   ├── feta/                  # 🍧 FETA 앱 (React + Vite + PWA)
│   ├── web/                   # 🌐 메인 웹사이트 (Next.js)
│   └── docs/                  # 📚 문서 사이트 (Next.js)
│
├── 📦 packages/               # 공통 패키지들
│   ├── shared-ui/             # 🎨 공통 UI 컴포넌트 (91개 아이콘 포함)
│   ├── shared-config/         # ⚙️  공통 설정 파일 (ESLint, TypeScript)
│   ├── eslint-config/         # 📏 ESLint 설정 모음
│   ├── typescript-config/     # 📝 TypeScript 설정 모음
│   └── ui/                    # 🧩 shadcn/ui 컴포넌트 컬렉션
│
├── 📚 docs/                   # 프로젝트 가이드 문서들
│   ├── MONOREPO_GUIDE.md      # 상세 모노레포 가이드
│   ├── QUICK_START.md         # 빠른 시작 가이드
│   └── TURBO_CONFIG.md        # Turbo 설정 가이드
│
├── 📄 turbo.json              # Turborepo 빌드 설정
├── 📄 package.json            # 루트 패키지 설정
└── 📄 README.md               # 이 파일!
```

## 🚀 개발 시작하기

### 1️⃣ 처음 설정 (한 번만 실행)

```bash
# 모든 앱과 패키지의 의존성 설치
npm install

# 전체 빌드 (캐시 초기화)
npm run build
```

### 2️⃣ 개발 시작

```bash
# 🎯 특정 앱만 개발하고 싶을 때
npm run dev --filter=feta      # FETA만 개발 서버 실행
npm run dev --filter=web       # Web 사이트만 개발 서버 실행
npm run dev --filter=docs      # Docs 사이트만 개발 서버 실행

# 🎯 모든 앱 동시 개발 (주의: 리소스 많이 사용)
npm run dev
```

### 3️⃣ 패키지 사용하기

```typescript
// 🎨 공통 아이콘 사용 (91개 아이콘 사용 가능)
import { Icon } from '@repo/shared-ui';
<Icon name="home" size={24} color="blue" />

// 🧩 shadcn/ui 컴포넌트 사용
import { Button } from '@repo/ui';
<Button variant="primary">클릭하세요</Button>
```

## 🧰 자주 사용하는 명령어

### 빌드 (배포용 파일 생성)

```bash
npm run build                  # 모든 앱 빌드
npm run build --filter=feta    # FETA만 빌드
npm run build --filter=web     # Web 사이트만 빌드
```

### 코드 검사

```bash
npm run lint                   # 코드 스타일 검사
npm run check-types           # TypeScript 타입 오류 검사
npm run format                # 코드 자동 정렬
```

### 패키지 관리

```bash
# 특정 패키지만 빌드
npm run build --filter=@repo/shared-ui

# 패키지 의존성 확인
npm run build --filter=feta...   # feta와 의존하는 모든 패키지 빌드
```

## 📦 현재 사용 가능한 패키지들

### `@repo/shared-ui`

- **91개의 체계적으로 정리된 아이콘**
- TypeScript 타입 안전성 보장
- 메모화된 React 컴포넌트

```typescript
import { Icon, IconName } from '@repo/shared-ui';

// 사용 가능한 카테고리: navigation, user, media, communication,
// system, action, content, status, social, weather, custom
<Icon name="home" size={24} color="#333" />
```

### `@repo/shared-config`

- ESLint, TypeScript, Prettier 공통 설정
- 모든 앱에서 일관된 코드 스타일 유지

### `@repo/ui`

- shadcn/ui 기반 컴포넌트들
- 재사용 가능한 UI 컴포넌트 라이브러리

## ⚠️ 개발 시 주의사항

### ✅ 좋은 예시

```typescript
// 공통 아이콘 컴포넌트 사용
import { Icon } from "@repo/shared-ui";
import { Button } from "@repo/ui";

// TypeScript 타입 안전성 보장
const iconName: IconName = "home"; // ✅ 타입 체크됨!

// 이렇게 하면 모든 앱에서 동일한 디자인과 기능을 사용할 수 있어요!
function MyComponent() {
  return (
    <Button variant="primary">
      <Icon name="home" size={20} />
      홈으로 가기
    </Button>
  );
}
```

### ❌ 피해야 할 예시

```typescript
// 각 앱마다 똑같은 컴포넌트 중복 작성 ❌
// apps/feta/src/Button.tsx      ← 중복!
// apps/web/src/Button.tsx       ← 중복!

// 잘못된 아이콘 이름 사용 ❌
<Icon name="wrong-icon" />  // 타입 오류 발생!

// 하드코딩된 스타일 ❌
<div style={{ color: '#ff0000' }}>  // 디자인 시스템 무시
```

## 📚 학습 자료

프로젝트를 더 잘 이해하려면 이 문서들을 읽어보세요:

- **[📖 MONOREPO_GUIDE.md](./docs/MONOREPO_GUIDE.md)** - 모노레포 시스템 상세 가이드
- **[� QUICK_START.md](./docs/QUICK_START.md)** - 빠른 시작 가이드
- **[⚡ TURBO_CONFIG.md](./docs/TURBO_CONFIG.md)** - Turborepo 설정 가이드

## 🎨 커밋 메시지 규칙

현재 프로젝트에서 사용 중인 **Conventional Commits** 스타일입니다:

```bash
# 한글로 작성하는 컨벤션 (현재 적용 중)
git commit -m "✨ Feat(feta): 로그인 페이지 추가"
git commit -m "🐛 Fix(shared-ui): Button 컴포넌트 스타일 수정"
git commit -m "📦 Chore(root): 패키지 의존성 업데이트"
git commit -m "♻️ Refactor(packages): shared-ui 컴포넌트 구조 개선"
git commit -m "📝 Docs(root): README 및 가이드 문서 업데이트"
```

**타입 + 이모지 조합:**

- `✨ Feat`: 새로운 기능 추가
- `🐛 Fix`: 버그 수정
- `📦 Chore`: 설정, 빌드 관련 수정
- `♻️ Refactor`: 코드 개선 (기능 변경 없음)
- `📝 Docs`: 문서 수정
- `🚀 Setting`: 초기 설정

**범위 (Scope) 예시:**

- `(feta)`, `(web)`, `(docs)` - 특정 앱
- `(packages)`, `(shared-ui)` - 패키지
- `(root)` - 루트 레벨 변경사항

---

## 🤝 도움이 필요할 때

1. **빌드 오류가 날 때**: `npm run build --filter=앱이름` 으로 특정 앱만 확인
2. **의존성 설치 문제**: `npm install` 을 루트에서 다시 실행
3. **캐시 문제**: `npm run build --force` 로 캐시 무시하고 빌드
4. **타입 오류**: `npm run check-types` 로 TypeScript 오류 확인

> **� 팁**: 문제가 생기면 먼저 [docs/](./docs/) 폴더의 가이드 문서들을 확인해보세요!

## 🔧 고급 사용법

### 🎯 필터 기능 활용

```bash
# 특정 앱과 의존하는 패키지들 모두 빌드
npm run build --filter=feta...

# 특정 패키지만 빌드
npm run build --filter=@repo/shared-ui

# 여러 앱 동시 실행
npm run dev --filter=feta --filter=web
```

### ⚡ 캐시 시스템

Turborepo의 **스마트 캐싱** 덕분에 변경된 부분만 다시 빌드합니다:

```bash
npm run build              # 첫 빌드: 느림 ⏳
npm run build              # 재빌드: 빠름 ⚡ (캐시 사용)
npm run build --force      # 강제 빌드 (캐시 무시)
```

## 📚 유용한 링크

- **[Turborepo 공식 문서](https://turborepo.com)**
- **[Turborepo 필터링](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)**
- **[모노레포 Best Practices](https://turborepo.com/docs/handbook)**

---

**🎯 이 프로젝트는 Turborepo 2.5.6 기반으로 구축되었습니다.**
