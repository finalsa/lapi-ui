import Action from 'actions/utils/Action';

class Template extends Action {

    constructor() {
        super(
            "TEMPLATES",
            "templates",
            (state) => state.templates,
            []
        );
    }
    
    getTemplatePagination(params = {}, pagination = true, callback) {
        if(pagination)
            params['pagination'] = 1
        return this.getPagination("", params, callback);
    }

    getTemplateList(params = {}, callback) {
        return this.getList("", params, callback);
    }

    getTemplateDetails(templateId, params = {}, callback) {
        return this.getDetails(`/${templateId}`, params, callback);
    }

    saveTemplate(template, callback) {
        return this.postData("", template, callback);
    }

    setTemplate(templateId, template, callback) {
        return this.putData("", templateId, template, callback);
    }

    deleteTemplate(templateId, callback) {
        return this.deleteData("", templateId, callback);
    }

    restartTemplate() {
        return this.restartData()
    }

}
export default Template;