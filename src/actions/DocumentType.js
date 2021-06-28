import Action from 'actions/utils/Action';

class DocumentType extends Action {

    constructor() {
        super(
            "DOCUMENTS",
            "document_type",
            (state) => state.documentTypes,
            []
        );
    }
    
    getDocumentTypePagination(params = {}, pagination = true, callback) {
        if(pagination)
            params['pagination'] = 1
        return this.getPagination("", params, callback);
    }

    getDocumentTypeList(params = {}, callback) {
        return this.getList("", params, callback);
    }

    getDocumentTypeDetails(documentTypeId, params = {}, callback) {
        return this.getDetails(`/${documentTypeId}`, params, callback);
    }

    saveDocumentType(documentType, callback) {
        return this.postData("", documentType, callback);
    }

    setDocumentType(documentTypeId, documentType, callback) {
        return this.putData("", documentTypeId, documentType, callback);
    }

    deleteDocumentType(documentTypeId, callback) {
        return this.deleteData("", documentTypeId, callback);
    }

    restartDocumentType() {
        return this.restartData()
    }

}
export default DocumentType;