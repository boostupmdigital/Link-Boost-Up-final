import React from "react";
import { Links, Redes } from "./LinksData.js";
import Logo from "../../assets/Logs/nuevo-logo-2025-fondo-negro-icono.png";

const LinktreeJefa = () => {
  return (
    <React.Fragment>
      <div className="w-screen">
        <div className="min-h-screen flex flex-col items-center justify-center bg-purple-950 px-6 py-6 text-center">
          <div className="w-24 h-24 rounded-full p-3 bg-black/20 shadow-lg flex items-center justify-center">
            <img src={Logo} alt="Jefa Web Logo" className="" />
          </div>
          <h1 className="text-2xl font-bold text-gray-100 mb-1 mt-4">
            J.E.F.A. Web
          </h1>
          <p className="text-md text-pink-500 mt-2 mb-6">
            Diseño Web + Recursos Digitales
            <br />
            para Mujeres que Aprenden y Emprenden
          </p>

          <div className="flex flex-row gap-4 mb-4">
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
                className={`bg-${link.background} border border-gray-300 hover:border-pink-500 text-white hover:text-pink-600 font-medium py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition`}
              >
                <h4 className="font-bold text-lg">{link.title}</h4>
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-sm text-pink-300 mt-6">
            Si deseas un MENÚ DE ENLACES como éste  
            <br />
            <a href="https://jefa-web.com.ar/contactame" className="underline">
            CONTACTAME
            </a>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LinktreeJefa;
