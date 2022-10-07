<template>
  <div v-for="product in products" :key="product.name">
    <p>{{ product.name }} | Price: {{ product.price }} DKK</p>
  </div>
  <p v-show="networking">Loading products...</p>
  <button @click="machine.send({ type: 'LOAD_PRODUCTS' })">Load more</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { interpret } from 'xstate';

import { machine } from './product-list.machine';
import type { IProduct } from './product-list.types';

export default defineComponent({
  data() {
    return {
      machine: interpret(machine),
      // Get an initial snapshot of the current context
      machineState: interpret(machine).getSnapshot(),
      networking: false,
    };
  },

  created() {
    this.machine.start();
    // Update local representation of the context when it changes
    this.machine.onChange((context) => (this.machineState.context = context));
  },

  computed: {
    products(): IProduct[] {
      return this.machineState.context.products;
    },
  },
});
</script>
