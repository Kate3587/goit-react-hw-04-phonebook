import { useState, useEffect} from "react";
import { nanoid } from 'nanoid';

import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';
import { PhonebookWrapper, MainBookTitle, BookTitle } from './App.styled';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  })

  useEffect(() => { 
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state])
  return [state, setState]
}

export function App() {

  const [contacts, setContacts] = useLocalStorage('contacts', '');
  const [filter, setFilter] = useState('');


  useEffect(() => {

  });
  
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