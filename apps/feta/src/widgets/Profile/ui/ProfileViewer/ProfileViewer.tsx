import { Dialog, DialogContent } from '@/components/ui/dialog';

import { memo } from 'react';

import { Viewer } from '@/features/viewer';

import useProfileViewer from '@/widgets/Profile/hooks/useProfileViewer';
import { ProfileViewerProps } from '@/widgets/Profile/types/viewer.types';

// import { ProfileViewerProps } from '../../types/viewer.types';
import ProfileContents from './ProfileContents';
import ProfileError from './ProfileError';
import ProfileLoading from './ProfileLoading';
import styles from './ProfileViewer.module.scss';

const ProfileViewer = memo<ProfileViewerProps>(
  ({ open, onOpenChange, accountId, profileImageUrl }) => {
    const {
      userData,
      isLoading,
      error,
      isMyProfile,
      processedHistories,

      viewerOpen,
      imgIndex,

      handlePhoneCall,
      handleImageClick,
      handleViewerClose,
    } = useProfileViewer({
      accountId,
    });

    if (!userData) return null;

    return (
      <>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className={styles.content}>
            {isLoading ? (
              <ProfileLoading />
            ) : error ? (
              <ProfileError />
            ) : (
              <ProfileContents
                userData={userData}
                isMyProfile={isMyProfile}
                handlePhoneCall={handlePhoneCall}
                profileImageUrl={profileImageUrl}
                handleImageClick={handleImageClick}
                processedHistories={processedHistories}
              />
            )}
          </DialogContent>
        </Dialog>

        <Viewer
          open={viewerOpen}
          onOpenChange={handleViewerClose}
          initialIndex={imgIndex}
          data={processedHistories}
        />
      </>
    );
  }
);
ProfileViewer.displayName = 'ProfileViewer';

export default ProfileViewer;
