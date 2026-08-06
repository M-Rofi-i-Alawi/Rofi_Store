import seblakOriginal from '../assets/images/seblak_original.png';
import seblakCeker from '../assets/images/seblak_ceker.png';
import seblakBakso from '../assets/images/seblak_bakso.png';
import miePedas from '../assets/images/mie_pedas.png';
import esTeh from '../assets/images/es_teh.png';
import thaiTea from '../assets/images/thai_tea.png';
import matcha from '../assets/images/matcha.png';
import ayamBakar from '../assets/images/ayam_bakar.png';
import bebekKremes from '../assets/images/bebek_kremes.png';
import risolMayo from '../assets/images/risol_mayo.png';

export const menuItems = [
  {
    id: 1,
    name: "Seblak Original",
    category: "makanan",
    price: 15000,
    oldPrice: 18000,
    rating: 4.9,
    badge: "Best Seller",
    badgeType: "promo",
    image: seblakOriginal,
    desc: "Seblak rasa original khas Bandung dengan kuah kencur gurih pedas nagih, kerupuk kenyal, telor, dan topping sosis."
  },
  {
    id: 2,
    name: "Seblak Ceker",
    category: "makanan",
    price: 18000,
    oldPrice: 22000,
    rating: 4.9,
    badge: "Favorit",
    badgeType: "",
    image: seblakCeker,
    desc: "Seblak pedas berlimpah dengan ceker ayam empuk lezat yang bumbunya meresap sampai ke tulang."
  },
  {
    id: 3,
    name: "Seblak Bakso",
    category: "makanan",
    price: 18000,
    oldPrice: null,
    rating: 4.8,
    badge: "Populer",
    badgeType: "",
    image: seblakBakso,
    desc: "Seblak kuah kencur pedas lengkap dengan irisan bakso sapi kenyal gurih dan kerupuk khas Dapur Rofi."
  },
  {
    id: 4,
    name: "Mie Pedas",
    category: "makanan",
    price: 16000,
    oldPrice: 20000,
    rating: 4.9,
    badge: "Pedas Nagih!",
    badgeType: "promo",
    image: miePedas,
    desc: "Mie goreng pedas gurih diracik dengan bumbu rempah rahasia, taburan pangsit renyah, dan telor ceplok."
  },
  {
    id: 5,
    name: "Es Teh",
    category: "minuman",
    price: 5000,
    oldPrice: null,
    rating: 5.0,
    badge: "Segar!",
    badgeType: "",
    image: esTeh,
    desc: "Es teh manis harum segar khas racikan daun teh tubruk pilihan yang pas melepas dahaga."
  },
  {
    id: 6,
    name: "Thai Tea",
    category: "minuman",
    price: 12000,
    oldPrice: 15000,
    rating: 4.8,
    badge: "Best Drink",
    badgeType: "",
    image: thaiTea,
    desc: "Minuman Thai Milk Tea manis khas Thailand dengan rasa teh otentik yang creamy dan kaya rasa."
  },
  {
    id: 7,
    name: "Matcha",
    category: "minuman",
    price: 14000,
    oldPrice: 17000,
    rating: 4.9,
    badge: "Favorit",
    badgeType: "",
    image: matcha,
    desc: "Iced Green Tea Matcha Premium yang harum diseduh dengan susu segar creamy super nikmat."
  },
  {
    id: 8,
    name: "Ayam Bakar Madu Spesial",
    category: "makanan",
    price: 28000,
    oldPrice: 32000,
    rating: 4.9,
    badge: "Best Seller",
    badgeType: "",
    image: ayamBakar,
    desc: "Ayam bakar pilihan diungkep rempah tradisional dengan olesan madu murni & sambal terasi lezat."
  },
  {
    id: 9,
    name: "Bebek Goreng Kremes",
    category: "makanan",
    price: 35000,
    oldPrice: null,
    rating: 4.9,
    badge: "Spesial",
    badgeType: "",
    image: bebekKremes,
    desc: "Bebek gurih empuk dengan kremesan renyah berlimpah dan sambal ijo pedas mantap."
  },
  {
    id: 10,
    name: "Risol Mayo Lumer (Isi 5)",
    category: "camilan",
    price: 18000,
    oldPrice: 22000,
    rating: 4.8,
    badge: "Camilan Hits",
    badgeType: "",
    image: risolMayo,
    desc: "Risoles renyah dengan isian smoked beef, telur, dan racikan mayo creamy yang lumer di mulut."
  }
];

export const MERCHANT_WA_NUMBER = "6287812822400";
