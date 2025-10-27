import React from "react";
import { Links, Redes } from "./LinksData.js";
import Logo from "../../assets/Image/vergel.png";
import Boostup from "../../assets/Image/boostup-negro.png";

const Vergel = () => {
  return (
    <React.Fragment>
      <div className="w-screen">
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-4 text-center">
          <div className="w-60 p-3 flex items-center justify-center">
            <img src={Logo} alt="El Vergel, La Estación" className="" />
          </div>
          <h1 className="text-2xl font-bold italic text-black mb-2 mt-4">
           Los mejores sabores artesanales
          </h1>
<h2 className="text-xl text-black mb-6 mt-2">
  Panadería ⚫ Cafetería ⚫ Heladería
  </h2>

          <div className="flex flex-row gap-4 mb-10">
            {Redes.map((Red, index) => (
              <a
                key={index}
                href={Red.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-800 hover:border-red-500 text-black hover:text-red-500 font-medium text-2xl p-2 rounded-full shadow-sm hover:shadow-md transition"
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
                className={`bg-${link.background} border border-gray-800 hover:border-red-500 text-black hover:text-red-500 font-medium py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition`}
              >
                <h4 className="font-bold text-lg">{link.title}</h4>
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

export default Vergel;
