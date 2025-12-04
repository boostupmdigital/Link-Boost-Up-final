import React, { useState } from "react";
import { Redes } from "./LinksData";
import Logo from "../../assets/Logs/nuevo-logo-2025-fondo-negro-icono.png";

const Contact = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    fetch("https://formspree.io/f/xanjonjb", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setSuccess(true);
          form.reset();
        } else {
          alert("Error al enviar el formulario.");
        }
      })
      .catch((error) => {
        console.error("Error de red o servidor", error);
        alert("Hubo un problema al conectar con el servidor.");
      });
  };

  return (
    <React.Fragment>
      {/*----- Start Contact -----*/}

      <div className="w-screen">
        <div className="min-h-screen flex flex-col items-center justify-center bg-purple-950 px-6 py-6 text-center">
          <div className="w-24 h-24 rounded-full p-3 bg-black/20 shadow-lg flex items-center justify-center">
            <img src={Logo} alt="Jefa Web Logo" className="" />
          </div>
          <h1 className="text-2xl font-bold text-gray-100 mb-1 mt-4">
            J.E.F.A. Web
          </h1>
          <p className="text-md text-pink-500 mt-2 mb-4">
            Diseño Web + Recursos Digitales
            <br />
            para Mujeres que Aprenden y Emprenden
          </p>
          <p className="fontCaveat text-3xl text-pink-300 mt-2 mb-1">
            Personalizo tu Menú de Enlaces
          </p>

          {/* Formulario de contacto */}

          <div className="mt-1 p-5 mx-auto  w-full text-white font-semibold text-sm max-w-md">
            {success ? (
              <p className="text-cyan-200 font-semibold text-lg text-center">
                ¡Gracias por tu mensaje! Te responderé pronto.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <h4 className="text-slate-100 flex justify-center mb-4 text-xl">
                  CONTACTAME
                </h4>
                <div className="w-full flex flex-col gap-4">
                  <label className="text-left">
                    Nombre:
                    <input
                      type="text"
                      name="name"
                      className="border-2 border-white bg-transparent p-1 mt-1 w-full"
                      required
                    />
                  </label>

                  <label className="text-left">
                    Email:
                    <input
                      type="email"
                      name="email"
                      className="border-2 border-white bg-transparent p-1 mt-1 w-full"
                      required
                    />
                  </label>

                  <label className="text-left">
                    Mensaje:
                    <textarea
                      name="message"
                      className="border-2 border-white bg-transparent p-1 mt-1 h-28 resize-none w-full"
                      required
                    />
                  </label>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-white text-black font-bold py-2 px-4 mt-2 "
                  >
                    Enviar
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Fin formulario */}
          <div className="flex flex-row gap-4 mt-8">
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
        </div>
      </div>

      {/*----- End Contact -----*/}
    </React.Fragment>
  );
};

export default Contact;
