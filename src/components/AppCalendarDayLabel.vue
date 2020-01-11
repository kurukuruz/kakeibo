<template>
  <div @click="emitClick">
    <v-avatar
      class="body-2"
      :color="avatarColor"
      size="24"
    >{{day}}</v-avatar>
    <div class="caption text-right income">{{sumIncome | amountFilter}}</div>
    <div class="caption text-right payout">{{sumPayout | amountFilter}}</div>
  </div>
</template>

<script lang="ts">
import { createComponent, SetupContext, computed, ref, Ref, watch } from '@vue/composition-api';
import { EntryDoc } from '../repository';
import { getEntriesByDate } from '@/repository/dba-entries';
import { typicalInjection, BookStoreKey, LoadingStoreKey } from '@/store';
import amountFilter from '@/filters/amount-filter';

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
    },
    avatarColor: {
      type: String,
      default: '',
    },
  },
  setup: (props: Props, context: SetupContext) => {
    const day = computed(() => props.date.slice(-2));

    const { bookId } = typicalInjection(BookStoreKey);
    watch(bookId, (newId: string) => {
      getEntries(newId, props.date);
    });

    const entries: Ref<EntryDoc[]> = ref([]);
    const sumPayout = computed(() => {
      const filtered = entries.value
        .filter(e => e.division === 'payout')
        .map(e => e.amount);
      if (filtered.length === 0) {
        return null;
      }
      return filtered.reduce((acc, value) => acc + value, 0);
    });
    const sumIncome = computed(() => {
      const filtered = entries.value
        .filter(e => e.division === 'income')
        .map(e => e.amount);
      if (filtered.length === 0) {
        return null;
      }
      return filtered.reduce((acc, value) => acc + value, 0);
    });

    const { pushLoading, popLoading } = typicalInjection(LoadingStoreKey);
    function getEntries (bookId: string, date: string): void {
      pushLoading();
      getEntriesByDate(bookId, date)
        .then(data => {
          entries.value = data;
        })
        .finally(() => {
          popLoading();
        });
    }

    // 初期データ取得
    getEntries(bookId.value, props.date);

    function emitClick (): void {
      context.emit('click');
    }

    return {
      day,
      sumPayout,
      sumIncome,
      emitClick,
    };
  },
});
</script>

<style scoped>
  .sum-value {
    font-size: 0.8em;
    height: 1.4em;
  }
</style>
