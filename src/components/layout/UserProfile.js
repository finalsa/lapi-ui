import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from 'css/navbar.module.css';

class UserProfile extends React.Component {

    constructor(props){
        super(props)
        this.state = {showPayment: true}
    }

    handlePayment(){
        
    }


    render() {
        let user = this.props.user
        if (!user) {
            return (
                <div></div>
            )
        }
        return (
            <Fragment>
                <Link to='/administration' className={`navbar-link  pl-5 mr-3 has-text-centered is-right  ${styles.item} `}> {user.contact_info.name}</Link>
                <div className="navbar-dropdown  has-text-centered">
                    <Link to='#' onClick={this.props.logout}>Salir</Link>
                </div>
            </Fragment>
        )
    }

}
export default UserProfile;