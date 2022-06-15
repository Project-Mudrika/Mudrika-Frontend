import styles from "../styles/Home.module.scss";
// import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";

export default function Home() {
  return (
    <div className={styles.home}>
      <NavBar />
      <Dashboard />
    </div>
  );
}
