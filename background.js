chrome.tabs.query({url: "*://*.linkedin.com/*"}, function(tabs) {
    if (tabs.length === 0) {
        console.log("No LinkedIn tabs found.");
        return;
    }
    console.log(`Found ${tabs.length} LinkedIn tabs:`);
    tabs.forEach((tab, index) => {
        console.log(`${index + 1}. Title: "${tab.title}" | URL: ${tab.url} | Window ID: ${tab.windowId}`);
    });
}); 