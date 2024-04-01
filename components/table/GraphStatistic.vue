<template>
    <v-sheet border class="rounded-lg">
        <div class="w-full" style="overflow-x: auto;">
            <div class="pt-6" :style="`min-width: 100%; width: ${getWidth}px; height: 480px`">
                <Bar ref="chartJS" :data="chartData" :options="chartOptions" ></Bar>
            </div>
        </div>

        <div class="d-flex align-center justify-center border-t px-4 ga-6" style="height: 58px; padding: 70px 24px;">
            <div v-for="item in chartData.datasets" class="d-flex align-center ga-2" style="width: min-content;">
                <span class="card_color" :style="`background-color: ${item.backgroundColor[0]}`"></span>
                <span style="max-width: 152px; font-size: 16px; line-height: 18.75px;">{{ item.label }}</span>
            </div>
        </div>
    </v-sheet>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'graph-statistic',
    components: { Bar },
    props: {
        table: {
            type: Object,
            default: ()=>{}
        }
    },
    data(){
        return {
            selectedPage: 1,
            chartOptions: {
                plugins: {
                    legend: false,
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                        // grid: {
                        //     tickLength: 100
                        // },
                        // categorySpacing: 800
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        ticks: {
                            callback: function(label, index, labels) {
                                return label +' млн';
                            }
                        }
                    },
                }
            }
        }
    },
    computed: {
        getWidth(){
            return (this.chartData?.labels?.length || 0) * 140 + 100
        },
        chartData(){
           return {
                        // "mass": 100,
                        // "personal": 100,
                        // "informational": 100,
                        // "survey": 100,
                        // "commercial_survey": 100,
                        // "service": 100
                labels: Object.keys(this.table?.departments).map(i => this.checkName(i)),
                datasets: [
                    {
                        label: 'Массовая коммуникация',
                        backgroundColor: [
                            'rgba(130, 177, 255, 1)'
                        ],
                        borderWidth: 0,
                        barThickness: 28,
                        data: Object.keys(this.table?.departments).map(i => this.table.departments[i].mass)
                        // data: [40, 20, 12, 10, 20, 123, 123, 151, 155]
                    },
                    {
                        label: 'Персональная коммуникация',
                        backgroundColor: [
                            'rgba(33, 150, 243, 1)'
                        ],
                        borderWidth: 0,
                        barThickness: 28,
                        data: Object.keys(this.table?.departments).map(i => this.table.departments[i].personal)
                    },
                    {
                        label: 'Информационная',
                        backgroundColor: [
                            'rgba(25, 118, 210, 1)'
                        ],
                        borderWidth: 0,
                        barThickness: 28,
                        data: Object.keys(this.table?.departments).map(i => this.table.departments[i].informational)
                    },
                    {
                        label: 'Опрос',
                        backgroundColor: [
                            'rgba(255, 82, 82, 1)'
                        ],
                        borderWidth: 0,
                        barThickness: 28,
                        data: Object.keys(this.table?.departments).map(i => this.table.departments[i].survey)
                    },
                    {
                        label: 'Коммерческий опрос',
                        backgroundColor: [
                            'rgba(251, 140, 0, 1)'
                        ],
                        borderWidth: 0,
                        barThickness: 28,
                        data: Object.keys(this.table?.departments).map(i => this.table.departments[i].commercial_survey)
                    },
                    {
                        label: 'Сервисная коммуникация',
                        backgroundColor: [
                            'rgba(224, 224, 224, 1)'
                        ],
                        borderWidth: 0,
                        barThickness: 28,
                        data: Object.keys(this.table?.departments).map(i => this.table.departments[i].service)
                    },
                ]
            }
        }
    },
    watch: {
        table: {
            handler(){
                // "marketing": {
                //     "mass": 100,
                //     "personal": 100,
                //     "informational": 100,
                //     "survey": 100,
                //     "commercial_survey": 100,
                //     "service": 100
                // },
                // this.resetGraph();
            },
            deep: true,
        }
    },
    methods: {
        resetGraph(){
            let dataset = JSON.parse(JSON.stringify(this.chartData.datasets))
            dataset.forEach(i => {
                i.data = []
            })
            this.chartData.labels = []
            let departments = this.table.departments
            Object.keys(departments).forEach((dep, ind) => {
                this.chartData.labels.push(dep)
                Object.keys(departments[dep]).forEach((type, index)=>{
                    dataset[index].data.push(departments[dep][type])
                })
            })
            this.chartData.datasets = dataset
            if(this.$refs.chartJS) {
                let chartJS = this.$refs.chartJS
                chartJS.chart.update()
            }
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
    .card_color {
        min-width: 28px;
        width: 100%;
        min-height: 28px;
        height: 100%;
        border: 2px solid #fff;
        border-radius: 2px;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
    }
</style>