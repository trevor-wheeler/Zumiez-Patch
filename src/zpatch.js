
// Variables
let layoutWrapper = undefined;
let totalCount = undefined;
let path = window.location.pathname;

const styleTag = document.createElement('style');
document.head.appendChild(styleTag);

const paginationStyle = document.createElement('style');
document.head.appendChild(paginationStyle);

const noResultsStyle = document.createElement('style');
document.head.appendChild(noResultsStyle);

loading(false);

// Mutation Observer
const observer = new MutationObserver((mutations) => {
  // For each mutation detected
  mutations.forEach(mutation => {

    // If on the the store finder page run the store finder page function
    if (window.location.pathname === '/stores') {
      storeFinderPage();
    }
    // If on a store page run the store page function
    else if (window.location.pathname.startsWith('/stores/')) {
      storePage();
    }

    // Package deals in cart logic
    packageDealCart();

    // Logic for the package deal builder pop up
    if (mutation.type === 'childList') {
      // If package builder is opened
      mutation.addedNodes.forEach(node => {
        if (node.matches && node.matches('.Popup-Content')) {

          // Check if content is loaded in intervals of 100ms
          let interval = setInterval(() => {
            try {
              layoutWrapper = document.querySelector('.PackageDealProductList-LayoutWrapper');
            }
            catch (error) {
              layoutWrapper = undefined;
            }

            // If content is loaded clear interval and add the searchbar + other elements
            if (layoutWrapper) {
              clearInterval(interval);

              let interval2 = setInterval(() => {
                // Get total count
                totalCount = layoutWrapper.querySelector('.PackageDealProductList-TotalCount:not(.Loading)').textContent.replace(/[^\d]/g, '');

                // If total count is loaded clear interval
                if (totalCount !== '') {
                  clearInterval(interval2);
                }
              }, 100);

              // Create loaders
              let loader = document.createElement('div');
              loader.className = 'Loader Loading';
              loader.innerHTML = '<div class="Loader-Scale "><div class="Loader-Main"><span></span></div></div>';
              document.querySelector('.CategoryFilterOverlay-Wrapper').appendChild(loader);
              let itemsFoundLoader = document.createElement('div');
              itemsFoundLoader.className = 'PackageDealProductList-TotalCount Loading';
              itemsFoundLoader.innerHTML = '<span class="TextPlaceholder TextPlaceholder_length_short "></span>';
              layoutWrapper.appendChild(itemsFoundLoader);

              // Create Searchbar
              let searchBar = document.createElement('input');
              layoutWrapper.appendChild(searchBar);
              // Create searchbar functionality
              searchFunctionality(searchBar);

              // Create loading product grid
              let loadingProductGrid = document.createElement('ul');
              loadingProductGrid.className = 'ProductListPage Loading';
              document.querySelector('.PackageDealProductList_layout_grid').appendChild(loadingProductGrid);
              loadingProductGrid.innerHTML = `<li class="ProductListPage-Offset"></li><li class="ProductCard ProductCard_layout_grid "><button class="ProductCard-Link "><div class="ProductCard-LinkInnerWrapper"><div class="ProductCard-FigureReview"><figure class="ProductCard-Figure"><div class="ProductLabels"></div><div class="Image Image_ratio_custom Image_imageStatus_image_not_specified Image_isPlaceholder ProductCard-Picture   Image-WidthFull Image-HeightFull"></div><img alt="undefined - " src="" loading="lazy" style="display: none;"></figure></div><div class="ProductCard-Content"><p class="ProductCard-Name"><span class="TextPlaceholder TextPlaceholder_length_medium "></span></p><span class="TextPlaceholder TextPlaceholder_length_short "></span></div><div class="ProductCard-VisibleOnHover"></div></div></button><div class="ProductCard-AdditionalContent"></div></li><li class="ProductCard ProductCard_layout_grid "><button class="ProductCard-Link "><div class="ProductCard-LinkInnerWrapper"><div class="ProductCard-FigureReview"><figure class="ProductCard-Figure"><div class="ProductLabels"></div><div class="Image Image_ratio_custom Image_imageStatus_image_not_specified Image_isPlaceholder ProductCard-Picture   Image-WidthFull Image-HeightFull"></div><img alt="undefined - " src="" loading="lazy" style="display: none;"></figure></div><div class="ProductCard-Content"><p class="ProductCard-Name"><span class="TextPlaceholder TextPlaceholder_length_medium "></span></p><span class="TextPlaceholder TextPlaceholder_length_short "></span></div><div class="ProductCard-VisibleOnHover"></div></div></button><div class="ProductCard-AdditionalContent"></div></li><li class="ProductCard ProductCard_layout_grid "><button class="ProductCard-Link "><div class="ProductCard-LinkInnerWrapper"><div class="ProductCard-FigureReview"><figure class="ProductCard-Figure"><div class="ProductLabels"></div><div class="Image Image_ratio_custom Image_imageStatus_image_not_specified Image_isPlaceholder ProductCard-Picture   Image-WidthFull Image-HeightFull"></div><img alt="undefined - " src="" loading="lazy" style="display: none;"></figure></div><div class="ProductCard-Content"><p class="ProductCard-Name"><span class="TextPlaceholder TextPlaceholder_length_medium "></span></p><span class="TextPlaceholder TextPlaceholder_length_short "></span></div><div class="ProductCard-VisibleOnHover"></div></div></button><div class="ProductCard-AdditionalContent"></div></li><li class="ProductCard ProductCard_layout_grid "><button class="ProductCard-Link "><div class="ProductCard-LinkInnerWrapper"><div class="ProductCard-FigureReview"><figure class="ProductCard-Figure"><div class="ProductLabels"></div><div class="Image Image_ratio_custom Image_imageStatus_image_not_specified Image_isPlaceholder ProductCard-Picture   Image-WidthFull Image-HeightFull"></div><img alt="undefined - " src="" loading="lazy" style="display: none;"></figure></div><div class="ProductCard-Content"><p class="ProductCard-Name"><span class="TextPlaceholder TextPlaceholder_length_medium "></span></p><span class="TextPlaceholder TextPlaceholder_length_short "></span></div><div class="ProductCard-VisibleOnHover"></div></div></button><div class="ProductCard-AdditionalContent"></div></li><li class="ProductCard ProductCard_layout_grid "><button class="ProductCard-Link "><div class="ProductCard-LinkInnerWrapper"><div class="ProductCard-FigureReview"><figure class="ProductCard-Figure"><div class="ProductLabels"></div><div class="Image Image_ratio_custom Image_imageStatus_image_not_specified Image_isPlaceholder ProductCard-Picture   Image-WidthFull Image-HeightFull"></div><img alt="undefined - " src="" loading="lazy" style="display: none;"></figure></div><div class="ProductCard-Content"><p class="ProductCard-Name"><span class="TextPlaceholder TextPlaceholder_length_medium "></span></p><span class="TextPlaceholder TextPlaceholder_length_short "></span></div><div class="ProductCard-VisibleOnHover"></div></div></button><div class="ProductCard-AdditionalContent"></div></li><li class="ProductCard ProductCard_layout_grid "><button class="ProductCard-Link "><div class="ProductCard-LinkInnerWrapper"><div class="ProductCard-FigureReview"><figure class="ProductCard-Figure"><div class="ProductLabels"></div><div class="Image Image_ratio_custom Image_imageStatus_image_not_specified Image_isPlaceholder ProductCard-Picture   Image-WidthFull Image-HeightFull"></div><img alt="undefined - " src="" loading="lazy" style="display: none;"></figure></div><div class="ProductCard-Content"><p class="ProductCard-Name"><span class="TextPlaceholder TextPlaceholder_length_medium "></span></p><span class="TextPlaceholder TextPlaceholder_length_short "></span></div><div class="ProductCard-VisibleOnHover"></div></div></button><div class="ProductCard-AdditionalContent"></div></li><li class="ProductCard ProductCard_layout_grid "><button class="ProductCard-Link "><div class="ProductCard-LinkInnerWrapper"><div class="ProductCard-FigureReview"><figure class="ProductCard-Figure"><div class="ProductLabels"></div><div class="Image Image_ratio_custom Image_imageStatus_image_not_specified Image_isPlaceholder ProductCard-Picture   Image-WidthFull Image-HeightFull"></div><img alt="undefined - " src="" loading="lazy" style="display: none;"></figure></div><div class="ProductCard-Content"><p class="ProductCard-Name"><span class="TextPlaceholder TextPlaceholder_length_medium "></span></p><span class="TextPlaceholder TextPlaceholder_length_short "></span></div><div class="ProductCard-VisibleOnHover"></div></div></button><div class="ProductCard-AdditionalContent"></div></li><li class="ProductCard ProductCard_layout_grid "><button class="ProductCard-Link "><div class="ProductCard-LinkInnerWrapper"><div class="ProductCard-FigureReview"><figure class="ProductCard-Figure"><div class="ProductLabels"></div><div class="Image Image_ratio_custom Image_imageStatus_image_not_specified Image_isPlaceholder ProductCard-Picture   Image-WidthFull Image-HeightFull"></div><img alt="undefined - " src="" loading="lazy" style="display: none;"></figure></div><div class="ProductCard-Content"><p class="ProductCard-Name"><span class="TextPlaceholder TextPlaceholder_length_medium "></span></p><span class="TextPlaceholder TextPlaceholder_length_short "></span></div><div class="ProductCard-VisibleOnHover"></div></div></button><div class="ProductCard-AdditionalContent"></div></li>`

              // Create no results page
              let noResults = document.createElement('p');
              noResults.textContent = 'No results'
              noResults.style.paddingLeft = '12px';
              noResults.style.display = 'none';
              noResults.id = 'no-results';
              document.querySelector('.PackageDealProductList_layout_grid').appendChild(noResults);

            }
          }, 100);
        }
      });

      // If package builder is closed
      mutation.removedNodes.forEach(node => {
        if (node.matches && node.matches('.Popup-Content')) {
          // Reset layoutWrapper variable
          layoutWrapper = undefined;

          // Reset pagination to default
          togglePagination(true);

          // Hide no results page
          toggleNoResults(false);
        }
      });
    }
  });
});

