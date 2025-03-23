import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EventContext } from "../Contexts/Event.api";
import { Event } from "../Types/EventType";
import "../styles/EventDetailsForUser.css"; 

export const EventDetailsForUser = () => {
    const { eventId } = useParams();
    const [data, setData] = useState<Event>();
    const context = useContext(EventContext);
    const getById = context.getById;
    const navigate = useNavigate();

    useEffect(() => {
        const getEventById = async () => {
            if (getById) {
                try {
                    const eventById = await getById(Number(eventId));
                    setData(eventById);
                }
                catch (error) {
                    console.log(error);
                    alert("Failed getting event " + eventId + " 😣");
                }
            }
        };
        getEventById();
    }, []);

    return (
        <div className="event-detail-container">
            <button className="back-button" onClick={() => navigate(-1)}>⬅️ Back</button>
            {data ? (
                <div className="event-details">
                    <h1>Event details</h1>
                    <h1>Event Id: {eventId}</h1>
                    <h1>Event Name: {data.EventName}</h1>
                    <h1>Short Description: {data.EventShortDescription}</h1>
                    <h1>Producer Email: {data.ProducerEmail}</h1>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};
