import './ButtonPhoneController.css'
import Arrow from '../../Presentational/Arrow';

const ButtonPhoneController = ({startPress , endPress})=>{
   return (
      <>
      {startPress && 
         <div className="controller-continuer">
            <div className="flex-controller">
               <Arrow className="arrow up" id="38" onTouchStart={startPress} onTouchEnd={endPress} />
            </div>
            <div className="flex-controller">
               <Arrow className="arrow" id="37" onTouchStart={startPress} onTouchEnd={endPress} />
               <Arrow className="arrow right" id="39" onTouchStart={startPress} onTouchEnd={endPress} />
            </div>
            <div className="flex-controller">
               <Arrow className="arrow down" id="40" onTouchStart={startPress} onTouchEnd={endPress} />
            </div>
         </div>}
      </>
   )
}

export default ButtonPhoneController;

