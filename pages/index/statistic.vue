<template>
    <div>
        <div class="d-flex justify-space-between pb-4">
            <section class="d-flex ga-4">
                <v-btn variant="tonal" class="tab_button rounded-md px-8 py-1.5" :active="active_button === 'graph'" :ripple="false" @click="changeTab('graph')" height="36">
                    График
                </v-btn>
                <v-btn variant="tonal" class="tab_button rounded-md px-8 py-1.5" :active="active_button === 'table'" :ripple="false" @click="changeTab('table')" height="36">
                    Таблица
                </v-btn>
                <div v-click-outside="closeFrameDate" style="position: relative;">
                    <v-btn variant="tonal" @click="openFrameDate" append-icon="mdi-calendar-blank-outline" :ripple="false" class="tab_button d-flex justify-space-between align-center ga-2 rounded-md px-8 bg-grey-lighten-2" style="width: 262px; height: 36px;">
                        <div class="d-flex align-center" style="width: 100%; font-size: 16px;">
                            {{ titleInputForDate }}
                        </div>
                    </v-btn>
                    <div style="position: absolute; top: calc(100% + 4px)">
                        <v-date-picker border class="rounded-lg" v-if="openedDate" hide-header v-model="dates" multiple="range"></v-date-picker>
                    </div>
                </div>
            </section>

            <v-btn variant="flat" class="rounded-lg" color="#2196F3" size="x-large" width="171" height="48" style="font-size: 14px; font-weight: 500;text-transform: none;">
                Экспорт в .CSV
            </v-btn>

        </div>
        <TableStatistic v-if="active_button === 'table'" :resetPage="resetPage" :table="table" :datesForStats="datesForStats" />
        <TableGraphStatistic v-if="active_button === 'graph'" :table="table" :datesForStats="datesForStats" />
    </div>
</template>

<script>
import { format } from "date-fns";

