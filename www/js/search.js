const addItemInput = document.getElementById('add-item-input');
const matchList = document.getElementById('match-list');

var getJSON = function(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status == 200 || status == 0) {
          resolve(xhr.response);
        } else {
          reject(status);
        }
      };
      xhr.send();
    });
};

// fetches the products_xx_xx.json
const products = [];
loadData = function () {
    getJSON('data/products_en_US.json').then(function(data) {
        products.push(...data);
    }, function(status) {
      console.log('Something went wrong.');
    });
}

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

loadData();