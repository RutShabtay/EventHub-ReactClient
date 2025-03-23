import { useContext, useState } from "react";
import { EventProducerContext } from "../Contexts/EventProducer.api";
import { EventProducer } from "../Types/EventProducerType";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/ProducerMenu.css";

export const ProducerMenu = () => {
    const [isLogIn, setIsLogin] = useState(false);
    const [email, setEmail] = useState("");
    const context = useContext(EventProducerContext);
    const navigate = useNavigate();
    const get = context.get;

    const Login = async () => {
        if (!email) {
            alert("Please enter an email address.");
            return;
        }
        if (get) {
            try {
                const result = await get(email) as EventProducer;
                if (result) {
                    alert(`Welcome, ${result.ProducerName}!`);
                } else {
                    alert("User not found.");
                    throw new Error("User not found.");
                }
                navigate('/verifiedProducer', { state: { details: result } });
            }
            catch (error) {
                console.error("Error fetching producer:", error);
            }
        } else {
            console.error("get function is undefined");
        }
    };

    return (
        <div className="producer-menu-container">
            <button className="back-btn" onClick={() => navigate(-1)}>⬅️ Back</button>

            <div className="login-container">
                {!isLogIn ? (
                    <>
                        <h2>Welcome!</h2>
                        <button id="login" onClick={() => setIsLogin(true)}>Login</button>
                        <NavLink to="/signIn">
                            <button className="sign-in-btn">Sign Up</button>
                        </NavLink>
                    </>
                ) : (
                    <>
                        <h2>Enter Your Email</h2>
                        <input
                            type="email"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button id="login" onClick={Login}>Login</button>
                    </>
                )}
            </div>
        </div>
    );
};
