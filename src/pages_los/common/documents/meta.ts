import { GridMetaDataType, GridColumnType } from "components/dataTableStatic";

export const gridMetaData: GridMetaDataType = {
  columns: [
    {
      columnName: "Bank Name",
      componentType: "default",
      accessor: "bank",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "File Name",
      componentType: "default",
      accessor: "fileName",
      sequence: 1,
      alignment: "left",
      width: 300,
      maxWidth: 300,
      minWidth: 100,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This is a required field"] }],
      },
    },
    {
      columnName: "Size",
      componentType: "default",
      accessor: "fileSize",
      sequence: 2,
      alignment: "left",
      width: 100,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      columnName: "Uploaded Date",
      componentType: "date",
      accessor: "uploadDate",
      sequence: 4,
      alignment: "left",
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      columnName: "Remarks",
      componentType: "default",
      accessor: "remarks",
      sequence: 5,
      alignment: "left",
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
  ],
  gridConfig: {
    dense: true,
    gridLabel: "Bank Statement",
    rowIdColumn: "docUUID",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
    disableSorting: true,
    disableGlobalFilter: true,
    disableGroupBy: true,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
  },
};

export const columnsMetaData: GridColumnType[] = [
  {
    columnName: "Bank",
    componentType: "editableSelect",
    accessor: "bankID",
    sequence: 4,
    alignment: "left",
    options: "getBankListForLeadDocuments",
    schemaValidation: {
      type: "string",
      rules: [{ name: "required", params: ["required"] }],
    },
    disableCachingOptions: true,
  },
  {
    columnName: "Document Type",
    componentType: "editableSelect",
    accessor: "docType",
    sequence: 5,
    alignment: "left",
    options: "getBankDocType",
    schemaValidation: {
      type: "string",
      rules: [{ name: "required", params: ["required"] }],
    },
  },
  {
    columnName: "Password",
    componentType: "editableTextField",
    accessor: "password",
    sequence: 6,
    alignment: "left",
    isPassword: true,
  },
  {
    columnName: "Remarks",
    componentType: "editableTextField",
    accessor: "remarks",
    sequence: 6,
    alignment: "left",
  },
];
