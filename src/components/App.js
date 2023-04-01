import React, { useState, useEffect } from 'react';
import { v4 as uuid } from "uuid";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactCard from "./ContactCard";
import ContactDetail from './ContactDetail';
import api from "../api/contacts";
import EditContact from './EditContact';


function App() {


  const LOCAL_ITEM_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contacts)
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const removeContactHandeler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join("").toLowerCase().includes(searchTerm.toLowerCase());
      });

      setSearchResults(newContactList);
    }

    else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    // const retrive = JSON.parse(localStorage.getItem(LOCAL_ITEM_KEY));
    // if (retrive) setContacts(retrive);
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_ITEM_KEY, JSON.stringify(contacts));
  }, [contacts]);
  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Switch>
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props}
                addContactHandler={addContactHandler}
              />
            )}
          />
          <Route path="/"
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandeler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />

          <Route>
            path="/edit"
            render={(props) => (
              <EditContact {...props} updateContactHandler={updateContactHandler}
              />)}
          </Route>

          <Route
            path="/contact/:id" component={ContactDetail}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
