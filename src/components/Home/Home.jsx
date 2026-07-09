import React from "react";
import { Links, RedesBoostup } from "./LinksData.js";
import Boostup from "../../assets/Image/boostup.png";

const Home = () => {
  return (
    <React.Fragment>
      <div className="w-screen">
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-950 px-6 py-4 text-center">
          <div className="w-48 h-48 p-3 flex items-center justify-center">
            <img
              src={Boostup}
              alt="Logo Boostup"
              className="animate-pulse-delay-1s"
            />
          </div>
          <h3 className="text-xl text-white mb-4">
            🚀Impulsa tu empresa al siguiente nivel!
          </h3>
          <h4 className="text-lg text-orange-500 mb-2 mt-4">
            Cómo contactarnos:
          </h4>
          <div className="flex flex-row gap-4 mb-4">
            {RedesBoostup.map((Red, index) => {
              // Si es mailto usamos <a> normal
              if (Red.key === "email") {
                return (
                  <a
                    key={index}
                    href={Red.url}
                    className="border border-orange-500 hover:border-white text-orange-500 hover:text-white font-medium text-3xl p-2 rounded-full shadow-lg transition"
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
                  className="border border-orange-500 hover:border-white text-orange-500 hover:text-white font-medium text-3xl p-2 rounded-full shadow-lg transition"
                >
                  {Red.img}
                </button>
              );
            })}
          </div>

          <div className="w-auto max-w-md flex flex-col items-center gap-4 border border-white p-4 mt-4 shadow-2xl">
            <div className="text-center">
              <p className="text-orange-500/80 text-xl mb-2 font-bold">
                Tu menú de enlaces GRATIS!
              </p>

              <span className="text-white text-xl italic">
                Como un servicio más
                <br />
                y completamente sin costo
                <br />
                para nuestros clientes
                <br />
                creamos un menú de enlaces
                <br />
                completamente personalizado.
              </span>
            </div>
          </div>
          <div className="w-full max-w-md flex flex-col gap-4 mt-8">
                      {Links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`bg-${link.background} border border-orange-500 hover:border-orange-500 text-white hover:text-orange-600 font-medium py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition`}
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

export default Home;
