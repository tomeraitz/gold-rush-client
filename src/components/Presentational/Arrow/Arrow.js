import './Arrow.css'
import { FaArrowLeft } from "react-icons/fa";

const Arrow = (props)=>{
   const { className , id , onTouchStart, onTouchEnd} = props
   return  <div className="arrow-container">
               <FaArrowLeft id={id} className={className}  onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}/>
            </div>
}

export default Arrow;

