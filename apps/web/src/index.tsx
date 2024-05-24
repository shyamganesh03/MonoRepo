import { AppRegistry } from 'react-native';

import {App} from '@izzo/core';

AppRegistry.registerComponent('izzo', () => App);
AppRegistry.runApplication('izzo', {
  rootTag: document.getElementById('root'),
});
