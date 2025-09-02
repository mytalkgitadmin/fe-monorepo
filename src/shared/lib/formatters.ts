/**
 * 편집 메시지 내용을 처리하고 필요시 잘라내는 함수
 * @param message 원본 메시지
 * @param maxLength 최대 길이 (옵션)
 * @returns 처리된 메시지
 */
export const truncateMessage = (
  message: string,
  maxLength?: number,
): string => {
  if (!message) return '';

  let msg = message;

  // 편집 메시지 이모지 접두사 제거
  if (msg.startsWith('✍🏻 ')) {
    msg = msg.slice(4);
  }

  // 최대 길이 처리
  if (maxLength && msg.length > maxLength) {
    return msg.slice(0, maxLength);
  }
  return msg;
};
