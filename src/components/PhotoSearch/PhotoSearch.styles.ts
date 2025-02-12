import { styled } from 'styled-components';

export const PhotoSearchBar = styled.div({
  gap: '8px',
  display: 'flex',
  justifyContent: 'stretch',
  alignItems: 'center',
  width: '100%',
  marginBottom: '20px',
});

export const PhotoSearchInput = styled.input({
  flex: '1',
  width: '100%',
  padding: '4px 8px',
  borderRadius: '0.375rem',
  border: '1px solid #e2e8f0',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  '&:focus': {
    border: '1px solid #3b82f6',
  },
});

export const PhotoSearchReset = styled.button({
  padding: '4px 8px',
  borderRadius: '0.375rem',
  border: '1px solid #e2e8f0',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
});
