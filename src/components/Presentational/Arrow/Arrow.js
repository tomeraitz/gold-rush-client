import './Arrow.css'
import { FaArrowLeft } from "react-icons/fa";

const Arrow = (props)=>{
   const { className , id , onTouchStart, onTouchEnd} = props
   return  <div className="arrow-container" id={id} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
               <FaArrowLeft id={id} className={className} />
            </div>
}

export default Arrow;

