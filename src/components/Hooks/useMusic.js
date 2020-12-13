import { Howl } from 'howler';
import mainSound from '../../assets/music/main.wav'


const useMusic = () =>{
    const backgroundSound = ()=>{
       const sound =  new Howl({
            src: [mainSound],
            loop: true,
            onplay : function(sound){
                this.volume(0.5)
            }
        });
        sound.play()
    }
    return [backgroundSound];
}   


export default useMusic;
