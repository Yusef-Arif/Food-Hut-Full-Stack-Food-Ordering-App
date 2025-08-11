import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { getCategorys } from "@/server/db/categorys";
import { getProducts } from "@/server/db/products";
import { getUsers } from "@/server/db/users";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const translation = await getTrans(locale);
  const categories = await getCategorys();
  const products = await getProducts();
  const users = await getUsers();

  const blocksData = [
    {
      title: translation.dashboard.nav.allUsers,
      length: users.length,
    },
    {
      title: translation.dashboard.nav.products,
      length: products.length,
    },
    {
      title: translation.dashboard.nav.categories,
      length: categories.length,
    },
  ];
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-md:p-5">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {blocksData.map((data, index) => (
          <Block key={index} data={data} />
        ))}
      </div>
    </div>
  );
}

const Block = ({ data }: { data: { title: string; length: number } }) => {
  return (
    <div className="bg-primary/50  rounded-xl flex justify-start items-center flex-col p-4">
      <h1 className="text-white text-3xl font-black">{data.title}</h1>
      <div className=" h-full w-full flex justify-center items-center my-7">
        <span className="text-white font-bold text-5xl">{data.length}</span>
      </div>
    </div>
  );
};
