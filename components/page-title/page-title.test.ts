import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PageTitle from './index.vue'

describe('PageTitle', () => {
  const props = { title: 'Test Title' }

  it('renders the title prop correctly', () => {
    const wrapper = mount(PageTitle, {
      props,
    })

    expect(wrapper.find('h1').text()).toBe(props.title)
  })

  it('renders default slot content', () => {
    const wrapper = mount(PageTitle, {
      props,
      slots: {
        default: 'Slot Content',
      },
    })

    expect(wrapper.html()).toContain('Slot Content')
  })
})
