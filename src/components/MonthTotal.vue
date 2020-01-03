<template>
  <v-list dense>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="income">収入</v-list-item-title>
      </v-list-item-content>
      <div class="income">{{income | amountFilter}}</div>
    </v-list-item>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="payout">支出</v-list-item-title>
      </v-list-item-content>
      <div class="payout">{{payout | amountFilter}}</div>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>残高</v-list-item-title>
      </v-list-item-content>
      <div :class="[remainClass]">{{remain | amountFilter}}</div>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { createComponent, ref, computed, SetupContext, watch } from '@vue/composition-api';
import amountFilter from '@/filters/amount-filter';
import { typicalInjection, BookStoreKey, LoadingStoreKey } from '@/store';
import { getEntriesByYearMonth } from '@/repository/dba-entries';

type Props = {
  date: string;
};
export default createComponent({
  filters: {
    amountFilter,
  },
  props: {
    date: {
      type: String,
      default: '',
    },
  },
  setup: (props: Props) => {
    const { bookId } = typicalInjection(BookStoreKey);

    const income = ref(0);
    const payout = ref(0);

    const remain = computed(() => income.value - payout.value);
    const remainClass = computed(() => {
      if (income.value >= payout.value) {
        return 'surplus';
      }
      return 'deficit';
    });

    const { pushLoading, popLoading } = typicalInjection(LoadingStoreKey);

    const yearMonth = computed(() => props.date.substring(0, 7));

    function getTotalAmount (ym: string): void {
      pushLoading();
      getEntriesByYearMonth(bookId.value, ym)
        .then(entries => {
          const i = entries
            .filter(entry => entry.division === 'income')
            .map(entry => entry.amount)
            .reduce((acc, value) => acc + value, 0);
          const p = entries
            .filter(entry => entry.division === 'payout')
            .map(entry => entry.amount)
            .reduce((acc, value) => acc + value, 0);

          income.value = i;
          payout.value = p;
        })
        .finally(() => {
          popLoading();
        });
    }

    // 初回データ取得
    getTotalAmount(yearMonth.value);
    // 年月切替時のデータ取得
    watch(yearMonth, (newValue) => {
      getTotalAmount(newValue);
    });

    return {
      income,
      payout,
      remain,
      remainClass,
    };
  },
});
</script>

<style scoped>
.surplus {
  color: black;
}
.deficit {
  color: red;
}
</style>
