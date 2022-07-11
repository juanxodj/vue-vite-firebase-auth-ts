<template>
	<div class="content-center">
		<h1 class="text-3xl font-bold underline">
			Datatable!
		</h1>
		<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
							Email
						</th>
						<th scope="col" class="px-6 py-3">
							Phone
						</th>
						<th scope="col" class="px-6 py-3">
							Username
						</th>
						<th scope="col" class="px-6 py-3">
							Company
						</th>
						<th scope="col" class="px-6 py-3">
							<span class="sr-only">Edit</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(user, index) in users">
						<td class="px-6 py-4">
							{{ index + 1 }}
						</td>
						<th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
							{{ user.name }}
						</th>
						<td class="px-6 py-4">
							{{ user.email }}
						</td>
						<td class="px-6 py-4">
							{{ user.phone }}
						</td>
						<td class="px-6 py-4">
							{{ user.username }}
						</td>
						<td class="px-6 py-4">
							{{ user.company.name }}
						</td>
						<td class="px-6 py-4 text-right">
							<a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<button type="button"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			style="margin: 15px 0 0 0" @click.prevent="showAlert">Make
			Request</button>
		<button type="button"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			style="margin: 15px 0 0 5px" @click.prevent="showAlert">Alert</button>
	</div>
</template>

<script setup lang="ts">
import api from "@/services/api";
import Swal from "sweetalert2";

interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	address: Address;
	phone: string;
	website: string;
	company: Company;
}

interface Address {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: Geo;
}

interface Geo {
	lat: string;
	lng: string;
}

interface Company {
	name: string;
	catchPhrase: string;
	bs: string;
}

let users: User[] = [];

async function showAlert() {
	const { value: id } = await Swal.fire({
		title: 'Enter #ID',
		text: "You won't be able to revert this!",
		icon: 'warning',
		input: 'number',
		showCancelButton: true
	})

	getName(id);

	if (id) {
		Swal.fire(`ID entered: ${id}`)
	}
}

async function getName(id: number) {
	await api.get<User>(`/users/${id}`).then(function (response) {
		console.log(response.data);
		users.push(response.data);
	})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.then(function () {
			// always executed
		});
}

</script>
