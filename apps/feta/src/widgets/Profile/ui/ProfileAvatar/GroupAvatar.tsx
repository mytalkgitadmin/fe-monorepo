import defaultSmallProfile from '@/assets/profile/bemilyDefaultProfile.webp';

import { useAuth } from '@/features/auth';
import { Member, Profile } from '@/features/chat/model';
import { getThumbnailUrl } from '@/features/viewer/utils/mediaUtils';

import styles from './GroupAvatar.module.scss';
import SingleAvatar from './SingleAvatar';

interface GroupAvatarProps {
  members: Member[];
  customType: string | 'MY';
}

export default function GroupAvatar({ members, customType }: GroupAvatarProps) {
  const { userProfile } = useAuth();

  if (customType === 'MY') {
    return (
      <>
        <SingleAvatar
          imageUrl={getThumbnailUrl(userProfile?.profile as Profile)}
          isMyProfile
        />
      </>
    );
  }

  // 알수 없는 사용자
  if (members && members.length === 0) {
    return <SingleAvatar imageUrl={defaultSmallProfile} />;
  }
  if (members && members.length > 0) {
    return (
      <div
        className={styles[`group${members.length >= 4 ? 4 : members?.length}`]}
      >
        {members?.slice(0, 4).map((member, index) => (
          <div
            className={styles.circle}
            key={`member_${index}_${member.accountId}`}
          >
            <img
              src={getThumbnailUrl(member.profile)}
              alt={`멤버 ${index + 1}`}
            />
          </div>
        ))}
      </div>
    );
  }
}
