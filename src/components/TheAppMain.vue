<template>
  <v-app>
    <v-navigation-drawer app temporary
      v-model="nav"
    >
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-help-box</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Nav 1</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-app-bar-nav-icon
        @click.stop="nav = true"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>krz家計簿</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api';
import HelloWorld from '@/components/HelloWorld.vue';

export default createComponent({
  components: {
    HelloWorld,
  },
  setup: () => {
    const nav = ref(false);

    return {
      nav,
    };
  },
});
</script>
