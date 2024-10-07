import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import OrderHistoryItem from './index.vue'

vi.mock('~/utils/currency', () => ({
  formatCurrency: vi.fn(() => 'mockCurrency'),
}))

vi.mock('~/utils/date', () => ({
  getRelativeTimeFromDate: vi.fn(() => 'mockRelativeTime'),
  getTimeFromDate: vi.fn(() => 'mockedTime'),
}))

describe('OrderHistoryItem', () => {
  const props = {
    id: '1',
    total: 100,
    createdAt: new Date(),
    items: [],
  }

  it('renders order details correctly', () => {
    const wrapper = mount(OrderHistoryItem, { props })

    expect(wrapper.text()).toContain('mockedTime | mockRelativeTime')
    expect(wrapper.text()).toContain('mockCurrency')
  })

  it('renders button and emits click event with order id', async () => {
    const wrapper = mount(OrderHistoryItem, { props })

    await wrapper.find('Button').trigger('click')
    expect(wrapper.emitted('click')?.[0]).toEqual([props.id])
  })
})
