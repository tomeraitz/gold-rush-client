import { useState , memo} from 'react';
import DropDown from '../../Presentational/DropDown';
import Toggle from '../../Presentational/Toggle/Toggle';
import { BsVolumeUpFill } from "react-icons/bs";
import './Menu.css';
const memoFunc = (previousProps, nextProps) => true

const Menu = memo((props)=>{
   const [toggleClass, setToggleClass] = useState('');
   const {main} = props;
   let toggleClassName = main.playing() ? "on" : "off";
   const toggleMenu = (isFromMenu=true)=>{
      if(!toggleClass && isFromMenu) setToggleClass('open-burger');
      if(toggleClass === 'open-burger') setToggleClass('close-burger');
      else if(isFromMenu) setToggleClass('open-burger');
   }
   Menu.toggleMenu = toggleMenu;
   const toggleMusic = (isOn) =>{
      isOn === 'on' ? main.play() : main.pause();
   }
   console.log("render!")
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
                  <Toggle onClick={(isOn)=>{toggleMusic(isOn)}}  className={toggleClassName}/>
               </div>
            </div>
         </DropDown>
      </>
   )
},memoFunc)

export default Menu;

