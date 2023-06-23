<template>
  <div class="coinsTable">
    <table>
      <thead>
        <tr>
          <th @click="sort('NAME')">Name</th>
          <th @click="sort('PRICE')">Price</th>
          <th @click="sort('CHANGEPCT24HOUR')">24h %</th>
          <th @click="sort('MKTCAP')">Market Cap</th>
          <th @click="sort('VOLUME24HOUR')">Volume (24h)</th>
          <th @click="sort('SUPPLY')">Circulating Supply</th>
          <th @click="sort('OPEN24HOUR')">Open (24h)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="value in sortedCoins" :key="value.name" @click="openDetails">
          <td>{{value.USD.NAME}}</td>
          <td>{{value.USD.PRICE}}</td>
          <td :class="{
            'red': value.USD.CHANGEPCT24HOUR < 0,
            'green': value.USD.CHANGEPCT24HOUR > 0
            }">{{value.USD.CHANGEPCT24HOUR}} %</td>
          <td>{{value.USD.MKTCAP}}</td>
          <td>{{value.USD.VOLUME24HOUR}}</td>
          <td>{{value.USD.SUPPLY}}</td>
          <td>{{value.USD.OPEN24HOUR}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  ref,
  emit,
} from 'vue';

export default defineComponent({
  name: 'CoinsTable',
  props: {
    coins: {
      type: Array,
      default: () => ([]),
    },
  },
  setup(props) {
    const sortTarget = ref('');
    const sortDir = ref('');

    const sortedCoins = computed(() => {
      const v = props.coins.slice(0).sort((a, b) => {
        let modifier = 1;
        if (sortDir.value === 'desc') modifier = -1;

        if (a.USD[sortTarget.value] < b.USD[sortTarget.value]) return -1 * modifier;
        if (a.USD[sortTarget.value] > b.USD[sortTarget.value]) return 1 * modifier;
        return 0;
      });
      return v;
    });

    const openDetails = (coinDetails) => {
      emit('coins:open', coinDetails);
    };

    const sort = (s) => {
      if (s === sortTarget.value) {
        sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
      }
      sortTarget.value = s;
    };

    return {
      sortTarget,
      sortDir,
      sortedCoins,
      openDetails,
      sort,
    };
  },
});

</script>
<style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }

  table td {
    padding: 10px;
  }

  table thead th {
    font-size: 14px;
    padding: 10px;
    cursor: pointer;
  }

  table tbody td {
    font-size: 16px;
  }

  table td.bold {
    font-weight: bold
  }

  table tbody tr td.red {
    color: #e74c3c;
  }
  table tbody tr td.green {
    color: #2ecc71;
  }

  table thead tr th:nth-child(1),
  table tbody tr td:nth-child(1) {
    text-align: left;
  }

  table tbody tr td:nth-child(2),
  table tbody tr td:nth-child(3) {
    font-weight: bold;
  }

  table tbody tr {
    height: 60px;
    background-color: #fff;
  }

  table tbody tr:hover {
    background-color: #f8fafd;
    cursor: pointer;
  }

  table thead tr th,
  table tbody tr td {
    text-align: right;

    border-bottom: 1px solid #eff2f5;
  }

</style>
