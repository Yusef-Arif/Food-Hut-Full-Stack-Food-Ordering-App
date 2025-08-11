import CustomeInput from "@/components/CustomeInput";
import { Button } from "@/components/ui/button";

function CartForm() {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white/50 dark:bg-white/10">
      <h1 className="text-3xl font-semibold text-primary">Checkout</h1>
      <form action="">
        <CustomeInput text="phone" />
        <CustomeInput text="street address" />
        <div className="grid grid-cols-2 gap-4">
          <CustomeInput text="city" />
          <CustomeInput text="zip code" />
        </div>
        <CustomeInput text="country" />
        <Button type="submit" className="mt-4 w-full">
          Place Order
        </Button>
      </form>
    </div>
  );
}

export default CartForm;
