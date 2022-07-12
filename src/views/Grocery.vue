<template>
  <h1>Grocery List App</h1>

  <a-button type="primary" @click.prevent="createItem">Add Item</a-button>
  <a-table :data-source="items" :columns="columns" bordered @change="handleChange">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
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
import { computed, onMounted, ref } from "vue";
import { generateFakeData, Item } from "@/models/item.model";
import { useMainStore } from "@/store/item";
import moment from 'moment';
import { EditOutlined, DeleteOutlined, SmileOutlined } from '@ant-design/icons-vue';
import type { TableColumnType, TableProps } from 'ant-design-vue';

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

const filteredInfo = ref();
const sortedInfo = ref();

const columns = computed<TableColumnType[]>(() => {
  const filtered = filteredInfo.value || {};
  const sorted = sortedInfo.value || {};
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '15%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filtered.name || null,
      onFilter: (value: string, record: Item) => record.name.includes(value),
      sorter: (a: Item, b: Item) => a.name.length - b.name.length,
      sortOrder: sorted.columnKey === 'name' && sorted.order,
      ellipsis: true,
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
});

const handleChange: TableProps['onChange'] = (pagination, filters, sorter) => {
  console.log('Various parameters', pagination, filters, sorter);
  filteredInfo.value = filters;
  sortedInfo.value = sorter;
};
</script>

