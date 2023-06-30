import { AiOutlineMinus } from 'react-icons/ai';
import { HiOutlinePlus, HiDotsVertical } from 'react-icons/hi';
import { useState, useEffect, useRef, useContext } from 'react';
import { ConversationInterface } from '../../../interfaces/conversations.model';
import { GetConversations } from '../../../services/api_manager';
import Cookies from 'js-cookie';

// CONTEXT
import User from '../../../contexts/userContext';

export default function List() {
  const { user } = useContext(User);
  const ref = useRef<HTMLDivElement>(null);
  const authToken: string | undefined = Cookies.get('auth_token');

  const [allConversations, setAllConversations] = useState<Array<ConversationInterface>>([]);
  const [isOpenConversations, setisOpenConversations] = useState<boolean>(true);
  const [isOpenBlockedConversations, setisOpenBlockedConversations] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user && authToken) {
        try {
          const listConversations = await GetConversations(authToken);
          const combinedConversations = [...listConversations.conversations.map(conversation => ({ ...conversation }))];
          setAllConversations(combinedConversations);
        } catch (error) {
          console.error('Erreur lors des messages :', error);
        }
      }
    };
    fetchData();
  }, [user, authToken]);

  const totalNotifications = allConversations.reduce((total, conversation) => total + (conversation.notifications ? 1 : 0), 0);
  const notificationLabel = totalNotifications >= 2 ? 'Nouveaux messages' : 'Nouveau message';

  // PROVISOIRE
  const conversations = 'Ceci est le message de la conversation !';

  console.log(allConversations);

  return (
    <>
      <div className="all-conversations">
        <div className="show-conversations">
          <h2>Conversations ({allConversations.length})</h2>
          <p onClick={() => setisOpenConversations(!isOpenConversations)}>{isOpenConversations ? <AiOutlineMinus /> : <HiOutlinePlus />}</p>
        </div>
        {isOpenConversations && (
          <div
            className={isOpenConversations ? 'list isOpenList' : 'list'}
            ref={ref}
          >
            <h2 className="new-msg">
              {notificationLabel} ({totalNotifications})
            </h2>
            <>
              {allConversations.length > 0 ? (
                allConversations.map((conversation: ConversationInterface, index: number) => {
                  return (
                    <ul>
                      <li key={index}>
                        <div className="profil">
                          <div className="message">
                            <img
                              src="https://picsum.photos/50/50"
                              alt=""
                              className="profilPicture"
                            />
                            <div className="informationsSection">
                              <p className="name">
                                {conversation.message.author_firstname}{' '}
                                <span className="hourLastMessage">
                                  {new Date(conversation.created_at.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </p>
                              <p className="msg">{conversation.message.message.slice(0, 15)}...</p>
                            </div>
                          </div>

                          <div className="profilIcon">
                            <HiDotsVertical />
                          </div>
                        </div>
                        {conversation.notifications ? <div className="notification-conversation">{conversation.notifications}</div> : null}
                      </li>
                    </ul>
                  );
                })
              ) : (
                <p className="no-conversations">Vous n'avez pas encore de conversations...</p>
              )}
            </>
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
                  <div className="message">
                    <img
                      src="https://picsum.photos/50/50"
                      alt=""
                      className="profilPicture"
                    />
                    <div className="informationsSection">
                      <p className="name">
                        User <span className="hourLastMessage">10:15</span>
                      </p>
                      <p className="msg">{conversations.slice(0, 15)}...</p>
                    </div>
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
