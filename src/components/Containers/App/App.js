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
const Tutorial = lazy(() => import('../Tutorial/Tutorial'));
const PopupContainer = lazy(() => import('../PopupContainer'));
const Game = lazy(() => import('../Game'));

const App = ()=>{
   const [isLoaded , setLoad] = useState(false);
   const [isInGame , setGameStatus] = useState(false);
   const [isTutorial, setTutorial] = useState(false);
   const { checkIfServerAlive } = useHttpsRequests();
   const [backgroundSound, soundObj]= useMusic();

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
   },[checkIfServerAlive,isInGame, isLoaded]);
   
   return (
      <div id="app">
         <Suspense fallback={<Loading>Loading ...</Loading>}>
            {(!isInGame && isLoaded && !isTutorial)  && 
            <PopupContainer 
            onClick={()=> setTutorial(true)} 
            stage={'welcome'}>
            </PopupContainer> } 
            {(!isInGame && isLoaded && isTutorial)  && <Tutorial goBackFunc={()=>{setTutorial(false)}} startGame={
               ()=>{
                  backgroundSound();
                  setTutorial(false);
                  setGameStatus(true);
               }
            }/>}
            {!isLoaded && <Loading>Loading ...</Loading> }
            { (isInGame && !isTutorial) && <Game soundObj={soundObj} goBack={()=>setGameStatus(false)}></Game>}
         </Suspense>
      </div>
   )
}

export default App;


