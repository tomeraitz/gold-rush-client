import './Tutorial.css';
import PopupContainer from '../PopupContainer'
import player1Gif from '../../../assets/images/player1-pointer.gif'

const Tutorial = ({goBackFunc , startGame})=>{
   return (
      <PopupContainer 
         goBack={goBackFunc}
         skip={startGame}
         stage={'tutorial'}>
         <div id="tutorial">
            <div className="tutorial-up">
               <div className="tutorial-left-arrow">
                  l
               </div>
               <div className="tutorial-des">
                  <p>This is your player (player1), you can see your score in the bottom left</p>
                  <img src={player1Gif} alt="player 1 pointer" className="img-responsive"/>
               </div>
               <div className="tutorial-right-arrow">
                  l
               </div>
            </div>
            <div className="tutorial-down">
               ...
            </div>
         </div>
      </PopupContainer>
   )
}

export default Tutorial;

