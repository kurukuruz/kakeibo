<template>
  <v-list>
    <v-list-group
      prepend-icon="mdi-settings"
      no-action
    >
      <template v-slot:activator>
        <v-list-item-title>Preference</v-list-item-title>
      </template>

      <v-list-item @click="categoriesPrefDialog = true">
        <v-list-item-content>
          <v-list-item-title>Categories</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-playlist-edit</v-icon>
        </v-list-item-action>
      </v-list-item>
      <AppCategoriesDialog v-model="categoriesPrefDialog"/>
    </v-list-group>

    <v-divider></v-divider>

    <v-list-item-group v-model="item">
      <v-list-item v-for="(b, i) in books" :key="i"
        @click="selectBook(i)"
      >
        <v-list-item-icon>
          <v-icon v-text="b.icon"></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{b.name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import { createComponent, ref, Ref } from '@vue/composition-api';
import { BookDoc } from '@/repository';
import { getAllBooks } from '@/repository/dba-books';
import { typicalInjection, BookStoreKey, CategoriesStoreKey } from '@/store';
import AppCategoriesDialog from '@/components/AppCategoriesDialog.vue';

export default createComponent({
  components: {
    AppCategoriesDialog,
  },
  setup: () => {
    const item = ref(0);

    const books: Ref<BookDoc[]> = ref([]);
    getAllBooks().then((data) => {
      books.value = data;
      selectBook(0);
    });

    const { setBook, bookId } = typicalInjection(BookStoreKey);
    const { refreshCategoriesList } = typicalInjection(CategoriesStoreKey);
    function selectBook (index: number) {
      setBook(books.value[index]);
      refreshCategoriesList(bookId.value);
    }

    const categoriesPrefDialog = ref(false);

    return {
      item,
      books,
      selectBook,
      categoriesPrefDialog,
    };
  },
});
</script>
