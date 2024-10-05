import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Table from './index.vue'

describe('Table', () => {
  const columns = ['Name', 'Age']
  const rows = [
    { id: 1, Name: 'John Doe', Age: 30 },
    { id: 2, Name: 'Jane Doe', Age: 25 },
  ]

  it('renders the table with correct columns and rows', () => {
    const wrapper = mount(Table, {
      props: { columns, rows },
    })

    const headers = wrapper.findAll('th')
    expect(headers).toHaveLength(columns.length)

    columns.forEach((col, index) => {
      expect(headers[index].text()).toBe(col)
    })

    const tableRows = wrapper.findAll('tr').slice(1)
    expect(tableRows).toHaveLength(rows.length)

    tableRows.forEach((row, index) => {
      const cells = row.findAll('td')
      expect(cells).toHaveLength(Object.keys(rows[index]).length)

      Object.keys(rows[index]).forEach((key, cellIndex) => {
        if (key !== 'id') {
          // @ts-expect-error dynamic data
          expect(cells[cellIndex].text()).toBe(rows[index][key].toString())
        }
      })
    })
  })

  it('emits row-click event with correct data', async () => {
    const wrapper = mount(Table, {
      props: { columns, rows },
    })

    const firstRow = wrapper.find('tr.cursor-pointer')
    await firstRow.trigger('click')

    expect(wrapper.emitted('row-click')).toBeTruthy()
    expect(wrapper.emitted('row-click')![0]).toEqual([rows[0]])
  })
})
