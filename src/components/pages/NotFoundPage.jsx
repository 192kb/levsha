import React from 'react';
import { Page, Navbar, Block } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Не найдено" backLink="Назад" />
    <Block strong>
      <p>Вот же досада!</p>
      <p>Того что вы запросили, у нас нет</p>
    </Block>
  </Page>
);
