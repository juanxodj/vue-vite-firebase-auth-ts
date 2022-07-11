<template>
  <h1>Grocery List App</h1>

  <button type="button"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    style="margin: 5px" @click.prevent="createItem">Add Item</button>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          Index
        </th>
        <th scope="col" class="px-6 py-3">
          Name
        </th>
        <th scope="col" class="px-6 py-3">
          Quantity
        </th>
        <th scope="col" class="px-6 py-3">
          Description
        </th>
        <th scope="col" class="px-6 py-3">
          Created At
        </th>
        <th scope="col" class="px-6 py-3">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(item, index) in items" :key="index">
        <td class="px-6 py-4">
          {{ index + 1 }}
        </td>
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
          {{ capitalizeFirstLetter(item.name) }}
        </th>
        <td class="px-6 py-4">
          {{ item.quantity.toFixed(2) }}
        </td>
        <td class="px-6 py-4">
          {{ item.description }}
        </td>
        <td class="px-6 py-4">
          {{ moment(item.createdAt).format('DD/MM/YYYY') }}
        </td>
        <td class="px-6 py-4 text-right">
          <div class="inline-flex rounded-md shadow-sm" role="group">
            <button type="button"
              class="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              @click="updateItem(item.id)">
              Update
            </button>
            <button type="button"
              class="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              @click="deleteItem(item.id)">
              Delete
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { generateFakeData, Item } from "@/models/item.model";
import { useMainStore } from "@/store/item";
import moment from 'moment';

export default defineComponent({
  name: "App",
  setup() {
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
    return {
      items,
      createItem,
      deleteItem,
      updateItem,
      capitalizeFirstLetter,
      moment
    };
  },
});
</script>

