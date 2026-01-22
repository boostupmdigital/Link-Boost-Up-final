import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";


export const Links = [
  {
    title: "Dónde estamos",
    label: "Ubicanos en GoogleMaps",
    background: "cyan-900",
    url: "https://maps.app.goo.gl/LhZwNsDqqcGSEL3J8",
  },
  {
    title: "Nuestra Carta",
    label: "Mirá nuestro menú con precios actualizados",
    background: "amber-600",
    url: "https://docs.google.com/presentation/d/1dtdqTY8tEvQWEYkGlx7h_ZugSIfYaZk0lUcJBlV6kak/edit?usp=sharing",
  },
  {
    title: "PEDIDOS YA",
    label: "Hacenos tu pedido ahora!",
    background: "red-900",
    url: "https://www.pedidosya.com.ar/restaurantes/cordoba/el-vergel-cofico-34cc9899-5440-4ce8-947a-a21a8fbb077a-menu",
  },
 
];

export const Redes = [
    {
        key: "whatsapp",
        img: <FaWhatsapp />,
        url: "https://wa.me/+5493512164250",
    },
    {
        key: "instagram",
        img: <FaInstagram />,
        url: "https://www.instagram.com/elvergel.laestacion",
    },
       
    {
        key: "facebook",
        img: <FaFacebook />,
        url: "https://www.facebook.com/elvergel.laestacion",
    },
  ]