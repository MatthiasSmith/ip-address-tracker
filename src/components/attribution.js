import React from 'react';
import styled from 'styled-components';

const StyledAttribution = styled.div`
  background: rgba(255, 255, 255, 0.7);
  color: #333;
  font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-size: 11px;
  padding: 0px 5px;
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: left;
  max-width: 46%;
  z-index: 800;

  a {
    color: #0078a8;
  }
`;

const Attribution = () => {
  return (
    <StyledAttribution>
      <span>Challenge by </span>
      <a href='https://www.frontendmentor.io?ref=challenge' target='_blank'>
        Frontend Mentor
      </a>
      <span>. Coded by</span> <a href='#'>Matthias</a>.
    </StyledAttribution>
  );
};

export default Attribution;
