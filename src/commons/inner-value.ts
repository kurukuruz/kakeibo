import { SetupContext, ref, computed, watch, Ref } from '@vue/composition-api';

type Value = boolean | number | string;

export interface ValueProps<T extends Value> {
  value: T;
}

export function useInnerValue<T extends Value> (props: ValueProps<T>, context: SetupContext) {
  const innerValue: Ref<T> = ref(props.value);
  watch(innerValue, (newValue: T) => {
    context.emit('input', newValue);
  });

  const valueComputed = computed(() => props.value);
  watch(valueComputed, (newValue: T) => { innerValue.value = newValue; });

  return {
    innerValue,
  };
};
