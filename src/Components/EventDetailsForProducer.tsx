import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventContext } from "../Contexts/Event.api";
import { Event } from "../Types/EventType";
import { useNavigate } from "react-router-dom";
import "../styles/EventDetailsForProducer.css";


export const EventDetailsForProducer = () => {
    const [EventId, setEventId] = useState<Number>(0);
    const [EventName, setEventName] = useState('');
    const [EventShortDescription, setEventShortDescription] = useState('');
    const [ProducerEmail, setProducerEmail] = useState('')
    const { eventId } = useParams();

    const context = useContext(EventContext);
    const getById = context.getById;
    const put = context.put;
    const navigate = useNavigate();

    const updateEvent: Event = {
        EventId,
        EventName,
        EventShortDescription,
        ProducerEmail,
    }

    useEffect(() => {
        const getEventById = async () => {
            if (getById) {
                try {
                    const event = await getById(Number(eventId)) as Event;
                    console.log(event);
                    setEventId(event.EventId);
                    setEventName(event.EventName);
                    setEventShortDescription(event.EventShortDescription);
                    setProducerEmail(event.ProducerEmail);
                }
                catch (error) {
                    console.log(error);
                    alert("Faild getting event " + eventId + " 😣");
                }

            }
        }
        getEventById();

    }, []);

    const uppdateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateEvent.EventId = EventId;
        updateEvent.EventName = EventName;
        updateEvent.EventShortDescription = EventShortDescription;
        updateEvent.ProducerEmail = ProducerEmail;

        if (put) {
            try {
                const res = await put(updateEvent, Number(eventId));
                alert("The event was successfully updated 😊");
                navigate(-1);
            }
            catch (error) {

                alert("An error occurred while updating " + error + " 😣");
                setEventId(updateEvent.EventId);
                setEventName(updateEvent.EventName);
                setEventShortDescription(updateEvent.EventShortDescription);
                setProducerEmail(updateEvent.EventShortDescription);

            }
        }
    }

    return (<>
        <div className="event-detail-container">
            <button id="back" onClick={() => navigate(-1)}>⬅️ Back</button>

            <form className="event-form" onSubmit={uppdateEvent}>
                <h2>Event Details</h2>
                <div className="input-group">

                    <label htmlFor="eventId">Event Id:</label>
                    <input
                        type="Number"
                        id="eventId"
                        name="EventId"
                        value={String(EventId)}
                        onChange={(e) => { setEventId(Number(e.target.value)) }}
                        placeholder="Enter EventId"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="eventName">EventName:</label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        value={EventName}
                        onChange={(e) => { setEventName(e.target.value) }}
                        placeholder="Enter Event Name"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="eventShortDescription">Event Short Description:</label>
                    <input
                        type="text"
                        id="eventShortDescription"
                        name="eventShortDescription"
                        value={EventShortDescription}
                        onChange={(e) => { setEventShortDescription(e.target.value) }}
                        placeholder="Enter Short Description "
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="producerEmail">Producer Email:</label>
                    <input
                        type="email"
                        id="producerEmail"
                        name="producerEmail"
                        value={ProducerEmail}
                        onChange={(e) => { setProducerEmail(e.target.value) }}
                        placeholder="Producer Email"
                        required
                    />
                </div>

                <div>
                    <button className="submit-btn" type="submit">Update Event 👆</button>
                </div>
            </form>
        </div>
    </>);
}