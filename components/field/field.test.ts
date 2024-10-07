import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Field from './index.vue'

describe('Field', () => {
  it('renders the label when provided', () => {
    const wrapper = mount(Field, {
      props: {
        label: 'Test Label',
        modelValue: '',
        id: 'test-id',
      },
    })
    expect(wrapper.find('label').text()).toBe('Test Label')
  })

  it('does not render the label when not provided', () => {
    const wrapper = mount(Field, {
      props: {
        modelValue: '',
        id: 'test-id',
      },
    })
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('updates modelValue on input', async () => {
    const wrapper = mount(Field, {
      props: {
        modelValue: '',
        id: 'test-id',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('New Value')

    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['New Value'])
  })
})
