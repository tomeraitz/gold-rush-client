import './Game.css';
import Header from '../../Presentational/Header';
import Footer from '../../Presentational/Footer';
import Title from '../../Presentational/Title';
import useGameState from '../../Hooks/useGameState';
import PopupContainer from '../PopupContainer';
import ButtonPhoneController from '../ButtonPhoneController';
import Loading from '../Loading';
import Menu from '../Menu';

const Game = (props)=>{
   const gameStateObj = useGameState();
   const gameState = gameStateObj.data;
   const { socket , handleSwipe } = gameStateObj;
   const {startPress , endPress} = handleSwipe;
   const goBackFunc  = () =>{
      socket.close();
      props.goBack();
   }
   
   const nextLevel = () => socket.emit('messageToServer', {funcName : 'nextLevel', endGameStatus : gameState.endGameStatus});
   if(gameState.gridArray || gameState.endGameStatus){
      return  (
         <>
            {!gameState.endGameStatus ?
            <div  className="game" >
                  <Header className={startPress ? 'primary-bg header-phone' : 'primary-bg'}>
                     <Title className="title white header-title">Level {gameState.level}</Title>
                     <Menu />
                  </Header>
                 
               <div className={startPress ? 'grid grid-phone' : 'grid'}>
                  { gameState.gridArray.map((item,index)=>{
                     return <div className={item.value} key={index}></div>
                  })}
               </div>
               <ButtonPhoneController startPress={startPress} endPress={endPress} />
                  <Footer className={startPress && 'footer-phone'}>
                     <Title className="title primary-bg footer-item white medium">Payer 1 score: {gameState.player1  && gameState.player1.score}</Title>
                     <Title className="title second-bg footer-item white medium">Payer 2 score: {gameState.player2  && gameState.player2.score}</Title>
                  </Footer>
            </div>
            : <PopupContainer 
                     title={gameState.endGameStatus} 
                     titleButton={gameState.endGameStatus.includes('won') ? 'Next Level' : 'Try Again'}
                     gifSrc={gameState.endGameStatus.includes('won') ? "https://media.giphy.com/media/lo4Rb0bkHuH1V8dbvY/giphy.gif" : "https://media.giphy.com/media/8byuvxPG1m7dtYHEph/giphy.gif"}
                     goBack={goBackFunc}
                     nextLevel={nextLevel}
                     stage={'endGame'}>
               </PopupContainer>
            }
         </>
      )
   }
   else return <Loading>Loading ...</Loading>

}

export default Game;

