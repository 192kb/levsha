import React from 'react';
import { Page, Navbar, List, ListItem, ListButton, Icon } from 'framework7-react';
import { apiGetCurrentUserProfile, apiLogout } from '../../utility/api'
import { errorNotification } from '../../utility/helpers'

export default class extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      auth: undefined,
      user: {}
    }
  }

  componentDidMount() {
    apiGetCurrentUserProfile()
      .then( res => {
        this.setState({auth: true, user: res.data})
      }).catch( error => {
        this.setState({auth: false, user: {}})
    })
  }

  render() {
    if (this.state.auth === undefined) {
      return (
        <Page>
          <Navbar title="Меню" />
        </Page>
      )
    }
    if (this.state.auth === true) {

      function UserAvatar(props) {
        const url = props.url
        const width = props.width || 44
        const slot = props.slot || ''
        if (url) {
          return (
            <img slot={slot} src={url} width={width} alt="Фото" />
          )
        }

        return (
          <Icon slot={slot} ios="f7:person" md="material:account_circle" size={width}></Icon>
        )
      }

      return (
        <Page>
          <Navbar title="Меню" />
          <List mediaList>
            <ListItem 
              link="/profile/"
              title={this.state.user.firstname + ' ' + this.state.user.lastname}
              subtitle={this.state.user.phone} >
              <UserAvatar url={this.state.user.photo_url} width="40" slot="media" />
            </ListItem>
            <ListButton onClick={this.logout.bind(this)} title="Выход"></ListButton>
          </List>
          <List>
            <ListItem link="/task/add/" title="Создать задание" view="#main-view" panelClose></ListItem>
          </List>
        </Page>
      )
    }
    if (this.state.auth === false) {
      return (
        <Page>
          <Navbar title="Меню" />
          <List inset>
            <ListButton loginScreenOpen="#login-screen" title="Логин" panelClose></ListButton>
            <ListButton popupOpen="#registration" title="Регистрация" panelClose></ListButton>
          </List>
        </Page>
      )
    }
  }

  logout() {
    apiLogout()
      .then(_ => {
        window.userID = undefined
        window.location.reload()
      }).catch(error => {
        console.log(error)

        const self = this;
        const app = self.$f7;

        errorNotification(app, error)
      })
  }
}
