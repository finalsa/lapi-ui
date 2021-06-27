import redux from "reducers/utils/Redux"
import { Route, Switch } from 'react-router-dom';
import { useEffect } from "react";
import Details from './Details'
import Form from './Form'
import List from './List'

function DocumentsPage(props) {
    const { setActualPage, getDocumentPagination, getDocumentDetails, getDocumentList, saveDocument, deleteDocument, setDocument, } = props
    const { path } = props.match

    const documents = { getDocumentPagination, getDocumentDetails, getDocumentList, saveDocument, deleteDocument, setDocument, }
    let onReturn = () => {
        props.history.replace(`${path}`);
    }
    useEffect(() => {
        if (setActualPage) {
            setActualPage('documents')
        }
    }, [setActualPage])
    return (
        <>

            <Switch>
                <Route
                    path={`${path}/details/:id`}
                    exact
                >
                    <Details
                        onReturn={onReturn}
                        {...documents}
                    ></Details>
                </Route>
                <Route
                    path={`${path}/form`}
                    exact
                >
                    <Form
                        onReturn={onReturn}
                        {...documents}
                    ></Form>
                </Route>
                <Route
                    path={`${path}/edit/:id`}
                    exact
                >
                    <Form
                        onReturn={onReturn}
                        {...documents}
                    ></Form>
                </Route>
                <Route
                    path={`${path}`}
                    exact
                >
                    <List
                        path={path}
                        history={props.history}
                        {...documents}
                    ></List>
                </Route>
            </Switch>
        </>
    )
}

export default redux(DocumentsPage)