<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
  >
    <v-card>
      <v-card-title>{{date}}</v-card-title>
      <v-card-text>
        <AppCategorySelect
          v-model="categoryId"
          :categories="categoriesShown"
        />
        <div>{{categoryId}}</div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { createComponent, ref, watch, SetupContext, computed } from '@vue/composition-api';
import { Category, Division } from '@/repository';
import AppCategorySelect from '@/components/AppCategorySelect.vue';

type Props = {
  value: boolean;
  date: string;
  categories: Category[],
}

export default createComponent({
  components: {
    AppCategorySelect,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      default: '',
    },
    categories: {
      type: Array,
      default: () => [],
    },
  },
  setup: (props: Props, context: SetupContext) => {
    const dialog = ref(props.value);

    watch(dialog, (newState: boolean) => {
      context.emit('input', newState);
    });

    const valueComputed = computed(() => props.value);
    watch(valueComputed, (newState: boolean) => { dialog.value = newState; });

    const division = ref(Division.PAYOUT);
    const categoriesShown = computed(() => props.categories.filter(cate => cate.division === division.value));

    const categoryId = ref('');

    return {
      dialog,
      categoryId,
      categoriesShown,
    };
  },
});
</script>
