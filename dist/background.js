chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ info: 'Your data here' }, function () {
        console.log('Data is stored');
    });
});
