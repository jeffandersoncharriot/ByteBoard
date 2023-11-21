import "./App.css"

/**
 * Displays the movie with the specified image
 * Could display no image if no movie with that image
 * @param {Object,String} children,image movie object and an image path
 * @returns 
 */
function Card({ children,image,link}) {
  return (    
     <div className="card">   
     <a href={link}><img className="card-img" src={image} alt=""></img></a>
        {children}   
     </div>  
  );
}

export default Card