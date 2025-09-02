// 🎨 모든 앱에서 사용할 공통 코드 포매팅 규칙

module.exports = {
  // 📏 기본 설정
  printWidth: 80, // 한 줄 최대 길이
  tabWidth: 2, // 들여쓰기 크기
  useTabs: false, // 탭 대신 스페이스 사용
  semi: true, // 세미콜론 사용
  singleQuote: true, // 작은따옴표 사용
  quoteProps: 'as-needed', // 필요할 때만 객체 키에 따옴표

  // ⚛️ React/JSX 설정
  jsxSingleQuote: true, // JSX에서도 작은따옴표

  // 🔗 배열/객체 마지막 요소 후 쉼표
  trailingComma: 'es5',

  // 🧹 공백 설정
  bracketSpacing: true, // { foo: bar } (공백 있음)
  bracketSameLine: false, // JSX 닫는 괄호를 다음 줄에

  // 🏹 화살표 함수 괄호
  arrowParens: 'always', // x => x 대신 (x) => x (항상 괄호 사용)

  // 📄 파일 형식 설정
  endOfLine: 'lf', // 줄바꿈 문자 (Unix 스타일)

  // 📋 지원 파일 확장자들
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120, // JSON은 좀 더 긴 줄 허용
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100, // 마크다운은 읽기 좋게
        proseWrap: 'always',
      },
    },
  ],
};
