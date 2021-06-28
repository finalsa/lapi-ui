import Action from 'actions/utils/Action';

class Delivery extends Action {

    constructor() {
        super(
            "DELIVERIES",
            "deliveries",
            (state) => state.deliveries,
            []
        );
    }
    
    getDeliveryPagination(params = {}, pagination = true, callback) {
        if(pagination)
            params['pagination'] = 1
        return this.getPagination("", params, callback);
    }

    getDeliveryList(params = {}, callback) {
        return this.getList("", params, callback);
    }

    getDeliveryDetails(deliveryId, params = {}, callback) {
        return this.getDetails(`/${deliveryId}`, params, callback);
    }

    saveDelivery(delivery, callback) {
        return this.postData("", delivery, callback);
    }

    setDelivery(deliveryId, delivery, callback) {
        return this.putData("", deliveryId, delivery, callback);
    }

    deleteDelivery(deliveryId, callback) {
        return this.deleteData("", deliveryId, callback);
    }

    restartDelivery() {
        return this.restartData()
    }

}
export default Delivery;