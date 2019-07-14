//simple checkboxes - toggles

let pricing = document.getElementById("itemPricing");

chrome.storage.local.get('itemPricing', function(result) {
    pricing.checked = result.itemPricing;
});

pricing.addEventListener("click", function () {
    chrome.storage.local.set({itemPricing: pricing.checked}, function() {});
});

let markscammers = document.getElementById("markScammers");

chrome.storage.local.get('markScammers', function(result) {
    markscammers.checked = result.markScammers;
});

markscammers.addEventListener("click", function () {
    chrome.storage.local.set({markScammers: markscammers.checked}, function() {});
});

let tradersbump = document.getElementById("tradersBump");

chrome.storage.local.get('tradersBump', function(result) {
    tradersbump.checked = result.tradersBump;
});

tradersbump.addEventListener("click", function () {
    chrome.storage.local.set({tradersBump: tradersbump.checked}, function() {});
});

let loungebump = document.getElementById("loungeBump");

chrome.storage.local.get('loungeBump', function(result) {
    loungebump.checked = result.loungeBump;
});

loungebump.addEventListener("click", function () {
    chrome.storage.local.set({loungeBump: loungebump.checked}, function() {});
});

let colorfulitems = document.getElementById("colorfulItems");

chrome.storage.local.get('colorfulItems', function(result) {
    colorfulitems.checked = result.colorfulItems;
});

colorfulitems.addEventListener("click", function () {
    chrome.storage.local.set({colorfulItems: colorfulitems.checked}, function() {});
});

let showrealstatus = document.getElementById("showRealStatus");

chrome.storage.local.get('showRealStatus', function(result) {
    showrealstatus.checked = result.showRealStatus;
});

showrealstatus.addEventListener("click", function () {
    chrome.storage.local.set({showRealStatus: showrealstatus.checked}, function() {});
});

let flagcomments = document.getElementById("flagScamComments");

chrome.storage.local.get('flagScamComments', function(result) {
    flagcomments.checked = result.flagScamComments;
});

flagcomments.addEventListener("click", function () {
    chrome.storage.local.set({flagScamComments: flagcomments.checked}, function() {});
});

let quickdecline = document.getElementById("quickDeclineOffers");

chrome.storage.local.get('quickDeclineOffers', function(result) {
    quickdecline.checked = result.quickDeclineOffers;
});

quickdecline.addEventListener("click", function () {
    chrome.storage.local.set({quickDeclineOffers: quickdecline.checked}, function() {});
});

let openintab = document.getElementById("openOfferInTab");

chrome.storage.local.get('openOfferInTab', function(result) {
    openintab.checked = result.openOfferInTab;
});

openintab.addEventListener("click", function () {
    chrome.storage.local.set({openOfferInTab: openintab.checked}, function() {});
});

let showrepbutton = document.getElementById("showPlusRepButton");

chrome.storage.local.get('showPlusRepButton', function(result) {
    showrepbutton.checked = result.showPlusRepButton;
});

showrepbutton.addEventListener("click", function () {
    chrome.storage.local.set({showPlusRepButton: showrepbutton.checked}, function() {});
});

let showreoccbutton = document.getElementById("showReoccButton");

chrome.storage.local.get('showReoccButton', function(result) {
    showreoccbutton.checked = result.showReoccButton;
});

showreoccbutton.addEventListener("click", function () {
    chrome.storage.local.set({showReoccButton: showreoccbutton.checked}, function() {});
});

let nsfw = document.getElementById("nsfw");

chrome.storage.local.get('nsfwFilter', function(result) {
    nsfw.checked = result.nsfwFilter;
});

nsfw.addEventListener("click", function () {
    chrome.storage.local.set({nsfwFilter: nsfw.checked}, function() {});
});

// checkboxes - toggles with logic

let tabsAPI = document.getElementById("tabsAPI");

chrome.permissions.contains({permissions: ['tabs']}, function(result) {
    tabsAPI.checked = result;
});

