import React from "react";
import { Links, Redes } from "./LinksData.js";
import Logo from "../../assets/Image/boostup.png";
import Slogan from "../../assets/Image/sigamos-creciendo-juntos.png"

const BoostUp = () => {
  return (
    <React.Fragment>
      <div className="w-screen">
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-950 px-6 py-6 text-center">
          <div className="w-48 h-24 p-3 shadow-lg flex items-center justify-center">
            <img src={Logo} alt="BoostUp Logo" className="" />
          </div>
          <h1 className="text-2xl font-bold text-gray-100 mb-6 mt-4">
            Marketing Digital
          </h1>

          <div className="flex flex-row gap-4 mb-10">
            {Redes.map((Red, index) => (
              <a
                key={index}
                href={Red.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 hover:border-pink-500 text-white hover:text-pink-600 font-medium text-2xl p-2 rounded-full shadow-sm hover:shadow-md transition"
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
                className={`bg-${link.background} border border-gray-300 hover:border-orange-500 text-white hover:text-pink-600 font-medium py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition`}
              >
                <h4 className="font-bold text-lg">{link.title}</h4>
                {link.label}
              </a>
            ))}
          </div>
          {/* <p className="text-sm text-pink-300 mt-6">
            Si deseas un MENÚ DE ENLACES como éste  
            <br />
            <a href="https://jefa-web.com.ar/contactame" className="underline">
            CONTACTAME
            </a>
            </p> */}
            <div className="h-15 p-3 mt-6 flex items-center justify-center">
              <img src={Slogan} alt="BoostUp Logo" className="h-16" />
            </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BoostUp;
