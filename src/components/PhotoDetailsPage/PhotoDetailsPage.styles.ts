import { styled } from 'styled-components';

export const PhotoDetailsSection = styled.div({
  marginTop: '20px',
  padding: '20px',
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

export const PhotoDetailsImg = styled.img({
  width: '100%',
  objectFit: 'cover',
  borderRadius: '8px',
  marginTop: '15px',
});

export const DescriptionList = styled.ul({
  listStyle: 'none',
  padding: 0,
  marginTop: '10px',

  li: {
    fontSize: '14px',
    color: '#53b365',
    marginTop: '4px',
  },
});

export const ImageLink = styled.a({
  color: '#007bff',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
});

export const DescriptionListItemLabel = styled.span({
  color: '#25482d',
  minWidth: '48px',
  display: 'inline-block',
});

export const PhotoDetailsInner = styled.div({
  maxWidth: '700px',
  width: 'calc(100% - 40px)',
});
