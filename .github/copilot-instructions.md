# GitHub Copilot Instructions

## 프로젝트 아키텍처: Feature-Sliced Design (FSD)

### 레이어 구조 (상향식 의존성)

```
shared → entities → features → widgets → views → app
```

### 디렉토리 네이밍

- 파일/폴더: `kebab-case` (예: `friend-list`, `use-profile-query.ts`)
- 컴포넌트: PascalCase 폴더 + `index.tsx` (예: `FriendList/index.tsx`)
- 슬라이스 루트에만 Public API `index.ts`를 두고 외부 접근은 반드시 루트로만 한다
- 타입/인터페이스: `PascalCase`
- 훅: `useXxx` 접두사
- 상수: `UPPER_SNAKE_CASE`

### Import 규칙

- 절대경로 사용: `@/*` (tsconfig `paths`)
- 동일 슬라이스/세그먼트 내부: 상대경로 (`./`, `../`)
- Public API만 사용: `@/features/friend-list` (내부 파일 직접 접근 금지)
- 의존 방향 준수: 상위 레이어는 하위 레이어만 import 가능
  - FSD 구조 사용 `shared → entities → features → widgets → src/app → app`

### 레이어별 역할

- **app/**: 앱 엔트리, Provider, 전역 설정, 기술/역할 중심
- **views/**: 페이지/라우트 조립 (로직 없음, widgets/features 조합)
- **widgets/**: 독립적인 대형 UI 블록
- **features/**: 비즈니스 기능 단위, 도메인 또는 `도메인-행동`의 얕은 구조. 추가 중첩 금지
- **entities/**: 도메인 엔티티 (user, product 등)
- **shared/**: 전역 공통 모듈

### 세그먼트 구조

- 허용: `api/`, `model/`, `ui/`, `lib/`, `config/`
- 금지: `types/`, `constants/`, `hooks/`, `store/` (목적 세그먼트 내부에 배치)

### 코드 스타일

- TypeScript strict 모드
- 가드절/이른 반환 패턴 선호
- 공개 API에는 명시적 반환 타입
- 의미 없는 try/catch 금지, 에러는 상위에서 처리
- “왜”가 필요한 곳에만 간단한 주석, 불필요한 인라인 주석 금지

### React/Next.js 규칙

- 데이터 패칭 훅은 feature의 `model/`에 배치
- 엔티티 UI는 프리미티브 뷰만 (상호작용 로직 금지)
- Next
  - 서버/클라이언트 컴포넌트 구분 (파일 상단 `"use client"`)
  - 전역 Provider는 `src/app`에서만 선언/조립
    ```
    app/                         # Next.js App Router 전용 폴더
      layout.tsx
      page.tsx
    src/
      app/                       # FSD app layer (엔트리/Provider 등)
        ReactQueryProvider.tsx
      entities/
        friend/
          api/
          model/
          ui/
            Row.tsx
          index.ts
      features/
        friend-list/
          model/
            use-friends-query.ts
            index.ts
          ui/
            FriendList.tsx
            index.ts
          index.ts
      shared/
        api/
        lib/
    ```

---

### 예시 코드 패턴

#### 올바른 Import

```typescript
// 외부에서 슬라이스 사용
import { ProfileItem, type Profile } from "@/entities/profile";
import { FriendList } from "@/features/friend-list";

// 슬라이스 내부에서 상대경로 사용
import { ProfileItem } from "./ui/ProfileItem";
import { useProfileStore } from "./model/use-profile-store";
```

#### Public API 패턴

```typescript
// entities/profile/index.ts
export { ProfileItem } from "./ui/ProfileItem";
export { type Profile, type ProfileFormData } from "./model/types";
export { useProfile } from "./model/use-profile";
```
