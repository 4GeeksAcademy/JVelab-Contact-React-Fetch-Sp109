// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import rigoImageUrl from "../assets/img/rigo-baby.jpg"  // Import an image asset
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useEffect,useState } from "react";

// Define and export the Single component which displays individual item details.
export const Single = props => {
  // Access the global state using the custom hook.
  const { store, dispatch } = useGlobalReducer()
  const [contact, setContact] = useState(null)
  const { theId } = useParams()

  useEffect(() => {
    if (!store.contacts.length) {
      fetch("https://playground.4geeks.com/contact/agendas/jose/contacts")
        .then(res => {
                if (!res.ok) {
                    return fetch("https://playground.4geeks.com/contact/agendas/jose", {
                        method: "POST"
                    })
                }
                else {
                    return res.json()
                }
            }
        )
        .then(data => {
          dispatch({type: "get_contacts", payload: data.contacts})
            }
    )}
  }, [])

  useEffect(() => {
    if (store.contacts.length) {
      console.log(store.contacts)
      const singleContact = store.contacts.find(contact => contact.id == parseInt(theId))
      setContact(singleContact)
    }
  },[store.contacts])

  if (!contact) {
    return <p className="text-center mt-5">Cargando contacto...</p>;
  }
  
  const {name, phone, address, email} = contact

  // Retrieve the 'theId' URL parameter using useParams hook.
  const singleTodo = store.todos.find(todo => todo.id === parseInt(theId));

  const updateContact = () => {
    fetch(`https://playground.4geeks.com/contact/agendas/jose/contacts/${contact.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify({
          name: name,
          phone: phone,
          email: email,
          address: address
        })
      })
      .then(res => {
        window.location.href = "/"
        })
  }

  return (

    <div className="container w-50">
      <h2 className="text-center m-3">Modifica el contacto de {name}</h2>
        <label htmlFor="name">Nombre</label>
        <input className="w-100 my-2" type="text" id="name" placeholder="Nombre Completo" value={name} onChange={e => {setContact({...contact, "name" : e.target.value})}}/>
        <label htmlFor="name">Email</label>
        <input className="w-100 my-2" type="email" id="email" placeholder="Introduce el Email" value={email} onChange={e => {setContact({...contact, "email" : e.target.value})}}/>
        <label htmlFor="name">Teléfono</label>
        <input className="w-100 my-2" type="phone" id="phone" placeholder="Introduce el teléfono" value={phone} onChange={e => {setContact({...contact, "phone" : e.target.value})}}/>
        <label htmlFor="name">Dirección</label>
        <input className="w-100 my-2" type="text" id="address" placeholder="introduce la dirección" value={address} onChange={e => {setContact({...contact, "address" : e.target.value})}}/>
        <div className="row d-flex justify-content-center">
          <button className="btn btn-primary w-50 my-2" onClick={updateContact}>Guardar</button>
          </div>
        <a href="/"><span className="w-100">Volver a la lista de contactos.</span></a>
    </div>

    // <div className="container text-center">
    //   {/* Display the title of the todo element dynamically retrieved from the store using theId. */}
    //   <h1 className="display-4">Todo: {singleTodo?.title}</h1>
    //   <hr className="my-4" />  {/* A horizontal rule for visual separation. */}

    //   {/* A Link component acts as an anchor tag but is used for client-side routing to prevent page reloads. */}
    //   <Link to="/">
    //     <span className="btn btn-primary btn-lg" href="#" role="button">
    //       Back home
    //     </span>
    //   </Link>
    // </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Single.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
