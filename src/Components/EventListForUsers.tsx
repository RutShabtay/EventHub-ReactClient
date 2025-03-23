import { useContext, useEffect, useState } from "react";
import { EventContext } from "../Contexts/Event.api";
import { Event } from "../Types/EventType";
import { NavLink, useNavigate } from "react-router-dom";
import '../styles/EventListForUser.css';

export const EventListForUsers = () => {
    
    const context = useContext(EventContext);
    const get = context.get;
    const navigate = useNavigate();

    const [data, setData] = useState<Event[]>([]);
    const [subData, setSubData] = useState<Event[]>(data);
    const [eventNameToFilter, setEventNameToFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getEvents = async () => {
            if (get) {
                try {
                    const events = await get() as Event[];
                    setData(events);
                    setSubData(events);
                    setIsLoading(true);
                }
                catch (error) {
                    console.log(error);
                    alert("Failed Loading Events---😣");
                }
            }
        };
        getEvents();
    }, []);

    useEffect(() => {
        setSubData(data.filter((event) =>
            event.EventName.toLowerCase().startsWith(eventNameToFilter.toLowerCase())
        ));
    }, [eventNameToFilter]);

    return (
        <div className="user-page">
            <button className="back-btn" onClick={() => navigate(-1)}>⬅️ Back</button>
            {
                isLoading ? (
                    <div className="container">
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Search event 🔍"
                            value={eventNameToFilter}
                            onChange={(e) => setEventNameToFilter(e.target.value)}
                        />
                        <ul className="event-list">
                            {subData.map((event) => (
                                <li className="event-item">
                                    <NavLink className="event-name" to={`/eventDetailsForUser/${event.EventId}`}>
                                        {event.EventName}
                                    </NavLink>
                                    <NavLink to={`/producerDetailsForUser/${event.ProducerEmail}`}>
                                        <button className="producer-btn">Producer Info</button>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <h1>Loading...</h1>
                )
            }
        </div>
        
    );
};
