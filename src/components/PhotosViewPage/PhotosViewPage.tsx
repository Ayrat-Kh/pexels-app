import { PhotosGrid } from '@/components/PhotosGrid';
import { PhotoSearch } from '../PhotoSearch';
import { PageLayout } from '../ui';

export const PhotosViewPage = () => {
  return (
    <PageLayout align="center">
      <PhotoSearch />
      <PhotosGrid />
    </PageLayout>
  );
};
