import { appRoutes } from '@/global/routes';
import { Link } from 'react-router';

type AppErrorProps = {
  message: string;
};

export const AppError = ({ message }: AppErrorProps) => {
  return (
    <div className="error-container">
      <h1>{message}</h1>
      <Link to={appRoutes.photosView.url}>Go Back</Link>
    </div>
  );
};

// .error-container {
//   max-width: 600px;
//   margin: 20px auto;
//   padding: 20px;
//   background: #fff;
//   border-radius: 12px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   text-align: center;

//   .error-title {
//     font-size: 22px;
//     color: #d9534f;
//     margin-bottom: 10px;
//   }

//   .error-message {
//     font-size: 16px;
//     color: #666;
//     margin-bottom: 20px;
//   }

//   .backButton {
//     background: #007bff;
//     color: #fff;
//     border: none;
//     padding: 10px 15px;
//     font-size: 16px;
//     border-radius: 8px;
//     cursor: pointer;
//     transition: background 0.3s ease-in-out;

//     &:hover {
//       background: #0056b3;
//     }
//   }
// }
