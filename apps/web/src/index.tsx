import { AppRegistry } from 'react-native';

import App from '@izzo/core';

AppRegistry.registerComponent('monorepo', () => App);
AppRegistry.runApplication('monorepo', {
  rootTag: document.getElementById('root'),
});
