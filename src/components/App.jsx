import React, { Component } from 'react';
import { Div } from './app.styled';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class App extends Component {
  // состояние. публичное свойство state. свойство экземпляра, всегда объект. от свойств этого объекта зависит разметка
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  //функция (метод) обработки контактов которая добавляем новый контакт
  handleAddContact = newContact =>
    this.setState(
      ({ contacts }) => ({
        contacts: [...contacts, newContact],
      })
      // Notify.success('Contact is add phonebook')
    );

  //функция (метод) проверки на уникальность контактов
  handleCheckUniqueContact = name => {
    //берем наши контакты из state
    const { contacts } = this.state;
    //переменная которая проверяет существует ли контакт в массиве контактов
    //ставим !! если что то найдет то получим true в противном случае false
    const isExistContact = !!contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    //если контакт существует то выводим сообщение
    isExistContact && Notify.failure('Contact is already exist');
    //но так как у нас функция проверяет на уникальность то мы ставим инверсию (тоесть не существует контакта значит он уникальный)
    return !isExistContact;
  };

  handleRemoveContact = id =>
    this.setState(
      ({ contacts }) => ({
        contacts: contacts.filter(contact => contact.id !== id),
      }),
      Notify.success('Contact is delete')
    );
  //обработчик фильтр handleFilterChange в него будет приходить фильтр и будем менять наш стейт filter
  handleFilterChange = filter => this.setState({ filter });

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Div>
        <Section title="Phonebook">
          <ContactForm
            onAdd={this.handleAddContact}
            onCheckUnique={this.handleCheckUniqueContact}
          />
        </Section>
        <Section title="Contacts">
          <h3>Find contacts by name</h3>
          <Filter filter={filter} onChange={this.handleFilterChange} />
          <ContactList
            contacts={visibleContacts}
            onRemove={this.handleRemoveContact}
          />
        </Section>
      </Div>
    );
  }
}

export default App;
