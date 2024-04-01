<template>
    <div>
        <v-dialog max-width="400" v-model="deleteDialog">
            <template v-slot:default="{ isActive }">
                <v-card title="Подтверждение">
                    <template v-slot:text>
                        Вы хотите удалить API клиента? Отменить действие будет невозможно.
                    </template>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                            color="#2196F3"
                            text="Удалить"
                            variant="plain"
                            @click="()=> {isActive.value = false; this.deletingClient();}"
                        ></v-btn>

                        <v-btn
                            color="#767676"
                            text="Отменить"
                            variant="plain"
                            @click="() => {isActive.value = false; this.selectIdToDelete = ''}"
                        ></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>




        <NuxtLink to="/clients_api/create">
            <v-btn color="#2196F3" class="rounded-lg px-8 mb-4" height="48">Добавить</v-btn>
        </NuxtLink>
        <v-sheet border class="rounded-lg">
            <v-table>
                <thead>
                    <tr class="header_table">
                        <th class="text-left">
                            Имя клиента
                        </th>
                        <th class="text-left">
                            Описание клиента
                        </th>
                        <th class="text-left">
                            Дата доступа (до)
                        </th>
                        <th class="text-left">
                            Время доступа (до)
                        </th>
                        <th class="text-left" style="max-width: 40px">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in listItemsComp" class="items_table" :key="item.name">
                        <td>{{ item?.app_name }}</td>
                        <td>{{ item?.description }}</td>
                        <td>{{ formatDate(item?.access_datetime, 'date') }}</td>
                        <td>{{ formatDate(item?.access_datetime, 'time') }}</td>
                        <td style="max-width: 40px">
                            <v-menu :close-on-content-click="true">
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        :ripple="false"
                                        icon="mdi-dots-vertical" variant="plain"
                                        v-bind="props"
                                        >
                                    </v-btn>
                                </template>

                                <v-list>
                                    <v-list-item link :to="`/clients_api/${item.id}/edit`">
                                        <v-list-item-title>Редактировать</v-list-item-title>
                                    </v-list-item>


                                    <v-list-item @click="openDeleteDialog(item.id)">
                                        <v-list-item-title>Удалить</v-list-item-title>
                                    </v-list-item>



                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </tbody>
            </v-table>

            <div class="d-flex align-center justify-space-between border-t px-4" style="height: 58px;">
                <div class="d-flex align-center ga-4">
                    <span class="" style="font-size: 12px;">
                        Номер страницы
                    </span>
                    <v-select
                        bg-color="#fff"
                        density="compact"
                        hide-details
                        label=""
                        v-model="selectedPage"
                        :items="pagesList">
                    </v-select>
                    <span>
                        {{ viewItems }}
                    </span>
                </div>
                <div class="d-flex ga-4" style="">
                    <v-btn variant="text" color="grey-darken-1" icon="mdi-chevron-left" class="rounded-none px-0" :disabled="selectedPage === Math.min(...pagesList)" max-width="32" height="32" @click="changePage('last')">
                    </v-btn>
                    <v-btn variant="text" color="grey-darken-1" icon="mdi-chevron-right" class="rounded-none px-0" :disabled="selectedPage === Math.max(...pagesList)" max-width="32" height="32" @click="changePage('next')">
                    </v-btn>
                </div>
            </div>
        </v-sheet>
    </div>
</template>

<script>
import { format } from "date-fns";

export default {
    name: 'table-statistic',
    data(){
        return {
            tab: 'table',
            selectedPage: 1,
            clients: [],
            deleteDialog: false,
            selectIdToDelete: '',
        }
    },
    computed: {
        pagesList(){
            let lengthList = this.clients.length
            let pages = 1
            if(lengthList) {
                pages = Math.ceil(lengthList / 10) || 1
            }
            return Array.from({length: pages}, (_, i) => i + 1)
        },
        viewItems(){
            let itemsView = 0
            if(this.selectedPage === Math.max(...this.pagesList)) {
                itemsView =  this.clients.length - ((this.selectedPage - 1) * 10)
            } else {
                itemsView = this.selectedPage * 10
            }
            let data = `${itemsView} из ${this.clients.length}`
            return data
        },
        listItemsComp(){
            if(this.clients) {
                let arrDeps = this.clients
                let start = (this.selectedPage - 1) * 10
                let end = this.selectedPage * 10 - 1
                return arrDeps.slice(start, end)
            } else {
                return []
            }
        }
    },
    watch: {
        resetPage(){
            this.selectedPage = 1
        }
    },
    methods: {
        async getClientsApi(){
            try {
                const { data } = await useMyFetch(`/api/clients/`)
                if(data.value) {
                    this.clients = data.value
                }
            } catch (e) {
                console.log('e: ', e)
            }
        },
        async deletingClient(){
            try {
                const { status } = await useMyFetch(`/api/clients/${this.selectIdToDelete}/`, {
                    method: 'DELETE'
                })
                if(status.value === 'success') {
                    this.clients = this.clients.filter(i => i.id != this.selectIdToDelete)
                }
            } catch (e) {
                console.log('e: ', e)
            } finally {
                this.selectIdToDelete = ''
            }
        },
        formatDate(date, type){
            if(!date) return;
            if(type === 'date') {
                return format(date, 'dd.MM.yyyy')
            } else if (type === 'time') {
                return format(date, 'HH:mm')
            }
            return;
        },
        openDeleteDialog(id){
            this.deleteDialog = true
            this.selectIdToDelete = id
        }
    },
    mounted(){
        this.getClientsApi();
    },
}
</script>
<style>

</style>