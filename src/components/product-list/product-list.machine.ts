import { assign, createMachine } from 'xstate';
import type { IProduct } from './product-list.types';

const machine = createMachine(
  {
    tsTypes: {} as import('./product-list.machine.typegen').Typegen0,
    schema: {
      context: {} as { products: IProduct[] },
      events: {} as { type: 'LOAD_PRODUCTS' } | { type: 'LOADED' },
      services: {} as {
        loadProducts: {
          data: IProduct[];
        };
      },
    },
    initial: 'loading',
    context: {
      products: [],
    },
    states: {
      loading: {
        invoke: {
          src: 'loadProducts',
          onDone: {
            actions: 'setProducts',
            target: 'loaded',
          },
        },
        on: {
          LOADED: {
            target: 'loaded',
          },
        },
      },
      loaded: {
        on: {
          LOAD_PRODUCTS: {
            target: 'loading',
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
    },
    services: {
      loadProducts: async (): Promise<IProduct[]> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                name: 'Blackberry X10',
                price: '3995,00',
              },
              {
                name: 'iPhone 13 Pro Max',
                price: '10.000,00',
              },
              {
                name: 'Google Pixel 2',
                price: '7.000,00',
              },
            ]);
          }, 1000);
        });
      },
    },
  }
);

export { machine };
