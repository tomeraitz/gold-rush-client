import './Footer.css';

const Footer = (props)=>{
   const classes = props.className ?  `footer ${props.className}` : "footer"
   return  (
      <footer className={classes}>
         {props.children}
      </footer>
   )
}

export default Footer;

