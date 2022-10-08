// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.(machine).loading:invocation[0]': {
      type: 'done.invoke.(machine).loading:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    loadProducts: 'done.invoke.(machine).loading:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    addToBasket: 'ADD_TO_BASKET';
    setProducts: 'done.invoke.(machine).loading:invocation[0]';
  };
  eventsCausingServices: {
    loadProducts: 'LOAD_PRODUCTS' | 'xstate.init';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'loaded' | 'loading';
  tags: never;
}
