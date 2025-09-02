export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},

    // CSS 최적화 (프로덕션에서만) - 간단한 설정
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: 'default'
      }
    })
  }
};
