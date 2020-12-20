import './CarouselDots.css'
const CarouselDots = ({dotsAmount , activeIndex})=>{
   const dotsArray = [...Array(dotsAmount)].map((value,index)=>value = index === activeIndex)
   return  (
   <nav className="carousel">
      {dotsArray.length > 0 && dotsArray.map((isActive,index)=>{
         const className = isActive ? "carousel-item active" : "carousel-item";
          return(
             <div key={index +1}>
               <input id={`carousel-item-${index +1}`} className={className} type="radio" name="carousel-dots" />
               <label htmlFor={`carousel-item-${index +1}`}></label>
            </div>
          ) 
      })}
   </nav>)
}

export default CarouselDots;

