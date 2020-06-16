const addItemInput = document.getElementById('add-item-input');
const matchList = document.getElementById('match-list');

// fetches the products_xx_xx.json
const products = [];
fetch('../data/products_en_US.json')
    .then(response => response.json())
    .then(result => products.push(...result));

// Searches products_xx_xx.json and filters it
function searchProducts(searchText) {
    // Get matches to current text input
    let matches = products.filter(function(product) {
        const regex = new RegExp('^' + searchText, 'gi');
        return product.name.match(regex);
    });

    if(searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
        matchList.classList.add('hidden');
    } else {
        matchList.classList.remove('hidden');
    }

    outputHTML(matches);
}

// Show results in HTML
function outputHTML(matches) {
    if(matches.length > 0) {
        const html = matches.map(function(match) {
            return `
                <div class="card" onclick="addProduct('${match.name}')">
                    <h4>${match.name}</h4>
                </div>
            `;
        }).join('');

        matchList.innerHTML = html;
    }
}

// Add the product
function addProduct(product) {
    let windowSearchLocation = new String(window.location);
      let currentList = windowSearchLocation.split('-');
      currentList = parseInt(currentList[1]);
      data.lists[currentList].items.push({
        name: product,
        quantity: '',
        price: '',
        checked: false,
        favorite: false
      });
      render(currentList);
      document.getElementById('add-item-input').value = '';
      matchList.innerHTML = '';
      matchList.classList.add('hidden');
  }

addItemInput.addEventListener('input', function() {searchProducts(addItemInput.value)});