import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import OrderItemField from './index.vue'

vi.mock('~/utils/currency', () => ({
  formatCurrency: vi.fn((data) => `R ${data.amount.toFixed(2)}`),
}))

describe('OrderItemField', () => {
  it('renders props correctly', () => {
    const props = {
      name: 'Test Item',
      price: 10.5,
      quantity: 2,
    }

    const wrapper = mount(OrderItemField, { props })

    expect(wrapper.find('span').text()).toBe('Test Item')
    expect(wrapper.findAll('span')[1].text()).toBe('R 10.50')
    expect(wrapper.findComponent({ name: 'Counter' })).toBeTruthy()
  })
})
