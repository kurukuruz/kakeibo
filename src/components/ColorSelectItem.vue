<template>
  <div>
    <v-avatar
      size="16"
      tile
      :color="color"
    >
    </v-avatar>
    <span class="ml-2">{{name}}</span>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';

export default createComponent({
  props: {
    color: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
});
</script>
