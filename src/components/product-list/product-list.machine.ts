import { assign, createMachine } from 'xstate';
import type { IProduct } from './product-list.types';
import { getProducts as getProductsService } from '@/services/products/getProducts';

enum states {
  loading = 'loading',
  loaded = 'loaded',
}

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

    initial: states.loading,
    context: {
      products: [],
    },

    states: {
      [states.loading]: {
        invoke: {
          src: 'loadProducts',
          onDone: {
            actions: 'setProducts',
            target: states.loaded,
          },
        },
        on: {
          LOADED: {
            target: states.loaded,
          },
        },
      },

      [states.loaded]: {
        on: {
          LOAD_PRODUCTS: {
            target: states.loading,
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
      loadProducts: () => getProductsService(),
    },
  }
);

export { machine, states };
