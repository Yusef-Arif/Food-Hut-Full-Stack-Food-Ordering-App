import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { currencyFormatter } from "@/lib/formatter";
import { productWithRelations } from "@/lib/types";
import MainTable from "@/components/table";
import Actions from "@/components/table/actions";
import { Badge } from "@/components/ui/badge";
import { Translations } from "@/interfaces/translations";
import { Category } from "@prisma/client";
import PagenationButtons from "@/components/pagenation-buttons";

const ProductsTable = ({
  products,
  translation,
  categories,
  page,
  currentPage,
  pagesCount,
}: {
  products: productWithRelations[];
  translation: Translations;
  categories: Category[];
  page: number;
  currentPage: number;
  pagesCount: number;
}) => {
  const cols = [
    "Order",
    "Image",
    "Title",
    "Description",
    "Base Price",
    "Category",
    "Created At",
    "Updated At",
  ];

  return (
    <div>
      <MainTable cols={cols}>
        {products.length === 0 ? (
          <TableRow>
            <p className="text-center my-5 w-full">there is no products</p>
          </TableRow>
        ) : (
          products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="text-center">{product.order}</TableCell>
              <TableCell>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {product.description.slice(0, 20)}...
              </TableCell>
              <TableCell>{currencyFormatter(product.basePrice)}</TableCell>
              <TableCell>
                <Badge>{product.Category.name}</Badge>
              </TableCell>
              <TableCell>
                {new Date(product.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(product.updatedAt).toLocaleString()}
              </TableCell>
              <Actions
                data={product}
                translations={translation}
                slug={undefined}
                categories={categories}
              />
            </TableRow>
          ))
        )}
      </MainTable>
      {pagesCount > 0 && (
        <PagenationButtons
          pagesCount={pagesCount ?? 0}
          page={page}
          currentPage={currentPage ?? 0}
        />
      )}
    </div>
  );
};

export default ProductsTable;
