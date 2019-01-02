import {DeviceEventEmitter, NativeModules} from 'react-native';
import EventEmitter from 'events';
import {Buffer} from 'buffer';

const {ReactNativeUsb: BaseReactNativeUsb} = NativeModules;

function hexStringToBytes(hex) {
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  return bytes;
}

class ReactNativeUsb extends EventEmitter {
  constructor() {
    super();
    const eventName = 'usbData';
    this.listener = DeviceEventEmitter.addListener(eventName, data => {
      this.emit('data', Buffer.from(hexStringToBytes(data)));
    });
  }

  async connect(vendorId, productId) {
    return BaseReactNativeUsb.connect(
      vendorId,
      productId
    );
  }

  async write(data) {
    return BaseReactNativeUsb.write(Buffer.from(data).toString('hex'));
  }

  async disconnect() {
    this.listener.remove();
    this.removeAllListeners();
    return BaseReactNativeUsb.disconnect();
  }
}

export default new ReactNativeUsb();
