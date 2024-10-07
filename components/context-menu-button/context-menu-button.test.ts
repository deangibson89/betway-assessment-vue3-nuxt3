import { mount } from '@vue/test-utils'
import { Circle } from 'lucide-vue-next'
import { describe, expect, it, vi } from 'vitest'
import ContextMenuButton from './index.vue'

describe('ContextMenuButton', () => {
  const onClickMock = vi.fn()
  const props = {
    menuItems: [
      { label: 'Item 1', icon: Circle, onClick: onClickMock },
      { label: 'Item 2', icon: Circle, onClick: onClickMock },
    ],
  }

  it('renders menu items correctly', async () => {
    const wrapper = mount(ContextMenuButton, { props })

    const button = wrapper.find('button')
    await button.trigger('click')

    const buttons = wrapper.findAll('div[role="menu"] button')
    expect(buttons).toHaveLength(props.menuItems.length)
    expect(buttons[0].text()).toBe(props.menuItems[0].label)
    expect(buttons[1].text()).toBe(props.menuItems[1].label)
  })

  it('calls onClick when a menu item is clicked', async () => {
    const wrapper = mount(ContextMenuButton, { props })

    const button = wrapper.find('button')
    await button.trigger('click')

    const buttons = wrapper.findAll('div[role="menu"] button')
    await buttons[0].trigger('click')
    expect(onClickMock).toHaveBeenCalled()
  })
})
