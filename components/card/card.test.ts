import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Card from './index.vue'

describe('Card', () => {
  it('renders the title when provided', () => {
    const title = 'Test Title'
    const wrapper = mount(Card, {
      props: { title },
    })
    expect(wrapper.find('h2').text()).toBe(title)
  })

  it('does not render the title when not provided', () => {
    const wrapper = mount(Card)
    expect(wrapper.find('h2').exists()).toBe(false)
  })

  it('renders default slot content', () => {
    const slotContent = 'This is slot content'
    const wrapper = mount(Card, {
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.text()).toContain(slotContent)
  })
})
