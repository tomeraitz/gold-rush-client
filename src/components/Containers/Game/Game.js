import './Game.css';
import Header from '../../Presentational/Header';
import Footer from '../../Presentational/Footer';
import Title from '../../Presentational/Title';
import PopupContainer from '../PopupContainer';
import Joystick from '../Joystick';
import ButtonPhoneController from '../ButtonPhoneController';
import Loading from '../Loading';
import Menu from '../Menu';
import { useEffect } from 'react';

const Game = (props)=>{
   const { socket , data, startMultiGame ,  player, handleUserKeyPress} = props.gameStateObj;
   const {main,setMain} = props.soundObj;
   /**
    * goBackFunc - when user wants to go to main page (welcome)
    */
   const goBackFunc  = () =>{
      const isPlaying = main.playing();
      main.pause();
      if(isPlaying) setMain(null);
      socket.close();
      props.goBack();
   }
   /**
    * nextLevel - when user wants to continue playing
    */
   const nextLevel = () => {
      if(props.isMulti) startMultiGame();
      else socket.emit('messageToServer', {funcName : 'nextLevel', endGameStatus : data.endGameStatus})
   };
   // what will be the loading text
   const loadingText = props.isMulti ? "Waiting for the second user" : "Loading ...";
   /**
    * titleButton - titleButton in the end of the game
    */
   const titleButton = () =>{
      if(props.isMulti) return 'Another Round';
      else {
         return data.endGameStatus.includes('won') ? 'Next Level' : 'Try Again'
      }
   }
   const mainTitle = ()=>{
      if(props.isMulti) return 'Multi Game';
      else return `Level ${data.level}`
   }
   useEffect(()=>{
      // When it is single player (in multi the gameState is activate before the game start)
      if(!props.isMulti) props.setGameStateObj({nameSpace : 'singlePlayer', playerType : 'player1'});
   },[])

   if(data.gridArray || data.endGameStatus){
      return  (
         <>
         <Menu main={main}/>
            {!data.endGameStatus ?
            <div  className="game" >
                  <Header className={handleUserKeyPress ? 'primary-bg header-phone' : 'primary-bg'}>
                     <Title className="title white header-title">{mainTitle()}</Title>
                  </Header>
               <div onClick={()=>Menu.toggleMenu(false)} className={handleUserKeyPress ? 'grid grid-phone' : 'grid'}>
                  { data.gridArray.map((item,index)=>{
                     const classPlayer = item.value === player ? `${item.value} glow-player` : `${item.value}`
                     return <div className={classPlayer} key={index}></div>
                  })}
               </div>
               {handleUserKeyPress && <Joystick handleUserKeyPress={handleUserKeyPress}/>}
                  <Footer className={handleUserKeyPress && 'footer-phone'}>
                     <Title className="title primary-bg footer-item white medium">Payer 1 score: {data.player1  && data.player1.score}</Title>
                     <Title className="title second-bg footer-item white medium">Payer 2 score: {data.player2  && data.player2.score}</Title>
                  </Footer>
            </div>
            : 
            <>
               <Header className={handleUserKeyPress ? 'primary-bg header-phone' : 'primary-bg'}>
                  <Title className="title white header-title">{mainTitle()}</Title>
               </Header>
               <PopupContainer 
                     title={data.endGameStatus} 
                     titleButton={titleButton()}
                     gifSrc={data.endGameStatus.includes('won') ? "https://media.giphy.com/media/lo4Rb0bkHuH1V8dbvY/giphy.gif" : "https://media.giphy.com/media/8byuvxPG1m7dtYHEph/giphy.gif"}
                     goBack={goBackFunc}
                     nextLevel={nextLevel}
                     stage={'endGame'}>
               </PopupContainer>
            </>
            }
         </>
      )
   }
   else if(data.userLeft && props.isMulti){
      return (
         <>
            <Header className={handleUserKeyPress ? 'primary-bg header-phone' : 'primary-bg'}>
               <Title className="title white header-title">{mainTitle()}</Title>
            </Header>
            <Menu main={main}/>
            <PopupContainer 
               goBack={goBackFunc}
               stage={'userLeft'}>
            </PopupContainer>
         </>
            )
   }
   else return (
                  <>
                     <Menu main={main}/>
                     <Header className={handleUserKeyPress ? 'primary-bg header-phone' : 'primary-bg'}>
                        <Title className="title white header-title"></Title>
                     </Header>
                     <Loading>{loadingText}</Loading>
                  </>
               )
}

export default Game;

