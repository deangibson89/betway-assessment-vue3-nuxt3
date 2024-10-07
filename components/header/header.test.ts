import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Header from './index.vue'

describe('Header', () => {
  it('renders the logo image', () => {
    const wrapper = mount(Header)
    const nuxtLink = wrapper.findComponent({ name: 'NuxtLink' })

    expect(nuxtLink.exists()).toBe(true)
    expect(nuxtLink.props('to')).toBe('/')
  })
})
