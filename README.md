
# react-native-usb

## Getting started

`npm install react-native-usb --save`

or

`yarn add react-native-usb`


### Mostly automatic installation

`react-native link react-native-usb`

### Manual installation

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import me.andyshea.ReactNativeUsbPackage;` to the imports at the top of the file
  - Add `new ReactNativeUsbPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-usb'
  	project(':react-native-usb').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-usb/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-usb')
  	```

## Usage
```javascript
import usb from 'react-native-usb';

// connect to device
await usb.connect(vendorId, productId);

// setup data event listener
usb.on('data', data => {
  console.log(data);
});

// send data to device
usb.write([0x01, 0x02, 0x03]);

// disconnect when finished
usb.disconnect();
```
  
