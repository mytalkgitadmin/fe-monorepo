import { FeaturesPage } from '@/pages/features';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/features')({
  component: FeaturesPage,
});
