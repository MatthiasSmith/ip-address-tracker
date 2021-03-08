import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  color: white;
  font-size: 1.42rem;
  font-weight: var(--font-weight-medium);
  line-height: 1rem;
  margin-bottom: 2.11rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 1.72rem;
    line-height: 1;
    margin-bottom: 1.85rem;
  }
`;

const Title = () => {
  return <StyledTitle>IP Address Tracker</StyledTitle>;
};

export default Title;
