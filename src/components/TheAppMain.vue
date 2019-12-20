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
        <div class="debug">{{focus}}</div>
        <div class="debug"><v-btn @click="gotoToday">Today</v-btn></div>
        <div class="debug">
          <v-btn @click="dialog = true">Open</v-btn>
          <span class="debug">{{dialog}}</span>
          <AppFormDialog
            v-model="dialog"
            :date="focus"
            :categories="categories"
          />
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { createComponent, ref, Ref, provide } from '@vue/composition-api';
import { Category, Book } from '@/repository';
import { getAllBooks } from '@/repository/dba-books';
import { getAllCategories } from '@/repository/dba-categories';
import { BookStoreKey } from '@/store';
import bookStore from '@/store/book';
import AppNavigation from '@/components/AppNavigation.vue';
import AppCalendar from '@/components/AppCalendar.vue';
import AppFormDialog from '@/components/AppFormDialog.vue';

const today = new Date().toISOString().substring(0, 10);

export default createComponent({
  components: {
    AppNavigation,
    AppCalendar,
    AppFormDialog,
  },
  setup: () => {
    const nav = ref(false);
    const dialog = ref(false);
    const focus = ref(today);

    const categories: Ref<Category[]> = ref([]);
    getAllCategories().then((data) => { categories.value = data; });

    function gotoToday () { focus.value = today; }; // debug

    provide(BookStoreKey, bookStore());

    return {
      nav,
      dialog,
      focus,
      categories,
      gotoToday,
    };
  },
});
</script>
