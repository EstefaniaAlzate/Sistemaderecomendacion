import Swal from "sweetalert2"

export const showSuccessMessage = (message) => {
    Swal.fire({
        icon: "success",
        title: "Listo!",
        text: message,
    })
}