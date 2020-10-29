import { Theme } from "@material-ui/core/styles";
import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

export interface NotFoundPageStyleProps {
  wrapper: BaseCSSProperties;
  failureImg: BaseCSSProperties;
  continueBtn: BaseCSSProperties;
  center: BaseCSSProperties;
}

export type NotFoundPageNameProps = Record<
  keyof NotFoundPageStyleProps,
  string
>;

export const notFoundPageStyle = (theme: Theme): any => ({
  wrapper: {
    marginTop: "120px",
    minHeight: "calc(100vh - 165px)",
    boxShadow: "0 3px 6px rgba(0,0,0,0.03)",
  },
  failureImg: {
    maxHeight: "calc(100vh - 400px)",
  },
  continueBtn: {
    background: "#fff !important",
    height: "48px",
    fontSize: "1.2rem !important",
    minWidth: "160px !important",
    color: "var(--theme-color2) !important",
    border: "1px solid  var(--theme-color2) !important",
    "&:hover": {
      color: "var(--theme-color1) !important",
      border: "1px solid var(--theme-color1) !important",
    },
  },
  center: {
    textAlign: "center",
  },
});
