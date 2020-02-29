import { ref, SetupContext, computed, Ref } from '@vue/composition-api';
import { useInnerValue, ValueProps } from '@/commons/inner-value';
import { Division, Entry } from '@/repository';
import { registerEntry } from '@/repository/dba-entries';
import { typicalInjection, BookStoreKey, CategoriesStoreKey } from '@/store';

export interface FormDialogProps extends ValueProps<boolean> {
  date: string;
}

export function useFormDialog (props: FormDialogProps, context: SetupContext) {
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

  function reset (): void {
    categoryId.value = '';
    memo.value = '';
    amount.value = 0;
    calcHistory.value = '';
  }

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
    division,
    divisionName,
    toggleDivision,
    memo,
    amount,
    calcHistory,
    updateHistory,
    register,
    closeSelf,
  };
}
