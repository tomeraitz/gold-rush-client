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
      setState(props.stage)
   },[props.onClick, props.stage, props.title, props.titleButton, props.goBack, props.nextLevel, props.gifSrc])
   const stage = popUpStages[state];

   return  (
      <Fragment>
         {stage &&
         <Popup className="popup">
            <Title className="title">{stage.title}</Title>
            {stage.gifSrc  && <img className="image-popup"  src={stage.gifSrc} alt="win gif" height="50%" width="50%"></img>}
            <div className="container-row">
               <Button disabled={stage.buttonLeft.disabled} onClick={stage.buttonLeft.onClick} className="button primary-bg">{stage.buttonLeft.title}</Button>
               <Button disabled={stage.buttonRight.disabled} onClick={stage.buttonRight.onClick} className="button second-bg">{stage.buttonRight.title}</Button>
            </div>
         </Popup>}
      </Fragment>
   )
}

export default PopupContainer;

