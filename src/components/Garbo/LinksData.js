import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

export const Links = [
   
  {
    title: "Conocé todos nuestros productos!",
    label: "Visitá nuestra Tienda Online, envíos a todo el país.",
    background: "fuchsia-900",
    url: "https://www.garbomoda.com.ar/",
  },
   {
    title: "Dónde estamos...",
    label: "Vicente López 1660, Recoleta, CABA. Ver mapa...",
    background: "red-900",
    url: "https://maps.app.goo.gl/SzpaF9zUmcdMh14Y9",
  },
];

export const Redes = [
    {
        key: "whatsapp",
        img: <FaWhatsapp />,
        url: "https://wa.me/+5491144406653",
    },
    {
        key: "instagram",
        img: <FaInstagram />,
        url: "https://www.instagram.com/garbo.complementos/",
    },
    {
        key: "facebook",
        img: <FaFacebook />,
        url: "https://www.facebook.com/garbo.complementosdemoda",
    },
  ]