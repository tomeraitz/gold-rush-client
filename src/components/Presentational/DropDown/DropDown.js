import './DropDown.css'

const DropDown = (props)=>{
   const { children, ...attributes} = props
   return  <div {...attributes}>{children}</div>
}

export default DropDown;

