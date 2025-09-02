# 🚀 모노레포 실무 사용 가이드

> **이 문서는 실무에서 바로 쓸 수 있는 패키지 생성/사용법을 다룹니다.**
> 
> 동작 원리를 알고 싶다면 → [MONOREPO_GUIDE.md](./MONOREPO_GUIDE.md)

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

### `@repo/shared-ui` - 아이콘 컴포넌트
```typescript
import { Icon, IconName } from '@repo/shared-ui';

// 91개 아이콘 중 TypeScript 자동완성으로 선택
<Icon name="home" size={24} color="blue" />
<Icon name="user" size={20} />
<Icon name="calendar" size={16} color="#333" />
```

### `@repo/shared-config` - 공통 설정
```json
// eslint.config.js
{
  "extends": ["@repo/shared-config/eslint"]
}
```

### `@repo/ui` - shadcn/ui 컴포넌트
```typescript
import { Button, Card } from '@repo/ui';

<Button variant="primary">Click me</Button>
<Card>Content here</Card>
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

## ⚡️ 실무 개발 팁

### 📝 패키지 수정 워크플로우
```bash
# 1. 패키지 수정 (예: shared-ui에 새 아이콘 추가)
# 2. 패키지 빌드
npm run build --filter=@repo/shared-ui

# 3. 사용하는 앱에서 확인
npm run dev --filter=feta
```

### 🔧 자주 발생하는 문제들

**Q: 새 아이콘을 추가했는데 타입 오류가 나요**
```bash
# A: 패키지를 다시 빌드하세요
npm run build --filter=@repo/shared-ui
```

**Q: import 오류가 발생해요**
```bash
# A: 의존성이 제대로 설치되었는지 확인
npm install
```

**Q: 타입이 인식되지 않아요**
```bash
# A: TypeScript 서버 재시작 (VS Code: Cmd+Shift+P → "TypeScript: Restart")
npm run check-types
```

### 🚀 새 패키지 생성 실전 가이드

```bash
# 1. 폴더 생성
mkdir packages/shared-utils
cd packages/shared-utils

# 2. package.json 생성
cat > package.json << 'EOF'
{
  "name": "@repo/shared-utils",
  "version": "0.1.0",
  "private": true,
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch"
  },
  "devDependencies": {
    "tsup": "^8.3.5"
  }
}
EOF

# 3. TypeScript 설정
cat > tsconfig.json << 'EOF'
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
EOF

# 4. 소스 파일 생성
mkdir src
echo 'export const formatDate = (date: Date) => date.toLocaleDateString("ko-KR");' > src/index.ts

# 5. 빌드 테스트
npm run build
```