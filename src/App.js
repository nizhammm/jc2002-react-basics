import "./assets/styles.css"
import "bootstrap/dist/css/bootstrap.min.css"
import BandSection from "./components/BandSection/BandSection";
import Navbar from './components/Navbar/Navbar'
import TourSection from "./components/TourSection/TourSection";
import ClassComponent from "./components/ClassComponent/ClassComponent";
import ContentCard from "./components/ContentCard/ContentCard";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3">
            <ContentCard />
          </div>
        </div>
      </div>
      {/* <BandSection />
      <TourSection />
      <ClassComponent /> */}
    </>
  );
}

export default App;
