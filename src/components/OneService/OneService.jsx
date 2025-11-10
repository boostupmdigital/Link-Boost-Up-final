import React from "react";
import { Links, Redes } from "./LinksData.js";
import Logo from "../../assets/Image/logo-oneservice.png";


const oneService = () => {
  return (
    <React.Fragment>
      <div className="w-screen">
        <div className="min-h-screen flex flex-col items-center justify-center bg-cyan-600 px-6 py-6 text-center">
          <div className="w-100  p-3 shadow-lg flex items-center justify-center">
            <img src={Logo} alt="BoostUp Logo" className="rounded-xl" />
          </div>
          
          <div className="flex flex-row gap-4 my-10">
            {Redes.map((Red, index) => (
              <a
                key={index}
                href={Red.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 hover:border-white text-black hover:text-white font-medium text-2xl p-2 rounded-full shadow-sm hover:shadow-md transition"
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
                className={`bg-${link.background} border border-gray-300 hover:border-white text-black hover:text-white font-medium py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition`}
              >
                <h4 className="font-bold text-lg">{link.title}</h4>
                {link.label}
              </a>
            ))}
          </div>
      
           
        </div>
      </div>
    </React.Fragment>
  );
};

export default oneService;
