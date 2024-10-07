import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Counter from './index.vue'

describe('Counter', () => {
  it('renders with initial value', () => {
    const wrapper = mount(Counter, {
      props: { value: 5 },
    })
    expect(wrapper.find('span').text()).toBe('5')
  })

  it('emits update:value with decreased value', async () => {
    const wrapper = mount(Counter, {
      props: { value: 2 },
    })
    await wrapper.find('button[aria-label="Decrease split"]').trigger('click')
    expect(wrapper.emitted()['update:value'][0]).toEqual([1])
  })

  it('does not emit update:value when value is 1 or less', async () => {
    const wrapper = mount(Counter, {
      props: { value: 1 },
    })
    await wrapper.find('button[aria-label="Decrease split"]').trigger('click')
    expect(wrapper.emitted()['update:value']).toBeUndefined()
  })

  it('emits update:value with increased value', async () => {
    const wrapper = mount(Counter, {
      props: { value: 3 },
    })
    await wrapper.find('button[aria-label="Increase split"]').trigger('click')
    expect(wrapper.emitted()['update:value'][0]).toEqual([4])
  })
})
