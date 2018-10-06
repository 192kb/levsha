import React from 'react';
import {
    View,
    Panel,
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavRight,
    Link
} from 'framework7-react';

const { brand } = require('../..configuration')

export default class extends React.Component {
  render() {
    return (
      <Page>
      <Panel right>
        <View url="/panel-right/"/>
      </Panel>
      <Navbar>
        <NavLeft>
          <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left"></Link>
        </NavLeft>
        <NavTitle>{brand}</NavTitle>
        <NavRight>
          <Link iconIos="f7:filter" iconMd="material:filter_list" panelOpen="right"></Link>
        </NavRight>
      </Navbar>
      
    </Page>
    )
  }
}