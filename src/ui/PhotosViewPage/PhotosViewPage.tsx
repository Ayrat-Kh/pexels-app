import { PhotosGrid } from '@/ui/PhotosGrid';
import { PhotosViewContainer } from './PhotosViewPage.styles';
import { PhotoSearch } from '../PhotoSearch';

export const PhotosViewPage = () => {
  return (
    <PhotosViewContainer>
      <PhotoSearch />
      <PhotosGrid />
    </PhotosViewContainer>
  );
};
