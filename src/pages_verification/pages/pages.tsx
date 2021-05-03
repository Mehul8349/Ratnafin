import { Routes, Route } from "react-router-dom";
import MobileNumberVerification from "./mobile";
import EmailVerification from "./email";
import { useStyles } from "./style";

export const Pages = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.paper}>
        <Routes>
          <Route path="/mobile/:token" element={<MobileNumberVerification />} />
          <Route path="/email/:token" element={<EmailVerification />} />
          <Route path="/cibil/:token" element={<div>CIBIL Page</div>} />
          <Route path="*" element={<div>Page not Exist</div>} />
        </Routes>
      </div>
    </div>
  );
};
