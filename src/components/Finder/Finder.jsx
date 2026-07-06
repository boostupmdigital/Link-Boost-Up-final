import React from "react";
import { Redes } from "./LinksData.js";
import Logo from "../../assets/Image/logo-finder.jpg";
import Boostup from "../../assets/Image/boostup-negro.png";


const Finder = () => {
  return (
    <React.Fragment>
      <div className="w-screen">
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-6 text-center">
          <div className="w-70 p-3 flex items-center justify-center mb-5 rounded-full">
            <img src={Logo} alt="Viajes Finder Logo" className="" />
          </div>
          
          <h2 className="text-xl text-gray-800 ">
            Agencia de Turismo ✈ Worldwide Travel
          </h2>
          
          <div className="flex flex-row gap-4 mb-10 mt-3">
            {Redes.map((Red, index) => (
              <a
                key={index}
                href={Red.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-pink-500 hover:border-black text-pink-500 hover:text-black font-medium text-2xl p-2 rounded-full "
              >
                {Red.img}
              </a>
            ))}
          </div>
          {/*
          <div className="w-full max-w-md flex flex-col gap-4">
            {Links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-${link.background} border border-cyan-300 hover:border-black text-black hover:text-cyan-500 font-medium py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition`}
              >
                <h4 className="font-bold text-lg text-cyan-600">{link.title}</h4>
                {link.label}
              </a>
            ))}
          </div>
              */}
          
          <div className="w-full max-w-md flex flex-col gap-4 border border-pink-500 p-2 shadow-2xl bg-cyan-600/10">
            <p className="text-pink-500 text-xl">
              Hacemos realidad el viaje de tus sueños!
              <br />
              <spam className="text-cyan-600 text-xl italic">
                Vacaciones familiares ?
                <br />
                Una escapada romántica?
                <br />
                ✈✈✈✈
                <br />
                Lo organizamos todo... 
                <br />
                ¡al mejor precio!
                <br />
              </spam>
              Tu próxima aventura comienza aquí.
            </p>
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

export default Finder;
