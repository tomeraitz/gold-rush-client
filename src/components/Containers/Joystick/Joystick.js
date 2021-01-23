import { useEffect, useRef, useState } from 'react';
import './Joystick.css';

const Joystick = ({handleUserKeyPress , player})=>{
   const canvasRef = useRef(null);
   const [joystickState, setJoystickState] = useState({init : 0, mousePressed : false, nextTick : true});

   const drawOuterCircle =()=>{
      joystickState.ctx.beginPath();
      joystickState.ctx.arc(joystickState.canvas.width/2, joystickState.canvas.height/2, joystickState.canvas.width/2 -10, 0, 2 * Math.PI, true);
      joystickState.ctx.lineWidth = 4;
      joystickState.ctx.strokeStyle = "gray";
      joystickState.ctx.stroke();
      joystickState.ctx.closePath();
   };

   const drawInnerCircle =(x=joystickState.canvas.width/2, y=joystickState.canvas.height/2)=>{
      joystickState.ctx.beginPath();
      joystickState.ctx.arc(x, y, 12, 0, 2 * Math.PI);
      joystickState.ctx.fillStyle = "gray";
      joystickState.ctx.fill();
      joystickState.ctx.stroke();
      joystickState.ctx.closePath();
    }

    const startMoving = (e) =>{
      const state = {...joystickState};
      state.mousePressed = true;
      setJoystickState(state);
    }

    const onMoving = async  (e) =>{
      const state = {...joystickState};
      if (state.mousePressed && state.nextTick) {
         const event ={}
            let cancelateXPotion = e.changedTouches[0].pageX - state.canvas.offsetLeft;
            let cancelateYPotion = e.changedTouches[0].pageY - state.canvas.offsetTop;
            
            if(Math.abs(cancelateYPotion - state.canvas.height/2) > Math.abs(cancelateXPotion - state.canvas.width/2)){
               event.keyCode = cancelateYPotion < state.canvas.height/2 ? 38 : 40;
               cancelateXPotion = state.canvas.width/2;
            }
         else{
            event.keyCode = cancelateXPotion < state.canvas.width/2 ? 37 : 39;
            cancelateYPotion = state.canvas.height/2;
         }
         state.ctx.clearRect(0, 0,state.canvas.width, state.canvas.height);
         handleUserKeyPress(event);
         if(cancelateXPotion > state.rightBorder) cancelateXPotion = state.rightBorder;
         if(cancelateXPotion < state.leftBorder) cancelateXPotion = state.leftBorder;
         if(cancelateYPotion > state.downBorder)cancelateYPotion = state.downBorder;
         if(cancelateYPotion < state.upBorder) cancelateYPotion = state.upBorder;
         state.nextTick = false;
         drawOuterCircle();
         drawInnerCircle(cancelateXPotion, cancelateYPotion, true);
         await setJoystickState(state);
      }
    }

    const endMoving = (e) =>{
      const state = {...joystickState};
      if (state.mousePressed) {
         state.mousePressed = false;
         state.ctx.clearRect(0, 0,state.canvas.width, state.canvas.height);
         drawOuterCircle();
         drawInnerCircle();
         setJoystickState(state);
     }
    }

   useEffect(()=>{
      const state = {};
      if(joystickState.init === 0){
         state['canvas'] = canvasRef.current;
         state['ctx'] = state.canvas.getContext('2d');
         state.leftBorder =25;
         state.upBorder = 25;
         state.downBorder = 75;
         state.rightBorder = 75
         state.init = 1
      }
      else if(joystickState.init === 1){
         state.init = 2
         drawOuterCircle();
         drawInnerCircle();
      }
      setJoystickState(lastState =>{
         return { ...lastState, ...state}
      });
   },[joystickState.init])

   useEffect(()=>{
      const state = {};
      if(!joystickState.nextTick){
         state.nextTick = true;
         setJoystickState(lastState =>{
            return { ...lastState, ...state}
         });
      }
   },[player])

   return  (
      <div className="joystick"   onTouchStart={startMoving} onTouchMove={onMoving} onTouchEnd={endMoving} onTouchCancel={endMoving}>
         <canvas width="100%" height="100%" ref={canvasRef} id="canvas"></canvas>
      </div>
     
   )
}

export default Joystick;

