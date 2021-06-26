import Navbar from 'components/Navbar'
import Menu from 'components/Menu'
import React, {  } from 'react'

function HomeLayout(props) {
    const { path, user } = props

    return (
        <>
            <section className="hero is-fullheight-with-navbar  p-0 m-0">
                <div className="hero-body  p-0 m-0">
                    <div className="container is-fluid m-0 p-0">
                        <div className="columns p-0 m-0">
                            <div className="column is-2 p-0 m-0 menu-container">
                                <Menu path={path} user={user}></Menu>
                            </div>
                            <div className="column is-10 p-0 m-0 is-9">
                                <Navbar user={user}></Navbar>
                                <section className="hero is-fullheight-with-navbar p-0 m-0 other-container">
                                    <div className="hero-head p-4 m-0 pt-0 p-0 m-0">
                                        <div className="container  is-fluid m-0 p-0">
                                            {
                                                props.children
                                            }
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeLayout