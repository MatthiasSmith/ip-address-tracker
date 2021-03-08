import React, { Fragment, useEffect, useState } from 'react';

import GlobalStyles from './global-styles';
import Attribution from './components/attribution';
import Title from './components/title';
import SearchForm from './components/search-form';
import LocationDetailsContainer from './components/location-details/location-details-container';
import LocationMap from './components/location-map';

const App = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [query, setQuery] = useState('');
  const { ip, isp, location } = data;

  let timezone;
  let locationDisplay;
  let lat;
  let lng;

  if (location) {
    locationDisplay = `${location.city}, ${location.region}, ${location.country} ${location.postalCode}`;
    timezone = location.timezone;
    lat = data.location.lat;
    lng = data.location.lng;
  }

  useEffect(() => fetchIPData(), []);

  const fetchIPData = () => {
    let ipglRequestUrl = `https://geo.ipify.org/api/v1?apiKey=${process.env.IP_GL_API}`;
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;
    if (query) {
      ipglRequestUrl += ipRegex.test(query)
        ? `&ipAddress=${query}`
        : `&domain=${query}`;
    }

    setIsFetching(true);

    window
      .fetch(ipglRequestUrl)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log(error))
      .finally(() => setIsFetching(false));
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    fetchIPData();
  };

  return (
    <Fragment>
      <GlobalStyles />
      <section className='top-section'>
        <Title />
        <SearchForm
          onChange={handleQueryChange}
          onSearch={handleSearch}
          ipAddress={ip}
        />
        <LocationDetailsContainer
          ip={ip}
          isp={isp}
          timezone={timezone}
          location={locationDisplay}
          isFetching={isFetching}
        />
      </section>
      <LocationMap lat={lat} lng={lng} />
      <Attribution />
    </Fragment>
  );
};

export default App;
