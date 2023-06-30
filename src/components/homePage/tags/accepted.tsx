import { AiOutlineMinus } from 'react-icons/ai';
import { HiOutlinePlus } from 'react-icons/hi';
import { IoTrashBin } from 'react-icons/io5';
import { BsFillPeopleFill } from 'react-icons/bs';
import Notification from '../notifications/notification';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { InteractionTag } from '../../../services/api_manager';

// CONTEXT
import User from '../../../contexts/userContext';
import { DeletedTagsContext } from '../../../contexts/tagsContext';

export default function Accepted() {
  // CONTEXT
  const { user } = useContext(User);
  const deletedTags = useContext(DeletedTagsContext);

  const authToken: string | undefined = Cookies.get('auth_token');
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // API
  const [tags, setTags] = useState<Array<any>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // REFUSED TAG
  const handleTagRefusal = async (tagId: string) => {
    if (authToken) {
      try {
        setLoading(true);
        await InteractionTag(tagId, '0', authToken);
        const updatedTags = tags.filter(tag => tag.id !== tagId);
        setTags(updatedTags);
        console.log('Tag supprimé...');

        // updateDeletedTags(deletedTags.filter(tag => tag.id !== tagId));
      } catch (error) {
        console.log('Erreur en supprimant le tag...');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user && !loading) {
      axios
        .get(import.meta.env.VITE_BASE_URL + '/tagUser/get', {
          headers: {
            Authorization: 'Bearer ' + authToken,
          },
        })
        .catch(() => {
          setError('Une erreur est survenue...');
        })
        .then(async (data: void | any) => {
          setTags(data.data.myTags);
        });
    }
  }, [user, authToken, loading]);

  // LOCAL STORAGE
  if (typeof Storage !== 'undefined') {
    if (tags.length === 0) {
      const acceptedTags = localStorage.getItem('acceptedTags');
      if (acceptedTags !== undefined && acceptedTags !== null) {
        setTags(JSON.parse(acceptedTags));
      }
    } else {
      localStorage.setItem('acceptedTags', JSON.stringify(tags));
    }
  } else {
    console.log('Erreur....');
  }

  return (
    <div className={isOpen ? 'myTags isOpenTags' : 'myTags'}>
      <div className="titlesTags">
        <h3>Mes tags ({tags.length})</h3>
        <p onClick={toggleOpen}>{isOpen ? <AiOutlineMinus /> : <HiOutlinePlus />}</p>
      </div>
      {tags.length > 0 ? (
        <>
          {isOpen &&
            tags.map(tag => {
              return (
                <div
                  className="tag-content"
                  key={tag.id}
                >
                  <Notification numberOfNotifications={2} />
                  <div className="bin-tag">
                    <IoTrashBin onClick={() => handleTagRefusal(tag.id)} />
                  </div>
                  <div className="text-tag">#{tag.name}</div>
                  <div className="audience">
                    <BsFillPeopleFill /> <span>{String(tag.audience).padStart(2, '0')}</span>
                  </div>
                </div>
              );
            })}
        </>
      ) : (
        <>{isOpen && <div className="no-tags">Vous n'avez pas encore accepté de tag...</div>}</>
      )}
    </div>
  );
}
