import styles from "./CommandCenterShell.module.css";

export function StatusStrip({
  label,
  timerLabel,
}: {
  label: string;
  timerLabel: string;
}) {
  return (
    <footer className={styles.statusStrip}>
      <div className={styles.statusCopy}>
        <p className={styles.statusLabel}>Table status</p>
        <p className={styles.statusValue}>{label}</p>
      </div>

      <div className={styles.timer} aria-label={timerLabel}>
        {timerLabel}
      </div>
    </footer>
  );
}
