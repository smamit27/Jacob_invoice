import {useRef} from 'react'

function useErrorCell() {
  const gridRef = useRef(null)
  const errorCell = useRef(null)
  const handleErrorCell = () => {
    if (gridRef && gridRef?.current && errorCell.current) {
      const { rowIndex = -1, colIndex = -1 } = errorCell.current || {}
      if (rowIndex !== -1 && colIndex !== -1) {
        gridRef?.current?.scrollToRow(rowIndex - 1)
        gridRef?.current?.scrollToColumn(colIndex)
        gridRef?.current?.selectCell({ idx: colIndex, rowIdx: rowIndex })
        const domRow = gridRef?.current?.element?.querySelector(`[aria-rowindex="${rowIndex + 2}"]`) || null
        if (domRow) {
          const domCol = domRow?.querySelector(`[aria-colindex="${colIndex + 1}"]`)
          if (domCol) {
            domCol.style.boxShadow = 'inset 0 0 0 2px #D72850'
            setTimeout(() => {
              domCol.style.boxShadow = ''
              gridRef?.current?.selectCell({ idx: colIndex, rowIdx: rowIndex })
            }, 3000)
          }
        }
      }
    }
    errorCell.current = null
  }
  return { handleErrorCell, errorCell, gridRef }
}

export default useErrorCell