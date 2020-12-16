import Popup from '../../Presentational/Popup/Popup';
import Title from '../../Presentational/Title/Title'
import Button from '../../Presentational/Button/Button'
import {Fragment} from 'react';
import {
   useState,
   useEffect,
} from 'react';

const popUpStages ={
   welcome : {
      title : 'Choose Type Game',
      buttonLeft : {
         onClick : null,
         title : 'Single player',
         disabled : false
      },
      buttonRight : {
         onClick : null,
         title : 'Multi player',
         disabled : true
      },
   },
   endGame : {
      title : '',
      gifSrc : '',
      buttonLeft : {
         onClick : null,
         title : '',
         disabled : false
      },
      buttonRight : {
         onClick : null,
         title : 'Go Back',
         disabled : false
      },
   },
   tutorial : {
      title : 'How To Play',
      gifSrc : '',
      buttonLeft : {
         onClick : null,
         title : 'Skip Tutorial',
         disabled : false
      },
      buttonRight : {
         onClick : null,
         title : 'Go Back',
         disabled : false
      },
   },
}

const PopupContainer = (props)=>{
   const [state, setState]=useState('');

   useEffect(()=>{
      if(props.stage === 'welcome'){
         popUpStages.welcome.buttonLeft.onClick = props.onClick;
      }
      if(props.stage === 'endGame'){
         popUpStages.endGame.title = props.title;
         popUpStages.endGame.buttonLeft.title = props.titleButton;
         popUpStages.endGame.buttonRight.onClick = props.goBack;
         popUpStages.endGame.buttonLeft.onClick = props.nextLevel;
         popUpStages.endGame.gifSrc = props.gifSrc;
      }
      if(props.stage === 'tutorial'){
         popUpStages.tutorial.buttonRight.onClick =  props.goBack;
         popUpStages.tutorial.buttonLeft.onClick = props.skip; 
      }
      setState(props.stage)
   },[props.onClick, props.stage, props.title, props.titleButton, props.goBack, props.nextLevel, props.gifSrc, props.skip])
   const stage = popUpStages[state];
   const classTutorial = ()=>props.stage === 'tutorial' ? "pop-big" : "";
   return  (
      <Fragment>
         {stage &&
         <Popup className={`popup ${classTutorial()}`}>
            <Title className="title">{stage.title}</Title>
            {props.children && props.children}
            {stage.gifSrc  && <img className="image-popup"  src={stage.gifSrc} alt="win gif" height="50%" width="50%"></img>}
            <div className="popup-btn-container-row">
               <Button disabled={stage.buttonLeft.disabled} onClick={stage.buttonLeft.onClick} className="button primary-bg">{stage.buttonLeft.title}</Button>
               <Button disabled={stage.buttonRight.disabled} onClick={stage.buttonRight.onClick} className="button second-bg">{stage.buttonRight.title}</Button>
            </div>
         </Popup>}
      </Fragment>
   )
}

export default PopupContainer;

