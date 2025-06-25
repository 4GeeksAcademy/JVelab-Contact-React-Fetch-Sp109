// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useState } from "react";

export const Demo = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()
  const [contact, setContact] = useState({
    "name": "",
    "phone": "",
    "email": "",
    "address": ""
  })

  const addContact = () => {
    console.log(JSON.stringify(contact))
    fetch("https://playground.4geeks.com/contact/agendas/jose/contacts", {
      method: "POST",
      headers: {
            "Content-Type": "application/json"
          },
      body: JSON.stringify({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        address: contact.address
      })
    })
  .then(res => {
    window.location.href = "/"
    })
  }

  return (
    <div className="container w-50">
      <h2 className="text-center m-3">Crear un nuevo contacto</h2>
        <label htmlFor="name">Nombre</label>
        <input className="w-100 my-2" type="text" id="name" placeholder="Nombre Completo" value={contact.name} onChange={e => {setContact({...contact, "name" : e.target.value})}}/>
        <label htmlFor="name">Email</label>
        <input className="w-100 my-2" type="email" id="email" placeholder="Introduce el Email" value={contact.email} onChange={e => {setContact({...contact, "email" : e.target.value})}}/>
        <label htmlFor="name">Teléfono</label>
        <input className="w-100 my-2" type="phone" id="phone" placeholder="Introduce el teléfono" value={contact.phone} onChange={e => {setContact({...contact, "phone" : e.target.value})}}/>
        <label htmlFor="name">Dirección</label>
        <input className="w-100 my-2" type="text" id="address" placeholder="introduce la dirección" value={contact.address} onChange={e => {setContact({...contact, "address" : e.target.value})}}/>
        <button className="btn btn-primary w-50 my-2" onClick={addContact}>Guardar</button>
        <a href="/"><span>Volver a la lista de contactos.</span></a>
    </div>
  );
};
