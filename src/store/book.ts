import { ref, Ref, computed } from '@vue/composition-api';
import { Book } from '@/repository';

export default function bookStore () {
  const book: Ref<Book | undefined> = ref(undefined);

  function setBook (newBook: Book) {
    book.value = newBook;
  }

  const bookId = computed(() => book.value?.id ?? 'default');

  return {
    bookId,
    setBook,
  };
}

export type BookStore = ReturnType<typeof bookStore>;
