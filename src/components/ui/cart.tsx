import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { cartContext } from "@/providers/cart";
import CartItem from "./cartItems";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "@radix-ui/react-separator";

const Cart = () => {
  const { products, subTotal, total, totalDiscount } = useContext(cartContext);

  return (
    <div className="flex flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex flex-col gap-5">
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

<div className="flex flex-col gap-3">
  <Separator/>

<div className="flex items-center justify-between text-xs">
  <p>Subtotal</p>
  <p>R$ {subTotal.toFixed(2)}</p>
</div>

<Separator/>

<div className="flex items-center justify-between text-xs">
  <p>Entrega</p>
  <p>GRÁTIS</p>
</div>

<Separator/>

<div className="flex items-center justify-between text-xs">
  <p>Descontos</p>
  <p> - R$ {totalDiscount.toFixed(2)}</p>
</div>

<Separator/>

<div className="flex items-center justify-between text-sm font-bold">
  <p>Total</p>
  <p>R$ {total.toFixed(2)}</p>
</div>

</div>

    </div>
  );
};

export default Cart;
