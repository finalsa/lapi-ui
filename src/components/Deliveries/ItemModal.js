import { SelectLayout} from 'components/layout'
import { useCallback, useEffect, useState } from 'react';
import ProductDetails from 'components/Products/Details';

function ItemModal({
    onClose,
    onAdd,
    getProductList
}) {
    const [selectedItem, setSelectedItem] = useState(null)
    const [data, setData] = useState([])

    let loadData = useCallback((search = '') => {
        let callback = (res) => {
            if (res.ok) {
                setData(res.body)
                setSelectedItem(res.body[0])
            }
        }
        getProductList({ limit: 20, search: search }, callback)
    }, [getProductList])

    useEffect(() => {
        loadData()
    }, [loadData])

    let add = () => {
        if (onAdd)
            onAdd(selectedItem)
        onClose()
    }

    let onSelect = (val, pos) => {
        setSelectedItem(
            data[pos]
        )
    }

    let search = (text) => {
        loadData(text)
    }

    let dataHelper = []
    let mapper = (item) => {
        dataHelper.push({
            label: `${item.reference}-${item.name}-${item.size}-${item.product_type.description}`,
            value: item.id
        })
    }
    data.map(mapper)
    return (
        <>
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Agregar producto</p>
                        <button className="delete" aria-label="close" type="button" onClick={onClose}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="columns is-multiline">
                            <div className="column is-full">
                                <div className="field">
                                    <label className="label">
                                        Busqueda
                                    </label>
                                    <div className="control">
                                        <SelectLayout
                                            placeholder="a"
                                            onSearch={search}
                                            options={dataHelper}
                                            onSelect={onSelect}
                                        ></SelectLayout>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            (selectedItem) ? (
                                <>
                                    <ProductDetails
                                        data={selectedItem}
                                    ></ProductDetails>
                                </>
                            ) : null
                        }

                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-link" type="button" onClick={add}>Agregar</button>
                        <button className="button is-danger" type="button" onClick={onClose}>Cancel</button>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default ItemModal