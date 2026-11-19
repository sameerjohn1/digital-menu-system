import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface SelectedOption {
  id: string;
  name: { en: string; ur: string };
  price: number;
}

export interface CartItem {
  id: string;
  foodId: string;
  name: { en: string; ur: string };
  image: string;
  basePrice: number;
  selectedVariant?: SelectedOption;
  selectedAddOns: SelectedOption[];
  unitPrice: number;
  quantity: number;
}

export type OrderType = "dine_in" | "takeaway" | "delivery";

export interface ClientCartState {
  items: CartItem[];
  orderType: OrderType;
  tableNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  specialInstructions: string;
}

interface CartStore {
  carts: Record<string, ClientCartState>;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  getCart: (clientSlug: string) => ClientCartState;
  addItem: (
    clientSlug: string,
    payload: {
      foodId: string;
      name: { en: string; ur: string };
      image: string;
      basePrice: number;
      selectedVariant?: SelectedOption;
      selectedAddOns?: SelectedOption[];
      quantity?: number;
    }
  ) => void;
  updateQuantity: (clientSlug: string, itemId: string, delta: number) => void;
  removeItem: (clientSlug: string, itemId: string) => void;
  setOrderType: (clientSlug: string, orderType: OrderType) => void;
  setTableNumber: (clientSlug: string, tableNumber: string) => void;
  setCustomerInfo: (
    clientSlug: string,
    info: Partial<Pick<ClientCartState, "customerName" | "customerPhone" | "deliveryAddress" | "specialInstructions">>
  ) => void;
  clearCart: (clientSlug: string) => void;
}

const defaultCartState: ClientCartState = {
  items: [],
  orderType: "dine_in",
  tableNumber: "",
  customerName: "",
  customerPhone: "",
  deliveryAddress: "",
  specialInstructions: "",
};

export function generateCartItemId(
  foodId: string,
  variantId?: string,
  addOnIds: string[] = []
): string {
  const sortedAddOns = [...addOnIds].sort().join(",");
  return `${foodId}__v:${variantId || "none"}__a:${sortedAddOns}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      carts: {},
      hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),

      getCart: (clientSlug: string) => {
        return get().carts[clientSlug] || defaultCartState;
      },

      addItem: (clientSlug, payload) => {
        const { carts } = get();
        const currentCart = carts[clientSlug] || { ...defaultCartState };
        const addOns = payload.selectedAddOns || [];
        const addOnsPrice = addOns.reduce((sum, item) => sum + item.price, 0);
        const itemUnitPrice = (payload.selectedVariant ? payload.selectedVariant.price : payload.basePrice) + addOnsPrice;
        const itemId = generateCartItemId(
          payload.foodId,
          payload.selectedVariant?.id,
          addOnOnsIds(addOns)
        );

        const existingItemIndex = currentCart.items.findIndex((item) => item.id === itemId);
        let updatedItems: CartItem[];

        const qtyToAdd = payload.quantity && payload.quantity > 0 ? payload.quantity : 1;

        if (existingItemIndex > -1) {
          updatedItems = currentCart.items.map((item, index) => {
            if (index === existingItemIndex) {
              return { ...item, quantity: item.quantity + qtyToAdd };
            }
            return item;
          });
        } else {
          const newItem: CartItem = {
            id: itemId,
            foodId: payload.foodId,
            name: payload.name,
            image: payload.image,
            basePrice: payload.basePrice,
            selectedVariant: payload.selectedVariant,
            selectedAddOns: addOns,
            unitPrice: itemUnitPrice,
            quantity: qtyToAdd,
          };
          updatedItems = [...currentCart.items, newItem];
        }

        set({
          carts: {
            ...carts,
            [clientSlug]: {
              ...currentCart,
              items: updatedItems,
            },
          },
        });
      },

      updateQuantity: (clientSlug, itemId, delta) => {
        const { carts } = get();
        const currentCart = carts[clientSlug];
        if (!currentCart) return;

        const updatedItems = currentCart.items
          .map((item) => {
            if (item.id === itemId) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[];

        set({
          carts: {
            ...carts,
            [clientSlug]: {
              ...currentCart,
              items: updatedItems,
            },
          },
        });
      },

      removeItem: (clientSlug, itemId) => {
        const { carts } = get();
        const currentCart = carts[clientSlug];
        if (!currentCart) return;

        set({
          carts: {
            ...carts,
            [clientSlug]: {
              ...currentCart,
              items: currentCart.items.filter((item) => item.id !== itemId),
            },
          },
        });
      },

      setOrderType: (clientSlug, orderType) => {
        const { carts } = get();
        const currentCart = carts[clientSlug] || { ...defaultCartState };
        set({
          carts: {
            ...carts,
            [clientSlug]: {
              ...currentCart,
              orderType,
            },
          },
        });
      },

      setTableNumber: (clientSlug, tableNumber) => {
        const { carts } = get();
        const currentCart = carts[clientSlug] || { ...defaultCartState };
        set({
          carts: {
            ...carts,
            [clientSlug]: {
              ...currentCart,
              tableNumber,
            },
          },
        });
      },

      setCustomerInfo: (clientSlug, info) => {
        const { carts } = get();
        const currentCart = carts[clientSlug] || { ...defaultCartState };
        set({
          carts: {
            ...carts,
            [clientSlug]: {
              ...currentCart,
              ...info,
            },
          },
        });
      },

      clearCart: (clientSlug) => {
        const { carts } = get();
        const currentCart = carts[clientSlug];
        if (!currentCart) return;

        set({
          carts: {
            ...carts,
            [clientSlug]: {
              ...currentCart,
              items: [],
              specialInstructions: "",
            },
          },
        });
      },
    }),
    {
      name: "animated_menu_carts",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? window.localStorage : dummyStorage)),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

function addOnOnsIds(addOns: SelectedOption[]): string[] {
  return addOns.map((a) => a.id);
}

const dummyStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export function calculateCartTotals(items: CartItem[], orderType: OrderType) {
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = orderType === "delivery" && subtotal > 0 ? 150 : 0;
  const total = subtotal + deliveryFee;
  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  return { subtotal, deliveryFee, total, count };
}
