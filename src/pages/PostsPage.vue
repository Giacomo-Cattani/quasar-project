
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

              <q-card-section class="dots">
                {{ item.body }}
                <q-card-actions align="right" style="padding-bottom: 0!important;">
                  <q-btn flat @click="dialog[item.id] = true">Read
                    More</q-btn>
                </q-card-actions>
              </q-card-section>
              <template v-if="dialog[item.id]">
                <q-dialog v-model="dialog[item.id]" persistent style="backdrop-filter: blur(10px);">
                  <q-card>
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
                      <q-card-actions align="right" style="padding-bottom: 0!important;">
                        <q-btn flat @click="dialog[item.id] = false">Close</q-btn>
                      </q-card-actions>
                    </q-card-section>
                  </q-card>
                </q-dialog>
              </template>
              <q-separator />

              <q-card-actions>
                <q-icon v-if="obj2.some(e => e.userId === item.userId && e.Id === item.id)"
                  @click="doStuff({ userId: item.userId, Id: item.id }, $event)" class="q-pa-sm" id="heart"
                  name="fas fa-heart" size="25px" style="color: red;" />
                <q-icon v-else @click="doStuff({ userId: item.userId, Id: item.id }, $event)" class="q-pa-sm" id="heart"
                  name="far fa-heart" size="25px" />
              </q-card-actions>
            </q-card>


          </template>
          <template #fallback>
            <q-spinner-hourglass size=" 50px" color="primary" />
          </template>

        </Suspense>
      </div>
      <div v-else>

        <q-table title="Table" :rows="rows" :columns="columns" row-key="name" style="cursor: pointer;"
          @row-click="onRowClick" />



        <!-- TODO -->
        <template v-if="selectedmaybe == true">
          <q-dialog v-model="selectedmaybe" persistent style="backdrop-filter: blur(10px);">
            <q-card style="min-width: 40%;">

              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="/src/assets/profile-user-black.png">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ rows[idnum - 1].utente }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                <div class="absolute-bottom text-h6">
                  {{ rows[idnum - 1].title }}
                </div>
              </q-img>

              <q-card-section>
                {{ rows[idnum - 1].body }}
                <q-card-actions align="right" style="padding-bottom: 0!important;">
                  <q-btn flat
                    @click="dialog.value[idnum] = false; console.log(idnum.value + ' : ' + dialog.value[idnum])">Close</q-btn>
                </q-card-actions>
              </q-card-section>
            </q-card>
          </q-dialog>
        </template>
      </div>
    </div>
  </q-page>
</template>


<script setup>
import { ref, onBeforeMount } from 'vue'
import { api } from 'boot/axios'
import { PostsLikeStore } from 'stores/posts'

const store = PostsLikeStore()

function onRowClick(evt, row) {
  console.log("ciao")
  selectedmaybe = true;
  // idnum = row.id - 1
  // dialog.value[idnum] = true
  // console.log(idnum + " : " + dialog.value[idnum])
  // console.log(dialog.value.indexOf(true))
}

function doStuff(obj, event) {
  if (event.target.classList.contains('far')) {
    event.target.classList.remove('far')
    event.target.classList.add('fas')
    event.target.style.color = "red"
    store.addLike(obj)
  } else {
    event.target.classList.remove('fas')
    event.target.classList.add('far')
    event.target.style.color = "black"
    store.removeLike(obj)
  }
}

let selectedmaybe = false;
let idnum = 0
let dialog = []
let obj2 = [];
let sos = ref([]);
let rows = []
const columns = [{
  name: 'id',
  label: 'Id',
  align: 'left',
  field: 'id',
  sortable: true
},
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
  obj2 = JSON.parse(JSON.stringify(store.getLikes))
  result.forEach(element => {
    sos.value.push(element)
    rows.push({ id: element.id, utente: element.userId, title: element.title, body: element.body })
  });
  dialog.value = new Array(sos.value.length).fill(false)
})


onBeforeMount(() => {

})
</script>
