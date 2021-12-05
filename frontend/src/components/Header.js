import React from 'react';


function Header(props) {
    return (
        <header className="header">
            <div className="header__logo"></div>
            {props.children}
        </header>
    );
}

export default Header;