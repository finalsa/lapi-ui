import React from 'react'
import styles from 'css/admin_navbar.module.css'
import { Link } from 'react-router-dom';
import { LIGTH_COLOR } from 'configuration/manager'

function AdministrationSideBar({ path }) {
    return (
        <div className={`container  ${styles.module} has-background-${LIGTH_COLOR}`}>
            <aside className={`menu pt-1`}>
                <ul className="menu-list">
                    <li>
                        <a className={`${''}`} href="#region" >
                            <span className="icon is-large">
                                <i className="fas fa-lg fa-bars"></i>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a className={`${''}`} href="#region" >
                            <span className="icon is-large">
                                <i className="fas fa-lg fa-user"></i>
                            </span>
                        </a>
                    </li>
                    <li>
                        <Link className={`${(path === 'form') ? 'is-active' : ''}`} to={`/administration/message`}>
                            <span className="icon is-large">
                                <i className="fas fa-lg fa-home"></i>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link className={`${(path === 'list') ? 'is-active' : ''}`} to={`/administration/list`}>
                            <span className="icon is-large">
                                <i className="fas fa-lg fa-envelope"></i>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link className={` ${((path === 'contacts') || (path === '')) ? 'is-active' : ''}`} to={`/administration/contacts`}>
                            <span className="icon is-large">
                                <i className="fas fa-lg fa-address-book"></i>
                            </span>
                        </Link>
                    </li>
                </ul>
            </aside>
        </div>

    )
}
export default AdministrationSideBar