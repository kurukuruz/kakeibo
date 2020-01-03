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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeSelf">キャンセル</v-btn>
        <v-btn text @click="register">登録</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { createComponent, SetupContext } from '@vue/composition-api';
import { useFormDialog, FormDialogProps } from '@/commons/form-dialog-core';
import amountFilter from '@/filters/amount-filter';
import AppCategorySelect from '@/components/AppCategorySelect.vue';
import Calculator from '@/components/Calculator.vue';

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
  setup: (props: FormDialogProps, context: SetupContext) => {
    const {
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
    } = useFormDialog(props, context);

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
