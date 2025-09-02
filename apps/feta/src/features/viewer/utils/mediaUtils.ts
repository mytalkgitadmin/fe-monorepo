import { BASE_URL } from '@/shared/api/endpoints';
import {
  isImgMsgData,
  isProfileImgData,
  MediaType,
  ViewerItemData,
} from '../types';

import defaultSmallProfile from '@/assets/profile/bemilyDefaultProfile.webp';

// === 이모티콘 관련 ===
const createProfileImageMap = () => {
  const imageMap = new Map<number, string>();

  const profileImages = import.meta.glob(
    '@/assets/profile/bemilyProfileSmall*.webp',
    {
      eager: true,
      as: 'url',
    },
  );

  Object.entries(profileImages).forEach(([path, url]) => {
    const match = path.match(/bemilyProfileSmall(\d+)\.webp$/);
    if (match) {
      const id = parseInt(match[1], 10);
      imageMap.set(id, url as string);
    }
  });
  return imageMap;
};

const profileImageMap = createProfileImageMap();

export const getEmoticonImageUrl = (emoticonId: number): string => {
  try {
    const imageUrl = profileImageMap.get(emoticonId);
    return imageUrl || defaultSmallProfile;
  } catch {
    return defaultSmallProfile;
  }
};

// === 미디어 타입 관련 ===
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];

export const getMediaType = (item: ViewerItemData): MediaType => {
  // 이모티콘은 항상 이미지로 처리
  if (isProfileImgData(item) && item.profileKind === 'emoticon') {
    return 'image';
  }

  let fileName = '';

  if ('originalFileName' in item) {
    fileName = item.originalFileName;
  } else if ('profileOriginal' in item && item.profileOriginal) {
    fileName = item.profileOriginal;
  }

  if (!fileName) return 'image';

  const extension = fileName.toLowerCase().split('.').pop();
  return extension && VIDEO_EXTENSIONS.some((ext) => ext.includes(extension))
    ? 'video'
    : 'image';
};

// === URL 관련 ===
export const getOriginalUrl = (item: ViewerItemData): string => {
  // 이미지 메시지인 경우
  if (isImgMsgData(item)) {
    return `${BASE_URL}${item.originalUrl}`;
  }

  if (isProfileImgData(item)) {
    if (item.profileKind === 'emoticon') {
      return getEmoticonImageUrl(item.emoticonId);
    }

    if (item.profileOriginal) {
      return `${BASE_URL}${item.profileOriginal}`;
    }

    if (item.profileThumbnail) {
      return `${BASE_URL}${item.profileThumbnail}`;
    }

    if (item.profileSmallThumbnail) {
      return `${BASE_URL}${item.profileSmallThumbnail}`;
    }
  }

  return defaultSmallProfile;
};

export const getThumbnailUrl = (item: ViewerItemData): string => {
  if (isImgMsgData(item) && item.thumbUrl) {
    return `${BASE_URL}${item.thumbUrl}`;
  }

  // 프로필의 경우 썸네일이 있으면 사용, 없으면 원본 사용
  if (isProfileImgData(item)) {
    if (item.profileKind === 'emoticon') {
      return getEmoticonImageUrl(item.emoticonId);
    }

    if (item.profileThumbnail) {
      return `${BASE_URL}${item.profileThumbnail}`;
    }

    if (item.profileSmallThumbnail) {
      return `${BASE_URL}${item.profileSmallThumbnail}`;
    }
  }

  return getOriginalUrl(item);
};

// === 유틸리티 함수들 ===
export const isEmoticonProfile = (item: ViewerItemData): boolean => {
  return isProfileImgData(item) && item.profileKind === 'emoticon';
};

export const isDownloadable = (item: ViewerItemData): boolean => {
  if (isImgMsgData(item)) {
    return item.shared;
  }

  if (isEmoticonProfile(item)) {
    return false;
  }

  return true; // Profile, History는 기본적으로 다운로드 가능
};

export const getFileName = (item: ViewerItemData): string => {
  if ('originalFileName' in item) {
    return item.originalFileName;
  }

  if (isEmoticonProfile(item)) {
    return `이모티콘_${item.emoticonId}`;
  }

  if ('profileOriginal' in item && item.profileOriginal) {
    const fileName = item.profileOriginal.split('/').pop() || '미디어파일';
    return fileName;
  }

  return '미디어파일';
};
