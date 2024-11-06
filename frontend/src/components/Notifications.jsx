import Swal from "sweetalert2"

export const showSuccessMessage = (message) => {
    Swal.fire({
        icon: "success",
        title: "Listo!",
        text: message,
    })
}
export const showErrorMessage = (message, error = null) => {
    const errorMessage = error != null ? `\n ${error}` : ""
    Swal.fire({
        icon: "error",
        title: "Ooops!",
        text: message + errorMessage
    })
}