import { styled } from '@linaria/react';

export const PhotoDetailsSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const PhotoDetailsImg = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 15px;
`;

export const DescriptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;

  li {
    font-size: 14px;
    color: #53b365;
    margin-top: 4px;
  }
`;

export const ImageLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const DescriptionListItemLabel = styled.span`
  color: #25482d;
  min-width: 48px;
  display: inline-block;
`;

export const PhotoDetailsInner = styled.div`
  max-width: 700px;
  width: calc(100% - 40px);
`;