tabsAPI.addEventListener("click", function () {
    if(tabsAPI.checked){
        chrome.permissions.request({permissions: ['tabs']}, function(granted) {
            tabsAPI.checked = granted;
        });
    }
    else{
        chrome.permissions.remove({permissions: ['tabs']}, function(removed) {});
    }
});

// textbox modals

repmessage = document.getElementById("reputationMessageValue");
repmessageprint = document.getElementById("reputationMessagePrinted");
repmessagesave = document.getElementById("reputationMessageValueSave");

chrome.storage.local.get(['reputationMessage'], function(result) {
    repmessageprint.textContent = result.reputationMessage.substring(0,8)+"...";
    repmessage.value = result.reputationMessage;
});

repmessagesave.addEventListener("click", function () {
    let newmessage = repmessage.value;
    repmessageprint.textContent = newmessage.substring(0,8)+"...";
    chrome.storage.local.set({reputationMessage: newmessage}, function() {});
});

reoccmessage = document.getElementById("reoccuringMessageValue");
reoccmessageprint = document.getElementById("reoccuringMessagePrinted");
reoccmessagesave = document.getElementById("reoccuringMessageValueSave");

chrome.storage.local.get(['reoccuringMessage'], function(result) {
    reoccmessageprint.textContent = result.reoccuringMessage.substring(0,8)+"...";
    reoccmessage.value = result.reoccuringMessage;
});

reoccmessagesave.addEventListener("click", function () {
    let newmessage = reoccmessage.value;
    reoccmessageprint.textContent = newmessage.substring(0,8)+"...";
    chrome.storage.local.set({reoccuringMessage: newmessage}, function() {});
});

apikey = document.getElementById("steamAPIKeyValue");
apikeyprint = document.getElementById("steamAPIKeyPrinted");
apikeysave = document.getElementById("steamAPIKeyValueSave");

chrome.storage.local.get(['steamAPIKey', 'apiKeyValid'], function(result) {
    if(result.apiKeyValid){
        apikeyprint.textContent = result.steamAPIKey.substring(0,8)+"...";
        apikey.value = result.steamAPIKey;
    }
    else{
        apikeyprint.textContent = "Not set";
        apikey.value = "Not set";
    }
});

apikeysave.addEventListener("click", function () {
    let newapikey = apikey.value;
    chrome.runtime.sendMessage({apikeytovalidate: newapikey}, function(response) {
        if(response.valid){
            chrome.storage.local.set({steamAPIKey: newapikey, apiKeyValid: true}, function() {
                apikeyprint.textContent = newapikey.substring(0,8)+"...";
                document.getElementById("invalidAPIWarning").remove();
                //document.getElementById("steamAPIkeyModal").modal("hide");
                $("#steamAPIkeyModal").modal("hide"); //TODO figure out how to lose jquery here
            });
        }
        else{
            let invalidDiv = document.createElement("div");
            invalidDiv.classList.add("warning");
            invalidDiv.id="invalidAPIWarning";
            invalidDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <span class="warning">Could not validate your API key, it\'s either incorrect or Steam is down at the moment</span>';
            apikey.parentNode.insertBefore(invalidDiv, apikey.nextSibling);
        }
    });
});

// number inputs
numberoflistings = document.getElementById("numberOfListings");

chrome.storage.local.get('numberOfListings', function(result) {numberoflistings.value = result.numberOfListings});

numberoflistings.addEventListener("input", function () {
    let number = parseInt(this.value);
    if(number<10){
        number = 10;
    }
    else if(number>100){
        number = 100;
    }
    chrome.storage.local.set({numberOfListings: number}, function() {});
});

//select

let currencySelect = document.getElementById("currency");

let keys = Object.keys(currencies);
    for (let key of keys){
        let option = document.createElement("option");
        option.value = currencies[key].short;
        option.text = currencies[key].short + " - " + currencies[key].long;
        currencySelect.add(option);
    }

chrome.storage.local.get('currency', function(result) {
    document.querySelector('#currency [value="' + result.currency + '"]').selected = true;
});

currencySelect.addEventListener("click", function () {
    let currency = currencySelect.options[currencySelect.selectedIndex].value;
    chrome.storage.local.set({currency: currency}, function() {
        updateExchangeRates();
    });
});
