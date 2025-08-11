
import PagenationButtons from "@/components/pagenation-buttons";
import ProductCard from "@/components/ProductCard";
import { Translations } from "@/interfaces/translations";
import { productWithRelations } from "@/lib/types";

const Products = ({
  products,
  translation,
  page,
  pagesCount,
  currentPage,
}: {
  products: productWithRelations[] | undefined;
  translation: Translations;
  page: number;
  pagesCount: number | undefined;
  currentPage: number | undefined;
}) => {
  return (
    <div className="w-full">
      {products && products?.length > 0 ? (
        <>
          <div className=" lg:grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 justify-items-center">
            {products?.map((offer) => (
              <div key={offer.id}>
                <ProductCard product={offer} translation={translation} />
              </div>
            ))}
          </div>
          <PagenationButtons
            pagesCount={pagesCount ?? 0}
            page={page}
            currentPage={currentPage ?? 0}
          />
        </>
      ) : (
        <div className="h-full w-full flex justify-center items-center text-center">
          <p>No Products</p>
        </div>
      )}
    </div>
  );
};

export default Products;