// Run the observer
observer.observe(document.body, { childList: true, subtree: true });

function storeFinderPage() {
  // Select all stores on the page
  const stores = document.querySelectorAll('.StoreFinder-Store');
  // Wait until the stores load onto the page
  if (stores.length > 0) {
    // For each store
    stores.forEach(store => {
      const storeNumElement = store.querySelector('.store-num') || false; // Check to see if the store number was already added

      // If the store number hasn't been added yet
      if (!storeNumElement) {
        // Get the store number from the href
        const storeNum = '#' + store.querySelector('a.Button[href*="/stores/"]').getAttribute('href').split('/stores/')[1].replace(/[^\d]/g, '');
        // Append the store number to the store
        const span = document.createElement('span');
        span.textContent = storeNum;
        span.className = 'store-num';
        store.querySelector('.StoreCard-Title').append(span);
      }
    });
  }
}

function storePage() {
  const storeNumElement = document.querySelector('.store-num') || false; // Check to see if the store number was already added
  const title = document.querySelector('.StoreCard-Title') || false; // Check to see if the title has loaded in
  
  // If the store number hasn't been added yet
  if (!storeNumElement) {
    // Get the store number from the pathname
    const storeNum = '#' + window.location.pathname.split('/stores/')[1].replace(/[^\d]/g, '');
    const span = document.createElement('span');
    span.textContent = storeNum;
    span.className = 'store-num';
    // After the title has loaded appened the store number to the store
    if (title) {
      title.append(span);
    }
  }
}

