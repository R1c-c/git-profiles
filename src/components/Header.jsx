import styles from './Header.module.css';

const Header = ({ searchInput, setSearchInput }) => {
  return (
    <section className={styles.header}>
      <div className={styles.nav}>
        <a href="#" className={styles.peachText}>
          Code
        </a>
        <a href="#" className={styles.logo}>
          Lab
        </a>
        <input
          className={styles.searchBar}
          placeholder="Pesquisar no blog"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>
    </section>
  );
};

export default Header;
