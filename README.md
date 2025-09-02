# 🏗️ 모노레포

> **모노레포란?** 여러 개의 프로젝트를 하나의 저장소에서 관리하는 방식입니다.
> 공통 코드를 재사용하고, 의존성을 통합 관리할 수 있어요!

## 📁 프로젝트 구조

```
monorepo/
├── 📱 apps/                    # 실제 사용자가 접속하는 웹사이트들
│   ├── feta/                  # FETA 앱 (React + Vite)
│   ├── familytown/            # FamilyTown 앱 (React + Vite)
│   ├── town-cs/               # CS 앱 (Next.js)
│   ├── admin/                 # 관리자 앱 (React + Vite)
│   └── ...
│
├── 📦 packages/               # 여러 앱에서 공통으로 사용하는 코드들
│   ├── shared-ui/             # 공통 UI 컴포넌트 (버튼, 모달 등)
│   ├── shared-utils/          # 공통 유틸리티 함수 (API 호출, 날짜 처리 등)
│   ├── shared-config/         # 공통 설정 파일 (ESLint, TypeScript 등)
│   └── shared-types/          # 공통 타입 정의 (사용자 정보, API 응답 등)
│
├── 📄 turbo.json              # Turborepo 빌드 설정 (어떻게 빌드할지 정의)
├── 📄 package.json            # 루트 패키지 설정 (전체 프로젝트 의존성)
└── 📄 README.md               # 이 파일! (프로젝트 설명서)
```

## 🚀 개발 시작하기

### 1️⃣ 처음 설정 (한 번만 실행)

```bash
# 모든 앱과 패키지의 의존성 설치
npm install
```

### 2️⃣ 개발 시작

```bash
# 🎯 특정 앱만 개발하고 싶을 때
turbo dev --filter=feta        # FETA만 개발 서버 실행
turbo dev --filter=town-cs     # CS 앱만 개발 서버 실행

# 🎯 여러 앱 동시 개발
turbo dev --filter=feta --filter=admin

# 🎯 모든 앱 동시 개발 (조심: 리소스 많이 사용)
turbo dev
```

## 🧰 자주 사용하는 명령어

### 빌드 (배포용 파일 생성)

```bash
turbo build                    # 모든 앱 빌드
turbo build --filter=feta      # FETA만 빌드
```

### 코드 검사

```bash
turbo lint                     # 코드 스타일 검사
turbo check-types             # TypeScript 타입 오류 검사
npm run format                # 코드 자동 정렬
```

## ⚠️ 개발 시 주의사항

### ✅ 좋은 예시

```typescript
// 공통 컴포넌트 사용
import { Button } from "@repo/shared-ui";
import { formatDate } from "@repo/shared-utils";

// 이렇게 하면 모든 앱에서 동일한 디자인과 기능을 사용할 수 있어요!
```

### ❌ 피해야 할 예시

```typescript
// 각 앱마다 똑같은 코드 중복 작성
// apps/feta/src/Button.tsx      ← 중복!
// apps/admin/src/Button.tsx     ← 중복!
// 이렇게 하면 수정할 때마다 여러 파일을 고쳐야 해요 😱
```

## 🎨 커밋 메시지 규칙

```bash
# [타입(앱/패키지명)]: 변경 내용
git commit -m "feat(feta): 로그인 페이지 추가"
git commit -m "fix(shared-ui): Button 컴포넌트 스타일 수정"
git commit -m "chore(root): 패키지 의존성 업데이트"
```

**타입 종류:**

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `chore`: 설정, 빌드 관련 수정
- `refactor`: 코드 개선 (기능 변경 없음)
- `docs`: 문서 수정

---

## 🤝 도움이 필요할 때

1. **빌드 오류가 날 때**: `turbo build --filter=앱이름` 으로 특정 앱만 확인
2. **의존성 설치 문제**: `npm install` 을 루트에서 다시 실행
3. **캐시 문제**: `turbo build --force` 로 캐시 무시하고 빌드

> **💡 팁**: 처음엔 복잡해 보이지만, 한 번 익숙해지면 훨씬 효율적으로 개발할 수 있어요!

## 🔧 고급 사용법

### 📦 특정 패키지만 빌드하기

[필터 기능](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)을 사용하여 특정 패키지만 빌드할 수 있습니다:

```bash
# turbo가 전역 설치된 경우 (권장)
turbo build --filter=feta

# turbo가 전역 설치되지 않은 경우, 패키지 매니저 사용
npx turbo build --filter=feta
```

**💡 필터 사용법:**

```bash
turbo build --filter=feta           # FETA 앱만 빌드
turbo build --filter=shared-ui      # shared-ui 패키지만 빌드
turbo build --filter=feta...        # FETA와 그것이 의존하는 모든 패키지 빌드
turbo build --filter=...feta        # FETA에 의존하는 모든 패키지 빌드
```

### 🚀 개발 서버 실행

모든 앱과 패키지의 개발 서버를 실행하려면:

```bash
# turbo가 전역 설치된 경우 (권장)
turbo dev

# turbo가 전역 설치되지 않은 경우
npx turbo dev
```

특정 앱만 개발하고 싶다면 [필터 기능](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)을 사용하세요:

```bash
# turbo가 전역 설치된 경우 (권장)
turbo dev --filter=feta

# turbo가 전역 설치되지 않은 경우
npx turbo dev --filter=feta
```

### ⚡ 캐시 시스템 이해하기

Turborepo의 가장 큰 장점은 **스마트 캐싱**입니다. 한 번 빌드한 결과를 저장해뒀다가 같은 조건에서는 재사용해요!

**🤔 언제 캐시가 사용될까요?**

```bash
# 첫 번째 빌드 (느림 - 모든 걸 새로 빌드)
turbo build --filter=feta  # ⏳ 30초 소요

# 두 번째 빌드 (빠름 - 캐시 사용)
turbo build --filter=feta  # ⚡ 2초 소요 (캐시 히트!)
```

**🧹 캐시 관련 유용한 명령어들:**

```bash
turbo build --force           # 캐시 무시하고 처음부터 다시 빌드
turbo build --no-cache        # 캐시 사용하지 않음
turbo build --summarize       # 어떤 작업이 캐시됐는지 요약 보기
```

### 🔍 빌드 성능 확인하기

빌드가 얼마나 빨라졌는지 확인해보세요:

```bash
turbo build --summarize
# 출력 예시:
# ✅ feta:build (캐시 히트) - 0.1초
# ⏳ shared-ui:build (새로 빌드) - 5.2초
```

## 📚 유용한 링크

Turborepo의 강력한 기능들에 대해 더 알아보세요:

- [작업(Tasks)](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [캐싱(Caching)](https://turborepo.com/docs/crafting-your-repository/caching)
- [원격 캐싱(Remote Caching)](https://turborepo.com/docs/core-concepts/remote-caching)
- [필터링(Filtering)](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [설정 옵션](https://turborepo.com/docs/reference/configuration)
- [CLI 사용법](https://turborepo.com/docs/reference/command-line-reference)
