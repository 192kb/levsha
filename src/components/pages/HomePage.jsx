import React from 'react';
import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavRight,
    Link,
    Toolbar,
    Block,
    BlockTitle,
    List,
    ListItem,
    Row,
    Col,
    Tab, Tabs,
    Button
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
      
      <Toolbar tabbar labels bottomMd={ true }>
        <Link tabLink="#tab-1" tabLinkActive text="Задачи" iconIos="f7:list" iconMd="material:view_list"></Link>
        <Link tabLink="#tab-2" text="Работа" iconIos="f7:briefcase" iconMd="material:business_center"></Link>
        <Link tabLink="#tab-3" text="Сообщения" iconIos="f7:email" iconMd="material:message"></Link>
        <Link tabLink="#tab-4" text="Меню" iconIos="f7:person" iconMd="material:menu"></Link>
      </Toolbar>
  
      <Tabs>
        <Tab id="tab-1" className="page-content" tabActive>
        <Block strong>
          <p>Here is your blank Framework7 app. Let's see what we have here.</p>
        </Block>
        <BlockTitle>Navigation</BlockTitle>
        <List>
          <ListItem link="/about/" title="About"></ListItem>
          <ListItem link="/form/" title="Form"></ListItem>
        </List>
        <BlockTitle>Modals</BlockTitle>
        <Block strong>
          <Row>
            <Col width="50">
              <Button fill raised popupOpen="#popup">Popup</Button>
            </Col>
            <Col width="50">
              <Button fill raised loginScreenOpen="#login-screen">Login Screen</Button>
            </Col>
          </Row>
        </Block>
        <BlockTitle>Panels</BlockTitle>
        <Block strong>
          <Row>
            <Col width="50">
              <Button fill raised panelOpen="left">Left Panel</Button>
            </Col>
            <Col width="50">
              <Button fill raised panelOpen="right">Right Panel</Button>
            </Col>
          </Row>
        </Block>
        <List>
          <ListItem link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"></ListItem>
          <ListItem link="/load-something-that-doesnt-exist/" title="Default Route (404)"></ListItem>
        </List>
        </Tab>
        <Tab id="tab-2" className="page-content">
          <Block>
            <p>Tab 2 content</p>
            ...
          </Block>
        </Tab>
        <Tab id="tab-3" className="page-content">
          <Block>
            <p>Tab 3 content</p>
            ...
          </Block>
        </Tab>
      </Tabs>
    </Page>
    )
  }
}