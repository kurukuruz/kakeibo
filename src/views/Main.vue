<template>
  <div>
    <TheAppMain/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheAppMain from '@/components/TheAppMain.vue';

export default {
  name: 'main',
  components: {
    TheAppMain,
  },
};
</script>
