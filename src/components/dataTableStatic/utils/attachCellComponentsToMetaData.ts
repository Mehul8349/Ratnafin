import { GridColumnType } from "../types";
import {
  DefaultRowCellRenderer,
  DateRowCellRenderer,
  CurrencyRowCellRenderer,
} from "components/dataTable/components/cells";
import { EditableTextField } from "../components/cells/editableTextField";

export const attachCellComponentsToMetaData = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => {
      const { componentType, ...others } = column;
      switch (componentType) {
        case "date":
          return {
            ...others,
            Cell: DateRowCellRenderer,
          };
        case "currency":
          return {
            ...others,
            Cell: CurrencyRowCellRenderer,
          };
        case "editableTextField":
          return {
            ...others,
            Cell: EditableTextField,
          };
        default:
          return {
            ...others,
            Cell: DefaultRowCellRenderer,
          };
      }
    });
  }
  return [];
};
