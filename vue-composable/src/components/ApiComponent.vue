<template>
    <div>
      <h3>Результаты запроса</h3>
      <h4>Данные</h4>
      <div class="item">
        <pre>{{ data }}</pre>
      </div>
      <h4>Наличие загрузки</h4>
      <div class="item">
        {{ loading }}
      </div>
      <h4>Ошибка</h4>
      <div class="item">
        {{ error?.message }}
      </div>
      <h4>Статус запроса</h4>
      <div class="item">
        {{ status }}
      </div>
      <button class="btn" @click="fetchData">
      {{loading? 'Загрузка' :  'Отправить запрос'}}
      </button>
    </div>
</template>

<script setup lang="ts">
interface Props {
    data:Object | null,
    loading:boolean,
    error: Error|null,
    status: number
}
defineProps<Props>()

const emits = defineEmits<{
    (e: 'fetchData'): void
}>()

const fetchData = (event:Event) => {
  emits('fetchData') 
}
</script>

<style scoped>
.item {
  border: 2px solid grey;
  border-radius: 5px;
  padding: 10px;
  min-height: 20px;
}
pre {
  white-space: pre-wrap;
}
h3,h4 {
  text-align: center;
  font-family: Arial;
}
.btn {
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  background-color: darkgrey;
  color: white;
  font-weight: bold;
  border: 2px solid grey;
  border-radius: 5px;
  font-family: Arial;
  padding-top: border-box;
  margin-top: 20px;
}
</style>