import { styled } from 'styled-components';

export const VirtualizedMasonryScrollView = styled.div({
  position: 'relative',
  overflowY: 'auto',
  height: '100%',
  width: '100%',
});

export const VirtualizedMasonryContainer = styled.div({
  position: 'relative',
});

export const VirtualizedMasonryItem = styled.div({
  position: 'absolute',
});
