import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaYoutube
} from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

export const Links = [
  {
    title: "Servicio Técnico de Celulares",
    label: "Android y iPhone",
    background: "cyan-900",
    url: "https://wa.me/5493517351703",
  },
  {
    title: "Todo para el Técnico",
    label: "Repuestos, máquinas y herramientas.",
    background: "amber-600",
    url: "https://www.one-service.com.ar/login.php",
  },
 
  {
    title: "Tienda online",
    label: "Tecnología al alcance de un clic",
    background: "fuchsia-900",
    url: "https://www.oneservice.ar",
  },
   {
    title: "Dónde estamos...",
    label: "Santa Rosa 250, Córdoba centro. Ver mapa...",
    background: "red-900",
    url: "https://maps.app.goo.gl/DY2SmhyFgGdu4R4M9",
  },
];

export const Redes = [
    {
        key: "whatsapp",
        img: <FaWhatsapp />,
        url: "https://wa.me/+5493517351703",
    },
    {
        key: "instagram",
        img: <FaInstagram />,
        url: "https://www.instagram.com/oneservice.srl",
    },
    {
      key: "tiktok",
      img: <FaTiktok />,
      url: "https://www.tiktok.com/@oneservice.srl",
    },
   
    {
        key: "facebook",
        img: <FaFacebook />,
        url: "https://www.facebook.com/oneservice.srl",
    },
  ]