import { styled } from 'styled-components';

export const PhotoDetailsSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
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
  textAlign: 'left',
  listStyle: 'none',
  padding: 0,
  marginTop: '10px',

  '& > li': {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#1F2D5C',
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
  fontWeight: 'normal',
  color: '#3358D4',
  minWidth: '48px',
  display: 'inline-block',
});

export const PhotoDetailsInner = styled.div({
  maxWidth: '700px',
  width: 'calc(100% - 40px)',
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
});
