<template>
  <div>
    <h1>Editar: {{ route.params.id }}</h1>
    <a-form :model="formState" @finish="onFinish" name="basicAdd" layout="vertical" autocomplete="off">
      <a-form-item label="Ingrese URL" name="url" :rules="[
        {
          required: true,
          whitespace: true,
          pattern: regExpUrl,
          message: 'Ingresa una URL válida',
        },
      ]">
        <a-input v-model:value="formState.url"></a-input>
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit" :loading="databaseStore.loading">
            Editar
          </a-button>
          <a-button danger @click="router.push('/')">
            Volver
          </a-button>
          <a-button type="dashed" @click="warning">
            Message
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDatabaseStore } from "@/store/database";
import { regExpUrl } from "../utils/regExpUrl";
import { message } from 'ant-design-vue';

const databaseStore = useDatabaseStore();

const formState = reactive({
  url: "",
});

const route = useRoute();
const router = useRouter();

const urlId = route.params.id as string;

const warning = () => {
  console.log('This is a warning message');
  message.warning('This is a warning message');
};

const onFinish = async () => {
  const res = await databaseStore.updateUrl(urlId, formState.url);
  formState.url = "";
  if (!res) {
    return message.success("URL modificada con éxito");
  }
  message.error(res);
};

onMounted(async () => {
  formState.url = await databaseStore.readUrl(urlId);
});
</script>
