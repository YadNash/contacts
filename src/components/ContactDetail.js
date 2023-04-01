import React from 'react';
import {Link} from "react-router-dom";
import user1 from "../images/user1.jpg";
export default function ContactDetail(props) {
    const {name , email} =props.location.state.contact;
  return (
    <div className="main">
        <div className='ui card centered'>
            <div className="image">
                <img src={user1} alt="user" />
            </div>
            <div className="content">
                <div className="header">{name}</div>
                <div className="desription">{email}</div>
            </div>
        </div>
        <div className="center-div">
            <Link  to="/ ">
            <button className='ui button blue centre'>Back to contact</button>
        
            </Link>
            </div>
    </div>
 
  )
}
