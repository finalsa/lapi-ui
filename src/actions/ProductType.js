import Action from 'actions/utils/Action';

class ProductType extends Action {

    constructor() {
        super(
            "PRODUCTS",
            "product_types",
            (state) => state.productTypes,
            []
        );
    }
    
    getProductTypePagination(params = {}, pagination = true, callback) {
        if(pagination)
            params['pagination'] = 1
        return this.getPagination("", params, callback);
    }

    getProductTypeList(params = {}, callback) {
        return this.getList("", params, callback);
    }

    getProductTypeDetails(productTypeId, params = {}, callback) {
        return this.getDetails(`/${productTypeId}`, params, callback);
    }

    saveProductType(productType, callback) {
        return this.postData("", productType, callback);
    }

    setProductType(productTypeId, productType, callback) {
        return this.putData("", productTypeId, productType, callback);
    }

    deleteProductType(productTypeId, callback) {
        return this.deleteData("", productTypeId, callback);
    }

    restartProductType() {
        return this.restartData()
    }

}
export default ProductType;