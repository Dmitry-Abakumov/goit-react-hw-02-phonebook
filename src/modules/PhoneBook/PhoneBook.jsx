import { Component } from 'react';
import { nanoid } from 'nanoid';

import PhoneBookForm from './PhoneBookForm/PhoneBookForm';
import ContactList from './ContactList/ContactList';
import PhoneBookFilter from './PhoneBookFilter/PhoneBookFilter';
import Box from 'shared/components/Box/Box';

class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  isDublicate = enteredName => {
    const { contacts } = this.state;
    return contacts.some(
      ({ name }) => name.toLowerCase() === enteredName.toLowerCase()
    );
  };

  addContact = ({ name, number }) => {
    this.setState(({ contacts }) => ({
      contacts: [{ id: nanoid(), name, number }, ...contacts],
    }));
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  onFilterChange = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;

    const normilizedEnteredName = filter.toLowerCase();

    if (!filter) return contacts;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normilizedEnteredName)
    );
  }

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <Box pt={50} textAlign="center" as="section">
        <h2>Phonebook</h2>
        <PhoneBookForm
          onSubmit={this.addContact}
          isDublicate={this.isDublicate}
        />
        {Boolean(contacts.length) && (
          <PhoneBookFilter onChange={this.onFilterChange} filter={filter} />
        )}

        <ContactList
          filteredContacts={filteredContacts}
          onDelBtnClick={this.deleteContact}
        />
      </Box>
    );
  }
}

export default PhoneBook;
