const { ipcRenderer } = require('electron');

//set values for usb vendor and product id
//you can take check the value if you start 
const VENDOR_ID = 1133
const PRODUCT_ID = 2630

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

//the next step to give the values maybe from Salesforce settings
window.addEventListener('getdevice', function(){
  ipcRenderer.send('getdevice', VENDOR_ID, PRODUCT_ID);
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