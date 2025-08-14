import { getProducts } from "@/server/db/products";
import DownApp from "./_components/DownApp";
import Hero from "./_components/Hero";
import Menu from "./_components/menu";
import Service from "./_components/Service";
import SpecialOffers from "./_components/SpecialOffers";

export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <Hero />
      <section className="mb-24">
        <SpecialOffers products={products} />
      </section>
      <section className="my-24">
        <Service />
      </section>
      <section className="mt-24">
        <Menu />
      </section>
      <DownApp />
    </>
  );
}
