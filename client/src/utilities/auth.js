import decode from 'jwt-decode';

class AuthService {
    login(token) {
        localStorage.setItem('token', token);
        window.location.assign('/');
    };
    setToken(token) {
        localStorage.setItem('token', token);
    }
    getToken() {
        return localStorage.getItem('token');
    };
    getProfile() {
        return decode(this.getToken());
    };
    logout() {
        localStorage.removeItem('token');
        window.location.assign('/login');
    };
};

export default new AuthService();