export default {
    name: 'index-table',
    data(){
        return {
            today: 0,
            resetPage: 0,

            openedDate: false,
            dates: [],
            active_button: 'table',

            openedDropList: false,

            items: [
                {title: 'Текущий месяц', value: 'current_month'},
                {title: 'За сегодня', value: 'today'},
                {title: 'За неделю', value: 'week'},
                {title: 'За месяц', value: 'month'},
                {title: 'Период "от" и "до"', value: 'calendar'},
            ],

            selectPeriod: 'current_month',

            table: {
                "total": {
                    "mass": 600,
                    "personal": 600,
                    "informational": 600,
                    "survey": 600,
                    "commercial_survey": 600,
                    "service": 600
                },
                "departments": {
                    "marketing": {
                        "mass": 100,
                        "personal": 100,
                        "informational": 100,
                        "survey": 100,
                        "commercial_survey": 100,
                        "service": 100
                    },
                    "sales": {
                        "mass": 100,
                        "personal": 100,
                        "informational": 100,
                        "survey": 100,
                        "commercial_survey": 100,
                        "service": 100
                    },
                    "informational": {
                        "mass": 100,
                        "personal": 100,
                        "informational": 100,
                        "survey": 100,
                        "commercial_survey": 100,
                        "service": 100,
                    },
                    "survey": {
                        "mass": 100,
                        "personal": 100,
                        "informational": 100,
                        "survey": 100,
                        "commercial_survey": 100,
                        "service": 100
                    },
                    "commercial_survey": {
                        "mass": 100,
                        "personal": 100,
                        "informational": 1001,
                        "survey": 100,
                        "commercial_survey": 100,
                        "service": 100
                    },
                    "service": {
                        "mass": 100,
                        "personal": 100,
                        "informational": 100,
                        "survey": 100,
                        "commercial_survey": 100,
                        "service": 100
                    },
                    "marketing1": {
                        "mass": 100,
                        "personal": 100,
                        "informational": 100,
                        "survey": 100,
                        "commercial_survey": 100,
                        "service": 100
                    },
                    "sales1": {
                        "mass": 100,
                        "personal": 100,
                        "informational": 100,
                        "survey": 100,
                        "commercial_survey": 100,
                        "service": 100
                    },
                    "informational1": {
                        "mass": 100,
                        "personal": 100,
                        "informational": 100,
                        "survey": 100,
                        "commercial_survey": 100,
                        "service": 100,
                    },
                    "survey1": {
                        "mass": 100,
                        "personal": 100,
                        "informational": 100,
                        "survey": 100,
                        "commercial_survey": 100,
                        "service": 100
                    },
                    "commercial_survey1": {
                        "mass": 100,
                        "personal": 100,
                        "informational": 100,
                        "survey": 100,
                        "commercial_survey": 100,
                        "service": 100
                    },
                    "service1": {
                        "mass": 100,
                        "personal": 100,
                        "informational": 100,
                        "survey": 100,
                        "commercial_survey": 100,
                        "service": 100
                    }
                }
            }
        }
    },
    computed: {
        titleInputForDate(){
            let namesObj = {
                current_month: 'Текущий месяц',
                today: 'За сегодня',
                week: 'За неделю',
                month: 'За месяц',
                calendar: 'Выбрать даты',
            }
            if(this.selectPeriod === 'calendar' && this.datesForStats?.start && this.datesForStats?.end) {
                return `${format(this.datesForStats?.start, 'dd.MM.yyyy')} - ${format(this.datesForStats?.end, 'dd.MM.yyyy')}`
            }
            return namesObj[this.selectPeriod]
        },
        datesForStats(){
            switch (this.selectPeriod) {
                case 'current_month': {
                    let timeStart = format(this.today, 'yyyy-MM-01')
                    let timeEnd = format(this.today, 'yyyy-MM-dd')
                    return {
                        start: timeStart,
                        end: timeEnd
                    }
                }
                case 'today': {
                    let timeToday = format(this.today, 'yyyy-MM-dd')
                    return {
                        start: timeToday,
                        end: timeToday
                    }
                }
                case 'week': {
                    let timeStart = format(getMonday(this.today), 'yyyy-MM-dd')
                    let timeEnd = format(this.today, 'yyyy-MM-dd')
                    return {
                        start: timeStart,
                        end: timeEnd,
                    }
                }
                case 'month': {
                    let date = new Date(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate())
                    let timeStart = format(date, 'yyyy-MM-dd')
                    let timeEnd = format(this.today, 'yyyy-MM-dd')
                    return {
                        start: timeStart,
                        end: timeEnd,
                    }
                }
                case 'calendar': {
                    if(this.dates?.length){
                        let timeStart = format(this.dates[0], 'yyyy-MM-dd')
                        let timeEnd = format(this.dates[this.dates.length - 1], 'yyyy-MM-dd')
                        return {
                            start: timeStart,
                            end: timeEnd,
                        }
                    } else {
                        return {
                            start: null,
                            end: null,
                        }
                    }
                }
            }
        },
    },
    watch: {
        dates(){
            this.getStatistic();
        },
        selectPeriod(){
            this.getStatistic();
        }
    },
    methods: {
        closeFrameDate(){
            this.openedDate = !1
            this.openedDropList = !1
        },
        openFrameDate(){
            this.openedDate = !this.openedDate
            this.openedDropList = !1
        },
        openDropList(){
            this.openedDropList = !this.openedDropList
            this.openedDate = !1
        },

        changeTime(arg){
            this.selectPeriod = arg.id
        },

        changeTab(tab){
            this.active_button = tab
        },
        async getStatistic(){
            try {
                this.resetPage++
                let { data } = await useMyFetch(`/api/statistics/`, {
                    methods: "GET",
                    params: {
                        date_from: this.datesForStats?.start,
                        date_to: this.datesForStats?.end
                    }
                })
                if(data.value) {
                    this.table = data.value
                }
            } catch (e) {
                console.log('e: ', e)
            }
        },

    },
    mounted(){
        this.today = new Date()
        this.getStatistic()
    },
}
</script>
<style scoped>


</style>

<style>

    .tab_button {
        text-transform: none;
        background-color: #E0E0E0;
        font-weight: 400;
    }

    .tab_button .v-btn__content {
        font-size: 16px;
    }

    .v-btn--active {
        background-color: #2196F3;
        color: #fff;
    }

    .v-table {
        border-radius: 10px;
    }

    .header_table th {
        font-weight: 700;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.58);
    }
    .items_table td {
        font-weight: 400;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.87);
    }
    .items_table::last-child(){
        border-bottom: 1px solid red;
    }
</style>