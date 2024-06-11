import { AppRegistry } from 'react-native';

import {App} from '@monoRepo/core';

AppRegistry.registerComponent('monoRepo', () => App);
AppRegistry.runApplication('monoRepo', {
  rootTag: document.getElementById('root'),
});
