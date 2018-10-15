import React from 'react';
import {
  Page,
  Navbar,
  NavTitle,
  NavRight,
  Link,
  List,
  ListItem,
  Input,
  Label,
  BlockTitle,
  Toggle,
} from 'framework7-react';


import { apiAvailableCatrgories, apiAvailableLocations, user as userKey } from '../../utility/api'
import { sqlErrorHumanization, errorNotification } from '../../utility/helpers'

import uuid from 'uuid/v4';

function ListCategoryOptoins(props) {
  const listCategories = props.categories.map(category => 
      <option key={uuid()} value={category.id}>{category.name}</option>
  )

  return (
      <select name="category_id" value={props.selectedCategory || -1} onChange={(e) => {props.onChange(e)}}>
        <option key="non-existent" value="-1" disabled>Выбрать</option>
        {listCategories}
      </select>
  )
}

function ListLocationOptoins(props) {
  const listLocations = props.locations.map(location => 
      <option key={uuid()} value={location.id}>{location.name}</option>
  )

  return (
      <select name="location_id" value={props.selectedLocation || -1} onChange={(e) => {props.onChange(e)}}>
        <option key="non-existent" value="-1" disabled>Выбрать</option>
        {listLocations}
      </select>
  )
}

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      availableCategories: [],
      selectedCategory: undefined,
      title: '',
      description: '',
      date: undefined,
      time: '',
      availableLocations: [],
      selectedLocation: undefined,
      callsAllowed: true,
      messagingAllowed: true,
      price: '',
    }
  }

  componentDidMount() {
      apiAvailableCatrgories().then( res => {
        this.setState({availableCategories: res.data })
      }).catch( error => {
        console.log(error)

        const self = this
        const app = self.$f7

        errorNotification(app, error)
      })

      let user = JSON.parse(window.localStorage.getItem(userKey))
      apiAvailableLocations(user.city_id).then( res => {
        this.setState({availableLocations: res.data })
      }).catch( error => {
          console.log(error)

          const self = this
          const app = self.$f7

          errorNotification(app, error)
      })
  }

  onPageInit(e) {
    const self = this;
    const app = self.$f7;
    // Default
    self.calendar = app.calendar.create({
      inputEl: '#calendar-default',
      dateFormat: 'DD, dd MM, yyyy',
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август' , 'Сентябрь' , 'Октябрь', 'Ноябрь', 'Декабрь'],
      dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      monthNamesShort: ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'],
      dayNamesShort: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
      firstDay: 1,
      weekendDays: [0, 6],
      minDate: new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate()),
      // maxDate: new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate()+7),
      closeOnSelect: true,
      closeByOutsideClick: true,
    });
  }

  onPageBeforeRemove() {
    const self = this;
    self.calendarDefault.destroy();
  }

  createTask() {

  }

  render() {
    return (
      <Page onPageInit={this.onPageInit.bind(this)} onPageBeforeRemove={this.onPageBeforeRemove.bind(this)}>
        <Navbar backLink="Назад">
            <NavTitle>Добавить задание</NavTitle>
            <NavRight>
                <Link onClick={this.createTask.bind(this)}><strong>Готово</strong></Link>
            </NavRight>
        </Navbar>
        <BlockTitle>Категория</BlockTitle>
        <List form>
          <ListItem
              title="Вид деятельности"
              smartSelect
              smartSelectParams={{closeOnSelect: true, pageBackLinkText: "Назад", searchbar: true, searchbarPlaceholder: 'Поиск категории'}}
          >
              <ListCategoryOptoins categories={this.state.availableCategories} selectedCategory={this.state.selectedCategory} onChange={(e) => {
                  this.setState({selectedCategory: e.target.value})
              }} />
          </ListItem>
        </List>
        <BlockTitle>Задание</BlockTitle>
        <List form>
          <ListItem>
            <Label>Название</Label>
            <Input 
              required validate errorMessage="Обязательно для заполнения"
              type="text" 
              placeholder="Краткая суть Вашего задания" 
              value={this.state.title} onInput={(e) => {
                  this.setState({title: e.target.value});
              }} />
          </ListItem>
          <ListItem>
            <Label>Описание</Label>
             <Input 
              type="textarea" 
              placeholder="Подробнее опишите задание, чтобы исполнитель максимально точно его понял" 
              required 
              validate 
              errorMessage="Обязательно для заполнения"
              value={this.state.description} onInput={(e) => {
                this.setState({description: e.target.value});
              }} />
          </ListItem>
        </List>
        <BlockTitle>Назначить дату и время</BlockTitle>
        <List>
          <ListItem>
            <Label>Дата</Label>
            <Input 
              type="text" 
              placeholder="Укажите срок выполнения задания" 
              inputId="calendar-default" 
              clearButton
              value={this.state.date} 
              onChange={(e) => {
              let date = e.target.value
              if (date == '') {
                this.setState({date: undefined})
              }
              const self = this;

              this.setState({date: this.calendar.getValue()})
            }} />
          </ListItem>
          <ListItem>
            <Label>Время</Label>
            <Input 
              type="text" 
              clearButton
              placeholder="12:00" 
              maxlength="5"
              pattern="^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
              validate
              errorMessage="Введите время в корректном формате, например 12:35"
              value={this.state.time} onInput={(e) => {
                let time = e.target.value;
                if (time.length > 2 && time[2] !== ':') {
                  time = time.substr(0, 2) + ':' + time.substr(2)
                }

                this.setState({time: time});
              }} />
          </ListItem>
        </List>

        <BlockTitle>Район</BlockTitle>
        <List>
          <ListItem
              title="Район"
              smartSelect
              smartSelectParams={{closeOnSelect: true, pageBackLinkText: "Назад", searchbar: true, searchbarPlaceholder: 'Поиск района'}}
          >
              <ListLocationOptoins locations={this.state.availableLocations} selectedLocation={this.state.selectedLocation} onChange={(e) => {
                  this.setState({selectedLocation: e.target.value})
              }} />
          </ListItem>
        </List>

        <BlockTitle>Связь</BlockTitle>
        <List simpleList>
          <ListItem>
            <span>Разрешить звонки по телефону</span>
            <Toggle checked={this.state.callsAllowed} onChange={(e) => {
                  this.setState({callsAllowed: e.target.checked})
              }} />
          </ListItem>
          <ListItem>
            <span>Разрешить сообщения на сайте</span>
            <Toggle checked={this.state.messagingAllowed} onChange={(e) => {
                  this.setState({messagingAllowed: e.target.checked})
              }} />
          </ListItem>
        </List>

        <BlockTitle>Цена</BlockTitle>
        <List>
          <ListItem>
            {/* <Label>Цена</Label> */}
            <Input 
              type="number" 
              step="50"
              min="0"
              required validate errorMessage="Обязательно для заполнения"
              placeholder="Укажите точную стоимость задания" 
              value={this.state.price} onInput={(e) => {
                  this.setState({price: e.target.value});
              }} />
          </ListItem>
        </List>
      </Page>
    );
  }
}
