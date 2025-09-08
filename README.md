# 🏗️ Turborepo 모노레포

> **모노레포란?** 여러 개의 프로젝트를 하나의 저장소에서 관리하는 방식입니다. 공통 코드를
> 재사용하고, 의존성을 통합 관리할 수 있어요!

[![Turborepo](https://img.shields.io/badge/Built%20with-Turborepo-blueviolet)](https://turborepo.com)
[![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white)](https://typescriptlang.org)

## 📁 프로젝트 구조

```
monorepo/
├── apps/         # 실제 애플리케이션
├── packages/     # 공통 패키지
├── docs/         # 가이드 문서
├── turbo.json    # 빌드 설정
├── package.json  # 루트 패키지
└── README.md
```

## 🚀 개발 시작

```bash
# 의존성 설치
npm install
# 전체 빌드
npm run build
# 앱 개발 서버 실행 (예: feta)
npm run dev --filter=feta
```

## 🧰 주요 명령어

```bash
npm run build                  # 전체 앱 빌드
npm run build --filter=feta    # 특정 앱만 빌드
npm run lint                   # 코드 스타일 검사
npm run check-types            # 타입 오류 검사
npm run format                 # 코드 자동 정렬
```

## 예시 코드

```typescript
import { Icon } from "@repo/shared-ui";
import { Button } from "@repo/ui";

function MyComponent() {
  return (
    <Button variant="primary">
      <Icon name="home" size={20} /> 홈으로 가기
    </Button>
  );
}
```

## 📚 문서

- [monorepo-guide.md](./docs/monorepo-guide.md)
- [setting-prettier.md](./docs/setting-prettier.md)
- [setting-turbo.md](./docs/setting-turbo.md)
- [commit-convention.md](./docs/commit-convention.md)

## 💬 커밋 메시지 규칙

| 이모지 | 타입     | 설명             |
| ------ | -------- | ---------------- |
| ✨     | Feat     | 새로운 기능 추가 |
| 🐛     | Fix      | 버그 수정        |
| ♻️     | Refactor | 리팩토링         |
| 📝     | Docs     | 문서 변경        |
| 🔧     | Chore    | 설정/빌드 변경   |

예시: `git commit -m "✨ Feat(auth): 구글 OAuth 로그인 추가"` 자세한 규칙은
[commit-convention.md](./docs/commit-convention.md) 참고

## 🤝 문제 해결

- 빌드 오류: `npm run build --filter=앱이름`
- 의존성 문제: `npm install` 루트에서 실행
- 캐시 문제: `npm run build --force`
- 타입 오류: `npm run check-types`

문제 발생 시 [docs/](./docs/) 폴더의 가이드 문서 참고

## 🔗 참고 링크

- [Turborepo 공식 문서](https://turborepo.com)
- [Best Practices](https://turborepo.com/docs/handbook)

> **💡 팁**: 문제가 생기면 먼저 [docs/](./docs/) 폴더의 가이드 문서들을 확인해보세요!

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
