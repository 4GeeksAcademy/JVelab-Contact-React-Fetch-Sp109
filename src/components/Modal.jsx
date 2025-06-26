import React, { useState } from "react";
import "./modal.css"

const Modal = ({ isOpen, onClose, children }) => {

    const [visible, setVisible] = useState(false)

    return(
        <div className="modal-container" style={{display: isOpen ? "grid" : "none"}}>
            <div className="modal-body p-5">
                <button className="modal-close text-end py-2 px-3" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    )

}

export default Modal