<template>
  <div>
    <h1 v-if="signin">You are already signed in.</h1>
    <div v-else id="firebaseui-auth-container"></div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

export default createComponent({
  setup: () => {
    const signin = ref(false);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        signin.value = true;
      }
    });

    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: () => {
          signin.value = true;
          return false;
        },
      },
    });

    return {
      signin,
    };
  },
});
</script>

<style scoped>
@import url('https://www.gstatic.com/firebasejs/ui/4.3.0/firebase-ui-auth.css');
</style>
