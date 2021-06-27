import Action from 'actions/utils/Action';

class Entity extends Action {

    constructor() {
        super(
            "ENTITIES",
            "entities",
            (state) => state.entities,
            []
        );
    }
    
    getEntityPagination(params = {}, pagination = true, callback) {
        if(pagination)
            params['pagination'] = 1
        return this.getPagination("", params, callback);
    }

    getEntityList(params = {}, callback) {
        return this.getList("", params, callback);
    }

    getEntityDetails(entityId, params = {}, callback) {
        return this.getDetails(`/${entityId}`, params, callback);
    }

    saveEntity(entity, callback) {
        return this.postData("", entity, callback);
    }

    setEntity(entityId, entity, callback) {
        return this.putData("", entityId, entity, callback);
    }

    deleteEntity(entityId, callback) {
        return this.deleteData("", entityId, callback);
    }

    restartEntity() {
        return this.restartData()
    }

}
export default Entity;