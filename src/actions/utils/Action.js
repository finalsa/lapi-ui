import axios from 'axios'
import {
    API_URL
} from "configuration/manager";
import * as Const from "reducers/utils/Const.js";
import { getFromStorage } from 'configuration/storage'


class Action {
    id;
    path;
    state;
    fetch;

    constructor(id, path, state, fetchData = []) {
        this.id = id;
        this.path = path;
        this.state = state;
        this.fetch = "";
        for (let f of fetchData)
            this.fetch += `include[]=${f}&`;
    }

    paramsToQuery = (filters) => {
        let query = "";
        for (let filter in filters)
            if (filters[filter] != null)
                query += `${filter}=${filters[filter]}&`;
        return query
    }

    getPagination = (action, filters, callback) => {

        return this.request(
            "GET", `${action}`, this.paramsToQuery(filters), {},
            callback,
            this.onPaginate);
    }

    getList = (action, filters, callback) => {
        return this.request(
            "GET", `${action}`, this.paramsToQuery(filters), {},
            callback,
            this.onGetList);
    }

    getDetails = (action, filters, callback) => {
        return this.request(
            "GET", `${action}`, this.paramsToQuery(filters), {},
            callback,
            this.onGetDetails);
    }

    postData = (action, body, callback) => {
        return this.request(
            "POST", `${action}`, "", body,
            callback,
            this.onPostData);
    }

    putData = (action, id, body, callback) => {
        return this.request(
            "PUT", `/${action}${id}`, "", body,
            callback,
            this.onPutData);
    }

    deleteData = (action, id, callback) => {
        return this.request(
            "DELETE", `/${id}${action}`, "", {},
            callback,
            this.onDeleteData);
    }

    request = (
        method,
        path,
        query,
        body,
        callback,
        toDisp,
        otherArgs = {},
    ) => {
        let token = getFromStorage("token")
        let args = {}
        return (disp) => {
            args = {
                method: method,
                baseURL: API_URL,
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                url: `${this.path}${path}/?${this.fetch}${query}`,
                ...otherArgs
            };
            if (method === "FORM") {
                args.method = "POST"
                let formData = new FormData();
                for (let key in body) {
                    let value = body[key]
                    formData.append(key, value);
                }
                args['data'] = formData
            }
            else if (method !== "GET" && body) {
                args['data'] = body
                args.headers["Content-Type"] = "application/json"
            }

            return axios.request(
                args
            )
                .then((response) => {
                    let data = response.data
                    if (toDisp) {
                        disp(toDisp(data))
                    }
                    if (callback)
                        callback({
                            body: data,
                            ok: true
                        });
                })
                .catch((error) => {
                    console.log(error)
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        if (callback) {
                            callback({
                                body: {
                                    status: error.response.status,
                                    text: error.response.data
                                },
                                ok: false
                            });
                        }
                    }

                });
        };
    }

    requestExternal = (
        method,
        callback,
        otherArgs = {},
    ) => {
        let args = {}
        args = {
            method: method,
            ...otherArgs
        };
        axios.request(
            args
        )
            .then((response) => {
                let data = response.data

                if (callback)
                    callback({
                        body: data,
                        ok: true
                    });
            })
            .catch((error) => {
                console.log(args)
                console.log(error)
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                }
                if (callback)
                    callback({
                        body: {
                            status: error.status,
                            text: error.statusText
                        },
                        ok: false
                    });
            });
    }


    /**
     === SYNC ACTIONS ===
     */

    restartData = () => ({
        type: `${this.id}_${Const.RESTART}`
    });

    /**
     === EVENTS (TO REDUCERS) ===
     */

    onPaginate = (dataset) => {
        if (dataset.data)
            return {
                type: `${this.id}_${Const.GET_LIST}`,
                dataset: dataset.data
            }
        else {
            return {
                type: `${this.id}_${Const.GET_LIST}`,
                dataset: dataset
            }
        }
    };

    onGetList = (dataset) => ({
        type: `${this.id}_${Const.GET_LIST}`,
        dataset: dataset
    });

    onGetDetails = (data) => ({
        type: `${this.id}_${Const.GET_DETAILS}`,
        data: data
    });

    onPostData = (data) => ({
        type: `${this.id}_${Const.POST}`,
        data: data
    });

    onPutData = (data) => ({
        type: `${this.id}_${Const.PUT}`,
        data: data
    });

    onDeleteData = (data) => ({
        type: `${this.id}_${Const.DELETE}`,
        id: data.id
    });

}

export default Action;