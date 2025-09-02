# Prettier 설정 가이드

## 기본 포맷팅 규칙

### 코드 스타일

- `"semi": true` - 세미콜론 필수
- `"singleQuote": true` - 작은따옴표 사용
- `"tabWidth": 2` - 들여쓰기 2칸
- `"useTabs": false` - 스페이스 사용 (탭 금지)
- `"printWidth": 80` - 한 줄 최대 80자

### 줄바꿈 및 공백

- `"endOfLine": "lf"` - Unix 스타일 줄바꿈
- `"bracketSpacing": true` - 중괄호 안 공백 (`{ a }`)
- `"bracketSameLine": false` - 태그 닫기 괄호 다음 줄

### 객체/배열

- `"trailingComma": "es5"` - 마지막 쉼표 (배열/객체)
- `"arrowParens": "always"` - 화살표 함수 항상 괄호
  - `avoid`:(`a => {}`): 화살표 함수 괄호 최소화

### JSX 스타일

- `"jsxSingleQuote": true` - JSX에서도 작은따옴표
- `"jsxBracketSameLine": false` - JSX 태그 닫기 괄호 다음 줄

## Import 자동 정렬 (FSD 최적화)

### 플러그인 설정

```json
"plugins": ["@trivago/prettier-plugin-sort-imports"]
```

### 정렬 순서 (FSD 레이어 순)

```json
"importOrder": [
  "^react",           // 1. React
  "^next",            // 2. Next.js
  "^@?\\w",           // 3. 외부 라이브러리 (npm 패키지)
  "^@/shared/(.*)$",  // 4. shared 레이어
  "^@/entities/(.*)$", // 5. entities 레이어
  "^@/features/(.*)$", // 6. features 레이어
  "^@/widgets/(.*)$",  // 7. widgets 레이어
  "^@/views/(.*)$",    // 8. views 레이어
  "^@/app/(.*)$",      // 9. app 레이어
  "^[./]"             // 10. 상대경로 (내부 파일)
]
```

### 추가 옵션

- `"importOrderSeparation": true` - 그룹 사이 빈 줄 추가
- `"importOrderSortSpecifiers": true` - 같은 파일에서 가져오는 것들도 정렬

## 파일별 특별 설정

### JSON 파일

- `"printWidth": 120` - JSON은 더 긴 줄 허용
- `"tabWidth": 2` - 일관된 들여쓰기

### Markdown 파일

- `"printWidth": 100` - 문서용 적당한 줄 길이
- `"proseWrap": "always"` - 문서 자동 줄바꿈

### CSS/SCSS 파일

- `"singleQuote": false` - CSS는 큰따옴표 관례
- `"tabWidth": 2` - 일관된 들여쓰기
