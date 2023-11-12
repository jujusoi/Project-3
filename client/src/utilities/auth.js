import decode from 'jwt-decode';

class AuthService {
    login(token) {
        localStorage.setItem('token', token);
        window.location.assign('/');
    };
    getToken() {
        return localStorage.getItem('token');
    };
    getProfile() {
        return decode(this.getToken());
    };
    logout() {
        localStorage.removeItem('token');
        window.location.assign('/');
    };
};

export default new AuthService();