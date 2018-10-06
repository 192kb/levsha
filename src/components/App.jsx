import React from 'react';
import {
  App,
  Panel,
  View,
  Statusbar,
} from 'framework7-react';

import routes from '../routes';
import CustomLoginScreen from './custom/CustomLoginScreen';
import CustomRegistrationPopup from './custom/CustomRegistrationPopup';

const { brand } = require('../configuration')

export default function (props) {
  // Framework7 parameters here
  const f7params = {
    id: 'io.online.'+brand, // App bundle ID
    name: brand, // App name
    theme: 'ios', // Automatic theme detection
    // App routes
    routes,
  };
  
  return (
    <App params={f7params} colorTheme="">
      {/* Statusbar */}
      <Statusbar />

      {/* Left Panel */}
      <Panel left>
        <View url="/panel-left/" />
      </Panel>

      {/* Main View */}
      <View id="main-view" url="/" main className="ios-edges"/>

      {/* Registration */}
      <CustomRegistrationPopup />

      {/* Login Screen */}
      <CustomLoginScreen />
    </App>
  );
};
