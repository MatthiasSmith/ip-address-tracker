import React from 'react';
import styled from 'styled-components';

import IconArrow from '../../public/images/icon-arrow.svg';

const StyledButton = styled.button`
  appearance: none;
  background: black;
  border: none;
  cursor: pointer;
  height: 100%;
  width: var(--search-bar-height);
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;

  &:hover {
    background: hsl(0deg 0% 25%);
  }
`;

const SearchButton = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <StyledButton
      type='submit'
      className='flex-center'
      onClick={handleSubmit}
      aria-label='search'
    >
      <img src={IconArrow} alt='' />
    </StyledButton>
  );
};

export default SearchButton;
