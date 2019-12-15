<template>
  <v-select
    v-model="innerValue"
    :items="categories"
    item-value="id"
  >
    <template v-slot:item="{ item }">
      <AppCategorySelectItem :item="item"/>
    </template>
    <template v-slot:selection="{ item }">
      <AppCategorySelectItem :item="item"/>
    </template>
  </v-select>
</template>

<script lang="ts">
import { createComponent, SetupContext, ref, watch, computed } from '@vue/composition-api';
import { Category } from '@/repository';
import AppCategorySelectItem from '@/components/AppCategorySelectItem.vue';

type Props = {
  value: string;
  categories: Category[],
}

export default createComponent({
  components: {
    AppCategorySelectItem,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    categories: {
      type: Array,
      default: () => [],
    },
  },
  setup: (props: Props, context: SetupContext) => {
    const innerValue = ref(props.value);
    watch(innerValue, (newValue: string) => {
      context.emit('input', newValue);
    });

    const valueComputed = computed(() => props.value);
    watch(valueComputed, (newValue: string) => { innerValue.value = newValue; });

    return {
      innerValue,
    };
  },
});
</script>
