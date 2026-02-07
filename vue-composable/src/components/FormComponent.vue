<template>
    <div class="form">
        <h3>Регистрация пользователя</h3>
        <input 
        v-for="(field, id) in fields" 
        class="input"
        :class="!validated[id] && field.touched ? 'uncorrect' : 'correct'"
        :value="field.value" 
        :placeholder="field.label" 
        pattern="field.rule"
        @input="handleUpdate(id, $event, fields)"
        @blur="field.touched = true"/>
        <button class="submit">Submit</button>
    </div>
</template>

//если поле некорректное и тронуто -> false иначе true

<script setup lang="ts">
import type { Field } from '@/types/Field';
import type { Ref } from 'vue';

interface Props {
    validated: Array<boolean>,
    fields: Array<Field>
}
defineProps<Props>()

const emits = defineEmits<{
    (e: 'updateFields', f: Array<Field>): void
}>()
 

const handleUpdate = (id:Number, event:Event, fields:Array<Field>) => {
    const target = event.target as HTMLInputElement
    const value = target.value
    const updated: Array<Field> = fields.map((field:Field, idn: Number) => id === idn ? {...field, value: target.value}: field)
    emits('updateFields', updated)
}
const handleBlur = (id:number) => {
    
}
</script>

<style scoped>
.form {
    width: 400px;
}
.input {
    height: 30px;
    width: 100%;
    border: 2px solid grey;
    margin-bottom: 15px;
    padding: 10px 10px 10px 10px;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: Arial;
}
.input:focus {
    border: 2px solid rgb(82, 186, 255);
    outline: none
}
.uncorrect {
    border: 2px solid red;
}
.submit {
    height: 30px;
    width: 100%;
    background-color: darkgrey;
    color: white;
    font-weight: bold;
    border: 2px solid grey;
    border-radius: 5px;
    font-family: Arial;
}
h3 {
  text-align: center;
  font-family: Arial;
}
</style>