<template>
  <v-dialog
    v-model="innerValue"
    max-width="600"
  >
    <v-card>
      <v-card-title>{{date}}</v-card-title>
      <v-card-text>
        <AppCategorySelect
          v-model="categoryId"
          :categories="categoriesShown"
        />
        <v-textarea
          v-model="memo"
          rows="2" auto-grow
          row-height="26"
        ></v-textarea>
        <v-row dense>
          <v-col cols="4">
            <v-btn
              @click="toggleDivision"
            >{{divisionName}}<v-icon>mdi-sync</v-icon></v-btn>
          </v-col>
          <v-col>
            <v-input
              class="headline grey--text text--darken-4 text-end"
              :messages="calcHistory"
            >
              <div>{{amount | amountFilter}}</div>
            </v-input>
          </v-col>
        </v-row>
        <Calculator
          v-model="amount"
          @update:history="updateHistory"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { createComponent, ref, watch, SetupContext, computed } from '@vue/composition-api';
import { useInnerValue, ValueProps } from '@/commons/inner-value';
import amountFilter from '@/filters/amount-filter';
import { Category, Division } from '@/repository';
import AppCategorySelect from '@/components/AppCategorySelect.vue';
import Calculator from '@/components/Calculator.vue';

interface Props extends ValueProps<boolean> {
  date: string;
  categories: Category[],
}

export default createComponent({
  components: {
    AppCategorySelect,
    Calculator,
  },
  filters: {
    amountFilter,
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
    const { innerValue } = useInnerValue(props, context);

    const division = ref(Division.PAYOUT);
    const divisionName = computed(() => {
      switch (division.value) {
        case Division.PAYOUT: return '支出';
        case Division.INCOME: return '収入';
      }
    });
    function toggleDivision () {
      switch (division.value) {
        case Division.PAYOUT:
          division.value = Division.INCOME;
          break;
        case Division.INCOME:
          division.value = Division.PAYOUT;
      }
    }

    const categoriesShown = computed(() => props.categories.filter(cate => cate.division === division.value));

    const categoryId = ref('');

    const memo = ref('');

    const amount = ref(0);
    const calcHistory = ref('');
    function updateHistory (newValue: string): void {
      calcHistory.value = newValue;
    }

    return {
      innerValue,
      categoryId,
      categoriesShown,
      divisionName,
      toggleDivision,
      memo,
      amount,
      calcHistory,
      updateHistory,
    };
  },
});
</script>

<style>
.v-input.text-end .v-input__slot {
  display: flex;
  justify-content: flex-end;
}

.v-input.text-end .v-messages__message {
  text-align: end;
}
</style>
