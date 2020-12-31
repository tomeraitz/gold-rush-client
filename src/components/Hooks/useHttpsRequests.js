import axios from 'axios'
import {
    useCallback
 } from 'react'

const useHttpsRequests = (path = '') => {
    const api = process.env.REACT_APP_SERVER_API + path;
    const response = useCallback(() => axios.get(api.replace(/\s/g, '') ),[api]);
    return {response}
}

export default useHttpsRequests