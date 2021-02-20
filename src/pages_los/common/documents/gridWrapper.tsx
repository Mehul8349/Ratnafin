import {
  useContext,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import GridWrapper from "components/dataTableStatic";
import { useQuery } from "react-query";
import { ClearCacheContext, cacheWrapperKeyGen } from "cache";
import { ActionTypes } from "components/dataTable";
import { DOCCRUDContext } from "./context";

type GridWrapperType = {
  metaData: any;
  actions: ActionTypes[];
  setAction: any;
};

export const MyGridWrapper = forwardRef<any, GridWrapperType>(
  ({ metaData, actions, setAction }, ref) => {
    const removeCache = useContext(ClearCacheContext);
    //const { getDocumentsGridData } = useContext(DOCCRUDContext);
    const wrapperKey = useRef<any>(null);
    if (wrapperKey.current === null) {
      wrapperKey.current = cacheWrapperKeyGen(null);
      //Object.values(getDocumentsGridData.args)
    }

    const result = useQuery(
      ["getDocumentsGridData", wrapperKey.current],
      () => [],
      {
        cacheTime: 100000000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      }
    );
    useEffect(() => {
      removeCache?.addEntry(["getDocumentsGridData", wrapperKey.current]);
    }, []);
    useImperativeHandle(ref, () => ({
      refetch: () => result.refetch(),
    }));
    const dataUniqueKey = result.dataUpdatedAt;
    const loading = result.isLoading || result.isFetching;
    let isError = result.isError;
    //@ts-ignore
    let errorMsg = `${result.error?.error_msg ?? ""}`;
    const renderResult =
      isError === true ? (
        <span>{errorMsg}</span>
      ) : (
        <GridWrapper
          key={`DocumentsGridData-${wrapperKey.current}-${dataUniqueKey}`}
          data={result.data ?? []}
          finalMetaData={metaData}
          setData={() => null}
          actions={actions}
          setAction={setAction}
          loading={loading}
        />
      );
    return renderResult;
  }
);
MyGridWrapper.displayName = "MyGridWrapper";