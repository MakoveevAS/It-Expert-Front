import axios from 'axios';
import { IServerData } from '../models/IDataResponse';

const backendUrl = 'http://localhost:5296/api/Data';

export const getData = async (): Promise<IServerData[]> => {
    try {
        const response = await axios.get<IServerData[]>(backendUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const postData = async (newData: IServerData[]) => {
    await axios.post(backendUrl, {
        data: newData
    });
};
