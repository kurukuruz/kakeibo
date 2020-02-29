<template>
  <v-dialog
    v-model="innerValue"
    max-width="600"
  >
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <AppCategorySelectItem :item="state"/>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row dense>
          <v-col>
            <v-text-field
              label="Name"
              v-model="state.name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-select
              label="base"
              v-model="baseColor"
              :items="baseColors"
            >
              <template v-slot:item="{ item }">
                <ColorSelectItem :name="item" :color="item"/>
              </template>
            </v-select>
          </v-col>
          <v-col>
            <v-select
              label="variant"
              v-model="variant"
              :items="variants"
            >
              <template v-slot:item="{ item }">
                <ColorSelectItem :name="item" :color="baseColor + ' ' + item"/>
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              label="Icon"
              v-model="state.icon"
            ></v-text-field>
          </v-col>
        </v-row>
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
import { createComponent, SetupContext, reactive, ref } from '@vue/composition-api';
import { FormDialogProps, useFormDialog } from '../commons/form-dialog-core';
import { useVuetifyColors } from '../commons/vuetify-colors';
import AppCategorySelectItem from '@/components/AppCategorySelectItem.vue';
import ColorSelectItem from '@/components/ColorSelectItem.vue';
import { Category, Division } from '../repository';
import { typicalInjection, BookStoreKey } from '@/store';
import { registerCategory } from '@/repository/dba-categories';

interface CategoryEditProps extends FormDialogProps {
  division: Division,
  order: number,
}

export default createComponent({
  components: {
    AppCategorySelectItem,
    ColorSelectItem,
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
    division: {
      type: String,
      default: 'payout',
    },
    order: {
      type: Number,
      default: 99,
    },
  },
  setup: (props: CategoryEditProps, context: SetupContext) => {
    const {
      innerValue,
      closeSelf,
    } = useFormDialog(props, context);

    const {
      baseColors,
      baseColor,
      variants,
      variant,
      color,
    } = useVuetifyColors();

    const state = reactive({
      name: '',
      icon: '',
      color: color,
    });

    const { bookId } = typicalInjection(BookStoreKey);
    function register () {
      const cate: Category = {
        name: state.name,
        color: state.color,
        icon: state.icon,
        division: props.division,
        order: props.order,
      };
      registerCategory(bookId.value, cate);
    }

    return {
      innerValue,
      closeSelf,
      baseColors,
      baseColor,
      variants,
      variant,
      state,
      register,
    };
  },
});
</script>
