import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 🎨 Tailwind CSS 클래스를 안전하게 병합하는 유틸리티 함수
 * 
 * clsx로 조건부 클래스를 처리하고, twMerge로 중복 클래스를 제거합니다.
 * 
 * @example
 * ```tsx
 * // 기본 사용
 * cn('px-4 py-2', 'bg-blue-500')
 * // → 'px-4 py-2 bg-blue-500'
 * 
 * // 조건부 클래스
 * cn('px-4 py-2', isActive && 'bg-blue-500', 'text-white')
 * // → 'px-4 py-2 bg-blue-500 text-white' (isActive가 true일 때)
 * 
 * // 중복 클래스 병합
 * cn('px-2 px-4', 'py-1 py-2') 
 * // → 'px-4 py-2' (마지막 값이 우선)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
