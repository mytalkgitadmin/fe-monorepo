export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},

    // CSS 최적화 (프로덕션에서만)
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: [
          'default',
          {
            // 상세 최적화 옵션
            discardComments: { removeAll: true }, // 주석 제거
            normalizeWhitespace: true, // 공백 정규화
            mergeLonghand: true, // 속성 병합
            mergeRules: true, // 룰 병합
            minifySelectors: true, // 셀렉터 최소화
            reduceIdents: false, // 키프레임명 유지 (안전)
            zindex: false, // z-index 최적화 비활성화 (안전)
          },
        ],
      },
    }),
  },
};
