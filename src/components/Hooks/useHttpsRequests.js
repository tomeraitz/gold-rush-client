import axios from 'axios'
import {
    useCallback
 } from 'react'

const useHttpsRequests = () => {
    const checkIfServerAlive = useCallback(() => axios.get(process.env.REACT_APP_SERVER_API),[]);
    return {checkIfServerAlive}
}

export default useHttpsRequests