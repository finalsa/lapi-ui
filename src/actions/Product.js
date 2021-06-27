import Action from 'actions/utils/Action';

class Product extends Action {

    constructor() {
        super(
            "PRODUCTS",
            "products",
            (state) => state.products,
            []
        );
    }
    
    getProductPagination(params = {}, pagination = true, callback) {
        if(pagination)
            params['pagination'] = 1
        return this.getPagination("", params, callback);
    }

    getProductList(params = {}, callback) {
        return this.getList("", params, callback);
    }

    getProductDetails(productId, params = {}, callback) {
        return this.getDetails(`/${productId}`, params, callback);
    }

    saveProduct(product, callback) {
        return this.postData("", product, callback);
    }

    setProduct(productId, product, callback) {
        return this.putData("", productId, product, callback);
    }

    deleteProduct(productId, callback) {
        return this.deleteData("", productId, callback);
    }

    restartProduct() {
        return this.restartData()
    }

}
export default Product;