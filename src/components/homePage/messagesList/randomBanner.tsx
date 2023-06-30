import { useContext, useEffect, useState } from 'react';
import { GetUserTags, InteractionTag } from '../../../services/api_manager';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoTrashBin } from 'react-icons/io5';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import TagsInterface from 'interfaces/tags.model';
import Cookies from 'js-cookie';

// CONTEXT
import User from '../../../contexts/userContext';

export default function RandomBanner() {
  const { user } = useContext(User);
  const authToken: string | undefined = Cookies.get('auth_token');

  const [tags, setTags] = useState<Array<TagsInterface>>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const suggestedTags = await GetUserTags();
          setTags(suggestedTags.suggTags);
        } catch (error) {
          console.error('Erreur lors des tags suggérés :', error);
        }
      }
    };

    fetchData();
  }, [user, authToken]);

  const sortedTags = [...tags].sort((a, b) => b.audience - a.audience);
  const highestAudienceTag = sortedTags[0];

  // INTERACTION TAG
  const [showTag, setShowTag] = useState<boolean>(true);

  const handleTagRefusal = () => {
    if (highestAudienceTag && authToken) {
      const idDuTag = highestAudienceTag.id.toString();
      setShowTag(false);
      InteractionTag(idDuTag, '0', authToken)
        .then(interactUserTag => {
          console.log("Réponse de l'appel API :", interactUserTag);
        })
        .catch(error => {
          console.error('Erreur lors du refus du tag :', error);
        });
    }
  };

  const handleTagAcceptation = () => {
    if (highestAudienceTag && authToken) {
      const idDuTag = highestAudienceTag.id.toString();
      setShowTag(false);
      InteractionTag(idDuTag, '1', authToken)
        .then(interactUserTag => {
          console.log("Réponse de l'appel API :", interactUserTag);
        })
        .catch(error => {
          console.error("Erreur lors de l'acceptation du tag :", error);
        });
    }
  };

  return (
    <>
      {tags.length > 0 ? (
        <div className={`banner-suggested-tags ${showTag ? '' : 'fade-out'}`}>
          {highestAudienceTag && (
            <>
              <div
                className="icon-bin"
                onClick={handleTagRefusal}
              >
                <IoTrashBin />
              </div>
              <div>
                <p className="name-tag">#{highestAudienceTag.name}</p>
                <p className="audience">
                  <BsFillPeopleFill /> {highestAudienceTag.audience} {highestAudienceTag.audience >= 2 ? 'abonnés' : 'abonné'}
                </p>
              </div>
              <div
                className="icon-check"
                onClick={handleTagAcceptation}
              >
                <BsFillCheckCircleFill />
              </div>
            </>
          )}
        </div>
      ) : null}
    </>
  );
}
