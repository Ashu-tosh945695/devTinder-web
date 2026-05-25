import Body from "./Body";
import NavBar from "./Navbar";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  
  return (
    <>
    <BrowserRouter baseName="/">
       <Routes>
        <Route path="/" element={<Body/>}>
           <Route path="/login" element={<Login/>}/>
           <Route path="/Profile" element={<Profile/>}/>
        </Route>
       </Routes>
    </BrowserRouter>
    
    </>
  );
}
export default App;
