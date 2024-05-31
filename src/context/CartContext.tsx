import { ReactNode, createContext, useContext, useState } from "react";
import uuid from "react-uuid";

export type CartProviderProps = {
  children: ReactNode;
};

export type ICartItem = {
  cartId: string;
  itemId: string;
  quantity: number;
  name?: string;
  price?: string;
  imageUrl?: string;
}

export type CartContext = {
  getItemQuantity: (id: string) => number;
  increaseItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  cartItems: ICartItem[];
  cartQuantity: number;
}

const CartContext = createContext({} as CartContext);

export function useCart() {
  return useContext(CartContext);
};

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const cartQuantity = cartItems.reduce((quantity, item) => 
    item.quantity + quantity,
    0
  );

  const getItemQuantity = (id: string) => cartItems.find(item => item.cartId === id)?.quantity || 0;

  const increaseItemQuantity = (id: string) => {
    setCartItems(currItems => {
      if (currItems.find(item => item.cartId === id) == null) {
        return [...currItems, { itemId: id, cartId: uuid(), quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.cartId === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseItemQuantity = (id: string) => {
    setCartItems(currItems => {
      if (currItems.find(item => item.cartId === id)?.quantity === 1) {
        return currItems.filter(item => item.cartId !== id);
      } else {
        return currItems.map(item => {
          if (item.cartId === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item;
          }
        });
      }
    });
  }
  
  const removeFromCart = (id: string) => {
    setCartItems(currItems => {
      return currItems.filter(item => item.cartId !== id);
    });
  }

  return (
    <CartContext.Provider value={{
      getItemQuantity,
      increaseItemQuantity,
      decreaseItemQuantity,
      removeFromCart,
      cartItems,
      cartQuantity
    }}>
      {children}
    </CartContext.Provider>
  )
}