function packageDealCart() {
  const packageDeals = document.querySelectorAll('.CartItem-PackageDealOptions');

  // If there's any package deals in the cart
  if (packageDeals.length > 0) {
    // For each package deal
    packageDeals.forEach(container => {
      // If the package deal hasn't already been updated with clickable links
      if (!container.classList.contains('z-patch')) {
        container.classList.add('z-patch'); // Mark the package deal as updated
        const items = container.querySelectorAll('.PackageDealWidgetItem-Wrapper'); // Select all the items in the package deal
        
        // For each item in the package deal
        items.forEach(item => {
          // Create an href from the title of the item
          const href = 'https://www.zumiez.com/' + item.querySelector('.PackageDealWidgetItem-Title').textContent.toLowerCase().replace(/ /g, "-") + '.html';
          // When the item is clicked navigate to the product page
          item.addEventListener('click', () => {
            window.location.href = href;
          })

          // Get SKU from the img source
          const sku = item.querySelector('.Image-Image').src.match(/\d{6}/g)[0];
          // Create SKU element and append it to the item
          const skuElement = document.createElement('span');
          skuElement.textContent = 'SKU: ' + sku;
          skuElement.className = 'package-deal-cart-sku'
          item.querySelector('.PackageDealWidgetItem-Option').append(skuElement);
        })
      }
    })
  }
}

function searchFunctionality(searchBar) {
  // Searchbar styling
  searchBar.placeholder = 'SKU';
  searchBar.className = 'SearchField-Input SearchField-Input_isActive';
  searchBar.style.width = '50%';

  // When enter is pressed inside searchbar
  searchBar.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      // Toggle loading animation
      loading(true);

      // Hide no results page
      toggleNoResults(false);

      // Remove pagination
      togglePagination(false);

      // Return to page 1 if possible
      resetPage().then(() => {
        // If query is empty do not submit
        if (searchBar.value !== '') {
          // Then submit query
          submit(searchBar.value);
        }
        else {
          loading(false);
          togglePagination(true);
          document.querySelector('.PackageDealProductList-TotalCount:not(.Loading)').textContent = totalCount + ' items found'
        }
      });

      // Unselect searchbar
      searchBar.blur();
    }
  });
}

