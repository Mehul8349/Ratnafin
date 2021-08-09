import { FC, useState, useCallback, useRef, Fragment } from "react";
import {
  useTable,
  useRowSelect,
  useBlockLayout,
  useResizeColumns,
} from "react-table";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Alert } from "components/common/alert";
import { useCheckboxColumn } from "./components/useCheckbox";
import { RowContextProvider } from "./components/rowContext";

interface GridTableType {
  columns: any;
  defaultColumn: any;
  data: any;
  setData: any;
  rowIDColumn: any;
  dataIdColumn: any;
  newRowObj?: any;
  rowValidator?: any;
  dataTransformer?: any;
  deleteRowFn?: any;
  onChange?: any;
  label: any;
  maxHeight?: string;
  setFormError?: any;
}

const defaultValidator = async () => {};
const defaultNewRowObj = {};
const defaultIdColumn = "id"; //user data id identifier
const defaultMaxHeight = "200px";

const defaultRowDeleteFn = async () => {
  throw { error_msg: "Fn not defined" };
};

export const GridTable: FC<GridTableType> = ({
  columns,
  defaultColumn,
  data,
  setData,
  rowIDColumn,
  label,
  setFormError,
  maxHeight = defaultMaxHeight,
  newRowObj = defaultNewRowObj,
  dataIdColumn = defaultIdColumn,
  rowValidator = defaultValidator,
  deleteRowFn = defaultRowDeleteFn,
}) => {
  const incrCounter = useRef(-1);
  const currentRowObj = useRef({});
  const currentRowError = useRef({});
  const [currentEditRow, setCurrentEditRow] = useState(-1);
  const [newRowAdded, setNewRowAdded] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const rowContainerRef = useRef<HTMLDivElement | null>(null);

  const getRowId = useCallback((data) => data[rowIDColumn], []);

  const closeDialog = useCallback(() => {
    setShowDialog(false);
  }, [setShowDialog]);

  const addNewRow = useCallback(() => {
    if (!newRowAdded) {
      setData((old) => [
        ...old,
        {
          ...newRowObj,
          [rowIDColumn]: ++incrCounter.current,
        },
      ]);
      setNewRowAdded(true);
      setCurrentEditRow(incrCounter.current);
      currentRowObj.current = {};
      setTimeout(() => {
        let elem = rowContainerRef.current;
        elem?.scrollTo({
          behavior: "smooth",
          top: elem.scrollHeight - elem.offsetHeight,
          left: 0,
        });
      }, 1);
    }
  }, [setData, setNewRowAdded, setCurrentEditRow, newRowAdded, data]);

  const saveCurrentRow = useCallback(
    (index) => {
      if (Object.keys(currentRowError.current).length > 0) {
        return false;
      }
      let newData = data.map((one) => {
        if (getRowId(one) === index) {
          return { ...one, ...currentRowObj.current };
        }
        return one;
      });
      setData(newData);
      setCurrentEditRow(-1);
      setNewRowAdded(false);
      currentRowObj.current = {};
      return true;
    },
    [setData, setNewRowAdded, setCurrentEditRow, data, getRowId]
  );

  const cancelCurrentRowEdit = useCallback(
    (index) => {
      if (newRowAdded) {
        setData((old) => old.filter((one) => !(getRowId(one) === index)));
      }
      setCurrentEditRow(-1);
      setNewRowAdded(false);
      currentRowObj.current = {};
      currentRowError.current = {};
    },
    [setData, setCurrentEditRow, setNewRowAdded, newRowAdded]
  );

  const requestRowEdit = useCallback(
    (index) => {
      if (newRowAdded || Object.keys(currentRowError.current).length > 0) {
        return;
      }
      if (currentEditRow === -1) {
        setCurrentEditRow(index);
      } else {
        // let success = saveCurrentRow(currentEditRow);
        // if (success) {
        //   setCurrentEditRow(index);
        // }
        cancelCurrentRowEdit(currentEditRow);
        setCurrentEditRow(index);
      }
      currentRowObj.current = {};
    },
    [saveCurrentRow, setCurrentEditRow, currentEditRow, newRowAdded]
  );

  const tableProps = useTable(
    {
      columns: columns,
      data: data,
      defaultColumn: defaultColumn,
      requestRowEdit,
      currentEditRow,
      getRowId,
      saveCurrentRow,
      cancelCurrentRowEdit,
    },
    useRowSelect,
    useResizeColumns,
    useBlockLayout,
    useCheckboxColumn(true)
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    //totalColumnsWidth,
    selectedFlatRows,
  } = tableProps;

  return (
    <Fragment>
      <Paper
        style={{
          //width: `${totalColumnsWidth}px`,
          //maxWidth: "750px",
          width: "100%",
          overflow: "hidden",
        }}
        tabIndex={0}
      >
        <Toolbar
          variant="dense"
          style={{
            display: "flex",
            minHeight: "40px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Typography variant="h6">{label}</Typography>
          <div style={{ flexGrow: 1 }} />
          {selectedFlatRows.length > 0 ? (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setShowDialog(true);
              }}
            >
              Delete
            </Button>
          ) : null}
        </Toolbar>
        <TableContainer>
          <Table {...getTableProps()} size="small" component="div">
            <TableHead component="div">
              {headerGroups.map((headerGroup) => (
                <TableRow
                  {...headerGroup.getHeaderGroupProps()}
                  component="div"
                >
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      {...column.getHeaderProps([
                        {
                          style: { textAlign: column?.alignment ?? "unset" },
                        },
                      ])}
                      component="div"
                    >
                      {column.render("Header")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps({})} component="div">
              <div
                style={{
                  overflowY: "scroll",
                  maxHeight: maxHeight,
                  overflowX: "hidden",
                }}
                ref={rowContainerRef}
              >
                {rows.map((row, i) => {
                  prepareRow(row);
                  const rowProps = row.getRowProps();
                  const renderRow = (
                    <TableRow {...rowProps} component="div">
                      {row.cells.map((cell) => {
                        return (
                          <TableCell
                            {...cell.getCellProps([
                              {
                                style: {
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                  textAlign: cell?.column?.alignment ?? "unset",
                                },
                              },
                            ])}
                            component="div"
                          >
                            {cell.render("Cell")}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                  if (currentEditRow === row.id) {
                    return (
                      <RowContextProvider
                        currentRowError={currentRowError}
                        currentRowObj={currentRowObj}
                        key={`${rowProps.key}_row_with_context`}
                        initialData={row.original}
                        rowValidator={rowValidator}
                        setFormError={setFormError}
                      >
                        {renderRow}
                      </RowContextProvider>
                    );
                  } else {
                    return renderRow;
                  }
                })}
              </div>
            </TableBody>
            <TableHead component="div">
              {footerGroups.map((footerGroup) => (
                <TableRow
                  {...footerGroup.getFooterGroupProps()}
                  component="div"
                >
                  {footerGroup.headers.map((column) => (
                    <TableCell
                      {...column.getFooterProps([
                        {
                          style: { textAlign: column?.alignment ?? "unset" },
                        },
                      ])}
                      component="div"
                    >
                      {column.render("Footer")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
          </Table>
        </TableContainer>
        <Button onClick={addNewRow}>AddRow</Button>
      </Paper>

      <DeleteRows
        selectedRows={selectedFlatRows}
        dataIdColumn={dataIdColumn}
        open={showDialog}
        closeDialog={closeDialog}
        deleteFn={deleteRowFn}
      />
    </Fragment>
  );
};

interface DeleteRowsFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const deleteRowsFnWrapper = (deleteRowsFn) => async ({
  data,
}: DeleteRowsFnType) => {
  return deleteRowsFn(data);
};

const DeleteRows = ({
  selectedRows,
  dataIdColumn,
  deleteFn,
  open,
  closeDialog,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const closeWrapper = () => {
    mutation.reset();
    closeDialog();
  };
  const mutation = useMutation<any, any, any, any>(
    deleteRowsFnWrapper(deleteFn),
    {
      onSuccess: () => {
        enqueueSnackbar("data successfully deleted", {
          variant: "success",
        });
        closeWrapper();
      },
    }
  );

  const deleteData = () => {
    let result = selectedRows.map(
      (one) => one?.original?.[dataIdColumn] ?? false
    );
    let existingRecords = result.filter((one) => one !== false);
    mutation.mutate(existingRecords);
  };

  return (
    <Dialog open={open}>
      {mutation.isError ? (
        <Alert
          severity="error"
          errorMsg={mutation.error?.error_msg ?? "Unknown error occured"}
          errorDetail={mutation.error?.error_detail ?? ""}
        />
      ) : null}
      <DialogTitle>Would you like to delete the selected records </DialogTitle>
      <DialogActions>
        <Button onClick={deleteData} disabled={mutation.isLoading}>
          Yes
        </Button>
        <Button onClick={closeWrapper} disabled={mutation.isLoading}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};