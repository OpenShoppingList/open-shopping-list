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

function render(firstList, lastList) {
  if (!lastList) {
    lastList = firstList + 1;
  }
    if(firstList >= 0 && firstList <= data.lists.length && lastList >= 0 && lastList <= data.lists.length && firstList <= lastList){
      if(firstList === lastList) {
        lastList++;
      }
      for (let i = firstList; i < lastList; i++) {
        if (!document.getElementById('side-drawer').getElementsByTagName('ul')[0].getElementsByTagName('li')[i]) {
          let sideDrawerTitle = document.createElement('li');
          sideDrawerTitle.addEventListener('click', closeMobile);
          let sideDrawerTitleLink = document.createElement('a');
          sideDrawerTitleLink.href = '#list-' + i;
          let sideDrawerTitleLinkText = document.createTextNode(data.lists[i].name);
          sideDrawerTitleLink.appendChild(sideDrawerTitleLinkText)
          sideDrawerTitle.appendChild(sideDrawerTitleLink);
          document.getElementById('side-drawer').getElementsByTagName('ul')[0].appendChild(sideDrawerTitle);
        }
        if(!document.getElementById('list-' + i)){
          let article = document.createElement('article');
          article.id = 'list-' + i;
          article.className = 'list';
          let div = document.createElement('div');
          div.className = 'add-item';
          let divInput = document.createElement('input');
          divInput.type = 'text';
          divInput.addEventListener('keypress', function(event) {
            if (this.value && event.key === 'Enter') {
              let currentList = this.parentNode.parentNode.id.replace('list-', '');
              data.lists[currentList].items.push({
                name: this.value
              });
              render(currentList, currentList);
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

document.getElementById('add-list-button').addEventListener('click', function() {
  addList(document.getElementById('add-list-input').value);
});

document.getElementById('add-list-input').addEventListener('keypress', function(event) {
  if (this.value && event.key === 'Enter') {
    addList(this.value);
  }
});

render(0, data.lists.length);
