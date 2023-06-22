import { HiDotsVertical } from 'react-icons/hi';
import Menu from './menuConversations';
import { useState, useEffect, useRef } from 'react';

export default function List() {
  // CONTEXT
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <h2>Conversations</h2>
      <div
        className="list"
        ref={ref}
      >
        <ul>
          <li>
            <div className="profile">
              <div className="picture">
                <img
                  src="https://picsum.photos/50/50"
                  alt=""
                  className="profilePicture"
                />
              </div>
              <div className="informationsSection">
                <div className="informations">
                  <p className="name">
                    User <span className="hourLastMessage">14:05</span>
                  </p>
                  <p className="tags-conversations">#skillshaker</p>
                  <p className="msg">Message.........</p>
                </div>
                <div
                  className="profileIcon"
                  onClick={() => setOpenMenu(prev => !prev)}
                >
                  <HiDotsVertical />
                  {openMenu && <Menu />}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
