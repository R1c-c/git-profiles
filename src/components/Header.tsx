// import styles from './css/Header.module.css';

// const Header = ({ searchInput, setSearchInput }: { searchInput: string, setSearchInput: React.Dispatch<React.SetStateAction<string>> }) => {
//   return (
//     <section className={styles.header}>
//       <div className={styles.nav}>
//         <a href="#" className={styles.peachText}>
//           Code
//         </a>
//         <a href="#" className={styles.logo}>
//           Lab
//         </a>
//         <input
//           className={styles.searchBar}
//           placeholder="Pesquisar no blog"
//           value={searchInput}
//           onChange={(event) => setSearchInput(event.target.value)}
//         />
//       </div>
//     </section>
//   );
// };

// export default Header;


import styles from './css/Header.module.css';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from './GlobalPosts';
import { useContext } from 'react';
import Logout from './Logout';

const Header = ({ searchInput, setSearchInput }: { searchInput: string, setSearchInput: React.Dispatch<React.SetStateAction<string>> }) => {
  const {session} = useContext(GlobalContext)

  return (
    <section className={styles.header}>
      <div className={styles.navWrapper}>
        <div className={styles.nav}>
          <NavLink to='/' end className={styles.logo}>
            <span className={styles.peachText}>Code</span>
            Lab
          </NavLink>

          <div className={styles.linksContainer}>
            {
              session && 
              <NavLink to="/favorites" className={styles.link}>
                Favorites
              </NavLink>
            }
            {
              session ? 
              <>
                <div>Bem vindo, {session.user.email}</div>
                <Logout />
              </>
              :
              <NavLink to="/login" className={styles.link}>
                Login
              </NavLink>
            }
          </div>
        </div>      
        <div className={styles.search}>
          <input
            className={styles.searchBar}
            placeholder="Pesquisar no blog"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
