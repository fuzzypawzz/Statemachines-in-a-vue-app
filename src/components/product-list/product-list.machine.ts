import { assign, createMachine } from 'xstate';
import type { IProduct, IBasketItem } from './product-list.types';
import { getProducts as getProductsService } from '@/services/products/getProducts';

enum states {
  loading = 'loading',
  loaded = 'loaded',
}

const machine = createMachine(
  {
    tsTypes: {} as import('./product-list.machine.typegen').Typegen0,
    predictableActionArguments: true,
    schema: {
      context: {} as {
        products: IProduct[];
        basket: IBasketItem[];
      },
      events: {} as
        | { type: 'LOAD_PRODUCTS' }
        | { type: 'LOADED' }
        | { type: 'ADD_TO_BASKET'; payload: IBasketItem },
      services: {} as {
        loadProducts: {
          data: IProduct[];
        };
      },
    },

    initial: states.loading,
    context: {
      products: [],
      basket: [],
    },

    states: {
      [states.loading]: {
        invoke: {
          src: 'loadProducts',
          onDone: {
            actions: ['setProducts'],
            target: states.loaded,
          },
        },
      },

      [states.loaded]: {
        on: {
          LOAD_PRODUCTS: {
            target: states.loading,
          },
          ADD_TO_BASKET: {
            actions: ['addToBasket'],
          },
        },
      },
    },
  },
  {
    actions: {
      setProducts: assign({
        products: (context, value) => [...context.products, ...value.data],
      }),

      addToBasket: assign({
        // TODO: Refactor this to become much more simple
        basket: (context, { payload }) => {
          const productExistsInBasket = context.basket.find(
            ({ id }) => id === payload.id
          );

          if (!productExistsInBasket)
            return [
              ...context.basket,
              {
                id: payload.id,
                quantity: payload.quantity,
              },
            ];

          return context.basket.map((basketItem) => {
            if (basketItem.id !== payload.id) return basketItem;

            return {
              ...basketItem,
              quantity: basketItem.quantity + payload.quantity,
            };
          });
        },
      }),
    },

    services: {
      loadProducts: () => getProductsService(),
    },
  }
);

export { machine, states };
