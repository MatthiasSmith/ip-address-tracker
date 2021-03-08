import React from 'react';
import styled from 'styled-components';

const StyledInfoCell = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 1.25rem;
  }

  .info-label {
    color: var(--dark-gray);
    text-transform: uppercase;
    letter-spacing: 1.1px;
    font-weight: var(--font-weight-medium);
    font-size: 0.6rem;
    line-height: 0.6rem;
    margin-bottom: 0.48rem;
    text-align: center;
  }

  .info-data {
    color: var(--ver-dark-gray);
    font-size: 1.11rem;
    font-weight: var(--font-weight-medium);
    text-align: center;
  }

  @media (min-width: 768px) {
    flex: 1;

    &:not(:last-of-type) {
      border-right: 1px solid #ddd;
      margin-bottom: 0;
      margin-right: 1.75rem;
      padding-right: 1.75rem;
    }

    .info-label,
    .info-data {
      text-align: left;
    }
  }

  @media (min-width: 1024px) {
    .info-label {
      font-size: 0.7rem;
      line-height: 0.7rem;
      margin-bottom: 0.8rem;
    }

    .info-data {
      font-size: 1.42rem;
    }
  }
`;

const InfoCell = (props) => {
  return (
    <StyledInfoCell>
      <h3 className='info-label'>{props.label}</h3>
      <h2 className='info-data'>{props.infoData}</h2>
    </StyledInfoCell>
  );
};

export default InfoCell;
