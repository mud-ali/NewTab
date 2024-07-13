chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ infoo: 'Your data here' }, function () {
        console.log('Data is stored');
    });
});
