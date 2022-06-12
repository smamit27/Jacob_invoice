import { SelectCellFormatter, useRowSelection } from "react-data-grid";

export default function RowSelectEditor(props) {
    const [isRowSelected, onRowSelectionChange] = useRowSelection();
    return (
      <SelectCellFormatter
        disabled={props.row.FLAG_IS === 'Y'}
        aria-label="Select"
        isCellSelected={props.isCellSelected}
        value={isRowSelected}
        onClick={e => e.stopPropagation()}
        onChange={(checked, isShiftClick) => {
          onRowSelectionChange({ row: props.row, checked, isShiftClick });
        }}
      />
    );
  }