import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

export const Links = [
   
  {
    title: "Conocé nuestros servicios",
    label: "Energía renovable al alcance de un clic",
    background: "fuchsia-900",
    url: "https://www.solenar.com/",
  },
   {
    title: "Dónde estamos...",
    label: "Av. Rafael Nuñez 3434, Córdoba. Ver mapa...",
    background: "red-900",
    url: "https://maps.app.goo.gl/G71DGuQxZX9HvVjC7",
  },
];

export const Redes = [
    {
        key: "whatsapp",
        img: <FaWhatsapp />,
        url: "https://wa.me/+5493517860774",
    },
    {
        key: "instagram",
        img: <FaInstagram />,
        url: "instagram.com/solenar.renovables/",
    },
    {
        key: "facebook",
        img: <FaFacebook />,
        url: "https://www.facebook.com/solenar.renovables/",
    },
  ]