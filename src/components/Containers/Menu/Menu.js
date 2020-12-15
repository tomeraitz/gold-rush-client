import { useState } from 'react';
import DropDown from '../../Presentational/DropDown';
import Toggle from '../../Presentational/Toggle/Toggle';
import { BsVolumeUpFill } from "react-icons/bs";
import './Menu.css';


const Menu = (props)=>{
   const [toggleClass, setToggleClass] = useState('');
   const {main} = props;
   const toggleMenu = ()=>{
      if(!toggleClass) setToggleClass('open-burger');
      if(toggleClass === 'open-burger') setToggleClass('close-burger');
      else setToggleClass('open-burger');
   }
   const toggleMusic = (isOn) =>{
      isOn === 'on' ? main.play() : main.pause();
   }
   return  (
      <>
         <div className="menu" onClick={toggleMenu}> 
            <span className={`inner-burger ${toggleClass}`}></span>
            <span className={`inner-burger ${toggleClass}`}></span>
            <span className={`inner-burger ${toggleClass}`}></span>
         </div>
         <DropDown  className={`primary-bg drop-down drop-down-${toggleClass.split('-')[0]}`}>
            <div className="drop-down-inner">
               <div className="sound">
                  <BsVolumeUpFill size={32} className="sound-item"/>
                  <Toggle onClick={(isOn)=>{toggleMusic(isOn)}}  className={main.playing() ? "on" : "off"}/>
               </div>
            </div>
         </DropDown>
      </>
   )
}

export default Menu;

