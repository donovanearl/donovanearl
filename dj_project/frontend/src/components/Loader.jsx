import "../styles/Loader.css"

function Loader() {
    console.log("LOADER IS RENDERING");
    const text="Loading data"
  return (
    <div
      className="loader-container"
      role="status"
      aria-label="Loading"
    >
      <div className="loader" />
      <div className="text">
        <p>{text}</p>
      </div>
      
    </div>
    
  );
}

export default Loader;