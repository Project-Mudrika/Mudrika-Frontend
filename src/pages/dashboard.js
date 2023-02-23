import styles from "../styles/Home.module.scss";
// import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";
import OfficerDashboard from "./components/OfficerDashboard";
import VolunteerDashboard from "./components/VolunteerDashboard.js";

import { useStoreState, useStoreActions } from "easy-peasy";

export default function dashboard() {
  const userData = useStoreState((state) => state.userData);
  const updataUserData = useStoreActions((actions) => actions.updateData);

  console.log(userData);

  return (
    <div className={styles.home}>
      <NavBar />
      {(() => {
        switch (userData.type) {
          case "authority":
            return <OfficerDashboard />;
          case "volunteer":
            return <VolunteerDashboard />;
          default:
            return null;
        }
      })()}
    </div>
  );
}
