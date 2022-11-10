import bitcoin from "./public/images/bitcoin.png";
import eth from "./public/images/ethereum.png";
import ltc from "./public/images/litecoin.png";
import omg from "./public/images/omg-network.png";
import usdc from "./public/images/usd-coin.png";
import bch from "./public/images/bitcoin-cash.png";
import xlm from "./public/images/stellar-lumens.png";
import xrp from "./public/images/ripple.png";
import dai from "./public/images/dai.png";
import doge from "./public/images/doge-coin.png";

export const currencies = [
  {
    id: 0,
    title: "Bitcoin",
    subtitle: "BTC",
    descriptor: 50000,
    image: bitcoin,
  },
  {
    id: 1,
    title: "Ethereum",
    subtitle: "ETH",
    descriptor: 3000,
    image: eth,
  },
  {
    id: 2,
    title: "Dogecoin",
    subtitle: "Doge",
    descriptor: 3000,
    image: doge,
  },
  {
    id: 3,
    title: "Bitcoin Cash",
    subtitle: "BCH",
    descriptor: 3000,
    image: bch,
  },
  {
    id: 4,
    title: "Dai",
    subtitle: "Dai",
    descriptor: 3000,
    image: dai,
  },
  {
    id: 5,
    title: "Litecoin",
    subtitle: "LTC",
    descriptor: 3000,
    image: ltc,
  },
  {
    id: 6,
    title: "OMG Network",
    subtitle: "OMG",
    descriptor: 3000,
    image: omg,
  },
  {
    id: 7,
    title: "United States Dollar Coin",
    subtitle: "USDC",
    descriptor: 3000,
    image: usdc,
  },
  {
    id: 8,
    title: "Stellar Lumens",
    subtitle: "XLM",
    descriptor: 3000,
    image: xlm,
  },
  {
    id: 9,
    title: "Ripple",
    subtitle: "XRP",
    descriptor: 3000,
    image: xrp,
  },
];
