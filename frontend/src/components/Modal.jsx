import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import "../styles/ModalStyles.css"
import { useEffect } from "react"
export const ModalForm = ({ titulo, CerrarModal, html, width, height }) => {


    const MySwal = withReactContent(Swal)

    useEffect(() => {
        MySwal.fire({
            html: html,
            width: width,
            showConfirmButton: false,
            allowOutsideClick: true,
            timer: 0
        }).then(() => CerrarModal())
    }, []);
    return null;
}