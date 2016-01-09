NodeList.prototype['forEach'] = HTMLCollection.prototype['forEach'] = Array.prototype['forEach'];
var OPTIONS = {};

function save_options() {
  var status;

  OPTIONS.hideZeroBalances = document.getElementById('hideZeroBalances').checked;
  OPTIONS.sortBalances = document.getElementById('sortBalances').checked;
  OPTIONS.condenseBalances = document.getElementById('condenseBalances').checked;

  chrome.storage.sync.set({ 'options': OPTIONS });
  status = document.getElementById('status');
  status.innerHTML = 'Options Saved.';
  setTimeout(function() {
    status.innerHTML = '';
  }, 750);
}

function restore_options() {
  chrome.storage.sync.get('options', function(obj) {
    if (obj.options == undefined) {
      obj.options = {
        hideZeroBalances: false,
        sortBalances: false,
        condenseBalances: false
      };
    }
    OPTIONS = obj.options;
    document.getElementById('hideZeroBalances').checked = obj.options.hideZeroBalances;
    document.getElementById('sortBalances').checked = obj.options.sortBalances;
    document.getElementById('condenseBalances').checked = obj.options.condenseBalances;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);