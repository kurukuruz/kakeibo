<template>
  <div>
    <v-avatar
      size="28"
      :color="item.color"
    >
      <v-icon dark>{{item.icon}}</v-icon>
    </v-avatar>
    <span>{{item.name}}</span>
  </div>
</template>

<script lang="ts">
import { createComponent, SetupContext, ref, watch, computed } from '@vue/composition-api';
import { Category } from '@/repository';

export default createComponent({
  props: {
    item: {
      type: Object,
    },
  },
});
</script>
