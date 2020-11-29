import './Header.css';

const Header = (props)=>{
   const classes = props.className ?  `header ${props.className}` : "header"
   return  (
      <header className={classes}>
         {props.children}
      </header>
   )
}

export default Header;

