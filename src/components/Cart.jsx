import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useStateContext } from "../context/StateContext";
import { useEffect, useState, useRef } from "react";

const Cart = () => {
  const {
    cartItems,
    setCartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();
  const [totalPriceInCart, setTotalPriceInCart] = useState(0);
  const [showEdit, setShowEdit] = useState(false);

  const generateOrderMessage = (cartItems) => {
    let message = "";
    cartItems.forEach((item) => {
      message += `${item.name}\nColor: ${item.color}\nSize: ${item.size}\nPrice: ${item.discPrice}\nQuantity: ${item.quantity}\n\n`;
    });
    return message;
  };

  // Looping through the cartItems to get the total quantities
  const getTotalQuantitiesInCart = () => {
    let q = 0;
    cartItems.map((item) => {
      if (item.hasOwnProperty("quantity")) {
        q += item.quantity;
      }
    });
    return q;
  };
  const totalQuantitiesInCart = getTotalQuantitiesInCart();

  useEffect(() => {
    const getTotalPriceInCart = () => {
      let totalPrice = 0;
      for (const item of cartItems) {
        if (item.hasOwnProperty("discPrice")) {
          totalPrice += item.discPrice * item.quantity;
        }
      }
      setTotalPriceInCart(totalPrice);
    };
    getTotalPriceInCart();
  }, [cartItems]);

  const handleColorChange = (itemId, newColor) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          color: newColor,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  const handleSizeChange = (itemId, newSize) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          size: newSize,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  const orderMessage = generateOrderMessage(cartItems); // Pass cartItems to the function here
  const encoded_url = encodeURIComponent(orderMessage);
  const whatsapp_url = `https://wa.me/${'233240894565'}/?text=${encoded_url}`; 

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <button type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
        </SheetTrigger>
        <SheetContent side="top" className="h-full overflow-scroll">
          <SheetTitle>
            <div className="flex gap-2 mb-2">
              <span>Your Shopping Bag</span>
              <span className=""> ({totalQuantitiesInCart} items)</span>
            </div>
          </SheetTitle>
          {/* <div></div> */}
          {cartItems.length < 1 && (
            <div>
              <h3>Your shopping bag is empty</h3>
              {/* <Link href="/">Continue Shopping</Link> */}
            </div>
          )}
          <div className="flex flex-col gap-4">
            {cartItems.length >= 1 &&
              cartItems.map((item) => (
                <div className="flex gap-4 sm:gap-8 border-b pb-4" key={item.id}>
                  <div>
                    <img
                      src={item.image}
                      className="w-[130px] h-auto border object-contain"
                    />
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex flex-col justify-between gap-1">
                      <div className="flex flex-col gap-[0.4px]">
                        <h5 className="font-semibold">{item.name}</h5>
                        <h4>Price: GHC {item.discPrice}</h4>

                        {item.color ? <p>Color: {item.color}</p> : <p>Color: No color</p> }
                        {item.size ?<p>Size: {item.size}</p>: <p>size: No size</p> }

                        <div className="flex items-center gap-3">
                          <span>Quantity: </span>
                          <span className="flex items-center">
                            <span
                              className=""
                              onClick={() =>
                                toggleCartItemQuantity(item.id, "dec")
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M18 12H6"
                                />
                              </svg>
                            </span>
                            <span className="mx-3">{item.quantity}</span>
                            <span
                              className=""
                              onClick={() =>
                                toggleCartItemQuantity(item.id, "inc")
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 6v12m6-6H6"
                                />
                              </svg>
                            </span>
                          </span>
                        </div>
                      </div>
                      {showEdit && (
                        <div className="shadow-lg">
                          <div>
                            <label htmlFor={`color-${item.id}`} className="">
                              Change color
                            </label>
                            <input
                              className="ring-1"
                              type="text"
                              id={`color-${item.id}`}
                              value={item.color}
                              onChange={(e) =>
                                handleColorChange(item.id, e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label htmlFor={`size-${item.id}`}>
                              Change Size
                            </label>
                            <input
                              className="ring-1"
                              type="text"
                              id={`size-${item.id}`}
                              value={item.size}
                              onChange={(e) =>
                                handleSizeChange(item.id, e.target.value)
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-between items-center">
                      <button
                        type="button"
                        className="underline"
                        onClick={() => onRemove(item)}
                      >
                        Remove
                      </button>
                      {<a href={`/products/${item.id}`} className="underline">
                        Edit
                      </a>}
                      {/* <button
                        type="button"
                        className="underline"
                        onClick={() => setShowEdit(!showEdit)}
                      >
                        Edit
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {cartItems.length >= 1 && (
            <div className="cart-bottom">
              <div className="border-b mb-3">
                <h3 className="font-semibold py-2">Total: GHC{totalPriceInCart}</h3>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="none" className='w-full px-0'>
                    <span className="bg-black text-white py-2 w-full">
                      Place Order
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Order Summary</DialogTitle>
                    
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id}>
                        <div className="border-b pb-4">
                          <p className="mb-1">{item.name}</p>
                          {/* Color: {item.color} <br /> */}
                          {item.color ? <p>Color: {item.color}</p> : '' }
                          {item.size ?<p>Size: {item.size}</p>: '' }
                          {/* size: {item.size} <br /> */}
                          Price: {item.discPrice} <br />
                          <span className="">Quantity: {item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                    <div className="flex flex-col w-full">
                      <p className="font-semibold">Total Quantity: {totalQuantitiesInCart}</p>
                      <p className="font-semibold mb-6">Total Price: GHC {totalPriceInCart}</p>
                      <a href={whatsapp_url} target="_blank" className="bg-primary py-2 text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 mb-2">
                        Proceed to WhatsApp
                      </a>
                    <DialogDescription className="text-center">
                      <span>We process orders and payments through WhatsApp</span>
                    </DialogDescription>
                    </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Cart;
