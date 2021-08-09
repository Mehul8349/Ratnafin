import { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { ToPreviewDocument } from "./preview";

export const FileUpload = ({
  fileDetails,
  onUpload,
  isDataChangedRef,
  tranCD,
  closeUpdate,
  closeDialog,
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(Infinity);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(Boolean);

  const uploadDocuments = useCallback(
    async (onUpload) => {
      setLoading(true);
      setError("");
      onUpload(
        fileDetails[0],
        (progressValue) => {
          setUploadProgress(progressValue);
        },
        ({ status, data }) => {
          if (status === "success") {
            isDataChangedRef.current = true;
            closeDialog();
          } else {
            setError(data?.error_msg ?? "unknown error occured");
          }
          setLoading(false);
          setShowPreview(true);
        }
      );
    },
    [setLoading, setError]
  );
  return loading ? (
    <LinearProgress
      variant={uploadProgress === Infinity ? "indeterminate" : "determinate"}
      value={uploadProgress}
    />
  ) : Boolean(error) ? (
    <Alert severity="error">{error}</Alert>
  ) : Boolean(showPreview) ? (
    <ToPreviewDocument
      tranCD={tranCD}
      fileName={fileDetails[0].name}
      isDataChangedRef={isDataChangedRef}
    />
  ) : (
    <>
      <Card>
        <CardContent>
          <b>Name:</b>
          {fileDetails[0].name}
        </CardContent>
        <CardActions>
          <Button color="primary" onClick={() => uploadDocuments(onUpload)}>
            Upload
          </Button>
        </CardActions>
      </Card>
    </>
  );
};