<template>
    <div style="height: max-content">
        <v-sheet border class="rounded-lg pa-6" style="display: grid; row-gap: 24px; max-width: 1120px">
            <span class="title">Правила коммуникации</span>
            <div class="d-flex" style="gap: 8px; flex-wrap: wrap">
                <template v-for="dep in departments" :key="dep.internal_name">
                    <v-chip class="button_tab" :class="{'active': selected_dep === dep.internal_name}" :ripple="false" @click="changeDep(dep.internal_name)">
                        {{ dep.name }}
                    </v-chip>
                </template>
            </div>
            <div class="" style="display: grid; grid-template-columns: repeat(4, 1fr); column-gap: 20px; height: max-content">
                <v-text-field color="#2196F3" density="compact" label="Лимит на коммуникацию" variant="outlined" v-model="communication_limit"></v-text-field>
                <v-select
                    color="#2196F3"
                    density="compact"
                    menu-icon="mdi-chevron-down"
                    label="Массовый канал"
                    :items="['SMS', 'Email']"
                    variant="outlined"
                    v-model="mass"
                    >
                    <template #item="{ item, select }">
                        <v-list style="padding: 0 !important">
                            <v-list-item :class="{'bg-grey-lighten-5' : mass === item.value}" @click="mass = item.value">
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                                <template v-if="mass === item.value" #append>
                                    <v-icon color="#000000">mdi-check</v-icon>
                                </template>
                            </v-list-item>
                        </v-list>
                    </template>
                </v-select>
                <v-select
                    color="#2196F3"
                    density="compact"
                    menu-icon="mdi-chevron-down"
                    label="Персональный канал"
                    :items="['Messenger', 'Push']"
                    variant="outlined"
                    v-model="personal"
                    >
                    <template #item="{ item }">
                        <v-list style="padding: 0 !important">
                            <v-list-item :class="{'bg-grey-lighten-5' : personal === item.value}" @click="personal = item.value">
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                                <template v-if="personal === item.value" #append>
                                    <v-icon color="#000000">mdi-check</v-icon>
                                </template>
                            </v-list-item>
                        </v-list>
                    </template>
                </v-select>
            </div>
        </v-sheet>
        <div class="d-flex ga-2 mt-2">
            <v-btn color="#2196F3" class="rounded-lg px-8" variant="outlined" @click="getRules" height="48">Отменить</v-btn>
            <v-btn color="#2196F3" class="rounded-lg px-8" @click="updateRules" height="48">Сохранить</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'communication-rules',
    data(){
        return {
            needPost: false,
            selected_dep: 'marketing',
            communication_limit: '1000',
            mass: 'SMS',
            personal: 'Push',
            departments: [
                // {name: 'Маркетинг', internal_name: 'marketing'},
                // {name: 'Продажи', internal_name: 'sales'},
                // {name: 'Информационный', internal_name: 'informational'},
                // {name: 'Опросы', internal_name: 'survey'},
                // {name: 'Коммерческие опросы', internal_name: 'commercial_survey'},
                // {name: 'Сервисы', internal_name: 'service'},
            ]
        }
    },
    computed: {

    },
    watch: {
        selected_dep(){
            this.getRules();
        },
    },
    methods: {
        changeDep(dep) {
            this.selected_dep = dep
        },
        async getRules(){
            try {
                const { data } = await useMyFetch(`/api/communication-rules/${this.selected_dep}`, {
                    method: 'GET'
                })
                if(data.value) {
                    this.needPost = false
                    this.id = data.value.id
                    this.communication_limit = data.value.communication_limit
                    this.mass = data.value.preferred_mass_channels.join()
                    this.personal = data.value.preferred_personal_channels.join()
                } else {
                    this.needPost = true
                    this.communication_limit = '1000'
                    this.mass = 'SMS'
                    this.personal = 'Push'
                }
            } catch (e) {
                console.log('e: ', e)
            }
        },

        async postRules(){
            try {
                let forSend = {
                    department: this.selected_dep,
                    communication_limit: this.communication_limit,
                    preferred_mass_channels: [this.mass],
                    preferred_personal_channels: [this.personal]
                }
                const { data } = await useMyFetch(`/api/communication-rules/`, {
                    method: 'POST',
                    body: forSend
                })
                if(data.value) {
                    this.id = data.value.id
                }
            } catch (e) {
                console.log('e: ', e)
            }
        },
        async putRules(){
            let forSend = {
                    department: this.selected_dep,
                    communication_limit: this.communication_limit,
                    preferred_mass_channels: [this.mass],
                    preferred_personal_channels: [this.personal]
                }
                const { data } = await useMyFetch(`/api/communication-rules/${this.id}/`, {
                    method: 'PUT',
                    body: forSend
                })
                if(data.value) {
                    this.id = data.value.id
                }
        },
        updateRules(){
            if(this.needPost) {
                this.postRules();
            } else {
                this.putRules();
            }
        },
        async getDepartments(){
            try {
                let { data } = await useMyFetch(`/api/departments/`)
                if(data.value) {
                    this.departments = data.value
                }
            } catch (e) {
                console.log('e: ', e)
            }
        }
    },
    mounted(){
        this.getRules()
        this.getDepartments();
    },
}
</script>
<style>
    .button_tab {
        border-radius: 4px;
        min-height: 36px;
        padding: 0 32px !important;
        cursor: pointer;
    }

    .button_tab.active {
        background-color: #2196F3;
        color: #FFFFFF;
    }


    .title {
        font-size: 20px;
        font-weight: 500;
    }
    .v-input__details {
        display: none !important;
    }
</style>