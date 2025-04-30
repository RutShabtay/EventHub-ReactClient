import { useContext, useState } from "react";
import { EventProducerContext } from "../Contexts/EventProducer.api";
import { EventProducer } from "../Types/EventProducerType";
import { useNavigate } from "react-router-dom";
import '../Styles/SignIn.css';

export const SignIn = () => {
    const [ProducerName, setProducerName] = useState('');
    const [producerEmail, setProducerEmail] = useState('');
    const [ProducerPhone, setProducerPhoneNumber] = useState('');
    const [producerShortDescription, setProducerShortDescription] = useState('');

    const navigate = useNavigate();
    const context = useContext(EventProducerContext);
    const post = context.post;

    const saveProducerDetails = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newEventProducer: EventProducer = {
            ProducerName,
            producerEmail,
            ProducerPhone,
            producerShortDescription,
        };

        if (post) {
            try {
                await post(newEventProducer);
                alert("We are happy to have you join :)");
                navigate('/verifiedProducer', { state: { details: newEventProducer } });
            } catch (error) {
                alert("Error creating new producer " + error);
                setProducerName('');
                setProducerEmail('');
                setProducerPhoneNumber('');
                setProducerShortDescription('');
            }
        }
    };

    return (<>
        <button className="back-button" onClick={() => { navigate(-1) }}>⬅️ Back</button>

        <div className="signin-container">
            <form className="signin-form" onSubmit={saveProducerDetails}>
                <h2>Registration Form</h2>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={ProducerName}
                        onChange={(e) => setProducerName(e.target.value)}
                        required
                    />
                    <i className="fas fa-user"></i>
                </div>

                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={producerEmail}
                        onChange={(e) => setProducerEmail(e.target.value)}
                        required
                    />
                    <i className="fas fa-envelope"></i>
                </div>

                <div className="input-group">
                    <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={ProducerPhone}
                        onChange={(e) => setProducerPhoneNumber(e.target.value)}
                        required
                    />
                    <i className="fas fa-phone"></i>
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Short description about yourself"
                        value={producerShortDescription}
                        onChange={(e) => setProducerShortDescription(e.target.value)}
                        required
                    />
                    <i className="fas fa-info-circle"></i>
                </div>

                <button type="submit">Sign In</button>
            </form>
        </div>
    </>);
};
