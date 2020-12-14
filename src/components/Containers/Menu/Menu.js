import './Menu.css';


const Menu = (props)=>{
   const {children} = props;
   return  (
      <div className="menu"> 
         <div className="menu-bars">
            <div className="inner-burger"></div>
            <div className="inner-burger"></div>
            <div className="inner-burger"></div>
         </div>
      </div>
   )
}

export default Menu;

