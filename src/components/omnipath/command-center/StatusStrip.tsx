import styles from "./CommandCenterShell.module.css";

export function StatusStrip({
  label,
  timer,
}: {
  label: string;
  timer: number;
}) {
  return (
    <footer className={styles.statusStrip}>
      <div className={styles.statusCopy}>
        <p className={styles.statusLabel}>Table status</p>
        <p className={styles.statusValue}>{label}</p>
      </div>

      <div className={styles.timer} aria-label={`Encounter timer ${timer} seconds`}>
        {timer}s timer
      </div>
    </footer>
  );
}
