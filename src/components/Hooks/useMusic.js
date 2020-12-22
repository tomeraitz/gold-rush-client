import { Howl } from 'howler';
import { useState } from 'react';
import mainSound from '../../assets/music/main.wav'


const useMusic = () =>{
    const [main, setMain] = useState(null);
    const backgroundSound = ()=>{
        if(!main){
            const sound =  new Howl({
                src: [mainSound],
                loop: true,
                onplay : function(sound){
                    this.volume(0.5)
                }
            });
            sound.play()
            setMain(sound)
        }
    }
    return [backgroundSound, {main, setMain}];
}   


export default useMusic;
