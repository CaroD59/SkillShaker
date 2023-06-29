import { HiDotsVertical } from 'react-icons/hi';
import { BsPeopleFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import Cookies from 'js-cookie';
import Menu from './menuMessage';
import { useState, useContext, useEffect, useRef } from 'react';
import { GetAllMessages } from '../../../services/api_manager';

// CONTEXT
import User from '../../../contexts/userContext';
import { MessageInterface } from 'interfaces/messages.model';
import TitleHomePage from '../titleHome/titleHomePage';
import RandomBanner from './randomBanner';

export default function MessagesList() {
  const { user } = useContext(User);
  const ref = useRef<HTMLDivElement>(null);
  const authToken: string | undefined = Cookies.get('auth_token');

  // MENU
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<number[]>([]);
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);

  const handleSubMenuToggle = (messageId: number) => {
    const index: number = openMenu.indexOf(messageId);
    const newOpenMenu: number[] = [...openMenu];

    if (index === -1) {
      newOpenMenu.push(messageId);
    } else {
      newOpenMenu.splice(index, 1);
    }

    setOpenMenu(newOpenMenu);
    setSelectedMessageId(messageId);
    setIsOpen(newOpenMenu.length > 0);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  //API
  const [messages, setMessages] = useState<Array<MessageInterface>>([]);
  const [visibleMessages, setVisibleMessages] = useState<number>(10);
  const handleShowMore: () => void = () => {
    setVisibleMessages(visibleMessages + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const messagesFeed = await GetAllMessages();

          const combinedMessage = [...messagesFeed.messages.map(msg => ({ ...msg }))];
          setMessages(combinedMessage);
        } catch (error) {
          console.error('Erreur lors des messages :', error);
        }
      }
    };

    fetchData();
  }, [user, authToken]);

  // LOCAL STORAGE
  if (typeof Storage !== 'undefined') {
    if (messages.length === 0) {
      const messageFeed: string | null = localStorage.getItem('messagesFeed');
      if (messageFeed !== undefined && messageFeed !== null) {
        setMessages(JSON.parse(messageFeed));
      }
    } else {
      localStorage.setItem('messagesFeed', JSON.stringify(messages));
    }
  } else {
    console.log('Erreur....');
  }

  // FILTRER LES MESSAGES DU JOUR
  const today: string = new Date().toISOString().split('T')[0];
  const filteredMessages = messages.filter(message => {
    const messageDate = message.created_at.date.split(' ')[0];
    return messageDate === today;
  });
  const firstTodayMessage = filteredMessages.length > 0 ? filteredMessages[0] : null;

  // BANNIERE TAGS SUGGERES
  const shouldDisplayBanner = (index: number) => {
    return index > 0 && (index + 1) % 7 === 0;
  };

  // ALLER DIRECTEMENT EN BAS DU SCROLL
  const messagesUsersRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesUsersRef.current?.scrollTo(0, messagesUsersRef.current?.scrollHeight);
  }, [messages]);

  return (
    <>
      <TitleHomePage title={"Fil d'actualités"} />
      <div
        id="messagesUsers"
        ref={messagesUsersRef}
      >
        {messages.length > 0 ? (
          messages
            .sort((a: any, b: any) => {
              const dateA: Date | string = new Date(a.created_at.date);
              const dateB: Date | string = new Date(b.created_at.date);
              return +dateA - +dateB;
            })
            .slice(0, visibleMessages)
            .map((message: any, index: number) => {
              const msg = message.message;
              return (
                <>
                  {firstTodayMessage && message.id === firstTodayMessage.id && (
                    <div className="today-banner">
                      <span>Today</span>
                    </div>
                  )}

                  {shouldDisplayBanner(index) && <RandomBanner />}

                  <div
                    className="messageUser"
                    key={`message-${message.id}`}
                    ref={ref}
                  >
                    <div className="profilPic">
                      <img
                        src="https://picsum.photos/70/70"
                        alt=""
                        className="profilePicture"
                      />
                    </div>
                    <div className="messageBody">
                      <div className="infosUser">
                        <div className="infoUserName">{message.author_firstname}</div>
                        <div className="hourMessage">
                          {message.created_at.date.slice(11, 16)}{' '}
                          <span onClick={() => handleSubMenuToggle(message.id)}>
                            <HiDotsVertical />
                          </span>
                          {isOpen && openMenu.includes(message.id) && message.id === selectedMessageId && <Menu />}
                        </div>
                      </div>
                      <div className="fullMessage">
                        <p
                          key={message.id}
                          dangerouslySetInnerHTML={{
                            __html: msg.replace(/#\w+/g, '<span class="hashtag">$&</span>'),
                          }}
                        ></p>
                      </div>
                      <div className="peopleTags">
                        <div className="peopleFollowing">
                          <BsPeopleFill />{' '}
                          {message.conversation
                            ? message.conversation.map((msg: any) => {
                                return <span key={message.id}>{msg.nb_users.toString()}</span>;
                              })
                            : '0'}
                          /{message.audience}
                        </div>
                        {message.conversation ? (
                          <div className="sendMessage">
                            <RiMessage2Fill />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </>
              );
            })
        ) : (
          <div>
            <p className="no-new-messages">Aucun nouveau message...</p>
          </div>
        )}
        {visibleMessages < messages.length && (
          <button
            className="load-more"
            onClick={handleShowMore}
          >
            Voir plus
          </button>
        )}
      </div>
    </>
  );
}
