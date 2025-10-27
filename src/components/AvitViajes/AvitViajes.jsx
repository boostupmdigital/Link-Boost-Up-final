import React from "react";
import { Links, Redes } from "./LinksData.js";
import Logo from "../../assets/Image/avitViajes.png";

const AvitViajes = () => {
  return (
    <React.Fragment>
      <div className="w-screen">
        <div className="min-h-screen flex flex-col items-center justify-center bg-cyan-800 px-6 py-6 text-center">
          <div className="w-48 h-48 p-3 rounded-full shadow-xl flex items-center justify-center">
            <img src={Logo} alt="BoostUp Logo" className="" />
          </div>
          <h1 className="text-3xl font-bold text-orange-500 mb-4 mt-4">
            AVIT
            <spam className="text-3xl font-bold italic text-white ml-2">
             VIAJES

            </spam>
          </h1>
          <h2 className="text-xl text-gray-100 ">
           Agencia de Turismo ✈ Worldwide Travel
          </h2>

         <div className="flex flex-row gap-4 my-8">
  {Redes.map((Red, index) => {
    // Si es mailto usamos <a> normal
    if (Red.key === "email") {
      return (
        <a
          key={index}
          href={Red.url}
          className="border border-gray-300 hover:border-orange-500 text-white hover:text-orange-500 font-medium text-5xl p-2 rounded-full shadow-lg transition"
        >
          {Red.img}
        </a>
      );
    }
    return (
      <button
        key={index}
        onClick={() => window.open(Red.url, "_blank", "noopener,noreferrer")}
        className="border border-gray-300 hover:border-orange-500 text-white hover:text-orange-500 font-medium text-5xl p-2 rounded-full shadow-lg transition"
      >
        {Red.img}
      </button>
    );
  })}
</div>




          <div className="w-full max-w-md flex flex-col gap-4 border border-white p-3 shadow-2xl">
            <p className="text-orange-600 text-xl">
              Hacemos realidad el viaje de tus sueños. 
             <br />
             <spam className="text-white text-xl italic">
              Vacaciones familiares ? 
              <br />
              Una escapada romántica?
              <br />
              ✈✈✈✈
              <br />
              Lo organizamos todo... ¡al mejor precio!
              <br />
             </spam>
Tu próxima aventura comienza aquí.
            </p>
           
          </div>
          
            
        </div>
      </div>
    </React.Fragment>
  );
};

export default AvitViajes;
