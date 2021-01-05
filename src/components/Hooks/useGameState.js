import {
   useState,
   useEffect,
   useCallback,
} from 'react'
import * as io from 'socket.io-client'
import DeviceDetector from "device-detector-js";
const deviceDetector = new DeviceDetector();
const device = deviceDetector.parse(navigator.userAgent);
let endgame = false;
const keyCodeList = {
   38 : 'moveUp',
   39: 'moveRight',
   40 : 'moveDown',
   37 : 'moveLeft'
}


const useGameState = () => {
   const [propsState, setPropsState] = useState({})
   const { nameSpace , playerType, roomId ,startTutorialMulti } = propsState;
   const [data, setData] = useState({});
   const [socket, setSocket] = useState(null);
   const [timeoutInterval , setTimeoutInterval] = useState(null);
   
   const handleUserKeyPress = useCallback(event => {
      const {
         keyCode
      } = event;
      const serverData = {
         player : playerType,
         funcName: keyCodeList[keyCode]
     }
     if(keyCodeList[keyCode]) socket.emit('messageToServer', serverData);
   }, [socket , playerType]);

   const isDesktop = useCallback(()=>device.device.type === 'desktop',[]);

   const startMultiGame = ()=>{
      const data = {funcName : "readyToPlay", roomId}
      setData({});
      socket.emit('messageToServer', data);
   }

   const endPress = () =>{
      clearTimeout(timeoutInterval);
      setTimeoutInterval(null);
   }

   const startPress = (e) =>{
      if(endgame){
         endPress();
         return;
      }
      e.keyCode = e.target ? (e.target.id*1 || e.target.parentElement.id*1) : 0;
      if(!timeoutInterval){
         handleUserKeyPress(e);
         setTimeoutInterval(
            setTimeout(() => {
              startPress(e);
            }, 150)
         )
      }
   }

   const handleSwipe ={
      startPress,
      endPress
   }

   useEffect(() => {
      if(nameSpace){
         const api = (`${process.env.REACT_APP_SERVER_API}/${nameSpace}`).replace(/\s/g, '');
         if(!socket) setSocket(io(api, {transports: ['websocket']}))
         if(socket){
            socket.on('connect', () => {
               console.log('Successfully connected!');
               if(isDesktop()) window.addEventListener('keydown', handleUserKeyPress);
               socket.on('messageToClient', (msg) => {
                  setData({...msg});
                  if(!isDesktop()) endgame = msg.endGameStatus ? true : false;
                  if(msg.connected){
                     const data = {funcName : "join", id : roomId}
                     socket.emit('messageToServer', data);
                 }
                 if(msg.canPlay){
                    const sendToApp = (isChangePositions) =>startTutorialMulti(isChangePositions);
                    sendToApp()
                 }
               });
             });
             socket.on('disconnect', () => {
                window.removeEventListener('keydown', handleUserKeyPress)
             })
         }
      }
      else if(!nameSpace && socket){
         socket.disconnect()
         setSocket(null);
      }
   }, [handleUserKeyPress, socket, isDesktop, nameSpace, roomId, startTutorialMulti]);

   return [{data, socket, player : playerType, startMultiGame,  handleSwipe : isDesktop() ? {} : handleSwipe}, useCallback((props)=>setPropsState(props),[])]
}

export default useGameState;