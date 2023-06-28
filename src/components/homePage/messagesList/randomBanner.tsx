import { useContext, useEffect, useState } from 'react';
import { GetUserTags } from '../../../services/api_manager';
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
  console.log(highestAudienceTag);

  return (
    <div className="banner-suggested-tags">
      {highestAudienceTag && (
        <>
          <div className="icon-bin">
            <IoTrashBin />
          </div>
          <div>
            <p className="name-tag">#{highestAudienceTag.name}</p>
            <p className="audience">
              <BsFillPeopleFill /> {highestAudienceTag.audience} abonnés
            </p>
          </div>
          <div className="icon-check">
            <BsFillCheckCircleFill />
          </div>
        </>
      )}
    </div>
  );
}
