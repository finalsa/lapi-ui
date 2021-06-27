import redux from "reducers/utils/Redux"
import { Route, Switch } from 'react-router-dom';
import { useEffect } from "react";
import Details from './Details'
import Form from './Form'
import List from './List'

function EntitiesPage(props) {
    const { setActualPage, getEntityPagination, getEntityDetails, getEntityList, saveEntity, deleteEntity, setEntity, } = props
    const { path } = props.match

    const entities = { getEntityPagination, getEntityDetails, getEntityList, saveEntity, deleteEntity, setEntity, }
    let onReturn = () => {
        props.history.replace(`${path}`);
    }
    useEffect(() => {
        if (setActualPage) {
            setActualPage('entities')
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
                        {...entities}
                    ></Details>
                </Route>
                <Route
                    path={`${path}/form`}
                    exact
                >
                    <Form
                        onReturn={onReturn}
                        {...entities}
                    ></Form>
                </Route>
                <Route
                    path={`${path}/edit/:id`}
                    exact
                >
                    <Form
                        onReturn={onReturn}
                        {...entities}
                    ></Form>
                </Route>
                <Route
                    path={`${path}`}
                    exact
                >
                    <List
                        path={path}
                        history={props.history}
                        {...entities}
                    ></List>
                </Route>
            </Switch>
        </>
    )
}

export default redux(EntitiesPage)