import axios from "axios";
import { useCallback, useState } from "react";

type HttpMethod = 'get' | 'post' | 'put' | 'delete'
const serverInstance = axios.create({
    baseURL: 'http://localhost:3000',
})

export const UseHttp = <T>(method: HttpMethod = 'get') => {


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState<T | undefined>(undefined);


    const request = useCallback(async (url: string, body?: any) => {
        setLoading(true);
        setError('')
        try {
            const result = await serverInstance[method]<T>(url, body);
            setLoading(false);
            setData(result.data as T);
            return result.data as T

        } catch (error) {
            setError(error instanceof Error ? error.message : 'error occures try again later---');
            setLoading(false);
        }

    }, []);

    return { loading, error, data, request };

}