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
   /**
    * startTutorialMulti - activate from socket when 2 players in room
    * @param {boolean} isChangePositions - for multi tutorial (the seconde player is player 2)
    */
   const startTutorialMulti = (isChangePositions ) =>{
      setChangePositions(isChangePositions);
      setTutorial(true)
   }
   /**
    * startGame - when user finish tutorial and want to start the game
    */
   const startGame = ()=>{
      backgroundSound();
      setTutorial(false);
      setGameStatus(true);
      if(isMulti){
         gameStateObj.startMultiGame();
      }
   }
   /**
    * goBack - when user wants to go to main page (welcome)
    */
   const goBack = ()=>{
      const url = new URL(window.location.href);
      const urlId = url.searchParams.get("id");
      if(urlId){
          window.location.replace(window.location.origin)
      }
      else{
         setGameStateObj({});
         setGameStatus(false);
         isTutorial && setTutorial(false);
         isMulti && setMulti(false);
      }
   }

   useEffect(()=>{
      document.onselectstart = function() // Prevent gug phone long press
      {
         if(isInGame) return false;
      };
      if(!isLoaded){
         response().then(()=>{ // Check if the server is alive
            const url = new URL(window.location.href);
            const urlId = url.searchParams.get("id");
            if(urlId){ // if user enter from url with Id - show him the multi page
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
               onClickRight={()=>{setMulti(true)}} 
               stage={'welcome'}>
            </PopupContainer> } 
            {(!isInGame && isLoaded && isTutorial)  && 
            <Tutorial 
               goBackFunc={goBack} 
               startGame={startGame}
               changePositions={changePositionsIndexInTutorial}
            />}
            {(!isInGame && isLoaded && !isTutorial && isMulti)  && 
            <MultiPlayer 
               startTutorialMulti={startTutorialMulti} 
               setGameStateObj={setGameStateObj}
               goBackFunc={goBack}
            />}
            { (isInGame && !isTutorial) && 
            <Game  
                  soundObj={soundObj} 
                  goBack={goBack}
                  setGameStateObj={setGameStateObj}
                  isMulti={isMulti}
                  gameStateObj={gameStateObj}>
            </Game>}
            {!isLoaded && <Loading>Loading ...</Loading> }
         </Suspense>
      </div>
   )
}

export default App;


