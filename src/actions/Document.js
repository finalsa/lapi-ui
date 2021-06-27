import Action from 'actions/utils/Action';

class Document extends Action {

    constructor() {
        super(
            "DOCUMENTS",
            "documents",
            (state) => state.documents,
            []
        );
    }
    
    getDocumentPagination(params = {}, pagination = true, callback) {
        if(pagination)
            params['pagination'] = 1
        return this.getPagination("", params, callback);
    }

    getDocumentList(params = {}, callback) {
        return this.getList("", params, callback);
    }

    getDocumentDetails(documentId, params = {}, callback) {
        return this.getDetails(`/${documentId}`, params, callback);
    }

    saveDocument(document, callback) {
        return this.postData("", document, callback);
    }

    setDocument(documentId, document, callback) {
        return this.putData("", documentId, document, callback);
    }

    deleteDocument(documentId, callback) {
        return this.deleteData("", documentId, callback);
    }

    restartDocument() {
        return this.restartData()
    }

}
export default Document;