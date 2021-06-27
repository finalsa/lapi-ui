import React, { } from 'react';

class UserProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        let user = this.props.user
        if (!user) {
            return (
                <div></div>
            )
        }
        return (
            <div className={`navbar-item has-dropdown has-text-centered has-divider is-hoverable  is-right `}>
                <a
                    className={`navbar-link  has-text-centered is-right `}
                    type="button"
                    href="#foo"
                >
                   
                   {user.person.name}
                </a>
                <div className="navbar-dropdown is-right is-boxed has-text-centered ">
                    
                    <div to='#' className="navbar-item">
                        <span className="icon mr-3">
                            <i className="fas fa-address-card"></i>
                        </span>
                        <span>
                            Nombre: {user.person.name}
                        </span>
                    </div>
                    <div  className="navbar-item">
                        <span className="icon mr-3">
                            <i className="fas fa-user-tag"></i>
                        </span>
                        <span>
                            Usuario: @{user.user_name}
                        </span>
                    </div>
                    <div className="navbar-item">
                        <span className="icon mr-3">
                            <i className="fas fa-user-tag"></i>
                        </span>
                        <span>
                            Rol: {user.user_type.name}
                        </span>
                    </div>
                    <hr className="navbar-divider" />
                    <div  className="navbar-item" onClick={this.props.logout}>
                        <span className="icon mr-3">
                            <i className="fas fa-sign-out-alt"></i>
                        </span>
                        <span>
                            Salir
                        </span>
                    </div>
                </div>
            </div>
        )
    }

}

export default UserProfile;