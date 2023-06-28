import { AiOutlineMinus } from 'react-icons/ai';
import { HiOutlinePlus, HiDotsVertical } from 'react-icons/hi';
import { useState, useEffect, useRef } from 'react';

export default function List() {
  // CONTEXT
  const [isOpenConversations, setisOpenConversations] = useState<boolean>(true);
  const [isOpenBlockedConversations, setisOpenBlockedConversations] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   function handleClickOutside(e: MouseEvent) {
  //     if (ref.current && !ref.current.contains(e.target as Node)) {
  //       setOpenMenu(false);
  //     }
  //   }
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [ref]);

  const conversations = 'Ceci est le message de la conversation !';

  return (
    <>
      <div className="all-conversations">
        <div className="show-conversations">
          <h2>Conversations ({1})</h2> {/* A mettre le length des conversations */}
          <p onClick={() => setisOpenConversations(!isOpenConversations)}>{isOpenConversations ? <AiOutlineMinus /> : <HiOutlinePlus />}</p>
        </div>
        {isOpenConversations && (
          <div
            className={isOpenConversations ? 'list isOpenList' : 'list'}
            ref={ref}
          >
            <h2 className="new-msg">Nouveau message ({1})</h2> {/* Si nouveau message + length */}
            <ul>
              <li>
                <div className="profil">
                  <div className="picture">
                    <img
                      src="https://picsum.photos/50/50"
                      alt=""
                      className="profilPicture"
                    />
                  </div>
                  <div className="informationsSection">
                    <p className="name">
                      User <span className="hourLastMessage">14:05</span>
                    </p>
                    <p className="msg">{conversations.slice(0, 27)}...</p>
                  </div>
                  <div className="profilIcon">
                    <HiDotsVertical />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="blocked-conversations">
        <div className="show-blocked-conversations">
          <h2>Conversations bloquées ({1})</h2> {/* A mettre le length des conversations */}
          <p onClick={() => setisOpenBlockedConversations(!isOpenBlockedConversations)}>
            {isOpenBlockedConversations ? <AiOutlineMinus /> : <HiOutlinePlus />}
          </p>
        </div>
        {isOpenBlockedConversations && (
          <div
            className={isOpenBlockedConversations ? 'list isOpenList' : 'list'}
            ref={ref}
          >
            <ul>
              <li>
                <div className="profil">
                  <div className="picture">
                    <img
                      src="https://picsum.photos/50/50"
                      alt=""
                      className="profilPicture"
                    />
                  </div>
                  <div className="informationsSection">
                    <p className="name">
                      User <span className="hourLastMessage">14:05</span>
                    </p>
                    <p className="msg">{conversations.slice(0, 27)}...</p>
                  </div>
                  <div className="profilIcon">
                    <HiDotsVertical />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
