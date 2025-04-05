document.addEventListener('DOMContentLoaded', function() {
  // Query for LinkedIn tabs
  chrome.tabs.query({url: "*://*.linkedin.com/*"}, function(tabs) {
    const tabsList = document.getElementById('tabs-list');
    const noTabsMessage = document.getElementById('no-tabs-message');
    
    // Clear any existing tabs
    tabsList.innerHTML = '';
    
    if (tabs.length === 0) {
      // Show "no tabs" message
      noTabsMessage.style.display = 'block';
      return;
    }
    
    // Hide "no tabs" message
    noTabsMessage.style.display = 'none';
    
    // Add each tab to the list
    tabs.forEach(function(tab) {
      const li = document.createElement('li');
      
      // Create tab title element
      const tabTitle = document.createElement('span');
      tabTitle.className = 'tab-title';
      tabTitle.textContent = tab.title;
      tabTitle.title = tab.url; // Show full URL on hover
      
      // Create close button
      const closeBtn = document.createElement('button');
      closeBtn.className = 'close-btn';
      closeBtn.textContent = 'Close';
      closeBtn.title = 'Close this tab';
      
      // Add click event to close the tab
      closeBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the li click event
        chrome.tabs.remove(tab.id, function() {
          // Remove the item from the list once the tab is closed
          li.remove();
          
          // If no tabs left, show the message
          if (tabsList.children.length === 0) {
            noTabsMessage.style.display = 'block';
          }
        });
      });
      
      // Add click event to switch to the tab
      li.addEventListener('click', function() {
        chrome.tabs.update(tab.id, {active: true});
        chrome.windows.update(tab.windowId, {focused: true});
      });
      
      // Add elements to the list item
      li.appendChild(tabTitle);
      li.appendChild(closeBtn);
      
      // Add the list item to the tabs list
      tabsList.appendChild(li);
    });
  });
}); 