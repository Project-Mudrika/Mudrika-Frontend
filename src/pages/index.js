import styles from "../styles/Home.module.scss";
import LoginCard from "./components/LoginCard";
// import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className={styles.home}>
      <NavBar loginPage={true} />
      <LoginCard />
    </div>
  );
}
