import { PhotosGrid } from '@/ui/PhotosGrid';
import { PhotosViewContainer } from './PhotosView.styles';
// import SearchBar from '../../ui/SearchBar';

function PhotosView() {
  return (
    <PhotosViewContainer>
      {/* <SearchBar /> */}
      <PhotosGrid />
    </PhotosViewContainer>
  );
}

export default PhotosView;
