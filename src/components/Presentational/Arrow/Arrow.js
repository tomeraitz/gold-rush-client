import './Arrow.css'
import { FaArrowLeft } from "react-icons/fa";

const Arrow = (props)=>{
   const { children, ...attributes} = props
   return  <FaArrowLeft {...attributes}/>
}

export default Arrow;

