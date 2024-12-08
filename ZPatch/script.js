
// Variables
let layoutWrapper = undefined;

// Observer that detects when the bundle builder popup opens or closes 
const observer = new MutationObserver((mutations) => {
    // For each mutation detected check if it is the bundle builder popup
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {

            // If bundle builder is opened
            mutation.addedNodes.forEach(node => {
                if (node.matches && node.matches('.Popup-Content')) {

                    // Check if content is loaded in intervals of 100ms
                    let interval = setInterval(() => {
                        try {
                            layoutWrapper =  document.querySelector('.PackageDealProductList-LayoutWrapper');
                        }
                        catch (error) {
                            layoutWrapper = undefined;
                        }
        
                        // If content is loaded clear interval and add the searchbar 
                        if (layoutWrapper) {
                            clearInterval(interval);
                            let searchBar = document.createElement('input');
                            layoutWrapper.appendChild(searchBar);
                            // Create searchbar functionality
                            searchFunctionality(searchBar);
                        }
                    }, 100);
                }
            });

            // If bundle builder is closed
            mutation.removedNodes.forEach(node => {
                if (node.matches && node.matches('.Popup-Content')) {
                    // Reset layoutWrapper variable
                    layoutWrapper = undefined;
                }
            });
        }
    });
});

// Run the observer
observer.observe(document.body, { childList: true, subtree: true });

function searchFunctionality(searchBar) {
    // Searchbar styling
    searchBar.placeholder = 'SKU';
    searchBar.className = 'SearchField-Input SearchField-Input_isActive';
    searchBar.style.width = '50%';

    // When enter is pressed inside searchbar
    searchBar.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            // Submit query
            submit(searchBar.value);
            // Unselect searchbar
            searchBar.blur();
        }
    });
} 

function submit(query) {
    let popupContent = document.querySelector('.Popup-Content');
    //let pagination = popupContent.querySelector('.Pagination');

    // Wait for products to load before parsing data
    let interval = setInterval(() => {
        let image = popupContent.querySelector('.ProductListPage').querySelector('.ProductCard').querySelector('.Image');

        // If products are loaded clear interval
        if (image.classList.contains('Image_imageStatus_image_loaded')) {
            clearInterval(interval);

            // Wait for until parsing is done before checking if product was found
            parseProducts(popupContent, query).then(productFound => {
                // If no product was found, go to the next page and begin parsing again
                if (!productFound) {
                    try {
                        let nextBtn = popupContent.querySelector('.PaginationLink_isArrow[aria-label="Next page"]');
                        nextBtn.click();
                        submit(query);
                    }
                    // If there are no more pages and product was not found, log "No results"
                    catch (error) {
                        console.log('No results');
                    }
                }
            });
        }
    }, 100);

}

function parseProducts(popupContent, query) {
    return new Promise((resolve) => {
        let productFound = false;
        // Select all products on the page
        let itemList = popupContent.querySelector('.ProductListPage').querySelectorAll('.ProductCard');

        // For each product
        itemList.forEach(item => {
            // Get the SKU number from the img source
            let sku = item.querySelector('.ProductCard-Picture').firstChild.getAttribute('src').slice(36, 42);

            // If the SKU number of the product does not match the search query, hide it from the results
            if (query !== sku) {
                item.style.display = 'none';
            }
            else {
                productFound = true;
                console.log('Found '+ sku);
            }
        });

        // Resolve the promise after checking all products
        resolve(productFound);
    });
}