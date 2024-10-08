import Papa from 'papaparse'

export const downloadElementAsPdf = () => {
  // ...
}

export const downloadObjectAsCsv = (data: object[]) => {
  if (!data || !data.length) return

  const csv = Papa.unparse(data)

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', 'data.csv')
  a.click()
  URL.revokeObjectURL(url)
}
