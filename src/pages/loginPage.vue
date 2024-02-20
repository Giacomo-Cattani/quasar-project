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
import { useQuasar } from 'quasar';
import { PostsLikeStore } from 'stores/posts'
import { useRouter } from 'vue-router';
import { onBeforeMount } from 'vue';

const router = useRouter();
const store = PostsLikeStore()
let username = ref('');
let password = ref('');
const $q = useQuasar()
let user = ref({ username: 'pippo', password: 'ciao123' })

function Login() {
  console.log('Username: ', username.value);
  console.log('Password: ', password.value);
  if (username.value === user.value.username && password.value === user.value.password) {
    $q.notify({
      message: 'Verrai reindirizzato alla pagina principale...',
      color: 'purple'
    })

    /*TODO*/
    setTimeout(() => {
      var date = new Date();
      date.setDate(date.getDate() + 1);
      store.addLoggedUser(date)
      router.push('/')
    }, 2000);

    console.log('Login successful');
  } else {
    $q.notify({
      message: 'Username o Password errati',
      color: 'purple'
    })
    username.value = ''
    password.value = ''
    console.log('Login failed');
  }
}

onBeforeMount(() => {
  console.log(store.isLogged)
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
