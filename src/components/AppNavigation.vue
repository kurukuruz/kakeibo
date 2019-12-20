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
</template>

<script lang="ts">
import { createComponent, ref, Ref } from '@vue/composition-api';
import { Book } from '@/repository';
import { getAllBooks } from '@/repository/dba-books';

export default createComponent({
  setup: () => {
    const books: Ref<Book[]> = ref([]);
    getAllBooks().then((data) => { books.value = data; });
    function debugAlert (id: string) { alert(id); } // debug

    return {
      books,
      debugAlert,
    };
  },
});
</script>
