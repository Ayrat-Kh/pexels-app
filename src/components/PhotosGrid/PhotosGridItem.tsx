import { generatePath, Link } from 'react-router';
import { appRoutes } from '@/global/routes';
import { PhotoResult } from '@/types';
import { PhotoImage } from './PhotosGridItem.styles';
import { SCROLL_POSITION_KEY } from '@/global/constants';
import { MasonryContainerData } from '../VirtualizedMasonry';

const imgSizes = ['(max-width: 900px) 100%', '(min-width: 901px) 100%'].join(
  ', '
);

type PhotosGridItem = {
  data: PhotoResult;
  container: MasonryContainerData;
};

export const PhotosGridItem = ({ data, container }: PhotosGridItem) => {
  const { src, alt, id } = data;

  const handleClick = () => {
    sessionStorage.setItem(SCROLL_POSITION_KEY, JSON.stringify(container));
  };

  const srcSet = [`${src.large} 900w`, `${src.large2x}`].join(', ');

  return (
    <Link
      to={{
        pathname: generatePath(appRoutes.photoDetails.url, {
          photoId: `${id}`,
        }),
        search: location.search,
      }}
      onClick={handleClick}
    >
      <PhotoImage srcSet={srcSet} sizes={imgSizes} alt={alt} />
    </Link>
  );
};
