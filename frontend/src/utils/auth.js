export const isAuthenticated = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData && userData.id; // Retorna true si hay un usuario logueado
};

export const getUserRole = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData ? userData.role : null;
};