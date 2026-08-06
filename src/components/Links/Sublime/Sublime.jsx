import React from "react";
import { Links, Redes } from "./LinksData.js";
import Logo from "../../../assets/Image/logo-sublime-circulo.jpg";
import Boostup from "../../../assets/Image/boostup-negro.png";


const Sublime = () => {
  return (
    <React.Fragment>
      <div className="w-screen">
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-6 text-center">
          <div className="max-w-80 p-3 flex items-center justify-center">
            <img src={Logo} alt="BoostUp Logo" className="" />
          </div>
          
          <div className="flex flex-row gap-4 mb-10">
            {Redes.map((Red, index) => (
              <a
                key={index}
                href={Red.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white hover:border-black text-pink-900 hover:text-black font-medium text-2xl p-2 rounded-full "
              >
                {Red.img}
              </a>
            ))}
          </div>

          <div className="w-full max-w-md flex flex-col gap-4">
            {Links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-${link.background} border border-pink-900 hover:border-pink-900 text-black hover:text-pink-900 font-medium py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition`}
              >
                <h4 className="font-bold text-lg text-pink-900">{link.title}</h4>
                {link.label}
              </a>
            ))}
          </div>
      <div className="w-20 p-3 flex items-center justify-center">
                            <a href="https://www.boostup-marketingdigital.com/">
                            <img src={Boostup} alt="BoostUp Logo" className="" />
                            </a>
                          </div>
           
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sublime;
