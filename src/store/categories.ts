import { ref, Ref, computed } from '@vue/composition-api';
import { Category, Document, CategoryDoc } from '@/repository';
import { getAllCategories } from '@/repository/dba-categories';

export default function categoriesStore () {
  const categories: Ref<Document<Category>> = ref({});

  function getCategoryById (id: string): Category {
    return { ...categories.value[id] };
  }

  const allCategoriesList = computed(() => {
    return Object.entries(categories.value).map<CategoryDoc>(entry => {
      return { id: entry[0], ...entry[1] };
    }).sort((a, b) => a.order - b.order);
  });

  function refreshCategoriesList (bookId: string) {
    getAllCategories(bookId).then((data) => { categories.value = data; });
  }

  // データ取得開始
  refreshCategoriesList('default');

  return {
    getCategoryById,
    allCategoriesList,
    refreshCategoriesList,
  };
}

export type CategoriesStore = ReturnType<typeof categoriesStore>;
