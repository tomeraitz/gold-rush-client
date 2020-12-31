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
         disabled : false
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
         title : '',
         disabled : false
      },
      buttonRight : {
         onClick : null,
         title : 'Go Back',
         disabled : false
      },
   },
   multiPlayer : {
      title : 'Multi Player',
      gifSrc : '',
      buttonLeft : {
         onClick : null,
         title : 'Copy Link',
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
         popUpStages.welcome.buttonLeft.onClick = props.onClickLeft;
         popUpStages.welcome.buttonRight.onClick = props.onClickRight;
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
         popUpStages.tutorial.buttonLeft.title = props.skipTitle
      }
      if(props.stage === 'multiPlayer'){
         popUpStages.multiPlayer.buttonRight.onClick =  props.goBack;
         popUpStages.multiPlayer.buttonLeft.onClick = props.copy;
      }
      setState(props.stage)
   },[props.onClickLeft,props.onClickRight, props.stage, props.title, props.titleButton, props.goBack, props.nextLevel, props.gifSrc, props.skip, props.skipTitle,props.copy])
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

