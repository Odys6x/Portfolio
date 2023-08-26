import profilepic from "../Myself/Me.png";

function NavBar () {

    return ( <header id="header">
    <div class="d-flex flex-column">

      <div class="profile">
        <img src={profilepic} alt="" class="img-fluid rounded-circle"/>
        <h1 class="text-light"><a href="index.html">Wong Chun Owen</a></h1>
        <div class="social-links mt-3 text-center">
          <a href="https://twitter.com/RemantShiki" class="twitter"><i class="bx bxl-twitter"></i></a>
          <a href="https://www.facebook.com/profile.php?id=100005061976008" class="facebook"><i class="bx bxl-facebook"></i></a>
          <a href="https://www.instagram.com/astralshagz/" class="instagram"><i class="bx bxl-instagram"></i></a> 
          <a href="https://www.linkedin.com/in/wong-chun-owen-5b611a185" class="linkedin"><i class="bx bxl-linkedin"></i></a>
        </div>
      </div>

      <nav id="navbar" class="nav-menu navbar">
        <ul>
          <li><a href="#hero" class="nav-link scrollto active"><i class="bx bx-home"></i> <span>Home</span></a></li>
          <li><a href="#about" class="nav-link scrollto"><i class="bx bx-user"></i> <span>About</span></a></li>
          <li><a href="#resume" class="nav-link scrollto"><i class="bx bx-file-blank"></i> <span>Resume</span></a></li>
          <li><a href="#portfolio" class="nav-link scrollto"><i class="bx bx-book-content"></i> <span>Portfolio</span></a></li>
          <li><a href="#contact" class="nav-link scrollto"><i class="bx bx-envelope"></i> <span>Contact</span></a></li>
        </ul>
      </nav>
    </div>
  </header>)
}

export default NavBar;