import styled, { css, keyframes } from 'styled-components';

type LoadingProps = {
  $isLoading: boolean;
};

const pulse = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const animation = () =>
  css<LoadingProps>`
    ${pulse} 1s infinite alternate;
  `;

export const LoadingMore = styled.div<LoadingProps>`
  width: 100%;
  height: 20px;
  background: gray;
  opacity: 0;
  animation: ${({ $isLoading }) => ($isLoading ? animation : undefined)};
`;
