import CustomeInput from "@/components/CustomeInput";
import { Button } from "@/components/ui/button";
import { Translations } from "@/interfaces/translations";

function CartForm({ translation }: { translation: Translations }) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white/50 dark:bg-white/10">
      <h1 className="text-3xl font-semibold text-primary">{translation.labels.checkout}</h1>
      <form action="">
        <CustomeInput title={translation.labels.name} placeholder={translation.placeholders.name} />
        <CustomeInput title={translation.fields.streetAddress} placeholder={translation.placeholders.streetAddress} />
        <div className="grid grid-cols-2 gap-4">
          <CustomeInput title={translation.fields.city} placeholder={translation.placeholders.city} />
          <CustomeInput title={translation.fields.postalCode} placeholder={translation.placeholders.postalCode} />
        </div>
        <CustomeInput title={translation.fields.country} placeholder={translation.placeholders.country} />
        <Button type="submit" className="mt-4 w-full">
          {translation.labels.orderNow}
        </Button>
      </form>
    </div>
  );
}

export default CartForm;
