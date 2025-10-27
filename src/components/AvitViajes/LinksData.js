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
    title: "Todos nuestros SERVICIOS",
    label: "mirá todo lo que podemos hacer por tu empresa.",
    background: "cyan-900",
    url: "https://www.boostup-marketingdigital.com/",
  },
  {
    title: "Lo último en IA",
    label: "Contenido realista, Bots de atención y CRM integrado.",
    background: "amber-600",
    url: "https://www.boostup-marketingdigital.com/crm-ia",
  },
  {
    title: "Diseño y Desarrollo WEB",
    label: "Sitios pensados para que te encuentren, y compren.",
    background: "red-900",
    url: "https://www.boostup-marketingdigital.com/webs-y-tiendas",
  },
  {
    title: "Closers de VENTAS",
    label: "Convertimos tus oportunidades en clientes reales.",
    background: "fuchsia-900",
    url: "https://www.boostup-marketingdigital.com/closer-de-ventas",
  },
];

export const Redes = [
    {
        key: "whatsapp",
        img: <FaWhatsapp />,
        url: "https://wa.me/+5493515901398",
    },
    {
        key: "instagram",
        img: <FaInstagram />,
        url: "https://www.instagram.com/boostup.mkdigital",
    },
    {
      key: "tiktok",
      img: <FaTiktok />,
      url: "https://www.tiktok.com/@boostup.mktdigital",
    },
    {
      key: "youtube",
      img: <FaYoutube />,
      url: "https://www.youtube.com/channel/UCHA5LQ3gPxCz-3rzMtxGc8Q",
    },
    {
        key: "facebook",
        img: <FaFacebook />,
        url: "https://www.facebook.com/boostup.mkdigital",
    },
  ]