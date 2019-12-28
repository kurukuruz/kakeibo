<template>
  <v-dialog
    v-model="innerValue"
    fullscreen hide-overlay transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar>
        <v-btn icon @click="closeSelf">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title>{{date}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn text @click="register">登録</v-btn>
        </v-toolbar-items>
      </v-toolbar>

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
import { createComponent, ref, watch, SetupContext, computed, Ref } from '@vue/composition-api';
import { useInnerValue, ValueProps } from '@/commons/inner-value';
import amountFilter from '@/filters/amount-filter';
import { CategoryDoc, Division, Entry } from '@/repository';
import { registerEntry } from '@/repository/dba-entries';
import { typicalInjection, BookStoreKey, CategoriesStoreKey } from '@/store';
import AppCategorySelect from '@/components/AppCategorySelect.vue';
import Calculator from '@/components/Calculator.vue';

interface Props extends ValueProps<boolean> {
  date: string;
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
  },
  setup: (props: Props, context: SetupContext) => {
    const { innerValue } = useInnerValue(props, context);

    const division: Ref<Division> = ref(Division.PAYOUT);
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

    const { allCategoriesList } = typicalInjection(CategoriesStoreKey);
    const categoriesShown = computed(() => allCategoriesList.value.filter(cate => cate.division === division.value));

    const { bookId } = typicalInjection(BookStoreKey);

    const categoryId = ref('');

    const memo = ref('');

    const amount = ref(0);
    const calcHistory = ref('');
    function updateHistory (newValue: string): void {
      calcHistory.value = newValue;
    }

    function register (): void {
      const entry: Entry = {
        date: props.date,
        categoryId: categoryId.value,
        memo: memo.value,
        division: division.value,
        amount: amount.value,
      };
      registerEntry(bookId.value, entry);
      closeSelf();
    }

    function closeSelf (): void {
      innerValue.value = false;
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
      register,
      closeSelf,
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
