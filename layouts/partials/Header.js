import Logo from "@components/Logo";
import config from "@config/config.json";
import menu from "@config/menu.json";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import social from "@config/social.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Social from "@components/Social";
import { set } from "date-fns";

const Header = () => {
  //router
  const router = useRouter();

  // distructuring the main menu from menu object
  const { main } = menu;

  // states declaration
  const [navOpen, setNavOpen] = useState(false);

  // logo source
  const { logo } = config.site;
  const { enable, label, link } = config.nav_button;

  const [clientWindowHeight, setClientWindowHeight] = useState("");

  const [backgroundTransparacy, setBackgroundTransparacy] = useState(0);
  const [padding, setPadding] = useState(30);
  const [boxShadow, setBoxShadow] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState(255);
  const [isMobile, setIsMobile] = useState(1);

  useEffect(() => {
    // Check if the device is a mobile device
    var isMobileDevice;
    window.innerWidth <= 768 ? isMobileDevice = true : isMobileDevice = false;
    setIsMobile(isMobileDevice);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    let backgroundTransparacyVar = clientWindowHeight / 600;

    if (backgroundTransparacyVar < 1) {
      let paddingVar = 30 - backgroundTransparacyVar * 20;
      let boxShadowVar = backgroundTransparacyVar * 0.1;
      setBackgroundTransparacy(backgroundTransparacyVar);
      setPadding(paddingVar);
      setBoxShadow(boxShadowVar);
      setBackgroundColor(200);
    }
  }, [clientWindowHeight]);

  useEffect(() => {
    let backgroundTransparacyVar = clientWindowHeight / 600;

    if (backgroundTransparacyVar < 1) {
      setBackgroundColor(210);
    }
  });

  return (
    <header
      className="header fixed left-0 right-0 top-0"
      style={{
        background: `rgba(${backgroundColor}, ${backgroundColor}, ${backgroundColor}, ${backgroundTransparacy})`,
        padding: `${padding}px 0px`,
        boxShadow: `rgb(0 0 0 / ${boxShadow}) 0px 0px 20px 6px`,
        borderRadius: "0 0 8px 8px",
        zIndex: 100000,
        height: "80px",
      }}
    >
      <nav className="navbar container">
        {/* logo */}
        <div className="order-0">
          <Logo src={logo} />
        </div>

        {/* navbar toggler */}
        <button
          id="show-button"
          className="order-2 flex cursor-pointer items-center md:order-1 md:hidden"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? (
            <svg className="h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu Open</title>
              <polygon
                points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                transform="rotate(45 10 10)"
              />
            </svg>
          ) : (
            <svg className="h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu Close</title>
              <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
            </svg>
          )}
        </button>

        {/* Menu */}
        <div
      id="nav-menu"
      className={`order-3 md:order-1 ${
        navOpen ? (isMobile ? ("bg-gray-200 translate-x-3/4 transform transition-transform duration-300 ease-in-out") : "max-h-[1000px]") : (isMobile ? ("bg-transparent translate-x-full h-0 transform transition-transform duration-300 ease-in-out") : " -translate-x-10 max-h-0")
      }`}
    >
          <ul className="navbar-nav block w-full md:flex md:w-auto lg:space-x-2">
            {main.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menu.hasChildren ? (
                  <li className="nav-item nav-dropdown group relative">
                    <span className="nav-link inline-flex items-center">
                      {menu.name}
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul className="nav-dropdown-list hidden group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                      {menu.children.map((child, i) => (
                        <li className="nav-dropdown-item" key={`children-${i}`}>
                          <Link
                            href={child.url}
                            className="nav-dropdown-link block"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      href={menu.url}
                      onClick={() => setNavOpen(false)}
                      className={`nav-link block ${
                        router.asPath === menu.url ? "nav-link-active" : ""
                      }`}
                    >
                      {menu.name}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>

        {/* social links */}
        <div className="social-links block hidden md:order-2 md:flex md:items-center md:justify-center">
          <Social source={social} className="social-icons block" />
        </div>
      </nav>
    </header>
  );
};

export default Header;


{/* <div
      id="nav-menu"
      className={`order-3 md:order-1 ${
        navOpen ? (isMobile ? ("bg-white translate-x-3/4 transform transition-transform duration-300 ease-in-out") : "max-h-[1000px]") : (isMobile ? ("bg-transparent translate-x-full transform transition-transform duration-300 ease-in-out") : "-translate-y-5 -translate-x-10 max-h-0")
      }`}
    ></div> 
  
    const [isMobile, setIsMobile] = useState(1);

  useEffect(() => {
    // Check if the device is a mobile device
    var isMobileDevice;
    window.innerWidth <= 768 ? isMobileDevice = true : isMobileDevice = false;
    setIsMobile(isMobileDevice);
  }, []);

  */}