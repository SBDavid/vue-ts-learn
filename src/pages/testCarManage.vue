<template>
  <div>
    <p>试驾车管理</p>
    <FormProvider :form="form">
      <SchemaField :schema="schema" />

      <FormConsumer>
        <template #default="{ form: Form }">
          <dir>
            <p>数据状态 values</p>
            {{ form.values }}
          </dir>
          <dir>
            <p>字段状态 field</p>
            <div v-for="fs in form.query('*').map(f => f).filter(f1 => isDataField(f1)).map((df) => (df as DataField).dataSource)">{{fs}}</div>
          </dir>
        </template>
      </FormConsumer>
    </FormProvider>

    <div>
      <button @click="form.reset()">reset</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createForm, onFieldValueChange, type FieldDataSource, type Form, isDataField, type DataField } from '@formily/core'
import { createSchemaField, FormProvider, FormConsumer } from '@formily/vue'
import {
  FormItem,
  FormLayout,
  Input,
  Select,
} from '@formily/element-plus'

const schema = {
  type: 'object',
  properties: {
    layout: {
      type: 'void',
      'x-component': 'FormLayout',
      'x-component-props': {
        labelCol: 10,
        wrapperWidth: 200,
        layout: [ 'inline'],
        fullness: true,
      },
      properties: {
        province: {
          type: 'string',
          title: '省市',
          // default: '上海',
          enum: [
            {
              label: '浙江',
              value: '浙江',
            },
            {
              label: '上海',
              value: '上海',
            },
          ],
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          'x-component-props': {
            style: 'width: 140;',
            clearable: true,
          },
        },
        city: {
          type: 'string',
          title: '城市',
          enum: [],
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          'x-component-props': {
            style: 'width: 140;',
            clearable: true,
          },
        },
        state: {
          type: 'string',
          title: '是否可用',
          enum: [
            {
              label: '可用',
              value: '可用',
            },
            {
              label: '不可用',
              value: '不可用',
            },
          ],
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          'x-component-props': {
            style: 'width: 140;',
            clearable: true,
          },
        },
      },
    },
  }
};

const loadData = async (province: string): Promise<FieldDataSource> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (province === '浙江') {
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
      } else if (province === '上海') {
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
    }, 150)
  })
}

const form = createForm({
  effects() {
    onFieldValueChange('province', (field, form) => {
      if (field.value !== void 0 && field.value !== '') {
        loadData(field.value).then(data => {
          form.setFieldState('layout.city', (state) => {
            //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
            state.value = '';
            state.dataSource = data;
            state.disabled = false;
          })
        });
      } else if (field.value === '') {
        // 第一种方法： form
        form.setFieldState('layout.city', (state) => {
          state.value = '';
          state.dataSource = [];
          state.disabled = true;
        })

        // 第一种方法： field
        field.query('layout.city').take().setState({
          disabled: true,
          value: '',
          dataSource: [],
        })
      }

    })
  }
})
const { SchemaField } = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Input,
    Select,
  },
})
</script>