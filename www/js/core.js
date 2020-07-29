// loading everthing from localStorage when the app gets started
var data = JSON.parse(localStorage.getItem('data'));
if(!localStorage.hasOwnProperty('data')) {
  console.log('create new');
  data = {
    selectedList: 0,
    lists: [],
    settings: {
      currency: 'EUR' //TODO(Zink10Craft): Set the default currency depending on the country/language
    }
  };
}

// storing everything before the app is put into the background or closed
window.onbeforeunload = function(event) {
  localStorage.setItem('data', JSON.stringify(data));
};
