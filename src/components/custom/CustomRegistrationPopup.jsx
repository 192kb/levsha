import {
    View,
    Popup,
    Page,
    Navbar,
    NavRight,
    Link,
    BlockTitle,
    List,
    ListItem,
    Input,
    Label, 
    NavLeft,
    NavTitle
  } from 'framework7-react';
import React from 'react';
import 'react-phone-number-input/style.css'
import uuid from 'uuid/v4';
import { formatPhoneNumber } from 'react-phone-number-input'

import { capitalize, sqlErrorHumanization, errorNotification } from '../../utility/helpers'
import { apiAvailableCities, apiRegister } from '../../utility/api'
const { min_password_length } = require('../../configuration');


function ListCityOptoins(props) {
    const listCities = props.cities.map(city => 
        <option key={uuid()} value={city.id}>{city.name}</option>
    )

    return (
        <select name="city_id" defaultValue={props.selectedCity} onChange={(e) => {props.onChange(e)}}>
            {listCities}
        </select>
    )
}

export default class extends Popup {
    constructor(props) {
        super(props)
        
        this.state = {
            firstname: '',
            lastname: '',
            phone: '+7',
            password: '',
            password_repeat: '',
            city_id: null,
            availableCities: []
        }
    }

    componentDidMount() {
        apiAvailableCities().then( res => {
            this.setState({availableCities: res.data, city_id: res.data[0].id })
        }).catch( error => {
            console.log(error)
 
            const self = this
            const app = self.$f7

            errorNotification(app, error)
        })
    }

    render() {
        return (
            <Popup id="registration"> 
                <View>
                <Page>
                    <Navbar>
                        <NavLeft>
                            <Link popupClose>Закрыть</Link>
                        </NavLeft>
                        <NavTitle>Регистрация</NavTitle>
                        <NavRight>
                            <Link onClick={this.register.bind(this)}><strong>Готово</strong></Link>
                        </NavRight>
                    </Navbar>
                    <BlockTitle>Форма регистрации</BlockTitle>
                    <List form id="registration_form">
                        <ListItem>
                            <Label>Имя</Label>
                            <Input required validate 
                                name="firstname"
                                autocomplete="given-name" type="text" 
                                placeholder="Имя" 
                                value={this.state.firstname} onInput={(e) => {
                                    this.setState({firstname: capitalize(e.target.value)});
                                }} 
                                errorMessage="Обязательно для заполнения" />
                        </ListItem>
                        <ListItem>
                            <Label>Фамилия</Label>
                            <Input 
                                name="lastname"
                                required validate 
                                autocomplete="family-name" type="text" 
                                placeholder="Фамилия" 
                                value={this.state.lastname} onInput={(e) => {
                                    this.setState({lastname: capitalize(e.target.value)});
                                }} 
                                errorMessage="Обязательно для заполнения" />
                        </ListItem>
                        <ListItem>
                            <Label>Телефон</Label>
                            <Input 
                                required pattern="[0-9\s\+]*" validate 
                                autocomplete="tel"
                                type="tel" placeholder="Введите номер телефона" 
                                value={this.state.phone} onInput={(e) => {
                                    var phone = e.target.value;
                                    if (phone.startsWith('8') || phone.startsWith('7')) {
                                        phone = '+7' + phone.substr(1)
                                    }
                                    if (phone.startsWith('9')) {
                                        phone = '+7' + phone
                                    }
                                    this.setState({ phone: formatPhoneNumber(phone, "International") });
                                }} 
                                errorMessage="Не совпадает формат, обязательно для заполнения"></Input>
                        </ListItem>
                        <ListItem>
                            <Label>Пароль</Label>
                            <Input required clearButton type="password" placeholder="Введите пароль" value={this.state.password} onInput={(e) => {
                                this.setState({ password: e.target.value});
                            }}></Input>
                        </ListItem>
                        <ListItem>
                            <Input required pattern={'.{'+min_password_length+',}'} clearButton type="password" placeholder="Введите пароль еще раз" value={this.state.password_repeat} onInput={(e) => {
                                this.setState({ password_repeat: e.target.value});
                            }} 
                            errorMessage={'Не менее '+min_password_length+' символов, пароли должны совпадать'}
                            errorMessageForce={this.validatePassword.bind(this)()}></Input>
                        </ListItem>
                        <ListItem
                            title="Город"
                            smartSelect
                            smartSelectParams={{searchbar: true, searchbarPlaceholder: 'Поиск города'}}
                        >
                            <ListCityOptoins cities={this.state.availableCities} selectedCity={this.state.city_id} onChange={(e) => {
                                this.setState({city_id: e.target.value})
                            }} />
                        </ListItem>
                    </List>
                </Page>
                </View>
            </Popup>
        )
    }

    validatePassword() {
        if (this.state.password === '') { return false }
        if (this.state.password.length < min_password_length) { return true }
        if (this.state.password !== this.state.password_repeat) { return true }
    }
    
    register() {

        const self = this;
        const app = self.$f7;

        app.input.validateInputs('#registration_form')

        apiRegister({
            firstname: self.state.firstname,
            lastname: self.state.lastname,
            phone: self.state.phone,
            password: self.state.password,
            city_id: self.state.city_id
        }).then(res => {
            if (res.data.code) {
                app.dialog.alert(sqlErrorHumanization(res.data.code, res.data.sqlMessage), () => {})
            } else {
                app.dialog.alert('Вы успешно зарегистрированы', () => {
                    app.popup.close()
                })    
            }
        }).catch(error => {
            console.log(error)

            errorNotification(app, error)
        })
    }
}