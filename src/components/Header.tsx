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

import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';

import { GlobalContext } from './GlobalPosts';
import { useContext } from 'react';

import Logout from './Logout';

const Header = () => {
  const { session, setSearchInput } = useContext(GlobalContext)

  const handleClick = () => {
    setSearchInput('')
  }

  return (
    <section className={`flex justify-center bg-darkgray-400`}>
      <div className={`flex flex-col gap-1.5 w-full max-w-[1220px] mx-3 py-4`}>
        <div className={`flex w-full text-white text-center items-center`}>
          <NavLink to='/' end onClick={handleClick} className={`
            inline-block 
            no-underline 
            font-[Space Grotesk, Arial]
            text-[40px]
            text-white
            font-medium
            tracking-normal
            mr-auto
            ml-5
            `}>
            <span className={`text-peach`}>Code</span>
            Lab
          </NavLink>

          <div className={`flex gap-5 ml-auto`}>
            {
              session &&
              <NavLink to="/favorites">
                <Button onClick={handleClick} variant='header'>
                  Favorites
                </Button>
              </NavLink>
            }
            {
              session &&
              <NavLink to="/posting">
                <Button variant="header">
                  Post
                </Button>
              </NavLink>
            }
            {
              session ?
                <>
                  <div className={`w-[250px] font-medium text-start`}>Bem vindo, {session.user.email}</div>
                  <Logout />
                </>
                :
                <NavLink to="/login">
                  <Button className='cursor-pointer w-25 h-10 text-[16px] bg-darkgray-300 text-white border-2 border-darkgray-200 hover:bg-peach' variant="secondary">
                    Login
                  </Button>
                </NavLink>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
