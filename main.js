// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const usb = require('usb')
const COMMUNITY_URL = 'https://playground-2019-developer-edition.eu25.force.com/bow'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let device

global.sharedObject = {
  someProperty: 'default value'
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
const communityurl = 'https://playground-2019-developer-edition.eu25.force.com/bow'
  mainWindow.loadURL(COMMUNITY_URL)

  console.log(usb.getDeviceList())

  ipcMain.on('getdevice', (event, vid, pid) => {
    console.log('mainjs - getdevice:' + vid + ' ' + pid) // prints "ping"
    console.log('Getting device object with VID/PID: ' + vid + ' ' + pid)
    let d = getDevice(vid,pid)
    //console.log(usb.getDeviceList())
    //console.log('Retrieved device :' + d.deviceDescriptor)    
    event.sender.send('replydevice',d)
  })

  ipcMain.on('getdevicename', (event) => {
    if (device){
      device.open();
      device.getStringDescriptor(device.deviceDescriptor.iProduct, function(err, data){
        if(!err){
          console.log('main.js device name: ' + data)
          event.sender.send('replydevicename',data)
        } else {
          console.log('Error: ' + err);
        }
      })
    }
  })

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function getDevice(vid, pid) {
  device = usb.findByIds(vid, pid);
  return device;
}