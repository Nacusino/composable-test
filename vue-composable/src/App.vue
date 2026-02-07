<template>
  <div>
    <FormComponent :validated="validated" :fields="fields" @updateFields="updateFields"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormComponent from './components/FormComponent.vue';
import {useForm} from './composables/useForm.ts';
import type { Field } from './types/Field.ts';

//список { поле, правило(regex)} --> 
const fields = ref<Array<Field>>([
  { id:1,value:'',label:'First Name',rule:'[a-zA-Z]+', touched: false},
  { id:2,value:'',label:'Email',rule:'[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]+', touched: false},
  { id:3,value:'',label:'Password',rule:'[a-zA-Z0-9_-]{6,}', touched: false}])
const {validated} = useForm(fields)
const updateFields = (newFields:Array<Field>) => {
  fields.value = newFields
}
const form = ref<InstanceType<typeof FormComponent> | null>(null)

</script>

<style scoped>

</style>