<template>
  <app-page title="Список заявок">
    <template #header>
      <button class="btn primary" @click="modal = true">Create</button>
    </template>
    <request-table :requests="[]"></request-table>

    <teleport to="body">
      <app-modal title="New request" v-if="modal" @close="close">
        <request-modal @create="close"></request-modal>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import {ref} from 'vue'
import AppPage from "../components/ui/AppPage";
import RequestTable from "../components/request/RequestTable";
import AppModal from "../components/ui/AppModal";
import RequestModal from "../components/request/RequestModal";

export default {
  setup(){
    const modal = ref(false);

    return {
      modal,
      close: () => modal.value = false
    }
  },
  components: {AppPage, RequestTable, AppModal, RequestModal},
}
</script>
