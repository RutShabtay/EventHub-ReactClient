import { useContext, useEffect, useState } from "react";
import { EventContext } from "../Contexts/Event.api";
import { Event } from "../Types/EventType";
import { NavLink } from "react-router-dom";
import { AddEvent } from "./AddEvent";
import "../styles/ProducerEventsList.css"; 

export const ProducerEventList = ({ producerEmail }: { producerEmail: string }) => {
    const context = useContext(EventContext);
    const get = context.get;
    const deleting = context.delete;

    const [eventList, setEventList] = useState<Event[]>();
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            if (get) {
                try {
                    const events = await get() as Event[];
                    const filterEvents = events.filter((element) => element.ProducerEmail === producerEmail);
                    setEventList(filterEvents);
                }
                catch (error) {
                    console.log(error);
                    alert("faild to loading producer's events. " + error);
                }
            }
        };
        fetchEvent();
    }, [isChange,showAddEvent]);

    const deleteEvent = async (eventId: Number) => {
        if (deleting) {
            try {
                const res = await deleting(eventId);
                alert(res + "🫡");
                setIsChange(!isChange);
            }
            catch (error) {
                alert("Faild deleting event " + eventId);
                console.log(error);
            }
        }
    };

    return showAddEvent ? (
        <AddEvent showAddEvent={showAddEvent} setShowAddEvent={setShowAddEvent} />
    ) : (
        <div className="events-container">
            {eventList ? (
                eventList.map(event => (
                    <div className="event-card">
                        <NavLink className="event-name" to={`/eventDetailsForProducer/${event.EventId}`}>
                            {event.EventName}
                        </NavLink>
                        <button className="delete-btn" onClick={() => deleteEvent(event.EventId)}>🗑️</button>
                    </div>
                ))
            ) : (
                <h1>loading---</h1>
            )}
            <button className="add-event-btn" onClick={() => setShowAddEvent(true)}>Add Event</button>
        </div>
    );
};
