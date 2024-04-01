<template>
    <v-sheet border class="rounded-lg">
        <v-table>
            <thead>
                <tr class="header_table">
                    <th class="text-left">
                        Подразделение
                    </th>
                    <th class="text-left">
                        Массовая коммуникация
                    </th>
                    <th class="text-left">
                        Персональная коммуникация
                    </th>
                    <th class="text-left">
                        Информационная
                    </th>
                    <th class="text-left">
                        Опрос
                    </th>
                    <th class="text-left">
                        Коммерческий опрос
                    </th>
                    <th class="text-left">
                        Сервисная коммуникация
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in listItemsComp" class="items_table" :key="item.name">
                    <td>{{ checkName(item.name) }}</td>
                    <td>{{ formattedNumber(item.mass) }}</td>
                    <td>{{ formattedNumber(item.personal) }}</td>
                    <td>{{ formattedNumber(item.informational) }}</td>
                    <td>{{ formattedNumber(item.survey) }}</td>
                    <td>{{ formattedNumber(item.commercial_survey) }}</td>
                    <td>{{ formattedNumber(item.service) }}</td>
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
</template>

<script>
export default {
    name: 'table-statistic',
    props: {
        table: {
            type: Object,
            default: ()=>{}
        },
        resetPage: {
            type: Number,
            default: 0
        }
    },
    data(){
        return {
            selectedPage: 1,
        }
    },
    computed: {
        pagesList(){
            let lengthList = Object.keys(this.table?.departments || {}).length
            let pages = 1
            if(lengthList) {
                pages = Math.ceil(lengthList / 10) || 1
            }
            return Array.from({length: pages}, (_, i) => i + 1)
        },
        viewItems(){
            let itemsView = 0
            if(this.selectedPage === Math.max(...this.pagesList)) {
                itemsView =  Object.keys(this.table?.departments || {}).length - ((this.selectedPage - 1) * 10)
            } else {
                itemsView = this.selectedPage * 10
            }
            let data = `${itemsView} из ${Object.keys(this.table?.departments || {}).length}`
            return data
        },
        listItemsComp(){
            if(this.table?.departments) {
                let arrDeps = Object.keys(this.table?.departments).map(i => {
                    return {
                        name: i,
                        ...this.table.departments[i]
                    }
                })
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
        changePage(position){
            if(position === 'last') {
                this.selectedPage--
            } else if(position === 'next') {
                this.selectedPage++
            }
        },
        formattedNumber(number){
            return number.toLocaleString().replace(/,/g, ' ');
        },
        checkName(int_name){
            let names = {
                marketing: 'Маркетинг',
                sales: 'Продажи',
                informational: 'Информационный',
                survey: 'Опросы',
                commercial_survey: 'Коммерческие опросы',
                service: 'Сервисы',
            }
            return names[int_name] || int_name
        }
    },
    mounted(){

    },
}
</script>
<style>

</style>