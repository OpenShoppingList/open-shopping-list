/*
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

// an example data structure
var data = JSON.parse(localStorage.getItem('data'));
if (!data) {
  data = {
    selectedList: 0,
    lists: [
      {
        name: 'Example list',
        items: [
          {
            name: 'Example item',
            quantity: '500g',
            price: '5',
            checked: false,
            favorite: false
          }
        ]
      }
    ],
    settings: {
      currency: '$'
    }
  };
  localStorage.setItem('data', JSON.stringify(data));
}

// closing the navigation
function closeNav() {
  document.getElementById('nav-toggle').checked = false;
}

// adding a list
function addList() {
  navigator.notification.prompt('Please enter the list name', function(results) {
    let name = results.input1;
    let isUsed = false;
    for (let i = 0; i < data.lists.length; i++) {
      if (data.lists[i].name === name || !name) {
        isUsed = true;
      }
    }
    if (isUsed === false) {
      data.lists.push({
        name: name,
        items: []
      });
      render(data.lists.length - 1);
      closeNav();
      window.location.hash = '#list-' + (data.lists.length - 1);
    }
  }, 'Add a list');
}

// rendering everything
var item;
function render(firstList, lastList, onlyFavorites = false) {
  // adding a second parameter if not parsed probably
  if (!lastList) {
    lastList = firstList;
  }
  if (lastList === false || lastList === true) {
    onlyFavorites = lastList;
    lastList = firstList;
  }
  // checking for data validity
  if (firstList >= 0 && firstList < data.lists.length && lastList >= 0 && lastList < data.lists.length && firstList <= lastList) {
    // running through the lists
    for (let i = firstList; i < lastList + 1; i++) {
      //only when rendering all list items
      if (!onlyFavorites) {
        // adding new lists to the navigation if necessary
        if (!document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[i]) {
          let navListTitle = document.createElement('li');
          navListTitle.addEventListener('click', closeNav);
          let navListTitleLink = document.createElement('a');
          navListTitleLink.href = '#list-' + i;
          let navListTitleLinkText = document.createTextNode(data.lists[i].name);
          navListTitleLink.appendChild(navListTitleLinkText);
          navListTitle.appendChild(navListTitleLink);
          document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].appendChild(navListTitle);
        }
        // adding a new list page if necessary
        if (!document.getElementById('list-' + i)) {
          let article = document.createElement('article');
          article.id = 'list-' + i;
          article.className = 'list';
          let h2 = document.createElement('h2');
          let h2Text = document.createTextNode(data.lists[i].name);
          h2.appendChild(h2Text);
          article.appendChild(h2);
          let div = document.createElement('div');
          div.className = 'add-item';
          let divInput = document.createElement('input');
          divInput.type = 'text';
          divInput.addEventListener('keypress', function(event) {
            let name = this.value;
            if (name && event.key === 'Enter') {
              let currentList = parseInt(this.parentNode.parentNode.id.replace('list-', ''));
              data.lists[currentList].items.push({
                name: name,
                quantity: '',
                price: '',
                checked: false,
                favorite: false
              });
              render(currentList);
              this.value = '';
            }
          });
          div.appendChild(divInput);
          let divButton = document.createElement('button');
          divButton.addEventListener('click', function() {
            let name = this.parentNode.getElementsByTagName('input')[0].value;
            if (name) {
              let currentList = parseInt(this.parentNode.parentNode.id.replace('list-', ''));
              data.lists[currentList].items.push({
                name: name,
                quantity: '',
                price: '',
                checked: false,
                favorite: false
              });
              render(currentList);
              this.parentNode.getElementsByTagName('input')[0].value = '';
            }
          });
          let divButtonText = document.createTextNode('Add');
          divButton.appendChild(divButtonText);
          div.appendChild(divButton);
          article.appendChild(div);
          document.body.getElementsByTagName('main')[0].appendChild(article);
        }
      }
      // updating the list
      if (!onlyFavorites) {
        let list = document.getElementById('list-' + i).getElementsByTagName('ul')[0];
        if (list) {
          list.remove();
        }
        let checkedItems = document.getElementById('list-' + i).getElementsByTagName('details')[0];
        if (checkedItems) {
          checkedItems.remove();
        }
      } else {
        let list = document.getElementById('favorites').getElementsByTagName('ul')[0];
        if (list) {
          list.remove();
        }
        let checkedItems = document.getElementById('favorites').getElementsByTagName('details')[0];
        if (checkedItems) {
          checkedItems.remove();
        }
      }
      let list = document.createElement('ul');
      let checkedItems = document.createElement('details');
      let checkedItemsTitle = document.createElement('summary');
      let checkedItemsTitleText = document.createTextNode('Checked items');
      checkedItemsTitle.appendChild(checkedItemsTitleText);
      checkedItems.appendChild(checkedItemsTitle);
      let checkedItemsList = document.createElement('ul');
      //running through the items
      for (let j = 0; j < data.lists[i].items.length; j++) {
        //only add favorites or everything when rendering not only favorites
        if (data.lists[i].items[j].favorite || !onlyFavorites) {
          let listItem = document.createElement('li');
          listItem.className = 'item-' + j;
          let listItemChecked = document.createElement('label');
          listItemChecked.className = 'checked';
          let listItemCheckedInput = document.createElement('input');
          listItemCheckedInput.type = 'checkbox';
          listItemCheckedInput.checked = data.lists[i].items[j].checked;
          listItemCheckedInput.addEventListener('change', function() {
            let currentList = parseInt(this.parentNode.parentNode.parentNode.parentNode.id.replace('list-', ''));
            if (data.lists[i].items[j].checked) {
              currentList = parseInt(this.parentNode.parentNode.parentNode.parentNode.parentNode.id.replace('list-', ''));
            }
            if (onlyFavorites) {
              currentList = firstList;
            }
            let currentItem = parseInt(this.parentNode.parentNode.className.replace('item-', ''));
            data.lists[currentList].items[currentItem].checked = this.checked;
            if (onlyFavorites) {
              render(currentList, true);
            } else {
              render(currentList);
            }
          });
          listItemChecked.appendChild(listItemCheckedInput);
          let listItemCheckedImgFalseLight = document.createElement('img');
          listItemCheckedImgFalseLight.dataset.checked = 'false';
          listItemCheckedImgFalseLight.dataset.colorScheme = 'light';
          listItemCheckedImgFalseLight.src = 'img/fontawesome/regular/circle.svg';
          listItemCheckedImgFalseLight.alt = 'circle icon';
          listItemChecked.appendChild(listItemCheckedImgFalseLight);
          let listItemCheckedImgFalseDark = document.createElement('img');
          listItemCheckedImgFalseDark.dataset.checked = 'false';
          listItemCheckedImgFalseDark.dataset.colorScheme = 'dark';
          listItemCheckedImgFalseDark.src = 'img/fontawesome/regular/circle-dark.svg';
          listItemCheckedImgFalseDark.alt = 'circle icon dark';
          listItemChecked.appendChild(listItemCheckedImgFalseDark);
          let listItemCheckedImgTrueLight = document.createElement('img');
          listItemCheckedImgTrueLight.dataset.checked = 'true';
          listItemCheckedImgTrueLight.dataset.colorScheme = 'light';
          listItemCheckedImgTrueLight.src = 'img/fontawesome/solid/check-circle.svg';
          listItemCheckedImgTrueLight.alt = 'checked circle icon';
          listItemChecked.appendChild(listItemCheckedImgTrueLight);
          let listItemCheckedImgTrueDark = document.createElement('img');
          listItemCheckedImgTrueDark.dataset.checked = 'true';
          listItemCheckedImgTrueDark.dataset.colorScheme = 'dark';
          listItemCheckedImgTrueDark.src = 'img/fontawesome/solid/check-circle-dark.svg';
          listItemCheckedImgTrueDark.alt = 'checked circle icon dark';
          listItemChecked.appendChild(listItemCheckedImgTrueDark);
          listItem.appendChild(listItemChecked);
          let listItemLink = document.createElement('a');
          listItemLink.href = '#edit-item';
          listItemLink.addEventListener('click', function() {
            item = this.parentNode.className.replace('item-', '');
          });
          let listItemName = document.createElement('span');
          listItemName.className = 'name';
          let listItemNameText = document.createTextNode(data.lists[i].items[j].name);
          listItemName.appendChild(listItemNameText);
          listItemLink.appendChild(listItemName);
          let listItemQuantity = document.createElement('span');
          listItemQuantity.className = 'quantity';
          let listItemQuantityText = document.createTextNode(data.lists[i].items[j].quantity);
          listItemQuantity.appendChild(listItemQuantityText);
          listItemLink.appendChild(listItemQuantity);
          let listItemPrice = document.createElement('span');
          listItemPrice.className = 'price';
          let price = '';
          if (data.lists[i].items[j].price) {
            price = data.lists[i].items[j].price + data.settings.currency;
          }
          let listItemPriceText = document.createTextNode(price);
          listItemPrice.appendChild(listItemPriceText);
          listItemLink.appendChild(listItemPrice);
          listItem.appendChild(listItemLink);
          let listItemFavorite = document.createElement('label');
          listItemFavorite.className = 'favorite';
          let listItemFavoriteInput = document.createElement('input');
          listItemFavoriteInput.type = 'checkbox';
          listItemFavoriteInput.checked = data.lists[i].items[j].favorite;
          listItemFavoriteInput.addEventListener('change', function() {
            let currentList = parseInt(this.parentNode.parentNode.parentNode.parentNode.id.replace('list-', ''));
            if (data.lists[i].items[j].checked) {
              currentList = parseInt(this.parentNode.parentNode.parentNode.parentNode.parentNode.id.replace('list-', ''));
            }
            if (onlyFavorites) {
              currentList = firstList;
            }
            let currentItem = parseInt(this.parentNode.parentNode.className.replace('item-', ''));
            data.lists[currentList].items[currentItem].favorite = this.checked;
          });
          listItemFavorite.appendChild(listItemFavoriteInput);
          let listItemFavoriteImgFalseLight = document.createElement('img');
          listItemFavoriteImgFalseLight.dataset.checked = 'false';
          listItemFavoriteImgFalseLight.dataset.colorScheme = 'light';
          listItemFavoriteImgFalseLight.src = 'img/fontawesome/regular/heart.svg';
          listItemFavoriteImgFalseLight.alt = 'heart icon';
          listItemFavorite.appendChild(listItemFavoriteImgFalseLight);
          let listItemFavoriteImgFalseDark = document.createElement('img');
          listItemFavoriteImgFalseDark.dataset.checked = 'false';
          listItemFavoriteImgFalseDark.dataset.colorScheme = 'dark';
          listItemFavoriteImgFalseDark.src = 'img/fontawesome/regular/heart-dark.svg';
          listItemFavoriteImgFalseDark.alt = 'heart icon dark';
          listItemFavorite.appendChild(listItemFavoriteImgFalseDark);
          let listItemFavoriteImgTrueLight = document.createElement('img');
          listItemFavoriteImgTrueLight.dataset.checked = 'true';
          listItemFavoriteImgTrueLight.dataset.colorScheme = 'light';
          listItemFavoriteImgTrueLight.src = 'img/fontawesome/solid/heart.svg';
          listItemFavoriteImgTrueLight.alt = 'checked heart icon';
          listItemFavorite.appendChild(listItemFavoriteImgTrueLight);
          let listItemFavoriteImgTrueDark = document.createElement('img');
          listItemFavoriteImgTrueDark.dataset.checked = 'true';
          listItemFavoriteImgTrueDark.dataset.colorScheme = 'dark';
          listItemFavoriteImgTrueDark.src = 'img/fontawesome/solid/heart-dark.svg';
          listItemFavoriteImgTrueDark.alt = 'checked heart icon dark';
          listItemFavorite.appendChild(listItemFavoriteImgTrueDark);
          listItem.appendChild(listItemFavorite);
          if (data.lists[i].items[j].checked) {
            checkedItemsList.appendChild(listItem);
          } else {
            list.appendChild(listItem);
          }
        }
      }
      checkedItems.appendChild(checkedItemsList);
      if (onlyFavorites) {
        document.getElementById('favorites').appendChild(list);
        if (checkedItemsList.hasChildNodes()) {
          document.getElementById('favorites').appendChild(checkedItems);
        }
      } else {
        document.getElementById('list-' + i).appendChild(list);
        if (checkedItemsList.hasChildNodes()) {
          document.getElementById('list-' + i).appendChild(checkedItems);
        }
      }
    }
  }
}

// opening a dialog for adding a new list
document.getElementById('add-list').addEventListener('click', addList);

// close navigation when clicking on the settings button
document.getElementById('open-settings').addEventListener('click', closeNav);

// updating the stored list item data when clicking on the save button in the edit menu
document.getElementById('edit-item').getElementsByClassName('save')[0].addEventListener('click', function() {
  if (list !== undefined && item !== undefined) {
    data.lists[list].items[item].name = this.parentNode.parentNode.getElementsByClassName('name')[0].getElementsByTagName('input')[0].value;
    data.lists[list].items[item].quantity = this.parentNode.parentNode.getElementsByClassName('quantity')[0].getElementsByTagName('input')[0].value;
    data.lists[list].items[item].price = this.parentNode.parentNode.getElementsByClassName('price')[0].getElementsByTagName('input')[0].value;
    data.lists[list].items[item].checked = this.parentNode.parentNode.getElementsByClassName('checked')[0].getElementsByTagName('input')[0].checked;
    data.lists[list].items[item].favorite = this.parentNode.parentNode.getElementsByClassName('favorite')[0].getElementsByTagName('input')[0].checked;
    window.location.hash = '#list-' + list;
  }
});

// updating the settings when clicking on the save button in the settings
document.getElementById('settings').getElementsByClassName('save')[0].addEventListener('click', function() {
  data.settings.currency = this.parentNode.parentNode.getElementsByClassName('currency')[0].getElementsByTagName('input')[0].value;
  render(0, data.lists.length - 1);
  window.location.hash = '#list-' + list;
});

// deleting the currently selected list or item when clicking the delete button
document.getElementById('delete').addEventListener('click', function() {
  let hash = window.location.hash;
  if (hash.includes('#list-')) {
    for (var i = list; i < data.lists.length; i++) {
      document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[list].remove();
      document.getElementById('list-' + i).remove();
    }
    data.lists.splice(list, 1);
    if (list === 0 && data.lists.length === 0) {
      addList();
    }
    render(0, data.lists.length - 1);
    if (list === 0) {
      window.location.hash = '';
      window.location.hash = '#list-0';
    } else {
      window.location.hash = '#list-' + (list - 1);
    }
  } else if (hash === '#edit-item') {
    data.lists[list].items.splice(item, 1);
    render(list);
    window.location.hash = 'list-' + list;
  }
});

// storing the currrent list, rendering it after an other page was opened and rendering the list items information when the edit menu is opened
var list = data.selectedList;
window.addEventListener('hashchange', function(event) {
  let hash = window.location.hash;
  let oldURL = event.oldURL;
  if (hash.includes('#list-')) {
    list = parseInt(hash.replace('#list-', ''));
    data.selectedList = list;
    if (oldURL.includes('#favorites') || oldURL.includes('#edit-item')) {
      render(list);
    }
  }
  if(hash === '#favorites') {
    render(list, true);
  }
  if(hash === '#edit-item') {
    let editItem = document.getElementById('edit-item');
    editItem.getElementsByTagName('h2')[0].textContent = data.lists[list].name + ' > ' + data.lists[list].items[item].name;
    editItem.getElementsByClassName('name')[0].getElementsByTagName('input')[0].value = data.lists[list].items[item].name;
    editItem.getElementsByClassName('quantity')[0].getElementsByTagName('input')[0].value = data.lists[list].items[item].quantity;
    editItem.getElementsByClassName('price')[0].getElementsByTagName('input')[0].value = data.lists[list].items[item].price.replace(data.settings.currency, '');
    editItem.getElementsByClassName('price')[0].getElementsByClassName('currency')[0].textContent = data.settings.currency;
    editItem.getElementsByClassName('checked')[0].getElementsByTagName('input')[0].checked = data.lists[list].items[item].checked;
    editItem.getElementsByClassName('favorite')[0].getElementsByTagName('input')[0].checked = data.lists[list].items[item].favorite;
  }
  if(hash === '#settings') {
    let settings = document.getElementById('settings');
    settings.getElementsByClassName('currency')[0].getElementsByTagName('input')[0].value = data.settings.currency;
  }
});

// storing everything before the app is put into background or closed
document.addEventListener('pause', function(event) {
  localStorage.setItem('data', JSON.stringify(data));
});

// unchecking favorites
for (var i = 0; i < data.lists.length; i++) {
  for (let j = 0; j < data.lists[i].items.length; j++) {
    if (data.lists[i].items[j].checked && data.lists[i].items[j].favorite) {
      data.lists[i].items[j].checked = false;
    }
  }
}

// rendering everything on load
document.getElementById('nav-toggle').checked = false;
render(0, data.lists.length - 1);
window.location.hash = '#list-' + list;
