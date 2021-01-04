import { useEffect, useState } from 'react'
import './Toggle.css'

const Toggle = (props)=>{
   const { className} = props
   console.log("className : ", className)
   const [isOn, setClass] = useState('on');
   useEffect(()=>{
      setClass(className)
   },[className])
   const toggle= ()=> isOn === 'on' ? (setClass('off'), props.onClick && props.onClick('off')): (setClass('on'), props.onClick && props.onClick('on'));
   return (
            <>
            <div onClick={toggle} className={`holder holder-${isOn}`}>
               <div className={`toggle ${isOn}`}></div>
           </div>
           </>
         ) 
}

export default Toggle;

