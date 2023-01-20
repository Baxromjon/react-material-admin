import {BASEURL, TOKEN} from './constant'
import axios from 'axios'

// eslint-disable-next-line import/no-anonymous-default-export
export default (params) => {
    let url = BASEURL + params.url;
    let method = params.method;
    let data = params.data;

    return axios({
        url,
        method,
        data,
        headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Authorization": localStorage.getItem(TOKEN)

        }
    })
}