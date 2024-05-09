"use client";
import { Container, Row, Col } from 'react-bootstrap';
import '../StyleComponents/Inicio.css';

const HomeComponent: React.FC = () => {
  
  return (
    <div className="container-flex">
    <div className="row">
      <div className="col-sm-6 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="display-2">SMASH NBA</h1>
          <p>
            Welcome to SMASH NBA, your ultimate destination for NBA card collectors!
            <br/><br/>
            Immerse yourself in the captivating world of basketball legends and collectible treasures. Explore our extensive collection of physical cards featuring the greatest NBA players of all time. From iconic moments to rare editions, each card represents a piece of basketball history that you can hold in your hands.
            <br/><br/>
            Discover the beauty, excitement, and nostalgia of the game as you build your dream collection. Step into our store and let the magic of NBA cards ignite your passion for the game that transcends time and leaves an indelible mark on fans around the globe.
            <br/><br/>
            Welcome to a world where legends live on. Start your journey today!
          </p>
        </div>
      </div>
      <div className="col-sm-6 d-flex align-items-center justify-content-center">
        <div className="max-height-90">
          <img src="/images/inicio.png" alt="Image" className="img-fluid" />
        </div>
      </div>
    </div>
  </div>
  );
};

export default HomeComponent;
