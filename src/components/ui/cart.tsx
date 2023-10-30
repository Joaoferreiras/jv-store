import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { cartContext } from "@/providers/cart";
import CartItem from "./cartItems";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";


const Cart = () => {
  const { products, subTotal, total, totalDiscount } = useContext(cartContext);

  const handleFinishPurchaseClick = async ()=>{
   const checkout = await createCheckout(products)

   const stripe = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
  )
    
stripe?.redirectToCheckout({
  sessionId: checkout.id
})
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex flex-col gap-5 h-full max-h-full overflow-hidden">
        <ScrollArea className="h-full">
        <div className="flex flex-col h-full gap-8">
        {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={computeProductTotalPrice(product as any) as any}
                />
              ))
            ) : (
              <p className="text-center font-semibold">Carrinho vazio</p>
            )}
        </div>
        </ScrollArea>
      </div>

      <div className="flex flex-col gap-3">
        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>Subtotal</p>
          <p>R$ {subTotal.toFixed(2)}</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>Entrega</p>
          <p>GRÁTIS</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>Descontos</p>
          <p> - R$ {totalDiscount.toFixed(2)}</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-sm font-bold">
          <p>Total</p>
          <p>R$ {total.toFixed(2)}</p>
        </div>

        <Button className="uppercase font-bold mt-7" onClick={handleFinishPurchaseClick}>Finalizar compra</Button>
      </div>
    </div>
  );
};

export default Cart;
