import { Link, Navigate, useLocation, useParams } from 'react-router';

import { PhotoDetailsParams } from '@/types/routeParams';
import { useFetchPhotoById } from '@/hooks/api/useFetchPhotoById';
import { NotFoundError } from '@/global/errors';
import { AppError } from '../AppError';
import { appRoutes } from '@/global/routes';
import {
  DescriptionList,
  DescriptionListItemLabel,
  PhotoDetailsSection,
  PhotoDetailsImg,
  ImageLink,
  PhotoDetailsInner,
} from './PhotoDetailsPage.styles';
import { Loading } from '../Loading';
import { PageLayout } from '../ui';

export const PhotoDetailsPage = () => {
  const { photoId } = useParams<PhotoDetailsParams>();

  const { search } = useLocation();

  const { isLoading, data: photoDetails, error } = useFetchPhotoById(photoId);

  if (!photoId) {
    return <Navigate to={appRoutes.photosView.url} replace />;
  }

  if (isLoading) {
    return (
      <PageLayout isCentered>
        <Loading />
      </PageLayout>
    );
  }

  if (error || !photoDetails) {
    return (
      <PageLayout isCentered>
        <AppError
          message={
            error instanceof NotFoundError ? 'Not found' : 'Unknown error'
          }
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout align="center">
      <PhotoDetailsInner>
        <Link
          to={{
            pathname: appRoutes.photosView.url,
            search,
          }}
        >
          Back to Photos
        </Link>
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
            src={photoDetails.src.original}
            alt={photoDetails.alt}
          />
        </PhotoDetailsSection>
      </PhotoDetailsInner>
    </PageLayout>
  );
};
