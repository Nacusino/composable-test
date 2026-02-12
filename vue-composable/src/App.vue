<template>
  <div>
    <FormComponent :validated="validated" :fields="fields" @updateFields="updateFields"/>
    <ApiComponent :data="data" :loading="loading" :error="error" :status="status" @fetchData="fetchData" style="margin-top: 50px;"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormComponent from './components/FormComponent.vue';
import {useForm} from './composables/useForm.ts';
import type { Field } from './types/Field.ts';
import { useApi } from './composables/useApi.ts';
import ApiComponent from './components/ApiComponent.vue';

const fields = ref<Array<Field>>([
  { id:1,value:'',label:'First Name',rule:'[a-zA-Z]+', touched: false},
  { id:2,value:'',label:'Email',rule:'[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]+', touched: false},
  { id:3,value:'',label:'Password',rule:'[a-zA-Z0-9_-]{6,}', touched: false}])
const {validated} = useForm(fields)

const headers = new Headers()
headers.append('Content-Type', 'application/json')

const {data, loading, error, status, fetchData} = useApi(
  'https://jsonplaceholder.typicode.com/posts/1', 
  'GET', 
  headers, 
  { postId: 3 }, 
  '{"data": "Example"}')

const updateFields = (newFields:Array<Field>) => {
  fields.value = newFields
}

</script>

<style scoped>

</style>