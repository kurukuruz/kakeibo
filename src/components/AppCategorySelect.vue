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
import { useInnerValue, ValueProps } from '@/commons/inner-value';
import { CategoryDoc } from '@/repository';
import AppCategorySelectItem from '@/components/AppCategorySelectItem.vue';

interface Props extends ValueProps<string> {
  categories: CategoryDoc[];
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
    const { innerValue } = useInnerValue(props, context);

    return {
      innerValue,
    };
  },
});
</script>
