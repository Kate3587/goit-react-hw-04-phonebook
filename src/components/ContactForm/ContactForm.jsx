import React from "react";
import { useState } from "react";
import PropTypes from 'prop-types';
import {PhoneForm, FormLabel, FormInput, FormBtn} from './ContactForm.styled'

const ContactForm = ({onSubmit}) =>{

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');


  const handleChange = event => {
    const { value, name } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(name, number);
    setName('');
    setNumber('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <PhoneForm>
        <FormLabel htmlFor="input Name">
          Name
        </FormLabel>
        <FormInput
          onChange={handleChange}
          type="text"
          value={name}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Name"
        />
        <FormLabel htmlFor="input Name">
          Number
        </FormLabel>
        <FormInput
          onChange={handleChange}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Number"
        />
        <FormBtn type="submit">Add Contact</FormBtn>
      </PhoneForm>
    </form>
    )
  };

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};