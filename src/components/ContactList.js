import React ,{useRef} from "react";
import {Link} from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
    const deleteContactHandler=(id)=>{
        props.getContactId(id);
    };
    
const inputEl=useRef();

    const renderContactList = props.contacts.map((contact) => {
    return (
       <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id}/>
    );

});

const getSearchTerm =() =>{
    props.searchKeyword(inputEl.current.value);
};
return (
    <div className="main">
        <h2>Contact List
          <Link to="/add"> <button className="ui button blue right">Add Contact</button></Link>  
        </h2>
        <div className="ui search">
            <div className="ui icon input">
                <input
                ref={inputEl}
                type="text" placeholder="Search Contact" className="prompt" value={props.term} onChange={getSearchTerm}/>
              <i className="search icon"></i>
            </div>
        </div>
        <div className="ui celled list" >{renderContactList}</div>
    <div className="ui celled list">{renderContactList.lenght >0 ? renderContactList :"No Contacts available"}</div>
    </div>
    
);
}

export default ContactList;