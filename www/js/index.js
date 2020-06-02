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
let data = {
  selectedList: 0,
  lists: [
    {
      name: 'list',
      items: [
        {
          name: 'item',
          checked: false,
          favorite: false
        }
      ]
    },
    {
      name: 'list1',
      items: [
        {
          name: 'item',
          checked: false,
          favorite: false
        }
      ]
    },
    {
      name: 'list2',
      items: [
        {
          name: 'item',
          checked: false,
          favorite: false
        }
      ]
    }
  ],
  settings: [

  ]
};

// only adding a new list if there isn't already another one with the same name
function addList(name) {
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
  }
}

// rending everything
function render(firstList, lastList) {
  // adding a second parameter if not parsed probably
  if (!lastList) {
    lastList = firstList + 1;
  }
  // checking for data validity
  if (firstList >= 0 && firstList <= data.lists.length && lastList >= 0 && lastList <= data.lists.length && firstList <= lastList) {
    // fixing the formating if the parameters parsed are the same
    if (firstList === lastList) {
      lastList++;
    }
    // running through the lists
    for (let i = firstList; i < lastList; i++) {
      // adding new lists to the side drawer if necessary
      if (!document.getElementById('side-drawer').getElementsByTagName('ul')[0].getElementsByTagName('li')[i]) {
        let sideDrawerTitle = document.createElement('li');
        sideDrawerTitle.addEventListener('click', closeMobile);
        let sideDrawerTitleLink = document.createElement('a');
        sideDrawerTitleLink.href = '#list-' + i;
        let sideDrawerTitleLinkText = document.createTextNode(data.lists[i].name);
        sideDrawerTitleLink.appendChild(sideDrawerTitleLinkText);
        sideDrawerTitle.appendChild(sideDrawerTitleLink);
        document.getElementById('side-drawer').getElementsByTagName('ul')[0].appendChild(sideDrawerTitle);
      }
      // adding a new list page if necessary
      if (!document.getElementById('list-' + i)) {
        let article = document.createElement('article');
        article.id = 'list-' + i;
        article.className = 'list';
        let div = document.createElement('div');
        div.className = 'add-item';
        let divInput = document.createElement('input');
        divInput.type = 'text';
        divInput.addEventListener('keypress', function(event) {
          let name = this.value;
          if (name && event.key === 'Enter') {
            let currentList = this.parentNode.parentNode.id.replace('list-', '');
            data.lists[currentList].items.push({
              name: name
            });
            render(currentList, currentList);
            name = '';
          }
        });
        let divButton = document.createElement('button');
        divButton.addEventListener('click', function() {
          let name = this.parentNode.getElementsByTagName('input')[0].value;
          if (name) {
            let currentList = this.parentNode.parentNode.id.replace('list-', '');
            data.lists[currentList].items.push({
              name: name
            });
            render(currentList, currentList);
            name = '';
          }
        });
        let divButtonText = document.createTextNode('Add list item');
        let h2 = document.createElement('h2');
        let h2Text = document.createTextNode(data.lists[i].name);
        let list = document.createElement('ul');
        div.appendChild(divInput);
        divButton.appendChild(divButtonText);
        div.appendChild(divButton);
        h2.appendChild(h2Text);
        for (let j = 0; j < data.lists[i].items.length; j++) {
          let listItem = document.createElement('li');
          let listItemText = document.createTextNode(data.lists[i].items[j].name);
          listItem.appendChild(listItemText);
          list.appendChild(listItem);
        }
        article.appendChild(div);
        article.appendChild(h2);
        article.appendChild(list);
        document.body.getElementsByTagName('main')[0].appendChild(article);
      }
      // updating the list if it already excists
      if (document.getElementById('list-' + i)) {
        document.getElementById('list-' + i).getElementsByTagName('ul')[0].remove();
        let list = document.createElement('ul');
        for (let j = 0; j < data.lists[i].items.length; j++) {
          let listItem = document.createElement('li');
          let listItemText = document.createTextNode(data.lists[i].items[j].name);
          listItem.appendChild(listItemText);
          list.appendChild(listItem);
        }
        document.getElementById('list-' + i).appendChild(list);
      }
    }
  }
}

// opening a "add list"-dialog
document.getElementById('add-list-button').addEventListener('click', function() {
  navigator.notification.prompt('Please enter the list name', function(results) {
    addList(results.input1);
  }, 'Add a list');
});

// rendering everything on load
render(0, data.lists.length);
