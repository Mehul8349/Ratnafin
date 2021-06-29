export const bankMasterGridMetaData = {
  gridConfig: {
    dense: true,
    gridLabel: "Bank Master",
    rowIdColumn: "bankCode",
    defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
    allowColumnReordering: true,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: true,
    containerHeight: { min: "40vh", max: "50vh" },
  },
  columns: [
    {
      columnName: "Serial No",
      componentType: "default",
      accessor: "bankCode",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "Bank Name",
      componentType: "default",
      accessor: "bankName",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "RBI Code",
      componentType: "default",
      accessor: "rbiCode",
      sequence: 2,
      alignment: "left",
    },
    {
      columnName: "CTS",
      componentType: "default",
      accessor: "cts",
      sequence: 3,
      alignment: "left",
    },
  ],
};