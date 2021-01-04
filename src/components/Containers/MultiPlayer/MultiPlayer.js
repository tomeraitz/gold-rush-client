import './MultiPlayer.css';
import useHttpsRequests from '../../Hooks/useHttpsRequests';
import PopupContainer from '../PopupContainer';
import Loading from '../Loading';
import { useEffect, useState } from 'react';


const MultiPlayer = (props)=>{
   const urlHeader = new URL(window.location.href);
   const urlId = urlHeader.searchParams.get("id"); // check if url with id params
   const path = urlId ? `/joinRoom/${urlId}` : '/CreateRoom'; // CreateRoom - when user wants to play multi game, joinRoom - when user wants to join the game
   const { response } = useHttpsRequests(path);
   const [roomId,setRoomId] = useState('');
   const [error,setError] = useState('');
   const { goBackFunc, startTutorialMulti , setGameStateObj} = props;
   let url = '';
   if(roomId) url = `${window.location.href}?id=${roomId}`.replace(/\s/g, ''); // url of join game
   /**
    * copyText - copy to clipboard text + url
    * @param {string} url - url of join game
    */
   const copyText = (url) =>{
      navigator.clipboard.writeText( `Come and play with me Gold Rush : ${url}`);
   }
   /**
    * popupChildren - if user try to add incorrect id, or user enter to create room.
    */
   const popupChildren = () =>{
         if(error){
            return <p className="error-multi">{error}</p>
         }
         else{
            return (
                  <>
                        <p>Copy the link and send it to a friend :</p>
                        <p>{url}</p>
                  </>
            )
         }
   }
   useEffect(()=>{
         response().then((res)=>{
            if(!res.data.error){
               // activate the gameState for socket connection
                setGameStateObj({nameSpace : 'multiPlayer', playerType : res.data.player, isMulti : true, roomId : res.data.roomId, startTutorialMulti : ()=>startTutorialMulti(!!urlId)});
               setRoomId(res.data.roomId)
            }
            else{
               setError(res.data.error)
            }
         }).catch((err)=>{
            console.error(err)
         })

   },[]);
   return  (
      <>
      {!urlId ? 
      <PopupContainer 
            goBack={goBackFunc}
            copy={roomId ? ()=>copyText(url) : null}
            stage={'multiPlayer'}>
            {((roomId &&  !urlId) || (urlId && error)) &&
                  <div className="multi">
                        {popupChildren()}
                  </div>}
      </PopupContainer> : 
      <Loading>Loading ...</Loading> }
      </>
     
   )
}

export default MultiPlayer;

