import {
   useState,
   useEffect,
   useCallback,
} from 'react'
import * as io from 'socket.io-client'
import { useSwipeable } from "react-swipeable";
import DeviceDetector from "device-detector-js";
const deviceDetector = new DeviceDetector();
const device = deviceDetector.parse(navigator.userAgent);


const keyCodeList = {
   38 : 'moveUp',
   39: 'moveRight',
   40 : 'moveDown',
   37 : 'moveLeft'
}

const useGameState = () => {
   const [player, setPlayer] = useState('player1');
   const [data, setData] = useState({});
   const [socket, setSocket] = useState(null);

   const handleUserKeyPress = useCallback(event => {
      const {
         keyCode
      } = event;
      const serverData = {
         player,
         funcName: keyCodeList[keyCode]
     }
     if(keyCodeList[keyCode]) socket.emit('messageToServer', serverData);
   }, [socket , player]);

   const isDesktop = useCallback(()=>device.device.type === 'desktop',[]);

   const handleSwipe = useSwipeable({
      onSwipedLeft: () => handleUserKeyPress({keyCode : 37}),
      onSwipedRight: () => handleUserKeyPress({keyCode : 39}),
      onSwipedUp: () => handleUserKeyPress({keyCode : 38}),
      onSwipedDown: () => handleUserKeyPress({keyCode : 40}),
   })

   useEffect(() => {
      const api = (`${process.env.REACT_APP_SERVER_API}/singlePlayer`).replace(/\s/g, '');
      if(!socket) setSocket(io(api, {transports: ['websocket']}))
      if(socket){
         socket.on('connect', () => {
            console.log('Successfully connected!');
            if(isDesktop()) window.addEventListener('keydown', handleUserKeyPress);
            socket.on('messageToClient', (msg) => {
               setData({...msg});
            });
          });
          socket.on('disconnect', () => {
             window.removeEventListener('keydown', handleUserKeyPress)
          })
      }
   }, [handleUserKeyPress, socket, isDesktop]);

   return {data, socket , handleSwipe : isDesktop() ? null : handleSwipe}
}

export default useGameState;