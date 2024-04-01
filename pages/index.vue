<template>
    <div class="py-10">
        <div class="mx-auto max-width ga-4" style="display: grid; grid-template-columns: 240px 1fr;">
            <div class="gy-2" style="display: grid; grid-auto-rows: max-content">
                <NuxtLink class="mb-2" :to="navItem.link" v-for="navItem in navListItems" :key="navItem.link">
                    <div class="tab_button rounded-lg px-6 py-3" :class="{'active' : $route.path.includes(navItem.link)}">
                        {{ navItem.name }}
                    </div>
                </NuxtLink>
            </div>
            <NuxtPage />
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            navListItems: [
                {link: '/statistic', name: 'Статистика'},
                {link: '/users', name: 'Пользователи'},
                {link: '/communication_rules', name: 'Правила коммуникации'},
                {link: '/clients_api', name: 'Клиенты API'},
            ]
        }
    }
}
</script>

<style scoped>

    .max-width {
        max-width: 1300px;
    }


    .tab_button {
        cursor: pointer;
        display: block;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
        background-color: #fff;
        color: rgba(0, 0, 0, 0.87);
        font-size: 16px;
        font-weight: 500;
        position: relative;
        overflow: hidden;
    }

    .v-btn__overlay {
        border-radius: 0;
    }

    .tab_button.active::before {
        content: '';
        width: 100%;
        height: 5px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #2196F3;
    }

</style>