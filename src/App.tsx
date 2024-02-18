import "./styles/App.css";
import NavBar from "./components/NavBar";
import Heading from "./components/Heading";

function App() {
  return (
    <>
      <Heading />
      <NavBar />
      <div className="Scroll"></div>
    </>
  );
}

export default App;
