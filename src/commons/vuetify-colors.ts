import { ref, computed } from '@vue/composition-api';

const baseColors = [
  'black',
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'blue-grey',
];

const variants = [
  '',
  'lighten-3',
  'lighten-2',
  'lighten-1',
  'darken-1',
  'darken-2',
  'darken-3',
  'darken-4',
  'accent-1',
  'accent-2',
  'accent-3',
  'accent-4',
];

export function useVuetifyColors () {
  const baseColor = ref(baseColors[0]);
  const variant = ref(variants[0]);

  const color = computed(() => baseColor.value + ' ' + variant.value);

  return {
    baseColors,
    baseColor,
    variants,
    variant,
    color,
  };
}
