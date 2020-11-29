import './Loading.css';
import Title from '../../Presentational/Title'
const divArray = [...Array(8).keys()];

const Loading = (props)=>{
   const {children} = props;
   return  (
      <div className="loading"> 
         <Title className="title white big">{children}</Title>
         <div className="lds-roller">
            {divArray.map((_,index)=>{
               return <div key={index}></div>
            })}
         </div>
      </div>
   )
}

export default Loading;

