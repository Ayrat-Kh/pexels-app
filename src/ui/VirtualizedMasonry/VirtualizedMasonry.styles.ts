import { styled } from '@linaria/react';

export const VirtualizedMasonryScrollView = styled.div`
  position: relative;
  overflow-y: auto;
  height: max(100dvh, 100%);
  width: 100%;
  background: red;
`;

export const VirtualizedMasonryContainer = styled.div`
  position: relative;
`;

export const VirtualizedMasonryItem = styled.div`
  position: absolute;
`;
