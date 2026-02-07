import type { Field } from "@/types/Field"
import { computed, ref, type Ref } from "vue"

export const useForm = (fields: Ref<Array<Field>>) => {
    
    const validated = computed(() => {
        return fields.value.map(field => {
            const regexp: RegExp = new RegExp(field.rule)
            return regexp.test(field.value)
        })
    })

    return {validated}
}
