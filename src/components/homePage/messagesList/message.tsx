import { MdSend } from 'react-icons/md';
import { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

// CONTEXT
import User from '../../../contexts/userContext';

export default function Message() {
  const { user } = useContext(User);
  const authToken: string | undefined = Cookies.get('auth_token');
  const [inputValue, setInputValue] = useState<string>('');
  // const [searchTags, setSearchTags] = useState<string>('');
  const [audience, setAudience] = useState<number[]>([]);
  // const [className, setClassName] = useState<string>('allTagsSearchBar');

  // API
  const [allTags, setAllTags] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      axios
        .get(import.meta.env.VITE_BASE_URL + '/tag/getAll', {
          headers: {
            Authorization: 'Bearer ' + authToken,
          },
        })
        .catch(() => {
          setError('Une erreur est survenue...');
        })
        .then(async (data: void | any) => {
          setAllTags(data.data.tags);
        });
    }
  }, [user, authToken]);

  // LOCAL STORAGE
  if (typeof Storage !== 'undefined') {
    if (allTags.length === 0 && allTags === undefined) {
      const allTags: string | null = localStorage.getItem('allTags');
      if (allTags !== undefined && allTags !== null) {
        setAllTags(JSON.parse(allTags));
      }
    } else {
      localStorage.setItem('allTags', JSON.stringify(allTags));
    }
  } else {
    console.log('Erreur....');
  }

  if (error) {
    return (
      <>
        <p>Une erreur est survenue... réessayez plus tard !</p>
      </>
    );
  }

  // INPUT VALUE

  const handleSuggestionClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
    // TAG
    let word: any = event.currentTarget.innerText;
    word = word.split('\n\n');
    setInputValue((prev: string) => prev + word[0]);

    // AUDIENCE
    const audienceNumber = parseInt(word[1]);
    setAudience([...audience, audienceNumber]);
  };

  // SEARCH ALL TAGS

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // AUDIENCE CALCUL

  const audienceCalcul: number = audience.reduce((acc, number) => acc + number, 0);

  // MOTS - HASHTAGS MIS EN VALEUR
  console.log(inputValue);

  return (
    <>
      <div className="msg">
        <div>
          <input
            type="text"
            name="message"
            id="SkillShaker-Send-Message"
            placeholder="Rédiger un message..."
            onChange={handleSearchChange}
            value={inputValue}
          />{' '}
          <div className={inputValue.endsWith('#') ? 'allTagsSearchBar active' : 'allTagsSearchBar'}>
            {allTags && inputValue.endsWith('#')
              ? allTags.map((tag: any) => {
                  return (
                    <div
                      onClick={handleSuggestionClick}
                      key={tag.id}
                    >
                      <p>
                        <span className="tagName">{tag.name}</span>
                      </p>
                      <p>
                        <span className="audience">{tag.audience}</span>
                      </p>
                    </div>
                  );
                })
              : error}
          </div>
        </div>
        <MdSend />
      </div>
      <div className="audience-bloc">Audience potentiel total : {audience.length > 0 ? audienceCalcul : 0}</div>
    </>
  );
}
