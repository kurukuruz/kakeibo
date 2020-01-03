<template>
  <v-app>
    <v-navigation-drawer app temporary
      v-model="nav"
    >
      <AppNavigation/>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-app-bar-nav-icon
        @click.stop="nav = true"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>krz家計簿</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <AppCalendar v-model="focus" />
        <div class="debug">
          <v-btn block large @click="dialog = true">
            <v-icon>mdi-square-edit-outline</v-icon>
          </v-btn>
          <AppFormDialogFull
            v-if="isSmall"
            v-model="dialog"
            :date="focus"
          />
          <AppFormDialog
            v-else
            v-model="dialog"
            :date="focus"
          />
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { createComponent, ref, Ref, provide, SetupContext, computed } from '@vue/composition-api';
import { Category, Book } from '@/repository';
import { getAllBooks } from '@/repository/dba-books';
import { getAllCategories } from '@/repository/dba-categories';
import { BookStoreKey, CategoriesStoreKey, LoadingStoreKey } from '@/store';
import bookStore from '@/store/book';
import categoriesStore from '@/store/categories';
import loadingStore from '@/store/loading';
import AppNavigation from '@/components/AppNavigation.vue';
import AppCalendar from '@/components/AppCalendar.vue';
import AppFormDialog from '@/components/AppFormDialog.vue';
import AppFormDialogFull from '@/components/AppFormDialogFull.vue';

const today = new Date().toISOString().substring(0, 10);

export default createComponent({
  components: {
    AppNavigation,
    AppCalendar,
    AppFormDialog,
    AppFormDialogFull,
  },
  setup: (props, context: SetupContext) => {
    const nav = ref(false);
    const dialog = ref(false);
    const focus = ref(today);

    function gotoToday () { focus.value = today; }; // debug

    provide(BookStoreKey, bookStore());
    provide(CategoriesStoreKey, categoriesStore());
    provide(LoadingStoreKey, loadingStore());

    const isSmall = computed(() => {
      switch (context.root.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return true;
        default:
          return false;
      }
    });
    return {
      nav,
      dialog,
      focus,
      gotoToday,
      isSmall,
    };
  },
});
</script>
