import { getSessionID } from 'utils/utilsModular';

const removeListing = (listingID) => {
  return new Promise((resolve, reject) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    const request = new Request(`https://steamcommunity.com/market/removelisting/${listingID}`,
      {
        method: 'POST',
        headers: myHeaders,
        body: `sessionid=${getSessionID()}`,
      });

    const fetchFunction = window.content !== undefined ? window.content.fetch : fetch;

    fetchFunction(request).then((response) => {
      if (!response.ok) {
        console.log(`Error code: ${response.status} Status: ${response.statusText}`);
        reject({ status: response.status, statusText: response.statusText });
      } else resolve('success');
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
};

const cancelOrder = (orderID) => {
  return new Promise((resolve, reject) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    const request = new Request('https://steamcommunity.com/market/cancelbuyorder/',
      {
        method: 'POST',
        headers: myHeaders,
        body: `sessionid=${getSessionID()}&buy_orderid=${orderID}`,
      });

    const fetchFunction = window.content !== undefined ? window.content.fetch : fetch;

    fetchFunction(request).then((response) => {
      if (!response.ok) {
        console.log(`Error code: ${response.status} Status: ${response.statusText}`);
        reject({ status: response.status, statusText: response.statusText });
      } else resolve('success');
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
};

const listItem = (appID, contextID, amount, assetID, price) => {
  return new Promise((resolve, reject) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    const request = new Request('https://steamcommunity.com/market/sellitem/',
      {
        method: 'POST',
        headers: myHeaders,
        body: `sessionid=${getSessionID()}&appid=${appID}&contextid=${contextID}&amount=${amount}&assetid=${assetID}&price=${price}`,
      });

    // works around the different behavior when fetching from chromium or ff
    // This is accomplished by exposing more privileged XHR and
    // fetch instances in the content script,
    // which has the side-effect of not setting the Origin and
    // Referer headers like a request from the page itself would;
    // this is often preferable to prevent the request from revealing its cross-orign nature.
    // In Firefox, extensions that need to perform requests that behave as if they were
    // sent by the content itself can use  content.XMLHttpRequest and content.fetch() instead.
    // For cross-browser extensions, the presence of these methods must be feature-detected.
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#XHR_and_Fetch
    const fetchFunction = window.content !== undefined ? window.content.fetch : fetch;

    fetchFunction(request).then((response) => {
      console.log(response);
      if (!response.ok) {
        console.log(`Error code: ${response.status} Status: ${response.statusText}`);
        reject({ status: response.status, statusText: response.statusText });
      } else return response.json();
    }).then((body) => {
      if (body.success) {
        resolve(body);
      } else reject(body);
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
};

const getMarketHistory = (start, count) => {
  return new Promise((resolve, reject) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    const request = new Request(`https://steamcommunity.com/market/myhistory/?start=${start}&count=${count}`,
      {
        method: 'POST',
        headers: myHeaders,
        body: `sessionid=${getSessionID()}`,
      });

    const fetchFunction = window.content !== undefined ? window.content.fetch : fetch;

    fetchFunction(request).then((response) => {
      if (!response.ok) {
        console.log(`Error code: ${response.status} Status: ${response.statusText}`);
        reject({ status: response.status, statusText: response.statusText });
      }
      return response.json();
    }).then((historyJSON) => {
      if (historyJSON === null) reject('success:false');
      else if (historyJSON.success === true) resolve(historyJSON);
      else reject('success:false');
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
};

export {
  removeListing, cancelOrder, getMarketHistory, listItem,
};
