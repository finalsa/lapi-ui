import Action from 'actions/utils/Action';
import { getFromStorage, writeToStorage, deleteFromStorage } from 'configuration/storage'
class Auth extends Action {

    constructor() {
        super(
            "AUTH",
            "",
            (state) => state.search,
            []
        );
    }

    login(email, password, callback, errorCallback) {
        let onLogin = (res) => {
            if (res.ok) {
                if (res.body.status) {
                    errorCallback(res.body)
                } else {
                    writeToStorage("token", res.body.token);
                    writeToStorage("id", res.body.user.id);
                    callback(res)
                }
            } else {
                errorCallback(res.body)
            }
        }
        let params = {
            'username': email,
            'password': password
        }
        return this.request("FORM", "login", "", params, onLogin, this.onLogin);
    }

    getUser(callback, callbackLogout, getUsuarioDetails) {
        const sessionId = getFromStorage('id');
        let callbackValidate = (ok) => {
            if (ok) {
                return getUsuarioDetails(sessionId, {}, callback)
            } else {
                return this.logout(null, callbackLogout)()
            }
        }
        return this.validateSession(callbackValidate)
    }


    validateSession(callback) {
        let onValidate = (res) => {
            if (res.ok) {
                const sessionId = getFromStorage('id');
                const token = getFromStorage('token');
                callback((`${res.body.token}` === `${token}` && `${res.body.user.id}` === `${sessionId}`));
            } else {
                deleteFromStorage("token");
                deleteFromStorage("id");
                callback(false);
            }
        }

        const token = getFromStorage('token')
        const id = getFromStorage('id')
        let params = {
            'token': token ? token : '',
            'id': id ? id : '',
        }
        return this.request("FORM", `login/validate/${token}`, "", params, onValidate, this.onValidate);
    }

    logout(session, callback) {
        console.log("gui llamado")
        const onLogout = (res) => {
            deleteFromStorage("token");
            deleteFromStorage("id");
            callback(res);
        };
        let token = getFromStorage('token')
        let id = getFromStorage('id')
        let params = {
            'token': token ? token : '',
            'id': id ? id : ''
        }
        return this.request(
            "FORM", "logout", "",
            params, onLogout, this.onLogout);
    }

    onLogin = (data) => ({
        type: `${this.id}_LOGIN`,
        data: data
    });

    onLogout = () => ({
        type: `${this.id}_LOGOUT`
    });

    onValidate = () => ({
        type: `${this.id}_VALIDATE`
    });

}

export default Auth;