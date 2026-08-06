import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaMailBulk
} from "react-icons/fa";

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
        url: "https://wa.me/+529841003368",
    },
    {
        key: "instagram",
        img: <FaInstagram />,
        url: "https://www.instagram.com/avit_viajes",
    },
  
    {
        key: "facebook",
        img: <FaFacebook />,
        url: "https://www.facebook.com/avitviajes",
    },
     {
        key: "email",
        img: <FaMailBulk />,
        url: "mailto:veronica@avitviajes.com",
    },
  ]