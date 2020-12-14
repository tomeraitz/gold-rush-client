import { useState } from 'react';
import './Menu.css';


const Menu = (props)=>{
   const [toggleClass, setToggleClass] = useState('');
   const toggle = ()=>{
      if(!toggleClass) setToggleClass('open-burger');
      if(toggleClass === 'open-burger') setToggleClass('close-burger');
      else setToggleClass('open-burger');
   }
   return  (
      <>
         <div className="menu" onClick={toggle}> 
            <span className={`inner-burger ${toggleClass}`}></span>
            <span className={`inner-burger ${toggleClass}`}></span>
            <span className={`inner-burger ${toggleClass}`}></span>
         </div>
         {toggleClass === 'open-burger' && <div className="primary-bg drop-down"></div> }
      </>
   )
}

export default Menu;

