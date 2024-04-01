<template>
  <v-form v-model="valid" @submit.prevent>
    <v-container class="bg-white rounded-lg">
      <v-row>
        <v-col>
          <div class="personal-data-text">
            Личные данные
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="9">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.full_name"
                :counter="10"
                :rules="nameRules"
                label="ФИО"
                required
                variant="outlined"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                label="E-mail"
                required
                variant="outlined"
              />
            </v-col>

            <v-col cols="4">
              <v-text-field
                type="tel"
                v-model="form.phone"
                :rules="[(v) => !!v || 'Телефон обязателен']"
                label="Телефон"
                required
                variant="outlined"
              />
            </v-col>

            <v-col>
              <v-select
                v-model="form.status"
                label="Cтатус"
                :items="[{title: 'Активный', value: 'ACTIVE'}, {title: 'Заблокирован', value: 'BLOCKED'}]"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="bg-white mt-4 rounded-lg">
      <v-row>
        <v-col>
          <div class="personal-data-text">
            Подразделение и коммуникация
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="department"
                label="Подразделение"
                :items="[{title: 'Продажи', value: '1'}, {title: 'Маркетинг', value: '2'}, {title: 'Paзработка', value: '3'}, {title: 'Дизайн', value: '4'}, {title: 'Поддержка', value: '5'}]"
                variant="outlined"
              />
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="form.preferred_contact_method"
                label="Канал отправки"
                :items="[{title: 'SMS', value: 'SMS'}, {title: 'Messenger', value: 'Messenger'}, {title: 'Push', value: 'Push'}, {title: 'Email', value: 'Email'}]"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="auto">
          <v-btn
            variant="outlined"
            color="#2196F3"
            @click="back()"
          >
            Отменить
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn type="submit" @click="submit" :disabled="!valid && false" :loading="isLoading" color="#2196F3">
            {{ !$route.params?.id ? 'Добавить' : 'Сохранить' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    
  </v-form>
</template>

<script lang="ts" setup>
  interface User {
    email: string;
    full_name: string;
    id: number;
    phone: string;
    status: 'ACTIVE' | 'BLOCKED';
  }

  const form = reactive({
    "full_name": "string",
    "email": "user@example.com",
    "phone": "string",
    "status": "ACTIVE",
    "preferred_contact_method": [
      "SMS"
    ]
  })

  const valid = ref(false)
  const isLoading = ref(false)

  const { params } = useRoute()
  const { back } = useRouter()
  const { data, pending, error, refresh } = await useFetch(`http://127.0.0.1:8008/api/users/${params?.id}/`, {
    immediate: false
  })

  const name = ref('')
  const nameRules = [
    value => {
      if (value) return true

      return 'Name is required.'
    },
    value => {
      if (value?.length >= 10) return true

      return 'Полное имя должно быть длиннее 10 букв.'
    }
  ]

  const emailRules = [
    value => {
      if (value) return true

      return 'E-mail обязателен.'
    },
    value => {
      if (/.+@.+\..+/.test(value)) return true

      return 'неправильный E-mail.'
    }
  ]

  if(params?.id) {
    await refresh()
    form.full_name = data.value.full_name
    form.email = data.value.email
    form.phone = data.value.phone
    form.status = data.value.status
    form.preferred_contact_method = data.value.preferred_contact_method
  }
  
  const submit = async () => {
    isLoading.value = true
    try {
      const response = await $fetch(`http://127.0.0.1:8008/api/users${!params?.id ? '' : `/${params?.id}`}/`, {
        method: !params?.id ? 'POST' : 'PUT',
        body: form
      })
    } catch(error) {
      console.error(error)
    } finally {
      isLoading.value = false
      back()
    }
  }

  const department = ref('1')
</script>

<style lang="scss" scoped>
.personal-data-text {
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0.25px;
  text-align: left;
}
</style>