import { PhotosGrid } from '@/ui/PhotosGrid';
import { PhotosViewContainer } from './PhotosView.styles';

export const PhotosView = () => {
  return (
    <PhotosViewContainer>
      {/* <SearchBar /> */}
      <PhotosGrid />
    </PhotosViewContainer>
  );
};
