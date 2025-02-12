import { Link, Navigate, useParams } from 'react-router';

import { PhotoDetailsParams } from '@/types/routeParams';
import { useFetchPhotoById } from '@/hooks/api/useFetchPhotoById';
import { NotFoundError } from '@/global/errors';
import { AppError } from '../AppError';
import { appRoutes } from '@/global/routes';
import {
  DescriptionList,
  DescriptionListItemLabel,
  PhotoDetailsSection,
  PhotoDetails,
  PhotoDetailsImg,
  ImageLink,
  PhotoDetailsInner,
} from './PhotoDetailsPage.styles';

export const PhotoDetailsPage = () => {
  const { photoId } = useParams<PhotoDetailsParams>();

  const { isLoading, data: photoDetails, error } = useFetchPhotoById(photoId);

  if (!photoId) {
    return <Navigate to={appRoutes.photosView.url} replace />;
  }

  if (isLoading) {
    return <PhotoDetails>Loading...</PhotoDetails>;
  }

  if (error || !photoDetails) {
    return (
      <AppError
        message={error instanceof NotFoundError ? 'Not found' : 'Unknown error'}
      />
    );
  }

  return (
    <PhotoDetails>
      <PhotoDetailsInner>
        <Link to={appRoutes.photosView.url}>To Photos List</Link>
        <PhotoDetailsSection>
          <h1>{photoDetails.photographer}</h1>

          <DescriptionList>
            <li>
              <DescriptionListItemLabel>Id:</DescriptionListItemLabel>
              {photoDetails.id}
            </li>
            <li>
              <DescriptionListItemLabel>Width: </DescriptionListItemLabel>
              {photoDetails.width}
            </li>
            <li>
              <DescriptionListItemLabel>Height: </DescriptionListItemLabel>
              {photoDetails.height}
            </li>
            <li>
              <DescriptionListItemLabel>URL: </DescriptionListItemLabel>
              <ImageLink
                href={photoDetails.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {photoDetails.url}
              </ImageLink>
            </li>
          </DescriptionList>

          <PhotoDetailsImg
            src={photoDetails.src.large}
            alt={photoDetails.alt}
          />
        </PhotoDetailsSection>
      </PhotoDetailsInner>
    </PhotoDetails>
  );
};
