import { HashRouter as Router } from "react-router-dom";

import Content from "../components/Content";

const AppRouter = () => {
  return (
    <div className="app">
      <Router>
        <Content />
      </Router>
    </div>
  );
};

export default AppRouter;
