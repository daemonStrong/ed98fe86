<template>
    <v-app>
        <slot />
    </v-app>
</template>

<style>
    .v-application__wrap {
        background-color: #E5E5E5;
    }
    body * {
        font-family: "Roboto", sans-serif;
    }
    .v-btn {
        text-transform: none;
        letter-spacing: normal;
    }
</style>