const sortingModes = {
  default: {
    key: 'default',
    name: 'Default (position last to first)',
  },
  reverse: {
    key: 'reverse',
    name: 'Reverse (position first to last)',
  },
  price_desc: {
    key: 'price_desc',
    name: 'Price (expensive to cheap)',
  },
  price_asc: {
    key: 'price_asc',
    name: 'Price (cheap to expensive)',
  },
  name_asc: {
    key: 'name_asc',
    name: 'Alphabetical (a to z)',
  },
  name_desc: {
    key: 'name_desc',
    name: 'Alphabetical (z to a)',
  },
  tradability_desc: {
    key: 'tradability_desc',
    name: 'Tradability (untradable to tradable)',
  },
  tradability_asc: {
    key: 'tradability_asc',
    name: 'Tradability (tradable to untradable)',
  },
  float_asc: {
    key: 'float_asc',
    name: 'Float (lowest to highest)',
  },
  float_desc: {
    key: 'float_desc',
    name: 'Float (highest to lowest)',
  },
  sticker_price_asc: {
    key: 'sticker_price_asc',
    name: 'Sticker price (cheap to expensive)',
  },
  sticker_price_desc: {
    key: 'sticker_price_desc',
    name: 'Sticker price (expensive to cheap)',
  },
};

const offersSortingModes = {
  default: {
    key: 'default',
    name: 'Default (received last to first)',
  },
  reverse: {
    key: 'reverse',
    name: 'Reverse (received first to last)',
  },
  profit_amount: {
    key: 'profit_amount',
    name: 'Profit amount (most profitable to biggest loss)',
  },
  loss_amount: {
    key: 'loss_amount',
    name: 'Loss amount (biggest loss to most profitable)',
  },
  profit_percentage: {
    key: 'profit_percentage',
    name: 'Profit percentage (highest to lowest)',
  },
  loss_percentage: {
    key: 'loss_percentage',
    name: 'Loss percentage (lowest to highest)',
  },
};

export { sortingModes, offersSortingModes };
