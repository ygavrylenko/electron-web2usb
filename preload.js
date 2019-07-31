const { ipcRenderer } = require('electron');

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  } 
  
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

window.addEventListener('getdevice', function(){
  ipcRenderer.send('getdevice', 1133, 2630);
});

window.addEventListener('getdevicename', function(){
  ipcRenderer.send('getdevicename');
});

ipcRenderer.on('replydevice', (event, d) => {
  document.querySelector('c-show-usb-devices').responseEvent(d)
})

ipcRenderer.on('replydevicename', (event, data) => {
  console.log('replydevicename: ' + data)
  document.querySelector('c-show-usb-devices').deviceNameResponseEvent(data)
})

function init() {
    // add global variables to your web page
    window.isElectron = true
    window.ipcRenderer = ipcRenderer
}
init();