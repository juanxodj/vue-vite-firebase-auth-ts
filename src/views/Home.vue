<template>
  <div>
    <h1>{{ t('message') }}</h1>

    <add-form></add-form>

    <a-spin v-if="databaseStore.loadingDoc" />

    <a-row>
      <a-col :span="12" v-for="item of databaseStore.documents.reverse()" :key="item.id" style="padding: 5px;">
        <a-space direction="vertical" style="width: 100%;">
          <a-card :title="`ID: ${item.short}`">
            <template #extra>
              <a-space>
                <a-button @click="router.push(`/edit/${item.id}`)">{{ t('actions.edit') }}</a-button>
                <a-popconfirm :title="t('actions.are-you-sure')" :ok-text="t('actions.yes')"
                  :cancel-text="t('actions.no')" @confirm="confirm(item.id)" @cancel="cancel">
                  <a-button danger>{{ t('actions.delete') }}</a-button>
                </a-popconfirm>
              </a-space>
            </template>
            <p>{{ item.name }}</p>
          </a-card>
        </a-space>
      </a-col>
    </a-row>

  </div>
</template>

<script setup lang="ts">
import { useDatabaseStore } from "@/store/database";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const { t } = useI18n();
const databaseStore = useDatabaseStore();
const router = useRouter();

const confirm = (id: string) => {
  console.log(id);
  databaseStore.deleteUrl(id);
  message.success("Eliminado");
};

const cancel = (e: string) => {
  console.log(e);
  message.error("No se eliminó");
};

databaseStore.getUrls();
</script>
