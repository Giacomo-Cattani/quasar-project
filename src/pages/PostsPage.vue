
<template>
  <q-page>
    <div class="q-pa-md">
      <q-toggle :label="choose" color="green" false-value="Table" true-value="Grid" v-model="choose" />
      <div v-if="choose == 'Grid'" class="q-pa-md row items-start q-gutter-md">
        <Suspense>
          <template #default>
            <q-card v-for="item in sos" :key="item.id" class="my-card" style="max-width: 30%;">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="/src/assets/profile-user-black.png">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ item.userId }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                <div class="absolute-bottom text-h6">
                  {{ item.title }}
                </div>
              </q-img>

              <q-card-section>
                {{ item.body }}
              </q-card-section>
              <q-separator />

              <q-card-actions>
                <q-icon @click="doStuff($event)" class="q-pa-sm" id="heart" name="far fa-heart" size="25px" />
              </q-card-actions>
            </q-card>
          </template>
          <template #fallback>
            <q-spinner-hourglass size=" 50px" color="primary" />
          </template>

        </Suspense>
      </div>
      <div v-else>
        <q-table title="Table" :rows="rows" :columns="columns" row-key="name" />
      </div>
    </div>
  </q-page>
</template>


<script setup>
import { defineComponent, ref, onBeforeMount } from 'vue'
import { api } from 'boot/axios'

function doStuff(event) {
  if (event.target.classList.contains('far')) {
    event.target.classList.remove('far')
    event.target.classList.add('fas')
    event.target.style.color = "red"
  } else {
    event.target.classList.remove('fas')
    event.target.classList.add('far')
    event.target.style.color = "black"
  }
}

const sos = ref([]);
const rows = []
const columns = [
  {
    name: 'utente',
    label: 'Utente',
    align: 'left',
    field: 'utente',
    sortable: true
  },
  {
    name: 'title',
    label: 'Title',
    align: 'center',
    field: 'title',
    sortable: true
  },
  {
    name: 'body',
    label: 'Body',
    align: 'center',
    field: 'body',
    sortable: true
  }
]
const choose = ref('Grid')

const getData = async () => {
  try {
    const { data: result } = await api.get('/posts')
    return result
  } catch (e) {
  }

}
getData().then((result) => {
  result.forEach(element => {
    sos.value.push(element)
    rows.push({ utente: element.userId, title: element.title, body: element.body })
  });
})


onBeforeMount(() => {
  // console.log("akubfhkabfk")
  // getData().then((result) => {
  //   result.forEach(element => {
  //     sos.push(element)
  //     rows.push({ utente: element.userId, title: element.title, body: element.body })
  //   });
  // })
})
</script>
