<template>
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
import { typicalInjection, BookStoreKey } from '@/store';

export default createComponent({
  setup: () => {
    const item = ref(0);

    const books: Ref<BookDoc[]> = ref([]);
    getAllBooks().then((data) => {
      books.value = data;
      selectBook(0);
    });

    const { setBook } = typicalInjection(BookStoreKey);
    function selectBook (index: number) {
      setBook(books.value[index]);
    }

    return {
      item,
      books,
      selectBook,
    };
  },
});
</script>
