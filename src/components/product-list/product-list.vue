<template>
  <table>
    <tr v-for="product in products" :key="product.name">
      <td>{{ product.name }}</td>
      <td>{{ product.price }} DKK</td>
      <td>
        <button
          :disabled="networking"
          @click="addToBasket({ id: product.id, quantity: 1 })"
        >
          Add to basket
        </button>
      </td>
    </tr>
  </table>

  <p>{{ basket }}</p>

  <button @click="loadProducts()">Load more</button>

  <p v-show="networking">Loading products...</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { interpret, type StateValue } from 'xstate';

import { machine, states } from './product-list.machine';
import type { IBasketItem, IProduct } from './product-list.types';

export default defineComponent({
  data() {
    return {
      machine: interpret(machine),
      // Get an initial snapshot of the current context
      machineState: interpret(machine).getSnapshot(),
      currentState: '' as StateValue,
    };
  },

  created() {
    this.machine.start();

    // Update local representation of the context when it changes
    this.machine.onChange((context) => (this.machineState.context = context));

    // Set currentState so we use it in our UI-concerned logic
    this.machine.subscribe(({ value }) => (this.currentState = value));
  },

  beforeUnmount() {
    this.machine.stop();
  },

  computed: {
    products(): IProduct[] {
      return this.machineState.context.products;
    },

    basket(): IBasketItem[] {
      return this.machineState.context.basket;
    },

    networking(): boolean {
      return this.currentState === states.loading;
    },
  },

  methods: {
    loadProducts(): void {
      this.machine.send({ type: 'LOAD_PRODUCTS' });
    },

    addToBasket({ id, quantity }: IBasketItem): void {
      this.machine.send({
        type: 'ADD_TO_BASKET',
        payload: { id, quantity },
      });
    },
  },
});
</script>
