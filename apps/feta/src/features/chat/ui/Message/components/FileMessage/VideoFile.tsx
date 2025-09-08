import { useState } from 'react';

import { VideoThumbnail } from '@/shared/ui/VideoThumbnail';

import { Viewer } from '@/features/viewer';
import { ImgMsgInData } from '@/features/viewer/types';

export default function VideoFile({
  messageInData,
}: {
  messageInData: ImgMsgInData;
}) {
  const [viewerOpen, setViewerOpen] = useState(false);
  if (!messageInData) return;
  const { thumbUrl, originalUrl } = messageInData;

  if (!originalUrl) return;

  return (
    <>
      <VideoThumbnail
        url={thumbUrl}
        onClick={() => setViewerOpen(true)}
        type='talk'
      />
      <Viewer
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        data={[messageInData]}
      />
    </>
  );
}
