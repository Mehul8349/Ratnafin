export const infraGridMetaData = {
  gridConfig: {
    dense: true,
    gridLabel: "Bank Master of Infra",
    rowIdColumn: "refID",
    defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
    allowColumnReordering: true,
    disableSorting: true,
    hideHeader: false,
    disableGroupBy: true,
    containerHeight: { min: "40vh", max: "50vh" },
  },
  columns: [
    {
      columnName: "Name of Bank - Branch",
      componentType: "default",
      accessor: "branchID",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "Department of The Bank",
      componentType: "default",
      accessor: "departmentName",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "Product Name",
      componentType: "default",
      accessor: "productName",
      sequence: 2,
      alignment: "left",
    },
    {
      columnName: "Sub Product",
      componentType: "default",
      accessor: "subProduct1",
      sequence: 3,
      alignment: "left",
    },
    {
      columnName: "Sub Product 2",
      componentType: "default",
      accessor: "subProduct2",
      sequence: 4,
      alignment: "left",
    },
    {
      columnName: "Land Value(Market Value Lacs)",
      componentType: "currency",
      accessor: "marketLandValue",
      sequence: 5,
      alignment: "left",
    },
    {
      columnName: "Bank Branch Name",
      componentType: "default",
      accessor: "bankBranchName",
      sequence: 6,
      alignment: "left",
    },
  ],
};
