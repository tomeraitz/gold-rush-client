import './App.css';
import {
   useState,
   useEffect,
   Suspense,
   lazy
} from 'react'
import Loading from '../Loading';
import useHttpsRequests from '../../Hooks/useHttpsRequests';
import useMusic from '../../Hooks/useMusic';
const PopupContainer = lazy(() => import('../PopupContainer'));
const Game = lazy(() => import('../Game'));

const App = ()=>{
   const [isLoaded , setLoad] = useState(false);
   const [isInGame , setGameStatus] = useState(false);
   const { checkIfServerAlive } = useHttpsRequests();
   const [backgroundSound]= useMusic();
   useEffect(()=>{
      document.onselectstart = function()
      {
         if(isInGame) return false;
      };
      if(!isLoaded){
         checkIfServerAlive().then((res)=>{
            console.log(res.data)
            setLoad(true)
         }).catch((err)=>{
            console.error(err)
         })
      }
   },[checkIfServerAlive,isInGame, isLoaded])
   return (
      <div id="app" >
         <Suspense fallback={<Loading>Loading ...</Loading>}>
            {(!isInGame && isLoaded)  && <PopupContainer onClick={()=>{
               backgroundSound();
               setGameStatus(true)
               }} stage={'welcome'}></PopupContainer> } 
            {!isLoaded && <Loading>Loading ...</Loading> }
            { isInGame && <Game goBack={()=>setGameStatus(false)}></Game>}
         </Suspense>
      </div>
   )
}

export default App;

