<template>
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
      <a-button type="primary" html-type="submit" :loading="databaseStore.loading">
        Agregar
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { regExpUrl } from "@/utils/regExpUrl";
import { useDatabaseStore } from "@/store/database";
import { message } from "ant-design-vue";

const databaseStore = useDatabaseStore();
const formState = reactive({
  url: "",
});

const onFinish = async () => {
  const res = await databaseStore.addUrl(formState.url);
  formState.url = "";
  if (!res) {
    message.success("URL agregada con éxito");
  }
};
</script>
