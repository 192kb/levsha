
import React from 'react';
import {
  Page,
  LoginScreen,
  List,
  ListItem,
  ListButton,
  Label,
  LoginScreenTitle,
  Input,
} from 'framework7-react';
import 'react-phone-number-input/style.css'
import { formatPhoneNumber } from 'react-phone-number-input'
import { errorNotification } from '../../utility/helpers'
import { apiLogin } from '../../utility/api'

const smallerListItem = {
    fontSize: '13px'
}

export default class extends LoginScreen {
    constructor(props) {
        super(props)
        
        this.state = {
            loginScreenOpened: false,
            phone: '+7',
            password: '',
            errorMessage: ''
        }
    }
    
    render() {
        return (
            <LoginScreen id="login-screen" opened={this.state.loginScreenOpened} onLoginScreenClosed={() => {this.setState({loginScreenOpened : false})}}>
                <Page loginScreen>
                    <LoginScreenTitle>
                        Вход
                    </LoginScreenTitle>
                    <List form>
                        <ListItem>
                            <Label>Телефон</Label>
                            <Input required validate type="text" placeholder="Введите номер телефона" value={this.state.phone} onInput={(e) => {
                                var phone = e.target.value;
                                if (phone.startsWith('8') || phone.startsWith('7')) {
                                    phone = '+7' + phone.substr(1)
                                }
                                if (phone.startsWith('9')) {
                                    phone = '+7' + phone
                                }
                                this.setState({ phone: formatPhoneNumber(phone, "International") });
                            }}></Input>
                        </ListItem>
                        <ListItem>
                            <Label>Пароль</Label>
                            <Input 
                            required validate
                            type="password" placeholder="Введите пароль" onInput={(e) => {
                                this.setState({ password: e.target.value});
                            }} errorMessage={this.state.errorMessage} errorMessageForce={this.state.errorMessage.length > 0}></Input>
                        </ListItem>
                    </List>
                    <List>
                        <ListButton onClick={this.signIn.bind(this)}>Вход</ListButton>
                        <ListButton popupOpen="#registration" style={smallerListItem} title="Регистрация" loginScreenClose></ListButton>
                        <ListButton style={smallerListItem} loginScreenClose>Закрыть</ListButton>
                    </List>
                </Page>
            </LoginScreen>
        )
    }

    signIn() {
        if (this.state.phone.length !== 16 || this.state.password.length < 4) {
            this.setState({errorMessage: 'Введите логин и пароль'})
            return
        }

        const self = this;
        const app = self.$f7;
        
        apiLogin({
            phone: this.state.phone,
            password: this.state.password
        }).then( res => {
            console.log(res.data.success)
            if (res.data.success) {
                app.loginScreen.close()
            } else {
                this.setState({errorMessage: 'Неправильный логин и (или) пароль'})
            }
        }).catch( error => {
            console.log(error)

            errorNotification(app, error)
        })
    }
}