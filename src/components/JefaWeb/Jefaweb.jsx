import React from "react";
import { Redes, RedesBoostup } from "./LinksData.js";
import Logo from "../../assets/Image/logo-jefa.png";
import Boostup from "../../assets/Image/boostup.png"

const Jefaweb = () => {
  return (
    <React.Fragment>
      <div className="w-screen">
        <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6 py-4 text-center">
          <div className="w-48 h-48 p-3 rounded-full shadow-xl flex items-center justify-center">
            <img src={Logo} alt="Jefa web Logo" className="rounded-full animate-spin360stop" />
          </div>
          <h3 className="text-sm text-pink-500 mb-2">
            J.E.F.A | Julia Esther Funes Aragón
          </h3>
          <h2 className="text-xl text-gray-100 ">
            Transformando procesos. Impulsando empresas.
          </h2>
          <h3 className="text-base italic text-pink-500/90 mt-2 animate-pulse-delay-1s">
            Diseñadora de soluciones 
            <p>
              para negocios en crecimiento.
              </p>
          </h3>
          <h4 className="text-lg text-verdeFluo-500 mb-2 mt-4">
            Cómo contactarme:
          </h4>
          <div className="flex flex-row gap-4 mb-8">
            {Redes.map((Red, index) => {
              // Si es mailto usamos <a> normal
              if (Red.key === "email") {
                return (
                  <a
                    key={index}
                    href={Red.url}
                    className="border border-verdeFluo-500 hover:border-pink-500 text-verdeFluo-500 hover:text-pink-500 font-medium text-4xl p-2 rounded-full shadow-lg transition"
                  >
                    {Red.img}
                  </a>
                );
              }
              return (
                <button
                  key={index}
                  onClick={() =>
                    window.open(Red.url, "_blank", "noopener,noreferrer")
                  }
                  className="border border-verdeFluo-500 hover:border-pink-500 text-verdeFluo-500 hover:text-pink-500 font-medium text-4xl p-2 rounded-full shadow-lg transition"
                >
                  {Red.img}
                </button>
              );
            })}
          </div>

          <div className="w-auto max-w-md flex flex-col items-center gap-4 border border-pink-500 p-4 shadow-2xl">
  <div className="text-left">
    <p className="text-pink-500/80 text-xl mb-2 font-bold">
      ¿A qué me dedico?
    </p>

    <span className="text-white text-xl italic">
      ✔ Automatización
      <br />
      ✔ Programación
      <br />
      ✔ Inteligencia artificial
      <br />
      ✔ Procesos
    </span>
  </div>
</div>
          <h4 className="text-lg text-gray-100 mt-6">
            Conocé BoostUp:
          </h4>
          <div className="w-28 p-3 flex items-center justify-center animate-pulse-delay-1s">
            <a href="https://www.boostup-marketingdigital.com/">
            <img src={Boostup} alt="BoostUp Logo" className="" />
            </a>
          </div>
          <div className="flex flex-row gap-4 my-4">
            {RedesBoostup.map((Red, index) => {
              // Si es mailto usamos <a> normal
              if (Red.key === "email") {
                return (
                  <a
                    key={index}
                    href={Red.url}
                    className="border border-gray-300 hover:border-orange-500 text-white hover:text-orange-500 font-medium text-3xl p-2 rounded-full shadow-lg transition"
                  >
                    {Red.img}
                  </a>
                );
              }
              return (
                <button
                  key={index}
                  onClick={() =>
                    window.open(Red.url, "_blank", "noopener,noreferrer")
                  }
                  className="border border-gray-300 hover:border-orange-500 text-white hover:text-orange-500 font-medium text-3xl p-2 rounded-full shadow-lg transition"
                >
                  {Red.img}
                </button>
              );
            })}
          </div>

          
        </div>
      </div>
    </React.Fragment>
  );
};

export default Jefaweb;
