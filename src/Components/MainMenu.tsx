import { NavLink } from "react-router-dom";
import '../styles/MainMenu.css';

export const MainMenu = () => {
    return (
        <div className="main-container">
            <div className="buttons-container">
                <NavLink to={"/producerMenue"}>
                    <button className="fancy-button">Event Producer</button>
                </NavLink>
                <NavLink to={"/eventListForUsers"}>
                    <button className="fancy-button">User</button>
                </NavLink>
            </div>
        </div>
    );
};
