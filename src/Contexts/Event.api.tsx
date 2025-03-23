import { createContext } from "react";
import { UseHttp } from "../CustomeHooks/UseHttp";
import { Event } from "../Types/EventType";

type EventContextType = {
    get: () => Promise<Event[] | undefined>,
    getById: (eventId: Number) => Promise<Event | undefined>,
    post: (body: Event) => Promise<string | undefined>,
    put: (body: Event, eventId: Number) => Promise<string | undefined>
    delete: (eventId: Number) => Promise<String | undefined>
}

export const EventContext = createContext<Partial<EventContextType>>({});

export const EventProvider = (props: any) => {
    const getHttp = UseHttp<Event[]>('get');
    const getHttpById = UseHttp<Event>('get');
    const postHttp = UseHttp<string>('post');
    const putHttp = UseHttp<string>('put');
    const deleteHttp = UseHttp<string>('delete');


    const contextValue: EventContextType = {
        get: async (): Promise<Event[] | undefined> => {
            return await getHttp.request(`/event`);
        },
        getById: async (eventId: Number): Promise<Event | undefined> => {
            return await getHttpById.request(`/event/${eventId}`);
        },
        post: async (body: Event): Promise<string | undefined> => {
            return await postHttp.request(`/event`, body);
        },
        put: async (body: Event, eventId: Number): Promise<string | undefined> => {
            return await putHttp.request(`/event/${eventId}`, body);

        },
        delete: async (eventId: Number): Promise<string | undefined> => {
            return await deleteHttp.request(`/event/${eventId}`);
        }
    }

    return (
        <EventContext.Provider value={contextValue} >
            {props.children}
        </EventContext.Provider >
    );

};
