import redux from "reducers/utils/Redux"
import { Route, Switch } from 'react-router-dom';
import { useEffect } from "react";
import Details from './Details'
import Form from './Form'
import List from './List'

function DeliverysPage(props) {
    const { setActualPage, getDeliveryPagination, getDeliveryDetails, getDeliveryList, saveDelivery, deleteDelivery, setDelivery, getEntityList } = props
    const { path } = props.match

    const deliveries = { getDeliveryPagination, getDeliveryDetails, getDeliveryList, saveDelivery, deleteDelivery, setDelivery, getEntityList }
    let onReturn = () => {
        props.history.replace(`${path}`);
    }
    useEffect(() => {
        if (setActualPage) {
            setActualPage('deliveries')
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
                        getTemplateTypeList={props.getTemplateTypeList}
                        getTemplateList={props.getTemplateList}
                        getTemplateDetails={props.getTemplateDetails}
                        getItemDetails={props.getItemDetails}
                        getItemPagination={props.getItemPagination}
                        getItemList={props.getItemList}
                        getEntityDetails={props.getEntityDetails}
                        onReturn={onReturn}
                        {...deliveries}
                    ></Details>
                </Route>
                <Route
                    path={`${path}/form`}
                    exact
                >
                    <Form
                        getProductDetails={props.getProductDetails}
                        getProductList={props.getProductList}
                        onReturn={onReturn}
                        {...deliveries}
                    ></Form>
                </Route>
                <Route
                    path={`${path}/edit/:id`}
                    exact
                >
                    <Form
                        getProductDetails={props.getProductDetails}
                        getProductList={props.getProductList}
                        onReturn={onReturn}
                        {...deliveries}
                    ></Form>
                </Route>
                <Route
                    path={`${path}`}
                    exact
                >
                    <List
                        path={path}

                        history={props.history}
                        {...deliveries}
                    ></List>
                </Route>
            </Switch>
        </>
    )
}

export default redux(DeliverysPage)