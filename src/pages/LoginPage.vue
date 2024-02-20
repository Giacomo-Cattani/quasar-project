<template>
  <q-page class="row justify-center items-center">
    <div class="column">
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="username" type="username" label="Username" />
              <q-input square filled clearable v-model="password" type="password" label="Password" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-blue-7" size="lg" class="full-width" label="Login" @click="Login" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar, QSpinnerGears } from 'quasar';
import { PostsLikeStore } from 'stores/posts'
import { useRouter } from 'vue-router';
import { onBeforeMount } from 'vue';

const router = useRouter();
const store = PostsLikeStore()
let username = ref('');
let password = ref('');
const $q = useQuasar()

function Login() {
  if (username.value === "admin" && password.value === "admin") {
    $q.notify({
      spinner: QSpinnerGears,
      message: 'Verrai reindirizzato alla pagina principale...',
      color: 'green',
      position: 'top',
      timeout: 2000
    })
    setTimeout(() => {
      var date = new Date();
      date.setDate(date.getDate() + 1)
      store.addLoggedUser(date.getTime(), username.value, password.value)
      router.push('/')
    }, 2500);
  } else {
    $q.notify({
      message: 'Username o Password errati',
      color: 'red',
      timeout: 2000,
      position: 'top'
    })
    username.value = ''
    password.value = ''
  }
}

onBeforeMount(() => {
  if (store.isLogged) {
    router.push('/')
  }
})
</script>

<style>
.q-card {
  width: 360px;
}
</style>
