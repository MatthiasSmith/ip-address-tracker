import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import SearchButton from './search-button';

const StyledSearchForm = styled.form`
  height: var(--search-bar-height);
  border-radius: var(--border-radius);
  margin: 0 auto 1.4rem;
  max-width: 555px;
  overflow: hidden;
  position: relative;

  @media (min-width: 768px) {
    margin-bottom: 2.6rem;
  }
`;

const StyledSearchInput = styled.input.attrs((props) => ({
  type: 'text',
}))`
  appearance: none;
  background: white;
  border: none;
  font-size: 1rem;
  height: 100%;
  width: 100%;
  padding: 0 1.5rem;

  &::placeholder {
    color: var(--dark-gray);
    font-weight: var(--font-weight-medium);
  }
`;

const SearchForm = ({ ipAddress, onChange, onSearch }) => {
  return (
    <StyledSearchForm>
      <StyledSearchInput
        onChange={onChange}
        placeholder='Search for any IP address or domain'
        aria-label='Search for any IP address or domain'
      />
      <SearchButton onSubmit={onSearch} />
    </StyledSearchForm>
  );
};

export default SearchForm;
