import axios from 'axios';
import Modal from '../../modals/editProfile/index';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useState, useContext, useEffect, useRef } from 'react';
import { HiDotsVertical } from 'react-icons/hi';

// INTERFACES
import UserInterface from '../../../interfaces/user.model';

// CONTEXT
import User from '../../../contexts/userContext';

export default function Profile() {
  // CONTEXT
  const { user, setUser } = useContext(User);
  const authToken: string | undefined = Cookies.get('auth_token');

  // MENU - DECONNEXION
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleLogOut: () => void = () => {
    setUser(null);
    if (authToken) {
      Cookies.remove('auth_token');
      localStorage.removeItem('userToken');
      localStorage.removeItem('info');
      localStorage.removeItem('refusedTags');
      localStorage.removeItem('acceptedTags');
      localStorage.removeItem('infosEditProfile');
      localStorage.removeItem('messagesFeed');
      localStorage.removeItem('suggestedTags');
    }
    toast.info(`Déconnexion...`);
    window.location.href = '/';
  };

  // MENU - MODAL
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalOpen: () => void = () => {
    setIsModalOpen(true);
  };

  const handleModalClose: () => void = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  // API
  const [infos, setInfos] = useState<React.SetStateAction<any>>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      axios
        .get<UserInterface>(import.meta.env.VITE_BASE_URL + '/user/info', {
          headers: {
            Authorization: 'Bearer ' + authToken,
          },
        })
        .catch(() => {
          setError('Une erreur est survenue...');
        })
        .then(async data => {
          setInfos(data);
        });
    }
  }, [user, authToken]);

  // LOCAL STORAGE
  if (typeof Storage !== 'undefined') {
    if (infos === undefined || infos === null) {
      const infoGet: string | null = localStorage.getItem('info');
      if (infoGet !== undefined && infoGet !== null) {
        setInfos(JSON.parse(infoGet));
      }
    } else {
      localStorage.setItem('info', JSON.stringify(infos));
    }
  } else {
    console.log('Erreur....');
  }

  if (error) {
    return (
      <div>
        <p>Une erreur est survenue... réessayez plus tard !</p>
      </div>
    );
  }

  return (
    <>
      <div className="background-profile"></div>
      <div
        className="profile user"
        ref={ref}
      >
        <div
          className="profileIcon"
          onClick={() => setOpenMenu(prev => !prev)}
        >
          <HiDotsVertical />
          {openMenu && (
            <>
              <ul className="menuProfile">
                <li>
                  <button
                    type="button"
                    onClick={handleModalOpen}
                  >
                    Mon profil
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleLogOut}
                  >
                    Déconnexion
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
        <div className="picture">
          <img
            src="https://picsum.photos/70/70"
            alt=""
            className="profilePicture"
          />
        </div>
        <div className="informationsSection">
          <div className="informations">
            <p className="name">{infos ? infos.data.firstname : 'Chargement...'}</p>
            <p className="email">{infos ? infos.data.description : 'Chargement...'}</p>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal onClose={handleModalClose} />}
    </>
  );
}
