// Listen for messages from content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // Check if the message requests opening the popup
    if (message.openPopup) {
        // Get the URL of the popup.html
        const popupURL = chrome.runtime.getURL('popup.html');

        // Open a new tab with the popup URL
        chrome.windows.create({ url: popupURL });
    }
});