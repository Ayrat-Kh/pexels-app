import { styled } from 'styled-components';

export const PhotoSearchContainer = styled.div({
  display: 'flex',
  gap: '8px',
  marginBottom: '20px',
});

export const PhotoSearchBar = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
});

export const PhotoSearchInput = styled.input({
  flex: '1',
  width: '100%',
  borderRadius: '0.375rem',
  border: '1px solid #e2e8f0',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.2s ease',
  '&:focus': {
    border: '1px solid #3b82f6',
  },
});
