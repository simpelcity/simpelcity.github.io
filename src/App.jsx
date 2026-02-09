import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { FaGithub, FaDiscord, FaTiktok } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react'
import GoTop from '@/components/GoTop'

export default function App() {
  const location = useLocation();
  const [height, setHeight] = useState();
  const observedDiv = useRef(null);
  const sizesRef = useRef({ height: 0});

  useEffect(() => {
    if (!observedDiv.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (observedDiv.current.offsetHeight !== sizesRef.current.height) {
        sizesRef.current.height = observedDiv.current.offsetHeight;
        setHeight(observedDiv.current.offsetHeight);
      }
    });

    resizeObserver.observe(observedDiv.current);

    return (() => {
      resizeObserver.disconnect();
    });
  }, [observedDiv.current]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
  ];

  const currentYear = new Date().getFullYear();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [showGoTop, setShowGoTop] = useState("d-none");

  function handleVisibleButton() {
    const position = window.pageYOffset;
    setScrollPosition(position);

    if (scrollPosition > 20) {
      return setShowGoTop("d-block");
    } else {
      return setShowGoTop("d-none");
    }
  }

  window.onscroll = function() { handleVisibleButton() };

  const handleScrollUp = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <Navbar className="position-fixed top-0 z-1 w-100 d-flex justify-content-center p-0">
        <Container className={`m-0 p-0 d-flex align-items-center py-2 transition ${scrollPosition > 20 ? 'bg-dark w-25 rounded-5 mt-2 shadow' : ''}`} fluid>
          <Nav className="d-flex column-gap-3 mx-auto">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `fs-5 text-decoration-none ${isActive ? 'text-info fw-bold transition' : 'text-primary transition'}`
                }>
                {label}
              </NavLink>
            ))}
          </Nav>
        </Container>
      </Navbar>

      <GoTop showGoTop={showGoTop} scrollUp={handleScrollUp} />
      <Outlet context={{ height }} />

      <footer className="bg-dark text-primary mt-auto" ref={observedDiv}>
        <span id="footer-height" className={height}></span>
        <Container className="" fluid>
          <div className="d-flex justify-content-center">
            <div className="socials d-flex mb-2 column-gap-2">
              <a className="github fs-3 transition" href="https://github.com/simpelcity"><FaGithub /></a>
              <a className="discord fs-3 transition" href="https://discord.com/users/760475405194625045"><FaDiscord /></a>
              <a className="tiktok fs-3 transition" href="https://tiktok.com/@simpelcity"><FaTiktok /></a>
            </div>
          </div>
          <div className="d-flex flex-column flex-lg-row align-items-md-center justify-content-lg-center footer-bottom">
            <div className="tablet-div d-flex flex-column flex-md-row align-items-center">
              <div className="copyright-div">
                <div className="d-flex gap-1">
                  <FaRegCopyright className="mt-1" />
                  <p className="copyright">Copyright {currentYear} Simpelcity</p>
                </div>
              </div>
              <div className="design-div">
                <p className="design">
                  Designed and developed by{" "}
                  <a className="simpelcity text-info text-decoration-none fw-bold transition" href="https://github.com/simpelcity">Simpelcity</a>
                </p>
              </div>
            </div>
            <div className="hosted-div d-flex justify-content-center">
              <p className="hosted">Hosted by <a class="githubcom text-info text-decoration-none fw-bold transition" href="https://github.com">github.com</a></p>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}