import './Tutorial.css';
import PopupContainer from '../PopupContainer';
import CarouselDots from '../../Presentational/CarouselDots/CarouselDots';
import player1Gif from '../../../assets/images/player1-pointer.gif';
import player2Gif from '../../../assets/images/player2-pointer.gif';
import coin from '../../../assets/images/coin.png';
import { useEffect, useState } from 'react';
import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { Slide  } from '@material-ui/core';

const Tutorial = ({goBackFunc , startGame,  changePositions=false})=>{
   const [index, setIndex] = useState(0);
   const [skipTitle, setSkipTitle] = useState('Skip Tutorial')
   const [slideObj, setSlideObj] = useState({
      direction : "right",
      in : true,
   })
   const [tutorialData, setTutorialData] = useState([{
      title:'This is your player (player1), you can see your score in the bottom left',
      src: player1Gif}, 
      {title:'This is your opponent (player2), you can see his score in the bottom right',
      src: player2Gif},
      {title:'Your goal is to pick up more coins then your opponent',
      src: coin} 
   ])
   const moveLeft = ()=> {
      if(index > 0){
         setIndex(lastIndex=>{return lastIndex -1}, setSlideObj({direction : "right", in : false}),setSkipTitle('Skip Tutorial'));
         setTimeout(()=>{setSlideObj({direction : "right", in : true})},100)
      }
   }
   const moveRight = ()=>{
      if(index < tutorialData.length -1){
         setIndex(lastIndex=>{return lastIndex +1}, setSlideObj({direction : "left", in : false}));
         setTimeout(()=>{setSlideObj({direction : "left", in : true})},100);
         if(index +1 === tutorialData.length -1) setSkipTitle('Start Game');
         else setSkipTitle('Skip Tutorial')
      }
   }
   useEffect(()=>{
      if(changePositions){
         console.log(changePositions)
         const tutorialArray = [...tutorialData];
         const element = tutorialArray[0];
         tutorialArray.splice(0, 1);
         tutorialArray.splice(1, 0, element);
         setTutorialData([...tutorialArray])
      }
   },[])
   console.log(tutorialData)
   return (
      <PopupContainer 
         goBack={goBackFunc}
         skip={startGame}
         skipTitle={skipTitle}
         stage={'tutorial'}>
         <div id="tutorial">
            <div  className="tutorial-up">
               <div className="tutorial-left-arrow">
                  <span onClick={moveLeft}><BsChevronLeft size={40} fill={'gray'} /></span>
               </div>
               <Slide direction={slideObj.direction} in={slideObj.in}  >
                  <div className="tutorial-des" >
                    {slideObj.in && <p >{tutorialData[index].title}</p> }
                    {slideObj.in && <img  src={tutorialData[index].src} alt="sliderImage" className="img-responsive"/>}
                  </div>
               </Slide>
               <div className="tutorial-right-arrow">
                  <span onClick={moveRight}><BsChevronRight size={40} fill={'gray'}/></span>
               </div>
            </div>
            <div className="tutorial-down">
               <CarouselDots dotsAmount={tutorialData.length} activeIndex={index}/>
            </div>
         </div>

      </PopupContainer >
   )
}

export default Tutorial;

