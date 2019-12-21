<template>
  <v-list dense>
    <v-list-item v-for="(e, i) in entries" :key="i"
    >
      <v-list-item-avatar :color="getCategoryColor(e.categoryId)">
        <v-icon dark>{{getCategoryIcon(e.categoryId)}}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{getCategoryName(e.categoryId)}}</v-list-item-title>
        <v-list-item-subtitle>{{e.memo}}</v-list-item-subtitle>
      </v-list-item-content>

      <div :class="[e.division]">{{e.amount | amountFilter}}</div>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { createComponent, watch, computed, Ref, ref } from '@vue/composition-api';
import { EntryDoc } from '../repository';
import { getEntriesByDate } from '@/repository/dba-entries';
import { typicalInjection, CategoriesStoreKey } from '@/store';
import amountFilter from '@/filters/amount-filter';

type Props = {
  date: string;
};

export default createComponent({
  props: {
    date: {
      type: String,
      default: '',
    },
  },
  filters: {
    amountFilter,
  },
  setup: (props: Props) => {
    const dateComputed = computed(() => props.date);
    watch(dateComputed, (newDate: string) => {

    });

    const { getCategoryById } = typicalInjection(CategoriesStoreKey);
    function getCategoryName (id: string): string {
      return getCategoryById(id).name;
    }
    function getCategoryColor (id: string): string {
      return getCategoryById(id).color;
    }
    function getCategoryIcon (id: string): string {
      return getCategoryById(id).icon ?? '';
    }

    const entries: Ref<EntryDoc[]> = ref([]);
    getEntriesByDate(dateComputed.value).then(data => {
      entries.value = data;
    });

    return {
      getCategoryName,
      getCategoryColor,
      getCategoryIcon,
      entries,
    };
  },
});
</script>
