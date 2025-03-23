import { useContext, useEffect, useState } from "react";
import { EventProducer } from "../Types/EventProducerType";
import { EventProducerContext } from "../Contexts/EventProducer.api";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/ProducerDetails.css"; 

export const ProducerDetails = ({ producerDetails }: { producerDetails?: EventProducer }) => {
    const location = useLocation();
    const details = producerDetails || location.state?.details;

    const [ProducerName, setProducerName] = useState(details?.ProducerName || "");
    const [producerEmail, setProducerEmail] = useState(details?.producerEmail || "");
    const [ProducerPhone, setProducerPhoneNumber] = useState(details?.ProducerPhone || "");
    const [producerShortDescription, setProducerShortDescription] = useState(details?.producerShortDescription || "");

    useEffect(() => {
        if (details) {
            setProducerName(details.ProducerName);
            setProducerEmail(details.producerEmail || "");
            setProducerPhoneNumber(details.ProducerPhone || "");
            setProducerShortDescription(details.producerShortDescription || "");
        }
    }, [details]);

    const context = useContext(EventProducerContext);
    const put = context.put;
    const saveProducerDetails = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newEventProducer: EventProducer = {
            ProducerName,
            producerEmail,
            ProducerPhone,
            producerShortDescription,
        };

        if (put) {
            try {
                await put(newEventProducer, newEventProducer.producerEmail);
                alert("Your details updated 😊");
            } catch (error) {
                alert("Error updating producer: " + error);
            }
        }
    };

    return (
        <div className="producer-details-container">
            <NavLink to="/" className="back-button">⬅️ Back</NavLink>
            <div className="producer-details-form">
                <h2>Producer Details</h2>
                <form onSubmit={saveProducerDetails}>
                    <div className="input-group">
                        <label htmlFor="producerName">Name:</label>
                        <input type="text" id="producerName" value={ProducerName} onChange={(e) => setProducerName(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="producerEmail">Email:</label>
                        <input type="email" id="producerEmail" value={producerEmail} onChange={(e) => setProducerEmail(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="producerPhoneNumber">Phone Number:</label>
                        <input type="tel" id="producerPhoneNumber" value={ProducerPhone} onChange={(e) => setProducerPhoneNumber(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="producerShortDescription">Short Description:</label>
                        <input type="text" id="producerShortDescription" value={producerShortDescription} onChange={(e) => setProducerShortDescription(e.target.value)} required />
                    </div>

                    <button type="submit" className="submit-button">Update</button>
                </form>
            </div>
        </div>
    );
};
