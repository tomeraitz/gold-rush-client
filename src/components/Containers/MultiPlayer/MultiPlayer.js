import './MultiPlayer.css';
import useHttpsRequests from '../../Hooks/useHttpsRequests';
import PopupContainer from '../PopupContainer';
import { useEffect, useState } from 'react';


const MultiPlayer = (props)=>{
   const urlHeader = new URL(window.location.href);
   const urlId = urlHeader.searchParams.get("id");
   const path = urlId ? `/joinRoom/${urlId}` : '/CreateRoom';
   const { response } = useHttpsRequests(path);
   const [roomId,setRoomId] = useState('');
   const [error,setError] = useState('');
   const { goBackFunc, startTutorialMulti , setGameStateObj} = props;
   let url = '';
   if(roomId) url = `${window.location.href}?id=${roomId}`.replace(/\s/g, '');
   const copyText = (url) =>{
      navigator.clipboard.writeText( `Come and play with me Gold Rush : ${url}`);
   }
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
   useEffect( ()=>{
         response().then((res)=>{
            console.log(res.data)
            if(!res.data.error){
                setGameStateObj({nameSpace : 'multiPlayer', playerType : res.data.player, isMulti : true, roomId : res.data.roomId, startTutorialMulti : ()=>startTutorialMulti(!!urlId)});
               setRoomId(res.data.roomId)
            }
            else{
               setError(res.data.error)
            }
      }).catch((err)=>{
            console.error(err)
         })

   },[response, setGameStateObj, urlId]);
   return  (
      <PopupContainer 
            goBack={goBackFunc}
            copy={roomId ? ()=>copyText(url) : null}
            stage={'multiPlayer'}>
            {((roomId &&  !urlId) || (urlId && error)) &&
                  <div className="multi">
                        {popupChildren()}
                  </div>}
      </PopupContainer>
     
   )
}

export default MultiPlayer;

