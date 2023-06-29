import { AiOutlineMinus } from 'react-icons/ai';
import { HiOutlinePlus } from 'react-icons/hi';
import { BsFillCheckCircleFill, BsFillPeopleFill } from 'react-icons/bs';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { InteractionTag } from '../../../services/api_manager';

// CONTEXT
import User from '../../../contexts/userContext';
import { DeletedTagsContext } from '../../../contexts/tagsContext';

export default function Refused() {
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

  // ACCEPTED TAG
  const handleTagAcceptation = async (tagId: string) => {
    if (authToken) {
      try {
        setLoading(true);
        await InteractionTag(tagId, '1', authToken);
        const updatedTags = tags.filter(tag => tag.id !== tagId);
        setTags(updatedTags);
        console.log('Tag ajouté...');

        // updateDeletedTags(deletedTags.filter(tag => tag.id !== tagId));
      } catch (error) {
        console.log('Erreur en ajoutant le tag...');
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
          setTags(data.data.refusedTags);
        });
    }
  }, [user, authToken, loading]);

  // LOCAL STORAGE
  if (typeof Storage !== 'undefined') {
    if (tags.length === 0) {
      const refusedTags = localStorage.getItem('refusedTags');
      if (refusedTags !== undefined && refusedTags !== null) {
        setTags(JSON.parse(refusedTags));
      }
    } else {
      localStorage.setItem('refusedTags', JSON.stringify(tags));
    }
  } else {
    console.log('Erreur....');
  }

  return (
    <div className={isOpen ? 'refusedTags isOpenTags' : 'refusedTags'}>
      <div className="titlesTags">
        <h3>Tags refusés ({tags.length})</h3>
        <p onClick={toggleOpen}>{isOpen ? <AiOutlineMinus /> : <HiOutlinePlus />}</p>
      </div>
      {isOpen &&
        tags.map(tag => {
          return (
            <div
              className="tag-content"
              key={tag.id}
            >
              <div className="audience">
                <BsFillPeopleFill /> <span>{String(tag.audience).padStart(2, '0')}</span>
              </div>
              <div className="text-tag">#{tag.name}</div>
              <div className="check-tag">
                <BsFillCheckCircleFill onClick={() => handleTagAcceptation(tag.id)} />
              </div>
            </div>
          );
        })}
    </div>
  );
}
