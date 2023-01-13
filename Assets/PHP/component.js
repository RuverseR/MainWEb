class Navbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <!-- Navbar  -->
        <div class="nav-container">
          <nav class="navbar">
            <ul class="logo" href="">
              <li><a class="logo-text" href="../../../index.html">Alex</a></li>
              <li><a class="logo-circle" href="../../../index.html">.</a></li>
            </ul>
            <a href="#" class="toggle-button">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </a>
          </nav>
          <ul class="navbar-items">
            <li>
              <a
                class="navbar-item"
                href="../../../Assets/Documents/CV 2 (PDF).pdf"
                target="_blank"
                >Resume</a
              >
            </li>
            <li class="resources-button">
              <a class="navbar-item" href="#">Resources</a>
              <div class="nav-resources">
                <ul>
                  <li>
                    <a
                      href="../../../Pages/Resources/Chemical_Formulas/index.html"
                      >Chemical Formulas</a
                    >
                  </li>
                  <li>
                  <a
                    href="../../../Pages/Resources/Fibonacci/index.html"
                    >Fibonacci</a
                  >
                  </li>
                  <li>
                    <a href="../../../Pages/Resources/Useful_Links/index.html"
                      >Useful Links</a
                    >
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a class="navbar-item" href="../../../index.html#contact"
                >Contact</a
              >
            </li>
          </ul>
        </div>
        `
    }
}

class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="footer-container">
            <div class="spacer"></div>
            <div class="footer">
            <p>Designed and built by Alex lo Storto</p>
            <p id="visits">👀</p>
            </div>
        </footer>
        `
    }
}

customElements.define("app-navbar", Navbar);
customElements.define("app-footer", Footer);