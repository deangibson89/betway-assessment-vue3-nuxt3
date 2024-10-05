import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Button from './index.vue'

describe('Button', () => {
  it('emits click event when clicked', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click Me',
      },
    })
    expect(wrapper.text()).toContain('Click Me')
  })
})
