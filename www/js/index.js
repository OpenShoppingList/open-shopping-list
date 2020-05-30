let data = {
    selectedList: 0,
    lists: [
        {
            name: 'todo',
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

var addListButtonValue = '';
document.getElementById('add-list-button').addEventListener('click', function() {
    if (document.getElementById('add-list-input').value && addListButtonValue !== document.getElementById('add-list-input').value) {
        data.lists.push({
            name: document.getElementById('add-list-input').value,
            items: []
        });
        render(data.lists.length - 1, data.lists.length - 1);
    }
    addListButtonValue = document.getElementById('add-list-input').value
});

document.getElementById('add-list-input').addEventListener('change', function() {
    if (document.getElementById('add-list-input').value) {
        data.lists.push({
            name: document.getElementById('add-list-input').value,
            items: []
        });
        render(data.lists.length - 1, data.lists.length - 1);
    }
});

function render(firstList, lastList) {
    function renderList(i) {
        if(document.getElementById('list-' + i)){
            document.getElementById('list-' + i).remove();
        }
        let div = document.createElement('div');
        div.id = 'list-' + i;
        let h2 = document.createElement('h2');
        let h2Text = document.createTextNode(data.lists[i].name);
        let list = document.createElement('ul');
        let input = document.createElement('input');
        input.type = 'text';
        input.className = 'add-item-input';
        input.addEventListener('change', function() {
            if (this.value) {
                data.lists[this.parentNode.id.replace('list-', '')].items.push({
                    name: this.value
                });
                render(this.parentNode.id.replace('list-', ''), this.parentNode.id.replace('list-', ''));
            }
        });
        let button = document.createElement('button');
        button.classsName = 'add-item-button';
        button.addEventListener('click', function() {
            if (this.parentNode.getElementsByClassName('add-item-input')[0].value) {
                data.lists[this.parentNode.id.replace('list-', '')].items.push({
                    name: this.parentNode.getElementsByClassName('add-item-input')[0].value
                });
                render(this.parentNode.id.replace('list-', ''), this.parentNode.id.replace('list-', ''));
            }
        });
        let buttonText = document.createTextNode('Add list item');
        h2.appendChild(h2Text);
        for (let j = 0; j < data.lists[i].items.length; j++) {
          let listItem = document.createElement('li');
          let listItemText = document.createTextNode(data.lists[i].items[j].name);
          listItem.appendChild(listItemText);
          list.appendChild(listItem);
        }
        button.appendChild(buttonText);
        div.appendChild(h2);
        div.appendChild(list);
        div.appendChild(input);
        div.appendChild(button);
        document.getElementById('lists').appendChild(div);
    }
    if(firstList >= 0 && firstList <= data.lists.length && lastList >= 0 && lastList <= data.lists.length && firstList <= lastList){
        if(firstList === lastList) {
            renderList(firstList);
        } else {
            for (let i = firstList; i < lastList; i++) {
                renderList(i);
            }
        }
    }
}
