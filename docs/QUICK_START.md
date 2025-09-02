# 🚀 모노레포 패키지 시스템 - 빠른 가이드

## 📚 전체 이해를 위한 문서

자세한 설명은 [MONOREPO_GUIDE.md](./MONOREPO_GUIDE.md)를 참고하세요!

## 🏃‍♂️ 빠른 시작

### 1. 새 패키지 만들기

```bash
# packages 폴더에 새 패키지 생성
mkdir packages/my-package
cd packages/my-package

# package.json 생성
npm init -y
```

### 2. 패키지를 다른 앱에서 사용하기

```json
// apps/feta/package.json
{
  "dependencies": {
    "@repo/my-package": "workspace:*"
  }
}
```

```typescript
// apps/feta/src/components/MyComponent.tsx
import { MyComponent } from "@repo/my-package";
```

## 📦 현재 사용 가능한 패키지들

### @repo/shared-config

```typescript
// ESLint, TypeScript, Prettier 설정
// extends: ['@repo/shared-config/eslint']
```

### @repo/shared-ui

```typescript
import { Icon, IconName } from '@repo/shared-ui';

<Icon name="home" size={24} color="blue" />
```

## 🔧 자주 사용하는 명령어

```bash
# 전체 빌드
npm run build

# 특정 패키지만 빌드
npm run build --filter=@repo/shared-ui

# 특정 앱 개발 서버 실행
npm run dev --filter=feta

# 새 의존성 설치 후
npm install
```

## ⚡️ 개발 팁

### 패키지 수정 시

1. 패키지 코드 수정
2. `npm run build --filter=@repo/패키지명`
3. 사용하는 앱에서 확인

### 타입 에러 해결

- 패키지에 타입을 추가했는지 확인
- 빌드를 다시 했는지 확인
- import 경로가 정확한지 확인