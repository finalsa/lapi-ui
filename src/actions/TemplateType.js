import Action from 'actions/utils/Action';

class TemplateType extends Action {

    constructor() {
        super(
            "TEMPLATETYPES",
            "template_types",
            (state) => state.templateTypes,
            []
        );
    }
    
    getTemplateTypePagination(params = {}, pagination = true, callback) {
        if(pagination)
            params['pagination'] = 1
        return this.getPagination("", params, callback);
    }

    getTemplateTypeList(params = {}, callback) {
        return this.getList("", params, callback);
    }

    getTemplateTypeDetails(templateTypeId, params = {}, callback) {
        return this.getDetails(`/${templateTypeId}`, params, callback);
    }

    saveTemplateType(templateType, callback) {
        return this.postData("", templateType, callback);
    }

    setTemplateType(templateTypeId, templateType, callback) {
        return this.putData("", templateTypeId, templateType, callback);
    }

    deleteTemplateType(templateTypeId, callback) {
        return this.deleteData("", templateTypeId, callback);
    }

    restartTemplateType() {
        return this.restartData()
    }

}
export default TemplateType;