# 프론트엔드 코드 컨벤션

## 프로젝트 정보

- **모노레포**: 프로젝트별 기술스택 상이 (React 기반)
- **공통 아키텍처**: Feature-Sliced Design (FSD)

## Feature-Sliced Design (FSD) 아키텍처

### 레이어 구조 (상향식 의존성)

```
shared → entities → features → widgets → views → app
```

### 디렉토리 네이밍

- 파일/폴더: `kebab-case` (예: `friend-list`, `use-profile-query.ts`)
- 컴포넌트: PascalCase 폴더 + `index.tsx` (예: `FriendList/index.tsx`)
- 타입/인터페이스: `PascalCase`
- 훅: `useXxx` 접두사
- 상수: `UPPER_SNAKE_CASE`

### Import 규칙

- 절대경로 사용: `@/*` (tsconfig paths)
- 동일 슬라이스/세그먼트 내부: 상대경로 (`./`, `../`)
- Public API만 사용: `@/features/friend-list` (내부 파일 직접 접근 금지)
- 의존 방향 준수: 상위 레이어는 하위 레이어만 import 가능

### 예시 코드 패턴

#### Import 예시

```typescript
// ❌ 내부 파일 직접 접근
import { FriendList } from "@/features/friend-list/ui/FriendList";

// ✅ 외부에서 슬라이스 사용: Public API로만
import { ProfileItem, type Profile } from "@/entities/profile";
import { FriendList } from "@/features/friend-list";

// ❌ 슬라이스 내부에서 자기 Public API 참조 (순환참조 위험)
import { useFriends } from "@/features/friend-list"; // 슬라이스 내부에서

// ✅ 슬라이스 내부: 상대경로로 직접 이동
import { ProfileItem } from "./ui/ProfileItem";
import { useProfileStore } from "./model/use-profile-store";

// ❌ 와일드카드 사용 (모든 걸 다 내보내기)
export * from "./ui/FriendList";

// ✅ Public API: 필요한 것만 명시적으로 내보내기
export { ProfileItem } from "./ui/ProfileItem";
export { type Profile } from "./model/types";

// ❌ shared/ui 전체 가져오기 (번들 크기 증가)
import { Button, Input } from "@/shared/ui";

// ✅ shared/ui: 컴포넌트 그룹별로 가져오기
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
```

### FSD Public API 핵심 규칙

- **Public API 단일화**: 슬라이스 루트 `index.ts` 하나만, 외부 접근은 반드시 루트로만
- **와일드카드 금지**: `export *` 사용 금지, 필요한 것만 명시적 re-export
- **세그먼트 중첩 index 금지**: `ui/index.ts`, `model/index.ts` 같은 중간 배럴 생성 금지
- **순환 참조 방지**: 슬라이스 내부는 상대경로, 외부는 Public API만 사용
- **동일 레이어 cross-import 지양**: 같은 레벨끼리 참조 최소화, Entity에서만 `@x` 패턴 허용
- **shared/ui 번들 최적화**: 전체 배럴 금지, 컴포넌트 그룹별 배럴만 허용

### 레이어별 역할

- **app/**: 앱 엔트리, Provider, 전역 설정, 기술/역할 중심
- **views/**: 페이지/라우트 조립 (로직 없음, widgets/features 조합)
- **widgets/**: 독립적인 대형 UI 블록
- **features/**: 비즈니스 기능 단위, 도메인 또는 `도메인-행동`의 얕은 구조, 추가 중첩 금지
- **entities/**: 도메인 엔티티 (user, product 등), 단수 명사
- **shared/**: 전역 공통 모듈, 슬라이스 없이 세그먼트 단일 계층

### 세그먼트 구조

- **허용**: `api/`, `model/`, `ui/`, `lib/`, `config/`
- **금지**: `types/`, `constants/`, `hooks/`, `store/` (목적 세그먼트 내부에 배치)
- **세그먼트별 역할**:
  - `api/`: Backend 통신 (Request Function, Data Type, Mapper)
  - `model/`: Data Model (Schema, Interface, Store, Business Logic)
  - `ui/`: UI 관련 (Component, Date Formatter, Style)
  - `lib/`: Slice 내부 Library 코드
  - `config/`: Configuration과 Feature Flag

## 코드 스타일

### TypeScript

- Strict 모드 사용
- 공개 API에는 명시적 반환 타입
- `any` 타입 지양
- 사용하지 않는 변수는 `_` 접두사

### React

- React 17+ JSX Transform (React import 불필요)
- Props 구조분해 할당 권장
- 인라인 함수/객체 지양 (성능)
- JSX에서 불필요한 중괄호 금지
- Fragment 남용 금지

### 코드 품질

- 가드절/이른 반환 패턴 선호
- `prefer-const` (let 대신 const)
- 객체 단축 속성 사용
- 의미 없는 try/catch 금지
- 에러는 상위에서 처리

## 프레임워크별 규칙

### React 공통

- 데이터 패칭 훅은 feature의 `model/`에 배치
- 엔티티 UI는 프리미티브 뷰만 (상호작용/패칭 로직 금지)
- 전역 Provider는 `src/app` 레이어에서만 선언/조립

### Next.js App Router (해당 프로젝트만)

- 서버/클라이언트 컴포넌트 구분 (`"use client"`)
- App Router 디렉토리 구조 준수

### API 처리 (프로젝트별)

- 공통 fetcher 패턴: `@/shared/api`에 배치
- 엔드포인트는 도메인별 파일로 분리
- 인증: 프로젝트별 방식에 따라 처리

## 도구 설정

### ESLint

- FSD 아키텍처 규칙 자동 검증
- TypeScript/React 베스트 프랙티스
- 레이어별 특별 규칙 (entities, features)

### Prettier

- 팀 코드 스타일 통일
- Import 순서 자동 정렬 (FSD 레이어 순)
- 저장시 자동 포맷팅

#### Import 자동 정렬 순서

```typescript
// 1. React 관련
import React from 'react';
import { useState } from 'react';

// 2. Next.js 관련
import { NextPage } from 'next';

import { useQuery } from '@tanstack/react-query';
// 3. 외부 라이브러리
import axios from 'axios';

// 4. FSD 레이어 순서
import { api } from '@/shared/api';

import { User } from '@/entities/user';

import { UserList } from '@/features/user-list';

import { Layout } from '@/widgets/layout';

import { HomePage } from '@/views/home';

// 5. 상대경로 (내부 파일)
import { Button } from './Button';
import './styles.css';
```

#### 설정 방법

```bash
# 플러그인 설치
npm install -D @trivago/prettier-plugin-sort-imports
```

```json
// .prettierrc
{
  "plugins": ["@trivago/prettier-plugin-sort-imports"],
  "importOrder": [
    "^react",
    "^next",
    "^@?\\w",
    "^@/shared/(.*)$",
    "^@/entities/(.*)$",
    "^@/features/(.*)$",
    "^@/widgets/(.*)$",
    "^@/views/(.*)$",
    "^@/app/(.*)$",
    "^[./]"
  ],
  "importOrderSeparation": true
}
```

### VS Code

- FSD 구조 시각화
- 자동 import 경로 제어
- 파일 중첩으로 관련 파일 그룹핑
