import { getProducts } from "@/server/db/products";
import DownApp from "./_components/DownApp";
import Hero from "./_components/Hero";
import Menu from "./_components/menu";
import Service from "./_components/Service";
import SpecialOffers from "./_components/SpecialOffers";
// import { db } from "@/lib/prisma";
// import { faker } from "@faker-js/faker";

export default async function Home() {
  const products = await getProducts();
  // await db.product.createMany({
  //   data: Array.from({ length: 100 }, (_, i) => ({
  //     title: faker.food.meat(),
  //     description: faker.food.description(),
  //     image:
  //       "https://natashaskitchen.com/wp-content/uploads/2020/03/Pan-Seared-Steak-4-1024x1536.jpg",
  //     basePrice: faker.number.int({ min: 10, max: 100 }),
  //     order: i + 1,
  //     categoryId: "aef2cd29-550e-441b-894a-1740d6902e4e",
  //   })),
  // });
  // const createUser = await db.product.deleteMany({
  //   where: {
  //     order: {
  //       gt: 30,
  //     },
  //   },
  // });

  // const createUser = await db.user.createMany({
  //   data: Array.from({ length: 20 }, () => ({
  //     name: faker.internet.username(),
  //     email: faker.internet.email(),
  //     password: faker.internet.password(),
  //     image: faker.image.avatar(),
  //   }))
  // });
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
