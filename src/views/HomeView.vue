<template>
  <div id="app">
    <header>
      <h2>My fabulous crypto market analyzer</h2>
    </header>
    <coins-table
      :coins="cryptos"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

import CoinsTable from '@/components/CoinsTable.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    CoinsTable,
  },
  setup() {
    const store = useStore();
    const cryptos = ref<any[]>();

    const getCryptos = async () => {
      cryptos.value = await store.dispatch('cryptos/getCryptos');
    };

    onMounted(() => getCryptos());

    return {
      cryptos,
      getCryptos,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-color: #EEE; */
  padding: 20px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

h2 {
  margin: 0 40px;
}

.nav {
  display: flex;
  margin-bottom: 20px;
}

.nav .nav-left {
  align-items: flex-start;
}

.nav .nav-item {
  padding: 20px;
  font-size: 26px;
  text-decoration: none;
  color: #2c3e50;
}

</style>
