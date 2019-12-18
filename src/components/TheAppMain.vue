<template>
  <v-app>
    <v-navigation-drawer app temporary
      v-model="nav"
    >
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Preference</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="(b, i) in books" :key="i"
          @click="debugAlert(b.id)"
        >
          <v-list-item-icon>
            <v-icon v-text="b.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{b.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
import { createComponent, ref, Ref } from '@vue/composition-api';
import { Category, Book } from '@/repository';
import { getAllBooks } from '@/repository/dba-books';
import { getAllCategories } from '@/repository/dba-categories';
import AppCalendar from '@/components/AppCalendar.vue';
import AppFormDialog from '@/components/AppFormDialog.vue';

const today = new Date().toISOString().substring(0, 10);

export default createComponent({
  components: {
    AppCalendar,
    AppFormDialog,
  },
  setup: () => {
    const nav = ref(false);
    const dialog = ref(false);
    const focus = ref(today);

    const books: Ref<Book[]> = ref([]);
    getAllBooks().then((data) => { books.value = data; });
    function debugAlert (id: string) { alert(id); } // debug

    const categories: Ref<Category[]> = ref([]);
    getAllCategories().then((data) => { categories.value = data; });

    function gotoToday () { focus.value = today; }; // debug

    return {
      nav,
      dialog,
      focus,
      books,
      debugAlert,
      categories,
      gotoToday,
    };
  },
});
</script>
