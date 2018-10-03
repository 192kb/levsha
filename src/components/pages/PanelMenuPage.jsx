import React from 'react';
import { Page, Navbar, List, ListButton } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Меню" />
    <List inset>
      <ListButton loginScreenOpen="#login-screen" title="Логин" panelClose></ListButton>
      <ListButton popupOpen="#registration" title="Регистрация" panelClose></ListButton>
    </List>
  </Page>
);
