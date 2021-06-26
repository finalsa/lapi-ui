import Action from 'actions/utils/Action';

class User extends Action {

    constructor() {
        super(
            "USER",
            "users",
            (state) => state.users,
            []
        );
    }
    
    getUserPagination(params = {}, pagination = true, callback) {
        if(pagination)
            params['pagination'] = 1
        return this.getPagination("", params, callback);
    }

    getUserList(params = {}, callback) {
        return this.getList("", params, callback);
    }

    getUserDetails(userId, params = {}, callback) {
        return this.getDetails(`/${userId}`, params, callback);
    }

    saveUser(user, callback) {
        return this.postData("", user, callback);
    }

    setUser(userId, user, callback) {
        return this.putData("", userId, user, callback);
    }

    deleteUser(userId, callback) {
        return this.deleteData("", userId, callback);
    }

    restartUser() {
        return this.restartData()
    }

}
export default User;