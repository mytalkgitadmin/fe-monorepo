/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 타입 제한 - 첨부된 gitmoji 컨벤션 적용
    'type-enum': [
      2,
      'always',
      [
        // 기본 타입들 (gitmoji 사용 권장)
        'feat', // ✨ 새로운 기능 추가
        'perf', // ⚡ 성능 개선(속도/메모리/용량)
        'fix', // 🐛 버그 수정
        'style', // 💄 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없는 경우)
        'add', // ➕ 의존성 추가
        'refactor', // ♻️ 코드 리팩토링
        'chore', // 🔧 기타 변경사항 (빌드 스크립트 수정 등)
        'build', // 🏗️ 빌드 관련 파일 수정
        'ci', // 💚 CI관련 설정 수정
        'docs', // 📝 문서 (문서 추가, 수정, 삭제)
        'remove', // 🔥 코드/파일/기능 삭제
        'seo', // 🔍 검색 엔진 최적화 관련 변경
        'wip', // 🚧 작업 진행 중 (Work In Progress)
        'test', // 🧪 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없는 경우)
        'a11y', // ♿ 접근성 개선

        // 추가 타입들
        'ui', // 🎨 사용자 인터페이스 변경
        'ux', // 🎨 사용자 경험 개선
        'revert', // ⏪ 변경사항 되돌리기
        'merge', // 🔀 브랜치 병합
        'hotfix', // 🚑 긴급 수정
        'security', // 🔒 보안 이슈 수정
        'config', // ⚙️ 설정 파일 수정
        'upgrade', // ⬆️ 의존성 업그레이드
        'downgrade', // ⬇️ 의존성 다운그레이드

        // 한글 타입 (기존 프로젝트 패턴 유지)
        'Feat',
        'Perf',
        'Fix',
        'UI/UX',
        'Style',
        'Add',
        'Refactor',
        'Chore',
        'Build',
        'CI',
        'Docs',
        'Remove',
        'SEO',
        'WIP',
        'Test',
        'A11y',
      ],
    ],

    // 스코프 제한 - 단순화된 모노레포 구조
    'scope-enum': [
      2,
      'always',
      [
        // 모노레포 구조 기반
        'root', // 루트 레벨 변경
        'feta', // feta 앱
        'packages', // packages 폴더 내 모든 패키지
        'docs', // 문서 관련
        'config', // 설정 파일
      ],
    ],

    // 메시지 길이 제한
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 120],

    // 대소문자 규칙 완화 (한글 허용)
    'type-case': [0], // 비활성화
    'scope-case': [0], // 비활성화
    'subject-case': [0], // 비활성화

    // 한글 커밋 메시지 허용을 위한 추가 설정
    'subject-empty': [2, 'never'],
    'subject-full-stop': [0], // 마침표 규칙 비활성화 (한글에는 부적절)

    // 기존 프로젝트 패턴 허용: "Type(scope): 메시지"
    'type-empty': [2, 'never'],
  },

  // 커스텀 파서 - gitmoji와 한글 메시지 지원
  parserPreset: {
    parserOpts: {
      // gitmoji와 한글 커밋 메시지도 파싱할 수 있도록 정규식 수정
      headerPattern:
        /^(?:(?<emoji>[\p{Emoji_Presentation}\p{Extended_Pictographic}])\s+)?(?<type>\w+)(?:\((?<scope>[^)]+)\))?!?:\s(?<subject>.+)$/u,
      headerCorrespondence: ['emoji', 'type', 'scope', 'subject'],
    },
  },

  // 무시할 패턴
  ignores: [
    // Merge 커밋
    (message) => message.startsWith('Merge'),
    // Revert 커밋
    (message) => message.startsWith('Revert'),
    // Initial commit
    (message) => message === 'Initial commit',
  ],
};
