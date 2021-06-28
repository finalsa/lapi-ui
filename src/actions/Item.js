import Action from 'actions/utils/Action';

class Item extends Action {

    constructor() {
        super(
            "ITEMS",
            "items",
            (state) => state.items,
            []
        );
    }
    
    getItemPagination(params = {}, pagination = true, callback) {
        if(pagination)
            params['pagination'] = 1
        return this.getPagination("", params, callback);
    }

    getItemList(params = {}, callback) {
        return this.getList("", params, callback);
    }

    getItemDetails(itemId, params = {}, callback) {
        return this.getDetails(`/${itemId}`, params, callback);
    }

    saveItem(item, callback) {
        return this.postData("", item, callback);
    }

    setItem(itemId, item, callback) {
        return this.putData("", itemId, item, callback);
    }

    deleteItem(itemId, callback) {
        return this.deleteData("", itemId, callback);
    }

    restartItem() {
        return this.restartData()
    }

}
export default Item;