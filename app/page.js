import Image from "next/image";
import styles from "./page.module.css";
import Page from "./students/page"

export default function Home() {
  return (
    <div className={styles.page}>
      <Page />
    </div>
  );
}
