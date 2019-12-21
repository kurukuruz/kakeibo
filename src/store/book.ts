import { ref, Ref, computed } from '@vue/composition-api';
import { BookDoc } from '@/repository';

export default function bookStore () {
  const book: Ref<BookDoc | undefined> = ref(undefined);

  function setBook (newBook: BookDoc) {
    book.value = newBook;
  }

  const bookId = computed(() => book.value?.id ?? 'default');

  return {
    bookId,
    setBook,
  };
}

export type BookStore = ReturnType<typeof bookStore>;
