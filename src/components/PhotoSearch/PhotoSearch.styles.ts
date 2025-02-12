import { styled } from '@linaria/react';

export const PhotoSearchContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

export const PhotoSearchBar = styled.div`
  position: relative;
  display: flex;

  align-items: center;
  border-radius: 4px;
  padding: 0.5rem;
`;

export const PhotoSearchInput = styled.input`
  flex: 1;
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;

  &:focus {
    border: 1px solid #3b82f6;
  }
`;

// .search-bar {
//   position: relative;
//   display: flex;
//   width: 100%;
//   align-items: center;
//   border-radius: 4px;
//   padding: 0.5rem;

//   .search-input {
//     width: 100%;
//     padding: 0.5rem 1rem;
//     border-radius: 0.375rem;
//     border: 1px solid #e2e8f0;
//     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//     transition: box-shadow 0.2s ease;

//     &:focus {
//       border: 1px solid #3b82f6;
//     }
//   }

//   .search-actions {
//     position: absolute;
//     right: 1rem;

//     display: flex;
//     align-items: center;
//     gap: 0.5rem;

//     button {
//       border: 0;
//       background-color: transparent;

//       &:hover {
//         border: 0;
//         transform: scale(1.3);
//       }
//     }

//     .reset-button {
//       visibility: hidden;
//     }
//   }

//   .search-input:not(:placeholder-shown) ~ .search-actions .reset-button {
//     opacity: 1;
//     visibility: visible;
//   }
// }
