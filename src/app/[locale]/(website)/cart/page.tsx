import getTrans from "@/lib/translation";
import CartForm from "../_components/CartForm";
import CartItems from "../_components/CartItems";
import { Locale } from "@/i18n.config";

async function page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const translation = await getTrans(locale);
  return (
    <div className="py-25 max-md:p-2 max-md:py-25">
      <div className="container">
        <h1 className="text-4xl font-black text-primary">{translation.labels.cart}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <div>
            <CartItems translation={translation} />
          </div>
          <div>
            <CartForm translation={translation} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
