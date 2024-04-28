export const getMatrixOfTails = (amountWidth: number, amountHeight: number) => {
  const simpleRows = [...new Array(Number(amountHeight - 6))].fill(`16-17x${amountWidth}-18`)

  return [
    `0-1x${amountWidth}-2`,
    `16-112-69-114-17-17-29-17-29-17-17-112-69-114-17-83x3-17x${amountWidth - 17}-18`,
    `16-17-83-17-17-29x5-17-17-83-17-17-83-17x${amountWidth - 15}-18`,
    `16-17-83-17-17-17-29x3-17-17-17-83-17x4-83-17x${amountWidth - 17}-18`,
    `16-112-81-114-17-17-17-29-17x4-83-17-17-83x3-17x${amountWidth - 17}-18`,
    ...simpleRows,
    `32-33x${amountWidth}-34`
  ]
}
