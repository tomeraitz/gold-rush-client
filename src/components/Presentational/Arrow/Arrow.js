import './Arrow.css'

const Arrow = (props)=>{
   const { children, ...attributes} = props
   return  <div {...attributes}>🡸</div>
}

export default Arrow;

