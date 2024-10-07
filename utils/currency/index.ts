/**
 * Formats a currency given a raw number
 *
 * @param param
 * @param param.amount - The number to format
 * @param param.symbol - An optional custom currency symbol
 * @returns A string representing the formatted currency
 */
export const formatCurrency = ({
  amount,
  symbol = 'R',
}: {
  amount: number
  symbol?: string
}) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

  return `${symbol} ${formattedAmount}`
}
