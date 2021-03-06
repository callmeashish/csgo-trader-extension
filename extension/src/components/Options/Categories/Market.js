import React from 'react';

import Row from 'components/Options/Row';
import Category from '../Category/Category';

const market = () => {
  return (
    <Category title="Market">
      <Row
        name="Listings per page"
        id="numberOfListings"
        type="select"
        description="The number of market listings you want to see when you load the market page of an item"
        options={
                    [
                      {
                        key: 10,
                        text: 10,
                      },
                      {
                        key: 20,
                        text: 20,
                      },
                      {
                        key: 50,
                        text: 50,
                      },
                      {
                        key: 100,
                        text: 100,
                      },
                    ]
                }
      />
      <Row
        name="Get float values automatically"
        id="autoFloatMarket"
        type="flipSwitchStorage"
        description="Loads float values to each item when on. It does not load float values if the csgofloat extension is present to avoid interference."
      />
      <Row
        name="Original price"
        id="marketOriginalPrice"
        type="flipSwitchStorage"
        description={'Show the price of listings in the seller\'s currency too as well as what they will receive after fees.'}
      />
      <Row
        name="Reload listings on error"
        id="reloadListingOnError"
        type="flipSwitchStorage"
        description="Reloads listings pages 5 seconds after they load if they don't load properly (load with an error message instead of the listings)."
      />
      <Row
        name="Show Real money/other market links on listings"
        id="showRealMoneySiteLinks"
        type="flipSwitchStorage"
        description="Puts links to the Real Money marketplaces to market listings pages"
      />
    </Category>
  );
};

export default market;
