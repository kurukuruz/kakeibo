import { ref, Ref, computed, reactive } from '@vue/composition-api';

export default function loadingStore () {
  const loadStack: Ref<boolean[]> = ref([]);

  const isLoading = computed(() => loadStack.value.length > 0);

  function pushLoading () {
    loadStack.value.push(true);
  }

  function popLoading () {
    loadStack.value.pop();
  }

  return {
    isLoading,
    pushLoading,
    popLoading,
  };
}

export type LoadingStore = ReturnType<typeof loadingStore>
