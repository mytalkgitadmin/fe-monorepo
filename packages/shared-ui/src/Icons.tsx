import { memo } from "react";
import { Icon as IconifyIcon } from "@iconify/react";

// 🎨 체계적으로 정리된 아이콘 매핑
const iconMapping = {
  // 🧭 네비게이션 & 방향
  menu: "tabler:menu-2",
  search: "tabler:search",
  home: "tabler:home",
  homeFilled: "tabler:home-filled",
  back: "tabler:chevron-left",
  forward: "tabler:chevron-right",
  up: "tabler:arrow-up",
  down: "tabler:arrow-down",
  left: "tabler:arrow-left",
  right: "tabler:arrow-right",
  arrowUp: "tabler:arrow-up",
  chevronRight: "tabler:chevron-right",
  chevronLeft: "tabler:chevron-left",
  "chevron-down": "tabler:chevron-down",

  // 👤 사용자 & 소셜
  profile: "tabler:user",
  user: "tabler:user",
  users: "tabler:users",
  logout: "tabler:logout",
  login: "tabler:login",
  bell: "tabler:bell",
  message: "tabler:message-circle",
  phone: "tabler:phone",
  "user-plus": "tabler:user-plus",
  "user-minus": "tabler:user-minus",

  // 🎯 미디어 & 액션
  play: "tabler:player-play-filled",
  pause: "tabler:player-pause-filled",
  stop: "tabler:player-stop-filled",
  mic: "tabler:microphone",
  micOff: "tabler:microphone-off",
  photo: "tabler:photo",
  picture: "tabler:photo",
  camera: "tabler:camera",
  video: "tabler:video",
  emoticon: "tabler:mood-happy",
  clip: "tabler:paperclip",
  share: "tabler:share-3",
  reply: "tabler:share-3",
  heart: "tabler:heart",
  crown: "tabler:crown",

  // 🎭 감정 & 표현
  "mood-cry": "tabler:mood-cry",
  "mood-sad": "tabler:mood-sad",
  "mood-off": "tabler:mood-off",

  // 📅 시간 & 일정
  calendar: "tabler:calendar-event",
  clock: "tabler:clock",
  dday: "tabler:cake",
  cake: "tabler:cake",

  // 📄 파일 & 문서
  file: "tabler:file",
  folder: "tabler:folder",
  fileText: "tabler:file-text",
  filePdf: "tabler:file-type-pdf",
  fileDoc: "tabler:file-type-doc",
  fileDocx: "tabler:file-type-docx",
  fileXls: "tabler:file-type-xls",
  filePpt: "tabler:file-type-ppt",
  fileTxt: "tabler:file-type-txt",
  fileCsv: "tabler:file-type-csv",
  fileZip: "tabler:file-type-zip",
  fileImage: "tabler:file-type-jpg",

  // ⚠️ 상태 & 알림
  success: "tabler:check-circle",
  error: "tabler:x-circle",
  warning: "tabler:alert-triangle",
  alert: "tabler:alert-triangle",
  info: "tabler:alert-square-rounded",
  question: "tabler:help-circle",
  "question-mark": "tabler:help-circle",
  "circle-check": "tabler:check-circle",
  "circle-check-filled": "tabler:circle-check-filled",
  "exclamation-circle-filled": "tabler:exclamation-circle-filled",

  // ⭐ 즐겨찾기 & 평가
  star: "tabler:star",
  "star-filled": "tabler:star-filled",

  // 🛠️ 액션 & 도구
  edit: "tabler:edit",
  delete: "tabler:trash",
  trash: "tabler:trash",
  add: "tabler:plus",
  plus: "tabler:plus",
  remove: "tabler:minus",
  close: "tabler:x",
  x: "tabler:x",
  check: "tabler:check",
  copy: "tabler:copy",
  settings: "tabler:settings",
  refresh: "tabler:refresh",
  download: "tabler:download",
  upload: "tabler:upload",

  // 🔒 보안 & 상태
  lock: "tabler:lock",
  unlock: "tabler:lock-open",
  visible: "tabler:eye",
  hidden: "tabler:eye-off",
  eye: "tabler:eye",
  "eye-off": "tabler:eye-off",

  // 📱 디바이스 & 연결
  wifi: "tabler:wifi",
  bluetooth: "tabler:bluetooth",
  mobile: "tabler:device-mobile",
  desktop: "tabler:device-desktop",
  speakerphone: "tabler:speakerphone",
  headset: "tabler:headset",
  "device-ipad-horizontal-cog": "tabler:device-ipad-horizontal-cog",

  // 🔔 알림 & 핀
  "bell-filled": "tabler:bell-filled",
  pin: "tabler:pin",
  "pin-filled": "tabler:pin-filled",

  // 💬 메시징 & 소셜 확장
  "message-circle-plus": "tabler:message-circle-plus",

  // ⏰ 시간 & 도구 확장
  stopwatch: "tabler:stopwatch",

  // 🎛️ UI 요소
  dots: "tabler:dots",
} as const;

// 🔷 아이콘 타입 정의 (자동완성 지원)
export type IconName = keyof typeof iconMapping;

// 🎯 아이콘 컴포넌트 속성
interface IconProps {
  /** 사용할 아이콘 이름 */
  name: IconName;
  /** 아이콘 색상 (CSS color 값) */
  color?: string;
  /** 아이콘 크기 (px 또는 rem) */
  size?: number | string;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 🎨 공통 아이콘 컴포넌트
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <Icon name="home" />
 * <Icon name="search" />
 *
 * // 크기와 색상 지정
 * <Icon name="bell" size={32} color="#3b82f6" />
 *
 * // CSS 클래스 추가
 * <Icon name="settings" className="hover:text-blue-500" />
 * ```
 */
const Icon = memo<IconProps>(
  ({ name, color, size = 24, className, ...props }) => {
    const iconName = iconMapping[name];

    return (
      <IconifyIcon
        icon={iconName}
        color={color}
        width={size}
        height={size}
        className={className}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
