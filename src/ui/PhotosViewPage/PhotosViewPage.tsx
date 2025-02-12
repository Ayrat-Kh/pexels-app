import { PhotosGrid } from '@/ui/PhotosGrid';
import { PhotosViewContainer } from './PhotosViewPage.styles';

export const PhotosViewPage = () => {
  return (
    <PhotosViewContainer>
      {/* <SearchBar /> */}
      <PhotosGrid />
    </PhotosViewContainer>
  );
};
