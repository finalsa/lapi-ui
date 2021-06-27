import React, { useEffect, useState } from 'react'
import UserProfile from 'components/Navbar/UserProfile'
import redux from 'reducers/utils/Redux'

function Navbar(props) {
    const [burger, setBurger] = useState(false)
    let logoutAction = () => {
        let { restartUser, history, logout } = props
        let callback = () => {
            restartUser()
            history.replace('/login');
        }
        logout(null, callback)
    }
    useEffect(() => {

    }, [])

    let { user } = props

    return (
        <>
            <nav className="navbar ">
                <div className="navbar-brand">
                    <button className={`navbar-burger ${(burger ? 'is-active' : '')}`} aria-label="menu"
                        aria-expanded="false" onClick={() => { setBurger(!burger) }}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div className={`navbar-menu ${(burger ? 'is-active' : '')}`}>
                    <div className="navbar-start">
                    </div>
                    <div className="navbar-end">
                        <UserProfile user={user} logout={logoutAction}></UserProfile>
                        <div className="navbar-item has-divider pr-0" onClick={logoutAction}>
                            <button className="button is-ghost pr-2" type="button">
                                <span className="icon">
                                    <i className="fas fa-sign-out-alt"></i>
                                </span>
                                <span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}
export default redux(Navbar)