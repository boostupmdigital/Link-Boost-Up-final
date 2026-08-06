import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

export const Links = [
   
  {
    title: "Internet de Alta Velocidad",
    label: "Conocé nuestros Servicios y Zonas",
    background: "fuchsia-900",
    url: "https://www.atos.com.ar/",
  },
   {
    title: "Medios de Pago",
    label: "También disponible débito automático!",
    background: "red-900",
    url: "https://www.atos.com.ar/medios-de-pago",
  },
   {
    title: "Autogestión",
    label: "Si ya sos cliente, podes gestionar aquí tu cuenta.",
    background: "red-900",
    url: "https://interatos.wispro.co/portal/sign_in?locale=es",
  },
   {
    title: "Ayuda y Soporte",
    label: "Si ya sos cliente, te ayudamos.",
    background: "red-900",
    url: "https://www.atos.com.ar/ayuda-soporte",
  },
];

export const Redes = [
    {
        key: "whatsapp",
        img: <FaWhatsapp />,
        url: "https://wa.me/+5493517011000",
    },
    {
        key: "instagram",
        img: <FaInstagram />,
        url: "https://www.instagram.com/interatos_internet",
    },
    {
        key: "facebook",
        img: <FaFacebook />,
        url: "https://www.facebook.com/interatos.internet",
    },
  ]