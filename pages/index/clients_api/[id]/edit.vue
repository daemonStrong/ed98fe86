<template>
    <div style="height: max-content">
        <v-sheet border class="rounded-lg pa-6" style="display: grid; row-gap: 24px; max-width: 1120px">
            <span class="title">Редактирование API клиента</span>

            <div class="" style="display: grid; row-gap: 24px; height: max-content">
                <v-text-field color="#2196F3" density="compact" hide-details label="Имя клиента" variant="outlined" v-model="app_name" style="max-width: 536px"></v-text-field>
                <v-text-field color="#2196F3" density="compact" hide-details label="Описание" variant="outlined" v-model="description" style="max-width: 536px"></v-text-field>

                <span style="font-size: 16px; font-weight: 500;">Период доступа</span>

                <div class="d-flex ga-5" style="width: 536px;">
                    <v-text-field
                        variant="outlined"
                        density="compact"
                        label="Дата до"
                        color="#2196F3"
                        persistentPlaceholder
                        :placeholder="formatDate(date)"
                        :value="formatDate(date)"
                        >
                        <template #append-inner>
                            <v-btn icon flat  density="compact"
                                >
                                <v-icon color="grey-darken-1">mdi-calendar-blank-outline</v-icon>
                                <v-menu activator="parent" :close-on-content-click="false">
                                    <v-date-picker
                                        color="#2196F3"
                                        hideHeader
                                        v-model="date"
                                        >
                                    </v-date-picker>
                                </v-menu>
                            </v-btn>
                        </template>
                    </v-text-field>

                    <v-text-field
                        type="time"
                        variant="outlined"
                        density="compact"
                        label="Время до"
                        color="#2196F3"
                        persistentPlaceholder
                        v-model="time"
                        >
                        <template #append-inner>
                            <v-btn icon flat  density="compact"
                                >
                                <v-icon color="grey-darken-1">mdi-timer-outline</v-icon>
                            </v-btn>
                        </template>
                    </v-text-field>
                </div>

            </div>
        </v-sheet>
        <div class="d-flex ga-2 mt-2">
            <v-btn color="#2196F3" class="rounded-lg px-8" variant="outlined" @click="$router.back()" height="48">Отменить</v-btn>
            <v-btn color="#2196F3" class="rounded-lg px-8" @click="updateClient" height="48">Сохранить</v-btn>
        </div>
    </div>
</template>

<script>
import { format } from "date-fns";

export default {
    name: '',
    data(){
        return {
            app_name: '',
            description: '',
            date: '',
            time: '',
        }
    },
    computed: {

    },
    watch: {

    },
    methods: {
        async getInfoClient(){
            try {
                const { data } = await useMyFetch(`/api/clients/${this.$route.params.id}/`)
                if(data.value) {
                    this.time = format(data.value.access_datetime, 'HH:mm')
                    this.date = new Date(data.value.access_datetime)
                    this.description = data.value.description
                    this.app_name = data.value.app_name
                }
            } catch (e) {
                console.log('e: ', e)
            }
        },
        async updateClient(){
            try {
                let dateForSend = `${format(this.date, 'yyyy-MM-dd')}T${this.time}:00.000Z`
                const { data } = await useMyFetch(`/api/clients/${this.$route.params.id}/`, {
                    method: 'PUT',
                    body: {
                        app_name: this.app_name,
                        description: this.description,
                        access_datetime: dateForSend,
                    }
                })
                if(data.value) {
                    this.$router.back();
                }
            } catch (e) {
                console.log('e: ', e)
            }
        },
        formatDate(date){
            if(!date) return;
            return format(date, 'dd.MM.yyyy')
        }
    },
    mounted(){
        this.getInfoClient();
    },
}
</script>
<style>

</style>