# 🏗️ 모노레포

> 여러 개의 앱을 하나의 저장소에서 관리하며, 공통 코드를 효율적으로 공유합니다.

## � 문서

- **[빠른 시작 가이드](./docs/QUICK_START.md)** - 자주 사용하는 명령어와 팁
- **[상세 가이드](./docs/MONOREPO_GUIDE.md)** - 패키지 시스템 동작 원리
- **[Turbo 설정](./docs/TURBO_CONFIG.md)** - 빌드 시스템 설정

## � 빠른 시작

```bash
# 설치
npm install

# 개발 서버 실행
turbo dev --filter=feta

# 빌드
turbo build --filter=feta
```

## � 프로젝트 구조

```
📱 apps/           # 실제 애플리케이션들
├── feta/          # FETA PWA 앱 (React + Vite)
└── docs/          # 문서 사이트 (Next.js)

📦 packages/       # 공통 패키지들
├── shared-config/ # ESLint, TypeScript 설정
├── shared-ui/     # 아이콘, 버튼 등 UI 컴포넌트
└── ui/           # 기본 UI 라이브러리
```

## 🎯 현재 상태

- ✅ **shared-ui**: 91개 아이콘 컴포넌트 완료
- ✅ **feta**: 빌드 및 개발 서버 정상 동작
- ⏳ **shared-utils**: API, 유틸리티 패키지 예정

## 📋 자주 사용하는 명령어

```bash
# 특정 앱 개발
turbo dev --filter=feta

# 특정 앱 빌드
turbo build --filter=feta

# 전체 빌드
turbo build

# 타입 검사
turbo check-types
```
