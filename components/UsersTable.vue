<template>
  <v-row>
    <v-col cols="12">
      <v-btn flat color="blue" href="/users/create/" height="48px" class="mb-4">Добавить</v-btn>
      <v-table
        height="300px"
        fixed-header
      >
        <thead>
          <tr>
            <th class="text-left">
              ФИО
            </th>
            <th class="text-left">
              Email
            </th>
            <th class="text-left">
              Телефон
            </th>
            <th class="text-left">
              Статус
            </th>
            <th class="text-left">
              Подразделение
            </th>
            <th class="text-left">
              Канал отправки
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in users"
            :key="item.name"
            @click="$router.push(`/users/${item.id}`)"
          >
            <td>{{ item.full_name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone }}</td>
            <td>
              <v-chip label :color="item.status !== 'ACTIVE' ? 'error' : 'success'">
                {{ item.status !== 'ACTIVE' ? 'ЗАБЛОКИРОВАН' : 'АКТИВЕН' }}
              </v-chip>
            </td>
            <td>{{ item.department }}</td>
            <td>
              <v-row>
                <v-col>
                  {{ item?.preferred_contact_method.join(', ') }}
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        flat
                        slim
                        icon="mdi-dots-vertical"
                        size="small"
                      />
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title @click="$router.push(`/users/${item.id}/edit/`)">
                          Редактировать
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-dialog max-width="500">
                          <template v-slot:activator="{ props: activatorProps }">
                            <v-list-item-title v-bind="activatorProps">Удалить</v-list-item-title>
                          </template>
    
                          <template v-slot:default="{ isActive }">
                            <v-card title="Подтверждение">
                              <v-card-text>
                                Вы хотите удалить пользователя? Отменить действие будет невозможно.
                              </v-card-text>
    
                              <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                  color="blue"
                                  text="Удалить"
                                  @click="onDeleteClick(item.id)"
                                  :loading="isLoading"
                                />
                                <v-btn
                                  text="Отменить"
                                  @click="isActive.value = false"
                                />
                              </v-card-actions>
                            </v-card>
                          </template>
                        </v-dialog>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  interface User {
    email: string;
    full_name: string;
    id: number;
    phone: string;
    status: 'ACTIVE';
  }

  const { data: users, refresh } = await useFetch('http://127.0.0.1:8008/api/users/', {
    lazy: true,
    server: false
  })

  const isLoading = ref(false)

  const onDeleteClick = async (id: string) => {
    isLoading.value = true
    try {
      const response = await $fetch(`http://127.0.0.1:8008/api/users/${id}/`, {
        method: 'DELETE'
      })
    } catch(error) {
      console.error(error)
    } finally {
      isLoading.value = false
      refresh()
    }
  }
</script>
