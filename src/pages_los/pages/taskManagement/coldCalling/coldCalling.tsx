import { useState, useRef, Fragment } from "react";
import { ClearCacheProvider } from "cache";
import { ActionTypes } from "components/dataTable";
import Dialog from "@material-ui/core/Dialog";
import { InvalidAction } from "pages_los/common/invalidAction";
import {
  ServerGrid,
  ServerGridContextProvider,
} from "pages_los/common/serverGrid";
import { serverGridContextGenerator } from "../context";
import {
  AddColdCalling,
  ColdCallingViewEdit,
  ColdCallingDelete,
} from "./coldCallingCRUD";
import { MoveToInquiry } from "./moveToInquiry";

const actions: ActionTypes[] = [
  {
    actionName: "AddColdCalling",
    actionLabel: "Add New",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "moveToInquiry",
    actionLabel: "Move to Inquiry",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "viewDetails",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "delete",
    actionLabel: "Delete",
    multiple: true,
    rowDoubleClick: false,
  },
];

export const ColdCalling = ({ gridCode, actions }) => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);

  const handleDialogClose = () => {
    setCurrentAction(null);
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      myGridRef?.current?.fetchData?.();
      isDataChangedRef.current = false;
    }
  };

  return (
    <Fragment>
      <ServerGridContextProvider {...serverGridContextGenerator(gridCode)}>
        <ServerGrid
          gridCode={gridCode}
          actions={actions}
          setAction={setCurrentAction}
          ref={myGridRef}
        />
      </ServerGridContextProvider>
      <Dialog
        fullScreen={
          ["moveToInquiry"].indexOf(currentAction?.name) >= 0 ? true : false
        }
        open={Boolean(currentAction)}
        maxWidth="lg"
        fullWidth
        PaperProps={{ style: { height: "100%" } }}
      >
        <ClearCacheProvider>
          {(currentAction?.name ?? "") === "AddColdCalling" ? (
            <Fragment>
              <AddColdCalling
                moduleType="cold-calling"
                isDataChangedRef={isDataChangedRef}
                closeDialog={handleDialogClose}
              />
            </Fragment>
          ) : (currentAction?.name ?? "") === "viewDetails" ? (
            <Fragment>
              <ColdCallingViewEdit
                tran_cd={currentAction?.rows[0].id}
                moduleType="cold-calling"
                isDataChangedRef={isDataChangedRef}
                closeDialog={handleDialogClose}
                readOnly={false}
                disableCache={false}
              />
            </Fragment>
          ) : (currentAction?.name ?? "") === "delete" ? (
            <Fragment>
              <ColdCallingDelete
                tran_cd={currentAction?.rows.map((one) => one.id)}
                moduleType="cold-calling"
                isDataChangedRef={isDataChangedRef}
                closeDialog={handleDialogClose}
              />
            </Fragment>
          ) : (currentAction?.name ?? "") === "moveToInquiry" ? (
            <Fragment>
              <MoveToInquiry
                defaultView="edit"
                tran_cd={currentAction?.rows[0].id}
                moduleType="cold-calling"
                isDataChangedRef={isDataChangedRef}
                closeDialog={handleDialogClose}
              />
            </Fragment>
          ) : (
            <InvalidAction closeDialog={handleDialogClose} />
          )}
        </ClearCacheProvider>
      </Dialog>
    </Fragment>
  );
};

export const ColdCollingWrapper = () => {
  return <ColdCalling gridCode="TRN/015" actions={actions} />;
};
