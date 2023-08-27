import profilepic from "../Myself/Me.png";

function About(){
    return(<>
    <section id="about" class="about">
      <div class="container">
        
        <div class="section-title">
          <h2>About</h2>
          <p> I'm Wong Chun Owen, a student at SiT. I've spent the past 8 months as an information technology assistant, where I've honed my skills in web development and programming. I've also dived into the world of AI and machine learning. With my diploma already in hand and my pursuit of a bachelor's degree underway.</p>
        </div>

        <div class="row">
          <div class="col-lg-4" data-aos="fade-right">
          <img src={profilepic} class="img-fluid" alt=""/>
          </div>
          <div class="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
            <h3>Programmer & AI Specialist</h3>
            <p class="fst-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
            <div class="row">
              <div class="col-lg-6">
                <ul>
                  <li><i class="bi bi-chevron-right"></i> <strong>Birthday:</strong> <span>11 March 2001</span></li>
                  <li><i class="bi bi-chevron-right"></i> <strong>Webiste:</strong> <span>https://odys6x.github.io/Portfolio/</span></li>
                  <li><i class="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+65 97250077</span></li>
                  <li><i class="bi bi-chevron-right"></i> <strong>City:</strong> <span>Singapore, Woodlands</span></li>
                </ul>
              </div>
              <div class="col-lg-6">
                <ul>
                  <li><i class="bi bi-chevron-right"></i> <strong>Age:</strong> <span>22</span></li>
                  <li><i class="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>Bachelor of Science with Honours<br/><span>(Currently pursuing)</span></span></li>
                  <li><i class="bi bi-chevron-right"></i> <strong>Email:</strong> <span>phoinexw@gmail.com</span></li>
                  
                </ul>
              </div>
            </div>
            <p>

Apart from my technical pursuits, I'm an enthusiastic gamer, finding both enjoyment and inspiration in the virtual realms. Music is another realm where I love – adeptly playing musical instruments and weaving melodies that resonate with my soul. My creative drive is also channeled into programming, where I merge artistic vision with technical finesse. 
</p>

<p>

A central thread in my journey is the belief that each facet of existence holds a unique beauty waiting to be discovered and expressed as a form of art. This philosophy has guided my pursuit of creativity and innovation.

My educational journey signifies my commitment to growth and excellence. I'm currently striving toward a bachelor's degree, aiming to make a meaningful impact in the expansive landscape of technology.

</p>

<p>

Looking forward, my aspirations encompass securing a role in a prominent industry. I envision contributing my skills and insights to a dynamic team within a large-scale company, fostering innovation and collaboration. Beyond my career, I'm driven by a passion for helping others, dedicating my spare time to making a positive difference in their lives.

</p>
          </div>
        </div>

      </div>
    </section>
</>)
}

export default About