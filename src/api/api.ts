import axios, { AxiosInstance, AxiosRequestConfig} from 'axios';

class Api{
    apiEndpoint: string;
    api: AxiosInstance;
    
    constructor(){
        this.api = axios.create({baseURL: process.env.REACT_APP_API_ENDPOINT})
    }

    async get<Model>(url: string){
        try{
            let res = await this.api.get<Model>(`${url}`);
            return res.data;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    async post<Model>(url: string, data: Model, options: AxiosRequestConfig = {}){
        try{
            let res = await this.api.post(`${url}`, data, options)
            return res.data;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    async patch<Model>(url: string, id:string, data: Model, options?: AxiosRequestConfig){
        try{
            let res = await this.api.patch<Model>(`${url}/${id}`, data, options);
            return res.data;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    async delete<Model>(url: string, id: string, options?: AxiosRequestConfig){
        try{
            let res = await this.api.delete<Model>(`${url}/${id}`, options);
            return res.data;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
}


export default new Api();