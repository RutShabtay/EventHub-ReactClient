import { EventProducer } from "../Types/EventProducerType"
import { ProducerDetails } from "./ProducerDetails"
import { ProducerEventList } from "./ProducerEventList"
import { useLocation } from "react-router-dom";

export const VerifiedProducer = ({ producerDetails }: { producerDetails?: EventProducer }) => {
    const location = useLocation();
    const details = producerDetails || location.state?.details;
    

    return <div>
        <ProducerDetails producerDetails={details} />
        <ProducerEventList producerEmail={details.producerEmail} />
    </div>
}