import { useContext, useState } from "react";
import { Event } from "../Types/EventType";
import { EventContext } from "../Contexts/Event.api";
import '../Styles/AddEvent.css';

export const AddEvent = ({ showAddEvent, setShowAddEvent }: any) => {
    const [EventId, setEventId] = useState(0);
    const [EventName, setEventName] = useState('');
    const [EventShortDescription, setEventShortDescription] = useState('');
    const [ProducerEmail, setProducerEmail] = useState('');

    const newEvent: Event = {
        EventId,
        EventName,
        EventShortDescription,
        ProducerEmail,
    };

    const context = useContext(EventContext);
    const post = context.post;

    const saveEventDetails = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        newEvent.EventId = EventId;
        newEvent.EventName = EventName;
        newEvent.EventShortDescription = EventShortDescription;
        newEvent.ProducerEmail = ProducerEmail;

        if (post) {
            try {
                await post(newEvent);
                alert("The event was added successfully :)");
                setShowAddEvent(!showAddEvent);
                setEventId(0);
                setEventName('');
                setEventShortDescription('');
                setProducerEmail('');
            }
            catch (error) {
                alert("Error adding new event😣 " + error);
            }
        }
    };

    return (
        <div className="form-container">
            <form className="event-form" onSubmit={saveEventDetails}>
                <h2>Adding Event 🫵</h2>

                <div className="form-group">
                    <label htmlFor="eventId">Event Id:</label>
                    <input type="Number" id="eventId" name="EventId" value={EventId}
                        onChange={(e) => setEventId(Number(e.target.value))}
                        placeholder="Enter EventId" required />
                </div>

                <div className="form-group">
                    <label htmlFor="eventName">Event Name:</label>
                    <input type="text" id="eventName" name="eventName" value={EventName}
                        onChange={(e) => setEventName(e.target.value)}
                        placeholder="Enter Event Name" required />
                </div>

                <div className="form-group">
                    <label htmlFor="eventShortDescription">Event Short Description:</label>
                    <input type="text" id="eventShortDescription" name="eventShortDescription"
                        value={EventShortDescription} onChange={(e) => setEventShortDescription(e.target.value)}
                        placeholder="Enter Short Description " required />
                </div>

                <div className="form-group">
                    <label htmlFor="producerEmail">Producer Email:</label>
                    <input type="email" id="producerEmail" name="producerEmail" value={ProducerEmail}
                        onChange={(e) => setProducerEmail(e.target.value)}
                        placeholder="Producer Email" required />
                </div>

                <button className="submit-btn" type="submit">Add Event 👆</button>
            </form>
        </div>
    );
}    