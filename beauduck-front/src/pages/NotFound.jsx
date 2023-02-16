import duck from '../assets/duck3.jpg';

const NotFound = () => {
  return (
    <div className="container">
      <img src={require("../assets/not_found.png")} alt="not found" width={1000}/>
    </div>
  );
};

export default NotFound;
