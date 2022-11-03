import { useState, useEffect} from "react";
import { nanoid } from 'nanoid';

import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';
import { PhonebookWrapper, MainBookTitle, BookTitle } from './App.styled';

export function App() {

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parsedContact = JSON.parse(localStorage.getItem(contacts));
    if (parsedContact) {
      setContacts(parsedContact);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(contacts, JSON.stringify(contacts));
  }, [contacts]);
  
  
  const formSubmitHandler = (name, number) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts!`);
    }
    setContacts(prevContacts => {
      return [
        ...prevContacts,
        {
          name: name,
          number: number,
          id: nanoid(),
        },
      ];
    });
  };

  // const filteredUsers = () => {
  //   const normalisedFilter = filter.toLowerCase();
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normalisedFilter)
  //   );
  // };

    
  const handleFilter = event => {
    setFilter(event.target.value)
  };

  const handleDeleteUser = id => {
    setContacts(prevContacts => {
      return prevContacts.filter(item => item.id !== id)
    })
  };

const filteredUsers = contacts.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <PhonebookWrapper>
      <MainBookTitle>Phonebook</MainBookTitle>
      <ContactForm
        onSubmit={formSubmitHandler}
      />
      <div>
        <BookTitle>Contacts</BookTitle>
        <Filter
          inputLabel="Find contacts by name"
          onChangeFilter={handleFilter}
          value={filter}
        />
        <ContactList
          filterForUsers={filteredUsers}
          onDeleteUsers={handleDeleteUser}
        />
      </div>
    </PhonebookWrapper>
  )
};