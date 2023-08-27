import icode from "../Myself/icode.jpg";
import math from "../Myself/math.jpg";
import SG50 from "../Myself/SG50.jpg";

function Porfolio(){
    return (<>
    
    <section id="portfolio" class="portfolio section-bg">
      <div class="container">

        <div class="section-title">
          <h2>Portfolio</h2>
          <p>Welcome to my portfolio, a curated collection showcasing my journey as a tech enthusiast, web developer, and AI explorer. Explore my projects and experiences that reflect my passion for innovation and creativity.</p>
        </div>

        <div class="row" data-aos="fade-up">
          <div class="col-lg-12 d-flex justify-content-center">
            <ul id="portfolio-flters">
              <li data-filter="*" class="filter-active">All</li>
              <li data-filter=".filter-app">Less  </li>
            </ul>
          </div>
        </div>

        <div class="row portfolio-container" data-aos="fade-up" data-aos-delay="100">

          <div class="col-lg-4 col-md-6 portfolio-item filter-app">
            <div class="portfolio-wrap">
              <img src={SG50} class="img-fluid" alt=""/>
              <div class="portfolio-links">
                <a  data-gallery="portfolioGallery" class="portfolio-lightbox" title="App 1"><i class="bx bx-plus"></i></a>
                <a   title="More Details"><i class="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-web">
            <div class="portfolio-wrap">
            <img src={math} class="img-fluid" alt=""/>
              <div class="portfolio-links">
                <a  data-gallery="portfolioGallery" class="portfolio-lightbox" title="Web 3"><i class="bx bx-plus"></i></a>
                <a  title="More Details"><i class="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-app">
            <div class="portfolio-wrap">
            <img src={icode} class="img-fluid" alt=""/>
              <div class="portfolio-links">
                <a  data-gallery="portfolioGallery" class="portfolio-lightbox" title="App 2"><i class="bx bx-plus"></i></a>
                <a  title="More Details"><i class="bx bx-link"></i></a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
    
    </>)
}

export default Porfolio