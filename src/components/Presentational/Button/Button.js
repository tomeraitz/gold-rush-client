import './Button.css'

const Button = (props)=>{
   const { children, ...attributes} = props
   return  <button {...attributes}>{children}</button>
}

export default Button;

