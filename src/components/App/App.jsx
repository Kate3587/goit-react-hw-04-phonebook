import { useState, useEffect} from "react";
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';
import { PhonebookWrapper, MainBookTitle, BookTitle} from './App.styled';

export const App = () => {

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = data => {
    //   const contactUniq = contacts.map(item => item.name).filter(name => name.toLowerCase() === data.name.toLowerCase())

    //   if (
    //     contactUniq.length === 0
    //   ) {
    //     // const newContact = {
    //     //   id: nanoid(),
    //     //   name: data.name,
    //     //   number: data.number,
    //     // };
    //     setContacts(prevState => [...prevState, contacts])
    //     // this.setState(prevState => (
    //     //   {
    //     //     contacts: [...prevState.contacts, newContact],
    //     //   }))
    //   } else {
    //     alert(contactUniq + 'is alrady in contacts.')
    //   }
    // };

    
    const handleFilter = event => {
      setFilter(event.target.value)
    };

    const handleDeleteUser = id => {
      setContacts(prevState => prevState.filter(item => item.id !== id))
    };

    // useEffect(() => {
 
    // },[])

    // componentDidMount() {
    //   const parsedContact = JSON.parse(localStorage.getItem('contacts'));

    //   if (parsedContact) {
    //     this.setState({
    //       contacts: parsedContact
    //     });
    //   }

    // }

    // componentDidUpdate(prevProps, prevState) {

    //   if (contacts !== contacts) {

    //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    //   }
    
    // };

  

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
  }
}