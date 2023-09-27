document.addEventListener('DOMContentLoaded', function() {
    // Get the current URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    let urlValue = urlParams.get('value');
    
    // Check if 'value' is empty or null, set it to 'us'
    if (urlValue === null || urlValue === '') {
        urlValue = 'us';
        urlParams.set("value", urlValue);
        // window.history.pushState({}, "", `${window.location.pathname}?${urlParams}`);

window.history.pushState({}, "", `${window.location.pathname}?${urlParams}`);

        
    }
    
    // window.location.href ='admin.php?page=interactive-geo-data-add&value=us';
    
    const menuLink = document.querySelector('a[href*="interactive-geo-data-add"]');
    if (menuLink) {
        menuLink.href += `&value=${urlValue}`;
    }

    // Assuming you're using fetch to retrieve data
    
 

});
