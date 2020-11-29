import './Title.css'

const Title = (props)=>{
   const { children, ...attributes} = props
   return  <h1 {...attributes}>{children}</h1>
}

export default Title;

