import React from 'react';
import styles from './header.module.scss'

function Header() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.text}>TO-DO</h1>
        </div>
    );
}

export default Header;