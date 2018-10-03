import React from 'react';
import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavRight,
    Link
} from 'framework7-react';

export default class extends React.Component {
  render() {
    return (
      <Page>
      <Navbar>
        <NavLeft>
          <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left"></Link>
        </NavLeft>
        <NavTitle>Levsha</NavTitle>
        <NavRight>
          <Link iconIos="f7:filter" iconMd="material:filter_list" panelOpen="right"></Link>
        </NavRight>
      </Navbar>
      
    </Page>
    )
  }
}