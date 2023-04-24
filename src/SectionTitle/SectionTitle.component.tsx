import styles from "./SectionTitle.module.scss";

interface IProp {
  children: React.ReactNode;
}
const SectionTitle: React.FC<IProp> = ({ children }: IProp) => {

  return (
    <div className={styles.header}>
      <h1>{children}</h1>
    </div>
  );
};

export default SectionTitle;
