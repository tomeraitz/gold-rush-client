import './Popup.css'

const Popup = (props)=>{
   const { children, ...attributes} = props
   return(
      <div className="popup-bg">
         <div  {...attributes}>
            {children}
         </div>
      </div>
   ) 
}

export default Popup;

