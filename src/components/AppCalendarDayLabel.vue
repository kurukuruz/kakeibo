<template>
  <div @click="emitClick">
    <v-avatar
      :color="avatarColor"
      size="36"
    >{{day}}</v-avatar>
  </div>
</template>

<script lang="ts">
import { createComponent, SetupContext } from '@vue/composition-api';

export default createComponent({
  props: {
    day: {
      type: String,
    },
    avatarColor: {
      type: String,
      default: '',
    },
  },
  setup: (props, context: SetupContext) => {
    function emitClick (): void {
      context.emit('click');
    }

    return {
      emitClick,
    };
  },
});
</script>
