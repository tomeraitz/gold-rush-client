import './Game.css';
import Header from '../../Presentational/Header';
import Footer from '../../Presentational/Footer';
import Title from '../../Presentational/Title';
import useGameState from '../../Hooks/useGameState';
import PopupContainer from '../PopupContainer';
import ButtonPhoneController from '../ButtonPhoneController'

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

   return  (
      <>
         {!gameState.endGameStatus ?
         <div  className="game">
            {gameState.gridArray &&
               <Header className="primary-bg">
                  <Title className="title white">Level {gameState.level}</Title>
               </Header>
            }
            <div className={startPress ? 'grid grid-phone' : 'grid'}>
               {gameState.gridArray && gameState.gridArray.map((item,index)=>{
                  return <div className={item.value} key={index}></div>
               })}
            </div>
            {gameState.gridArray &&
               <ButtonPhoneController startPress={startPress} endPress={endPress} />
            }
            {gameState.gridArray &&
               <Footer>
                  <Title className="title primary-bg footer-item white medium">Payer 1 score: {gameState.player1  && gameState.player1.score}</Title>
                  <Title className="title second-bg footer-item white medium">Payer 2 score: {gameState.player2  && gameState.player2.score}</Title>
               </Footer>
            }
         </div>
         : <PopupContainer 
                  title={gameState.endGameStatus} 
                  titleButton={gameState.endGameStatus.includes('won') ? 'Next Level' : 'Try Again'}
                  goBack={goBackFunc}
                  nextLevel={nextLevel}
                  stage={'endGame'}>
            </PopupContainer>
         }
      </>
   )
}

export default Game;

