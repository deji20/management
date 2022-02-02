import axios, { AxiosInstance, AxiosRequestConfig} from 'axios';

class Api{
    apiEndpoint: string;
    api: AxiosInstance;
    
    constructor(){
        this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT || "";
        this.api = axios.create({baseURL: process.env.REACT_APP_API_ENDPOINT})
    }

    async get<Model>(url: string){
        let res = await axios.get<Model>(`${this.apiEndpoint}${url}`);
        return res.data;
    }
    async post<Model>(url: string, data: Model, options: AxiosRequestConfig = {}){
        let res = await this.api.post(`${url}`, data, options)

        return res.data;
    }
    async patch<Model>(url: string, id:string, data: Model, options?: AxiosRequestConfig){
        let res = await axios.patch<Model>(`${this.apiEndpoint}${url}/${id}`, data, options);
        return res.data;
    }
    async delete<Model>(url: string, id: string, options?: AxiosRequestConfig){
        let res = await axios.delete<Model>(`${this.apiEndpoint}${url}/${id}`, options);
        return res.data;
    }
}


export default new Api();