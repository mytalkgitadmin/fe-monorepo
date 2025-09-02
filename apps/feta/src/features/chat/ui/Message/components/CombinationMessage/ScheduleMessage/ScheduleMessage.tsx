import Icons from '@/shared/ui/Icons';
import { formatDotFull, formatScheduleTime } from '@/shared/lib/dateFormatter';
import { CalendarEvent, DDayEvent } from '@/features/chat/model';

import styles from '../CombinationMessage.module.scss';

// 컴포넌트 props 타입을 더 명확하게 정의
interface ScheduleMessageProps {
  event: DDayEvent | CalendarEvent;
  type: 'DDAY' | 'CALENDAR';
}

const SCHEDULE_TYPE_LABELS = {
  DDAY: '디데이',
  CALENDAR: '캘린더',
} as const;

// 🔧 타입 안전한 아이콘 매핑
const SCHEDULE_TYPE_ICONS = {
  DDAY: 'dday',
  CALENDAR: 'calendar',
} as const;

/**
 * 스케줄 메시지를 표시하는 컴포넌트
 * 디데이와 캘린더 두 가지 타입의 이벤트를 지원
 */
export default function ScheduleMessage({ event, type }: ScheduleMessageProps) {
  if (!event) return;

  // 타입 가드 함수들
  const isDDayEvent = (
    event: DDayEvent | CalendarEvent,
  ): event is DDayEvent => {
    return 'previewLabel' in event && 'subjectDate' in event;
  };

  const isCalendarEvent = (
    event: DDayEvent | CalendarEvent,
  ): event is CalendarEvent => {
    return (
      'recordStartDate' in event &&
      'recordEndDate' in event &&
      'isAllDay' in event
    );
  };

  // previewLabel을 d-day 형태로 변환하는 함수
  const formatPreviewLabel = (label: string): string => {
    // "d-day" 케이스
    if (label.toLowerCase().includes('d-day')) {
      return 'D-day';
    }

    // 숫자 추출 (예: "1일", "1일 전", "1일 후")
    const numberMatch = label.match(/(\d+)/);
    if (!numberMatch) {
      return label; // 숫자가 없으면 원본 반환
    }

    const number = numberMatch[1];

    // "전" 키워드가 있으면 d-숫자 (과거)
    if (label.includes('전')) {
      return `D-${number}`;
    }

    // "후" 키워드가 있거나 단순히 "1일" 형태면 d+숫자 (미래)
    if (label.includes('후') || /^\d+일$/.test(label)) {
      return `D+${number}`;
    }

    // 기본값 (패턴이 맞지 않으면 원본 반환)
    return label;
  };

  // 공통 데이터 계산
  const getEventData = () => {
    if (type === 'DDAY' && isDDayEvent(event)) {
      return {
        titlePrefix: (
          <p className={styles.prefix}>
            {formatPreviewLabel(event.previewLabel)}
          </p>
        ),
        dateText: formatDotFull(event.subjectDate),
        timeText: null,
      };
    }

    if (type === 'CALENDAR' && isCalendarEvent(event)) {
      const timeText = event.isAllDay
        ? '하루종일'
        : `${formatScheduleTime(event.recordStartDate)} ~ ${formatScheduleTime(event.recordEndDate)}`;

      const startDay = formatDotFull(event.recordStartDate);
      const endDay = formatDotFull(event.recordEndDate);
      return {
        titlePrefix: null,
        dateText: startDay === endDay ? startDay : `${startDay} ~ ${endDay}`,
        timeText,
      };
    }

    // 기본값
    return {
      titlePrefix: null,
      dateText: '',
      timeText: null,
    };
  };

  const { titlePrefix, dateText, timeText } = getEventData();

  return (
    <div className={styles.scheduleWrap}>
      <div className={styles.top}>
        <div className={styles.titleWrap}>
          {titlePrefix}
          <span className={styles.title}>{event.subject}</span>
        </div>
      </div>

      <p className={styles.time}>
        {dateText}
        {timeText && <span>{timeText}</span>}
      </p>

      <button type="button" className={styles.button}>
        <Icons name={SCHEDULE_TYPE_ICONS[type]} /> 내 {SCHEDULE_TYPE_LABELS[type]}에
        등록
      </button>
    </div>
  );
}
