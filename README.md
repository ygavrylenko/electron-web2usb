# electron-web2usb

**Demo how to connect to USB devices from Electron app and communicate with Salesforce org.**

This is a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start) within the Electron documentation.

This demo shows how to connect to USB devices from Electron app and communicate between the app and Salesforce Community.

## Don't forget to rebuild node-usb libraties for your electron version otherwise it won't work!

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/ygavrylenko/electron-web2usb.git
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Rebuilding node-usb libraries for current electron version
# Go to the usb folder of node-usb module
cd node_modules/usb/
#Run command to rebuild libraries
../.bin/node-gyp rebuild --target=5.0.7 --dist-url=https://electronjs.org/headers;
# Run the app
npm start
```
## Set target device vendor_id and product_id
After executing npm start the app lists all available devices and shows the result in console (main.js) --> usb.getDeviceList()
You can just pick approriate ids from output and check them on online databases like https://devicehunt.com/all-usb-vendors
Alternatively Salesforce component will show you the real name of device using async function device.getStringDescriptor
Set VENDOR_ID and PRODUCT_ID in preload.js (will be externalized in the next steps)

