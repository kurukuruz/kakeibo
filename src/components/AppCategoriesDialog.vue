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

        <v-toolbar-title>Edit Categories</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-btn
          @click="toggleDivision"
        >{{divisionName}}<v-icon>mdi-sync</v-icon></v-btn>
        <v-list>
          <v-list-item>
            <v-list-item-content @click="editDialog = true">
              <div>
                <v-icon>mdi-plus-circle</v-icon>
                <span class="ml-2">Add</span>
              </div>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-for="cate in categoriesShown"
            :key="cate.id"
          >
            <v-list-item-content>
              <AppCategorySelectItem :item="cate"/>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    <AppCategoryEditDialog v-model="editDialog"/>
  </v-dialog>
</template>

<script lang="ts">
import { createComponent, SetupContext, ref, Ref, computed } from '@vue/composition-api';
import { ValueProps, useInnerValue } from '../commons/inner-value';
import { typicalInjection, BookStoreKey, CategoriesStoreKey } from '@/store';
import { Division, Entry } from '@/repository';
import AppCategorySelectItem from '@/components/AppCategorySelectItem.vue';
import AppCategoryEditDialog from '@/components/AppCategoryEditDialog.vue';
import { FormDialogProps, useFormDialog } from '../commons/form-dialog-core';

export default createComponent({
  components: {
    AppCategorySelectItem,
    AppCategoryEditDialog,
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
      closeSelf,
      categoriesShown,
      divisionName,
      toggleDivision,
    } = useFormDialog(props, context);

    const editDialog = ref(false);

    return {
      innerValue,
      closeSelf,
      categoriesShown,
      divisionName,
      toggleDivision,
      editDialog,
    };
  },
});
</script>
