import { createContext} from "react"
import { EventProducer } from "../Types/EventProducerType"
import { UseHttp } from "../CustomeHooks/UseHttp";


type EventProducerContextType = {

    get: (email: string) => Promise<EventProducer | undefined>,
    post: (body: EventProducer) => Promise<string | undefined>,
    put: (body: EventProducer, email: string) => Promise<string | undefined>
}

export const EventProducerContext = createContext<Partial<EventProducerContextType>>({});

export const EventProducerProvider = (props: any) => {
    const getHttp = UseHttp<EventProducer>('get');
    const postHttp = UseHttp<string>('post');
    const putHttp = UseHttp<string>('put');

    const contextValue: EventProducerContextType = {
        get: async (email: string): Promise<EventProducer | undefined> => {
            return await getHttp.request(`/eventProducer/${email}`);
        },

        post: async (body: EventProducer): Promise<string | undefined> => {
            return await postHttp.request(`/eventProducer`, body);
        },

        put: async (body: EventProducer, email: string): Promise<string | undefined> => {
            return await putHttp.request(`/eventProducer/${email}`, body);

        }
    }
    return (
        <EventProducerContext.Provider value={contextValue} >
            {props.children}
        </EventProducerContext.Provider >
    );

};
