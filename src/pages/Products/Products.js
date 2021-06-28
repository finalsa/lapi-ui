import redux from "reducers/utils/Redux"
import { Route, Switch } from 'react-router-dom';
import { useEffect } from "react";
import Details from './Details'
import Form from './Form'
import List from './List'

function ProductsPage(props) {
    const { setActualPage, getProductPagination, getProductDetails, getProductList, saveProduct, deleteProduct, setProduct, getProductTypeList } = props
    const { path } = props.match

    const products = { getProductPagination, getProductDetails, getProductList, saveProduct, deleteProduct, setProduct, getProductTypeList}
    let onReturn = () => {
        props.history.replace(`${path}`);
    }
    useEffect(() => {
        if (setActualPage) {
            setActualPage('products')
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
                        {...products}
                    ></Details>
                </Route>
                <Route
                    path={`${path}/form`}
                    exact
                >
                    <Form
                        onReturn={onReturn}
                        {...products}
                    ></Form>
                </Route>
                <Route
                    path={`${path}/edit/:id`}
                    exact
                >
                    <Form
                        onReturn={onReturn}
                        {...products}
                    ></Form>
                </Route>
                <Route
                    path={`${path}`}
                    exact
                >
                    <List
                        path={path}
                        history={props.history}
                        {...products}
                    ></List>
                </Route>
            </Switch>
        </>
    )
}

export default redux(ProductsPage)