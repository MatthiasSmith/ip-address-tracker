import React, { Fragment } from 'react';
import styled from 'styled-components';

import InfoCell from './info-cell';

const StyledLocationDetailsContainer = styled.div`
  background: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;

  .loading-container,
  .error-container {
    height: 238px;
    flex: 1;
  }

  .error-message {
    text-align: center;
    font-size: 0.95rem;
    line-height: 1.3em;
  }

  .loading-header {
    color: var(--ver-dark-gray);
    font-size: 1.11rem;
    font-weight: var(--font-weight-medium);
    position: relative;
    text-align: center;

    @keyframes move-right {
      to {
        transform: translateX(1rem);
      }
    }

    &::after {
      content: '';
      position: absolute;
      background-color: #fff;
      width: 0.6rem;
      height: 1rem;
      bottom: 0;
      right: 0;
      animation: move-right 2s steps(3, end) 500ms infinite;
    }
  }

  .error-container {
    flex-flow: column;
  }

  .error-header {
    color: var(--very-dark-gray);
    margin-bottom: 1rem;
  }

  @media (min-width: 768px) {
    display: flex;
    max-width: 95%;
    margin: 0 auto;
    padding: 1.95rem;

    .loading-container,
    .error-container {
      height: 88px;
    }

    .error-message {
      max-width: 60%;
    }
  }

  @media (min-width: 1024px) {
    max-width: 80%;
  }
`;

const LocationDetailsContainer = ({
  ip,
  isp,
  timezone,
  location,
  isFetching,
  hasError,
}) => {
  const renderInfo = (ip, location, timezone, isp) => {
    return (
      <Fragment>
        <InfoCell label='IP Address' infoData={ip} />
        <InfoCell label='Location' infoData={location} />
        <InfoCell label='Timezone' infoData={`UTC ${timezone}`} />
        <InfoCell label='ISP' infoData={isp} />
      </Fragment>
    );
  };

  const renderError = () => {
    return (
      <div className='error-container flex-center'>
        <h2 className='error-header'>Oops!</h2>
        <p className='error-message'>
          Please make sure you are using a valid IP address or domain, and that
          your browser is not blocking requests.
        </p>
      </div>
    );
  };

  const renderLoading = () => {
    return (
      <div className='loading-container flex-center'>
        <h2 className='loading-header'>Searching...</h2>
      </div>
    );
  };

  return (
    <StyledLocationDetailsContainer>
      {isFetching
        ? renderLoading()
        : hasError
        ? renderError()
        : renderInfo(ip, location, timezone, isp)}
    </StyledLocationDetailsContainer>
  );
};

export default LocationDetailsContainer;
