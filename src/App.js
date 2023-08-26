import React from "react";  
import NavBar from "./Components/navBar";
import Footer from "./Components/footer";
import css from "./assets/css/style.css";
import boot from "./assets/vendor/bootstrap/css/bootstrap.min.css";
import booticon from "./assets/vendor/bootstrap-icons/bootstrap-icons.css"
import boxicon from "./assets/vendor/boxicons/css/boxicons.min.css"
import gaslight from "./assets/vendor/glightbox/css/glightbox.min.css"
import swiper from "./assets/vendor/swiper/swiper-bundle.min.css"
import About from "./Components/about";
import Facts from "./Components/facts";
import Skills from "./Components/skills";
import Resume from "./Components/resume";
import Porfolio from "./Components/portfolio";
import script from "./assets/js/scripted.js"


function App(){
    return( 
        <> 
        <NavBar/>
        
        <section id="hero" class="d-flex flex-column justify-content-center align-items-center">
        <div class="hero-container" data-aos="fade-in">
        <h1>Wong Chun Owen</h1>
        <h2 id="me">I'm <span></span></h2>
        </div>
      </section>
      



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