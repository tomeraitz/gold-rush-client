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
import useGameState from '../../Hooks/useGameState';
const MultiPlayer =lazy(() => import('../MultiPlayer/MultiPlayer'));
const Tutorial = lazy(() => import('../Tutorial/Tutorial'));
const PopupContainer = lazy(() => import('../PopupContainer'));
const Game = lazy(() => import('../Game'));

const App = ()=>{
   const [isLoaded , setLoad] = useState(false);
   const [isInGame , setGameStatus] = useState(false);
   const [isTutorial, setTutorial] = useState(false);
   const [isMulti, setMulti] = useState(false);
   const  [gameStateObj , setGameStateObj] = useGameState();
   const { response } = useHttpsRequests();
   const [backgroundSound, soundObj]= useMusic();
   const [changePositionsIndexInTutorial, setChangePositions] = useState(false);
   const startTutorialMulti = (isChangePositions, ) =>{
      setChangePositions(isChangePositions);
      setTutorial(true)
   }
   useEffect(()=>{
      document.onselectstart = function()
      {
         if(isInGame) return false;
      };
      if(!isLoaded){
         response().then((res)=>{
            console.log(res.data)
            const url = new URL(window.location.href);
            const urlId = url.searchParams.get("id");
            if(urlId){
               setMulti(true)
            }
            setLoad(true)
            
         }).catch((err)=>{
            console.error(err)
         })
      }
   },[response,isInGame, isLoaded]);
   
   return (
      <div id="app">
         <Suspense fallback={<Loading>Loading ...</Loading>}>
            {(!isInGame && isLoaded && !isTutorial && !isMulti)  && 
            <PopupContainer 
            onClickLeft={()=> setTutorial(true)} 
            onClickRight={()=>{
               setMulti(true);
            } } 
            stage={'welcome'}>
            </PopupContainer> } 
            {(!isInGame && isLoaded && isTutorial)  && <Tutorial 
            goBackFunc={()=>{setTutorial(false)}} 
            startGame={
               ()=>{
                  backgroundSound();
                  setTutorial(false);
                  setGameStatus(true);
                  if(isMulti){
                     gameStateObj.startMultiGame();
                  }
               }
            }
            changePositions={changePositionsIndexInTutorial}
            />}
            {(!isInGame && isLoaded && !isTutorial && isMulti)  && <MultiPlayer 
            startTutorialMulti={startTutorialMulti} 
            setGameStateObj={setGameStateObj}
            goBackFunc={()=>{setMulti(false)}}/>}
            {!isLoaded && <Loading>Loading ...</Loading> }
            { (isInGame && !isTutorial) && 
            <Game  
                  soundObj={soundObj} 
                  goBack={()=>{
                     setGameStateObj({})
                     setGameStatus(false)
                  }}
                  setGameStateObj={setGameStateObj}
                  isMulti={isMulti}
                  gameStateObj={gameStateObj}>
            </Game>}
         </Suspense>
      </div>
   )
}

export default App;