function resetPage() {
  return new Promise((resolve) => {
    let popupContent = document.querySelector('.Popup-Content');

    // Wait for pagination to load before clicking back button
    let interval = setInterval(() => {
      let pagination = popupContent.querySelector('.Pagination');

      // If pagination is loaded
      if (!pagination.classList.contains('Pagination_isLoading')) {
        // Try to navigate to the previous page
        try {
          let currentPage = popupContent.querySelector('.PaginationLink_isCurrent');
          let currentPageNum = parseInt(currentPage.textContent.trim());
          let nextPage = popupContent.querySelector(`.PaginationLink[aria-label="Page ${currentPageNum - 1}"]`);
          nextPage.click();
        }
        // If there is no previous page, clear interval and resolve promise
        catch (error) {
          unhideItems(popupContent);
          clearInterval(interval);
          resolve();
        }
      }
    }, 100);
  })
}

function submit(query) {
  let popupContent = document.querySelector('.Popup-Content');

  // Wait for products to load before parsing data
  let interval = setInterval(() => {
    let image = popupContent.querySelector('.ProductListPage:not(.Loading)').querySelector('.ProductCard').querySelector('.Image');

    // If products are loaded clear interval
    if (image.classList.contains('Image_imageStatus_image_loaded')) {
      clearInterval(interval);

      // Wait for until parsing is done before checking if product was found
      parseProducts(popupContent, query).then(productFound => {
        // If no product was found, go to the next page and begin parsing again
        if (!productFound) {
          try {
            let currentPage = popupContent.querySelector('.PaginationLink_isCurrent');
            let currentPageNum = parseInt(currentPage.textContent.trim());
            let nextPage = popupContent.querySelector(`.PaginationLink[aria-label="Page ${currentPageNum + 1}"]`);
            nextPage.click();
            submit(query);
          }
          // If there are no more pages and product was not found, log "No results"
          catch (error) {
            // Display no results page
            toggleNoResults(true);
            console.log('No results');

            // Update items found
            popupContent.querySelector('.PackageDealProductList-TotalCount:not(.Loading)').textContent = '0 items found'

            loading(false);
          }
        }
        else {
          // End loading cycle
          loading(false);

          // Update items found
          popupContent.querySelector('.PackageDealProductList-TotalCount:not(.Loading)').textContent = '1 item found'
        }
      });
    }
  }, 100);

}

function parseProducts(popupContent, query) {
  return new Promise((resolve) => {
    let productFound = false;
    // Select all products on the page
    let itemList = popupContent.querySelector('.ProductListPage:not(.Loading)').querySelectorAll('.ProductCard');

    // For each product
    itemList.forEach(item => {

      let sku = undefined;

      // Get the SKU number from the img source
      if (window.location.hostname === 'www.zumiez.com') {
        sku = item.querySelector('.ProductCard-Picture').firstChild.getAttribute('src').slice(36, 42);
      }
      else if (window.location.hostname === 'www.zumiez.ca') {
        sku = item.querySelector('.ProductCard-Picture').firstChild.getAttribute('src').slice(35, 41);
      }

      // If the SKU number of the product does not match the search query, hide it from the results
      if (query !== sku) {
        item.style.display = 'none';
      }
      else {
        productFound = true;
        console.log('Found ' + sku);
      }
    });

    // Resolve the promise after checking all products
    resolve(productFound);
  });
}

function unhideItems(popupContent) {
  let itemList = popupContent.querySelector('.ProductListPage:not(.Loading)').querySelectorAll('.ProductCard');

  itemList.forEach(item => {
    if (item.style.display === 'none') {
      item.style.display = 'flex';
    }
  })
}

function loading(isLoading) {

  if (isLoading) {
    styleTag.textContent = `
      .ProductListPage {
        display: none !important;
      }
      .ProductListPage.Loading {
        display: grid !important;
      }
      .Loader {
        display: none !important
      }
      .Loader.Loading {
        display: block !important
      }
      .PackageDealProductList-TotalCount {
        display: none !important
      }
      .PackageDealProductList-TotalCount.Loading {
        display: block !important
      }
    `
  }
  else {
    styleTag.textContent = `
      .ProductListPage {
        display: grid !important;
      }
      .ProductListPage.Loading {
        display: none !important;
      }
      .Loader {
        display: block !important
      }
      .Loader.Loading {
        display: none !important
      }
      .PackageDealProductList-TotalCount {
        display: block !important
      }
      .PackageDealProductList-TotalCount.Loading {
        display: none !important
      }
    `
  }
}

function togglePagination(isToggled) {
  if (isToggled) {
    paginationStyle.textContent = `
      .Pagination {
        display: flex !important;
      }
    `
  }
  else {
    paginationStyle.textContent = `
      .Pagination {
        display: none !important;
      }
    `
  }
}

function toggleNoResults(isToggled) {
  if (isToggled) {
    noResultsStyle.textContent = `
      #no-results {
        display: block !important;
      }
    `
  }
  else {
    noResultsStyle.textContent = `
      #no-results {
        display: none !important;
      }
    `
  }
}