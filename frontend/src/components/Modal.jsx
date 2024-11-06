// Modal.jsx
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../styles/ModalStyles.css";
import { useEffect } from "react";

export const ModalForm = ({ CerrarModal, html, width }) => {
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        MySwal.fire({
            html: html,
            width: width,
            showConfirmButton: false,
            allowOutsideClick: true,
            timer: 0,
            customClass: {
                popup: 'form-modal' // Aplicar la clase específica para el modal de formulario
            }
        }).then(() => CerrarModal());
    }, []);

    return null;
};

export const ModalInfoCard = ({ CerrarModal, html, width }) => {
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        MySwal.fire({
            html: html,
            width: width,
            showConfirmButton: false,
            allowOutsideClick: true,
            customClass: {
                popup: 'info-card' // Aplicar la clase específica para el modal de la tarjeta
            }
        }).then(() => CerrarModal());
    }, [html, width]); // Solo las dependencias necesarias

    return null;
};
