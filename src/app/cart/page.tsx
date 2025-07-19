import CartItems from "../_components/CartItems";

function page() {
  return (
    <div className="py-25">
      <div className="container">
        <h1 className="text-4xl font-black text-primary">Cart</h1>
        <CartItems />
      </div>
    </div>
  );
}

export default page;
