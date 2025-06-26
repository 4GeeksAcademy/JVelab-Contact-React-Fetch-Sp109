import React, { useEffect } from "react";
import SimpleContact from "./SingleContact";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { initialStore } from "../store.js";

const ContactList = () => {

    const {store, dispatch} = useGlobalReducer()
    const { contacts } = store

    const getAgenda = () => {
        fetch("https://playground.4geeks.com/contact/agendas/jose/contacts")
        .then(res => {
                if (!res.ok) {
                    return fetch("https://playground.4geeks.com/contact/agendas/jose", {
                        method: "POST"
                    })
                    .then(() => {
                    // Vuelve a hacer GET después de crearla
                    fetch("https://playground.4geeks.com/contact/agendas/jose/contacts")
                })
            }
                else {
                    return res
                }
            }
        )
        .then(res => res.json())
        .then(data => 
             dispatch({ type: "get_contacts", payload: data.contacts })
        )
    }

    useEffect(getAgenda,[])

    return (
        <div className="w-50 m-auto my-5">
            {contacts.map((contact) => (
                <SimpleContact key={contact.id} contact={contact} getAgenda={getAgenda}/>
            ))}
        </div>
    )
}

export default ContactList