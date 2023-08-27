import React from "react";  
import NavBar from "./Components/navBar";
import Footer from "./Components/footer";
import "./assets/css/style.css";
import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/vendor/boxicons/css/boxicons.min.css";
import "./assets/vendor/glightbox/css/glightbox.min.css";
import "./assets/vendor/swiper/swiper-bundle.min.css";
import About from "./Components/about";
import Facts from "./Components/facts";
import Skills from "./Components/skills";
import Resume from "./Components/resume";
import Porfolio from "./Components/portfolio";
import Typing from "./Components/typingS";


function App(){
    return( 
        <> 
    <NavBar/>
    <Typing/>

    <main id="main">
        <About/> 
        <Facts/>
        <Skills/>
        <Resume/>
        <Porfolio/>
    </main>
    <Footer/>

      </>   
    );
}

export default App;