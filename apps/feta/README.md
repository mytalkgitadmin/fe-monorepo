# 프로젝트명

## 프로젝트 소개

## 기술스택

- React 19
- TypeScript
- Vite
- TanStack Router
- React Query
- Zustand
- Sass
- Sendbird UIKit

## 시작하기

### 요구사항

- Node.js 20+
- npm 또는 yarn

### 설치 및 실행

1. 저장소 클론
   ```bash
   git clone https://github.com/strongerDeer/pwa.git .
   ```
2. 의존성 설치
   ```bash
   npm install
   ```
3. 환경설정

   - `.env` 파일을 프로젝트 루트에 생성하고 필요한 환경변수 설정

   ```
   VITE_BASE_DOMAIN=''
   ```

4. 실행
   ```bash
   npm run dev # 기본 포트
   npm run dev -- --port 3000 # 특정 포트 지정
   npm run dev -- --host # 네트워크 접근 필요시
   ```

### 기타

- 빌드
  ```bash
  npm run build
  ```
- 빌드 실행
  ```bash
  npm run preview
  ```
- 린트 및 포맷팅
  ```bash
  npm run lint
  ```

## 프로젝트 구조(FSD)

프로젝트는 다음과 같은 FSD 계층 구조를 따름

- FSD: 특성 기반 설계(Feature-Sliced Design). 프론트엔드 아키텍처 방법론. 비즈니스 기능(feature)을 중심으로 구성

- 슬라이스(Slice): 하나의 비즈니스 기능 또는 도메인을 담당하는 독립적인 모듈
- 계층(Layer): 애플리케이션의 추상화 수준에 따라 구분된 계층 (예: entities, features, widgets, pages)
- 세그먼트(Segment): 각 계층 내에서 기능적으로 관련된 코드 묶음

```
src/
├── 📁app/             # 애플리케이션 설정, 프로바이더, 엔트리 포인트
├── 📁entities/        # 비즈니스 엔티티
├── 📁features/        # 비즈니스 기능
├── 📁shared/          # 공유 유틸리티, API 클라이언트, 상수 등
├── 📁widgets/         # 복합 UI 컴포넌트(Header, Sidebar 등)
├── 📁routes/          # 라우팅 구성 - pages 대체 (TanStack Router)
├── main.tsx           # 애플리케이션 진입점
├── routeTree.gen.ts   # TanStack Router 자동 생성 파일
└── vite-env.d.ts      # Vite 타입 정의
```

1. app/

- 글로벌 프로바이더(React Query, Router 등)
- 글로벌 스타일
- 애플리케이션 초기화 로직
- 레이아웃, 테마 설정

2. routes/

- 페이지 컴포넌트(FSD의 pages 대체)
- **`TanStack Router`** 기반 라우트 정의
- 보호된 라우트와 공개 라우트 구분

예시 구조:

```
📂routes/
├── 📂_protected/      # 인증 필요 라우트
│   ├── chat.tsx
│   └── profile.tsx
├── 📂_public/         # 공개 라우트
│   ├── login.tsx
│   └── register.tsx
├── _root.tsx
└── index.tsx
```

3. widgets/

- feature의 복합 UI
- 여러 기능들이 결합된 컴포넌트
- 헤더, 사이드바, 푸터 등의 레이아웃 컴포넌트

예시 구조:

```
📂widgets/
├── 📂Header/
│   ├── 📁ui/
│   ├── index.ts
│   └── Header.module.scss
├── 📁Sidebar/
└── 📁NotificationPanel/
```

4. entities/

- 비즈니스 엔티티 모델 및 타입 정의
- 엔티티별 API 클라이언트
- 엔티티 관련 UI 컴포넌트
- 각 엔티티는 독립적인 디렉토리로 구성

예시 구조:

```
📂entities/
├── 📂user/
│   ├── model.ts    # 타입 정의
│   ├── api.ts      # API 관련 함수
│   └── 📁ui/       # 엔티티 UI 컴포넌트
├── 📂channel/
│   ├── model.ts
│   ├── api.ts
│   └── 📁ui/
```

5. features/

- 비즈니스 기능 및 사용자 시나리오
- 기능별 상태 관리 (Zustand 스토어)
- 기능별 UI 컴포넌트
- 기능별 API 함수

예시 구조:

```
📂features/
├── 📂auth/
│   ├── store.ts     # 인증 상태 관리
│   ├── api.ts       # 인증 API 함수
│   └── 📁ui/          # 인증 관련 컴포넌트
├── 📂channels/
│   ├── model.ts
│   ├── api.ts
│   └── 📁ui/
```

6. shared/

- 공유 유틸리티, API 클라이언트, 상수, 공용 UI 컴포넌트 등

예시 구조:

```
📂shared/
├── 📂api/
│   ├── base.ts     # axios 설정, 인터셉터
│   └── endpoints.ts
├── 📂lib/
│   ├── storage.ts  # 로컬 스토리지 유틸리티
│   └── utils.ts    # 일반 유틸리티 함수
├── 📂ui/
│   ├── 📁Button/
│   └── 📁Input/
├── 📁constants/
└── 📁hooks/
```

## 주요 기능
