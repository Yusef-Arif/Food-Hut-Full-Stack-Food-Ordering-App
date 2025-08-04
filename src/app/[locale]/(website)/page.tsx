import { getProducts } from "@/server/db/products";
import DownApp from "./_components/DownApp";
import Hero from "./_components/Hero";
import Menu from "./_components/Menu";
import Service from "./_components/Service";
import SpecialOffers from "./_components/SpecialOffers";


export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <Hero />
      <SpecialOffers products={products} />
      <Service />
      <Menu products={products} />
      <DownApp />
    </>
  );
}
