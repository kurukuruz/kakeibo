<template>
  <div>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

export default createComponent({
  setup: () => {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    });
  },
});
</script>

<style scoped>
@import url('https://www.gstatic.com/firebasejs/ui/4.3.0/firebase-ui-auth.css');
</style>
