import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const SimpleContact = (props) => {

    const { getAgenda } = props
    const { name, phone, email, address, id } = props.contact

    const deleteContact = (contactId) => {
        console.log("delete")
        fetch(`https://playground.4geeks.com/contact/agendas/jose/contacts/${contactId}`, {
            method: "DELETE"
        })
        .then(() => getAgenda())
    }

    return (
        <div className="row d-flex p-3 border">
            <div className="col-3 d-flex justify-content-center align-items-center">
                <img src="https://img.freepik.com/vector-premium/icono-perfil-avatar-predeterminado-imagen-usuario-redes-sociales-icono-avatar-gris-silueta-perfil-blanco-ilustracion-vectorial_561158-3407.jpg" alt="Imagen de Constacto" className="rounded-circle"/>
            </div>
            <div className="col-7 text-muted text-start">
                <div className="row mb-2">
                    <h3>{name}</h3>
                </div>
                <div className="row mb-1">
                    <h5>
                        <i className="fa-solid fa-location-dot"></i> {address}
                    </h5>
                </div>
                <div className="row">
                    <p className="mb-1"><i className="fa-solid fa-phone-flip"></i> {phone}</p>
                </div>
                <div className="row">
                    <p><i className="fa-solid fa-envelope"></i> {email}</p>
                </div>
                
            </div>
            <div className="col-2 d-flex justify-content-center gap-4">
                <a href={`/single/${id}`}><button className="h-25"><i className="fa-solid fa-pencil"></i></button></a>
                <button className="h-25"><i className="fa-solid fa-trash" onClick={() => deleteContact(id)}></i></button>
            </div>

        </div>
    )
}

export default SimpleContact