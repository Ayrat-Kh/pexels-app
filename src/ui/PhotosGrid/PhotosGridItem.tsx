import { generatePath, Link } from 'react-router';
import { appRoutes } from '@/global/routes';
import { PhotoResult } from '@/types';
import { PhotoImage } from './PhotosGridItem.styles';

const imgSizes = ['(max-width: 900px) 100%', '(min-width: 901px) 100%'].join(
  ', '
);

type PhotosGridItem = {
  data: PhotoResult;
};

export const PhotosGridItem = ({ data }: PhotosGridItem) => {
  const { src, alt, id } = data;

  const srcSet = [`${src.large} 900w`, `${src.large2x}`].join(', ');

  return (
    <Link to={generatePath(appRoutes.photoDetails.url, { photoId: `${id}` })}>
      <PhotoImage srcSet={srcSet} sizes={imgSizes} alt={alt} />
    </Link>
  );
};
