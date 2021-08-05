import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <nav>
                <Link to="/">Home</Link>
                <Link to="/form">Fomulaire</Link>
                <Link to="/admin">Admin</Link>
            </nav>
        )
    }
}

export default Header;