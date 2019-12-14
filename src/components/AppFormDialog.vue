<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
  >
    <v-card>
      <v-card-title>{{date}}</v-card-title>
      <v-card-text>
        test text
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { createComponent, ref, watch, SetupContext, computed } from '@vue/composition-api';

type Props = {
  value: boolean;
  date: string;
}

export default createComponent({
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      default: '',
    },
  },
  setup: (props: Props, context: SetupContext) => {
    const dialog = ref(props.value);

    watch(dialog, (newState: boolean) => {
      context.emit('input', newState);
    });

    const valueComputed = computed(() => props.value);
    watch(valueComputed, (newState: boolean) => { dialog.value = newState; });
    return {
      dialog,
    };
  },
});
</script>
