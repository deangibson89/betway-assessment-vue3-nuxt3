import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PageTitle from './index.vue'

describe('PageTitle', () => {
  const props = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
  }

  it('renders the title prop correctly', () => {
    const wrapper = mount(PageTitle, { props })
    expect(wrapper.find('h1').text()).toBe(props.title)
  })

  it('renders the subtitle prop correctly', () => {
    const wrapper = mount(PageTitle, { props })
    expect(wrapper.find('h2').text()).toBe(props.subtitle)
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
