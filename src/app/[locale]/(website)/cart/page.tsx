import CartForm from "../_components/CartForm";
import CartItems from "../_components/CartItems";

function page() {
  return (
    <div className="py-25">
      <div className="container">
        <h1 className="text-4xl font-black text-primary">Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <div>
            <CartItems />
          </div>
          <div>
            <CartForm/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
