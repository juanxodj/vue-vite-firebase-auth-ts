<template>
  <h1>Grocery List App</h1>

  <a-button type="primary" @click.prevent="createItem">Add Item</a-button>
  <a-table :data-source="items" :columns="columns">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          Name
        </span>
      </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        {{ capitalizeFirstLetter(record.name) }}
      </template>
      <template v-else-if="column.key === 'quantity'">
        {{ record.quantity.toFixed(2) }}
      </template>
      <template v-else-if="column.key === 'createdAt'">
        {{ moment(record.createdAt).format('DD/MM/YYYY') }}
      </template>
      <template v-else-if="column.key === 'actions'">
        <a-button type="primary" shape="circle" @click="updateItem(record.id)">
          <EditOutlined />
        </a-button>
        <a-button type="danger" shape="circle" @click="deleteItem(record.id)">
          <DeleteOutlined />
        </a-button>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { generateFakeData, Item } from "@/models/item.model";
import { useMainStore } from "@/store/item";
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';

const items = ref<Item[]>([]);
const mainStore = useMainStore();
onMounted(() => {
  items.value = mainStore.items;
});

function createItem() {
  mainStore.createNewItem(generateFakeData());
}
function deleteItem(id: string) {
  mainStore.deleteItem(id);
}
function updateItem(id: string) {
  mainStore.updateItem(id, generateFakeData());
}
function capitalizeFirstLetter(str: string) {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized;
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Actions',
    key: 'actions',
  },
]
</script>

