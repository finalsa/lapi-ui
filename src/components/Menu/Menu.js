import { LOGO } from 'configuration/manager'
import { Link } from 'react-router-dom'

function Menu(props) {
    const { path } = props
    return (
        <>
            <section className="hero is-fullheight p-0 m-0">
                <div className="hero-head">

                    <aside className="menu ml-2">
                        <ul className="menu-list">
                            <img
                                src={LOGO}
                                width="100"
                                height="80"
                                alt='logo'
                            />
                        </ul>
                        <p className="menu-label">
                            General
                        </p>
                        <ul className="menu-list">
                            <li>
                                <Link to='/home/deliveries' className={`is-size-6 ${(path === 'deliveries') ? 'is-active' : ''}`}>
                                    Entregas
                                </Link>
                            </li>
                            <li>
                                <Link to='/home/products' className={`is-size-6 ${(path === 'products') ? 'is-active' : ''}`}>
                                    Productos
                                </Link>
                            </li>
                            <li>
                                <Link to='/home/documents' className={`${(path === 'documents') ? 'is-active' : ''}`}>
                                    Documentos
                                </Link>
                            </li>
                        </ul>
                        <p className="menu-label">
                            Administración
                        </p>
                        <ul className="menu-list">
                            <li>
                                <Link to='/home/users' className={`${(path === 'users') ? 'is-active' : ''}`}>
                                    Usuarios
                                </Link>
                            </li>
                            <li>
                                <Link to='/home/entities' className={`${(path === 'entities') ? 'is-active' : ''}`}>
                                    Entidades
                                </Link>
                            </li>

                        </ul>
                    </aside>
                </div>

            </section>
        </>
    )
}
export default Menu