import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EventProducerContext } from "../Contexts/EventProducer.api";
import { EventProducer } from "../Types/EventProducerType";
import "../Styles/ProducerDetailsForUser.css";  

export const ProducerDetailsForUser = () => {
    const { producerEmail } = useParams();
    const [data, setData] = useState<EventProducer>();
    const context = useContext(EventProducerContext);
    const get = context.get;
    const navigate = useNavigate();

    useEffect(() => {
        const getProducerByEmail = async () => {
            if (get && producerEmail) {
                try {
                    const producer = await get(producerEmail);
                    setData(producer);
                } catch (error) {
                    console.log(error);
                    alert("Failed getting producer " + producerEmail + " 😣");
                }
            }
        };
        getProducerByEmail();
    }, []);

    return (
        <div className="producer-details-container">
            <button className="back-btn" onClick={() => navigate(-1)}>⬅️ Back</button>
            {data ? (
                <div className="producer-card">
                    <h1 className="producer-title">Producer Details</h1>
                    <p className="producer-info"><strong>Name:</strong> {data.ProducerName}</p>
                    <p className="producer-info"><strong>Email:</strong> {data.producerEmail}</p>
                    <p className="producer-info"><strong>Phone:</strong> {data.ProducerPhone}</p>
                    <p className="producer-info"><strong>Short Description:</strong> {data.producerShortDescription}</p>
                </div>
            ) : (
                <h1 className="producer-title">Loading...</h1>
            )}
        </div>
    );
};
