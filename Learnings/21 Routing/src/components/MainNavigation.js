import { NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css';

function MainNavigation(){
    return (
        <>
            <header className={classes.header}>
                <ul className={classes.list}>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? classes.active : undefined }>  Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className={({ isActive }) => isActive ? classes.active : undefined }> Products</NavLink>
                    </li>
                </ul>
            </header>
        </>
    )
}

export default MainNavigation