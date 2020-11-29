import './App.css';
import {
   useState,
   useEffect,
} from 'react'
import PopupContainer from '../PopupContainer';
import Loading from '../Loading';
import Game from '../Game';
import useHttpsRequests from '../../Hooks/useHttpsRequests'

const App = ()=>{
   const [isLoaded , setLoad] = useState(false);
   const [isInGame , setGameStatus] = useState(false);
   const { checkIfServerAlive } = useHttpsRequests()
   useEffect(()=>{
      checkIfServerAlive().then((res)=>{
         console.log(res.data)
         setLoad(true)
      }).catch((err)=>{
         console.error(err)
      })
   },[checkIfServerAlive])
   return (
      <div id="app">
         {(!isInGame && isLoaded)  && <PopupContainer onClick={()=>setGameStatus(true)} stage={'welcome'}></PopupContainer> } 
         {!isLoaded && <Loading>Loading ...</Loading> }
         { isInGame && <Game goBack={()=>setGameStatus(false)}></Game>}
      </div>
   )
}

export default App;

