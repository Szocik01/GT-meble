import { Button } from "@mui/material";
import styles from "./ContactSidebar.module.css";
import { Link } from "react-router-dom";

export default function ContactSidebar() {
  return (
    <div className={styles.sidebarContainer}>
      <h3 className={styles.sidebarTitle}>Szukasz podobnego projektu lub chcesz skonsultować własny pomysł?</h3>
      <Link to="/contact" style={{width: "100%"}}>
        <Button variant="contained" sx={{
            width: "100%",
            borderRadius: "8px",
            color: "white",
            backgroundColor: "var(--color-primary)",
            ":hover":{
                backgroundColor: "var(--color-primary)",
            }
        }}>
            Skontaktuj się z nami!</Button>
      </Link>
    </div>
  );
}
