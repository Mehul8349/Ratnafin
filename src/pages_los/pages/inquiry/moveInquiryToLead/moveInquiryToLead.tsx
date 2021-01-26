import { Fragment, useCallback, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./style";
import { FormContext, useForm } from "packages/form";
import * as yup from "yup";
import { TextField, Select } from "components/common";
import { MiscSDK } from "registry/fns/misc";
import { LOSSDK } from "registry/fns/los";
import { useMutation } from "react-query";

interface moveToLeadFnType {
  refID: string;
  data: object;
  endSubmit?: any;
}

const moveToLead = async ({ data, refID }: moveToLeadFnType) => {
  return LOSSDK.moveInquiryToLead(refID, data);
};

export const MoveInquiryToLead = ({
  refID,
  isProductEditedRef,
  disableDialogCloseRef,
  handleDialogClose,
  setSnackBarMessage,
}) => {
  const classes = useStyles();
  return (
    <FormContext.Provider
      value={{
        formName: "moveInquiryToLead",
        resetFieldOnUnmount: true,
        validationRun: "onBlur",
        initialValues: {},
        formState: {},
        validationSchema: yup.object().shape({
          leadPriority: yup.string().required("This is a required field"),
          remarks: yup.string().required("This is a required field"),
        }),
      }}
    >
      <MoveInquiryToLeadForm
        classes={classes}
        refID={refID}
        handleDialogClose={handleDialogClose}
        disableDialogCloseRef={disableDialogCloseRef}
        isProductEditedRef={isProductEditedRef}
        setSnackBarMessage={setSnackBarMessage}
      />
    </FormContext.Provider>
  );
};

const MoveInquiryToLeadForm = ({
  classes,
  refID,
  handleDialogClose,
  disableDialogCloseRef,
  isProductEditedRef,
  setSnackBarMessage,
}) => {
  const moveInquiryToLead = useMutation(moveToLead, {
    onMutate: () => {
      disableDialogCloseRef.current = true;
    },
    onError: (error: any, { endSubmit }) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      endSubmit(false, errorMsg);
      disableDialogCloseRef.current = false;
      setSnackBarMessage({
        type: "error",
        message: errorMsg,
      });
    },
    onSuccess: (data, { endSubmit }) => {
      endSubmit(true, "");
      disableDialogCloseRef.current = false;
      isProductEditedRef.current = true;
      setSnackBarMessage({
        type: "success",
        message: "Inquiry successfully moved to lead",
      });
      setTimeout(() => handleDialogClose(), 1);
    },
  });

  const onSubmitHandler = useCallback((values, displayValues, endSubmit) => {
    moveInquiryToLead.mutate({ refID, data: values, endSubmit });
  }, []);

  const { handleSubmit, isSubmitting } = useForm({
    onSubmit: onSubmitHandler,
  });
  const leadOptions = useCallback(MiscSDK.getMiscVal("LEAD_PRIORITY"), []);
  return (
    <Fragment>
      <Typography>Move To Lead</Typography>
      <Box display="flex" flexDirection="column" width={1}>
        <Grid container={true} spacing={3}>
          <Select
            name="priority"
            fieldKey="priority"
            variant="outlined"
            size="small"
            margin="normal"
            required
            fullWidth
            label="Lead Priority"
            options={leadOptions}
            enableGrid={true}
            autoComplete="off"
            GridProps={{
              xs: 6,
              sm: 4,
              spacing: 3,
            }}
          />
          <TextField
            name="remarks"
            fieldKey="remarks"
            type="text"
            variant="outlined"
            margin="normal"
            size="small"
            required
            fullWidth
            label="Remarks"
            enableGrid={true}
            autoComplete="off"
            GridProps={{
              xs: 6,
              sm: 4,
            }}
          />
        </Grid>
        <Box display="flex" flexDirection="row" width={1 / 2} mt={4}>
          <Button
            color="primary"
            autoFocus
            className={classes.submitBtn}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Move To Lead
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};