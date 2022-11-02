<template>
  <Form :form="form">
    <SchemaField :schema="schema" :scope="{ useAsyncDataSource, loadData }" />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script lang="ts" setup>
import { createForm, type Field } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { action } from '@formily/reactive'
import { Form, FormItem, Select, Submit, Reset } from '@formily/element-plus'

const schema = {
  type: 'object',
  properties: {
    linkage: {
      type: 'string',
      title: '联动选择框',
      enum: [
        {
          label: '发请求1',
          value: 1,
        },
        {
          label: '发请求2',
          value: 2,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: 'width: 240px;',
        clearable: true,
      },
    },
    select: {
      type: 'string',
      title: '异步选择框',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: 'width: 240px;',
      },
      'x-reactions': ['{{useAsyncDataSource(loadData)}}'],
    },
  },
}

const useAsyncDataSource = (service: any) => (field: Field) => {
  field.loading = true;
  service(field).then(
    action.bound && action.bound((data: any) => {
      field.dataSource = data
      field.loading = false
    })
  )
}

const loadData = async (field: Field) => {
  const linkage = field.query('linkage').get('value')
  if (!linkage) return []
  return new Promise((resolve) => {
    setTimeout(() => {
      if (linkage === 1) {
        resolve([
          {
            label: 'AAA',
            value: 'aaa',
          },
          {
            label: 'BBB',
            value: 'ccc',
          },
        ])
      } else if (linkage === 2) {
        resolve([
          {
            label: 'CCC',
            value: 'ccc',
          },
          {
            label: 'DDD',
            value: 'ddd',
          },
        ])
      }
    }, 1)
  })
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Select,
  },
})

const onSubmit = (value: any) => {
  console.log(value)
}
</script>