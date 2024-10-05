import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Header from './index.vue'

describe('Header', () => {
  it('renders the logo image', () => {
    const wrapper = mount(Header)
    const logo = wrapper.find('img')

    expect(logo.exists()).toBe(true)
    expect(logo.attributes('src')).toBe('/assets/images/logo.svg')
    expect(logo.attributes('alt')).toBe('logo')
  })
})
