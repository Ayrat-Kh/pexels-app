import { APP_ROUTES } from '@/global/routes';
import { Link } from 'react-router';

type AppErrorProps = {
  message: string;
};

export const AppError = ({ message }: AppErrorProps) => {
  return (
    <>
      <h1>{message}</h1>
      <Link to={APP_ROUTES.photosView.url}>Go Back</Link>
    </>
  );
};
