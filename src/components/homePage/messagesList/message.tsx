import { MdSend } from 'react-icons/md';
import { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

// MODELS
import Tags from '../../../interfaces/tags.model';

// CONTEXT
import User from '../../../contexts/userContext';
import { GetUserTags } from '../../../services/api_manager';

export interface WriteTagProps {
  placeholder: string;
}

export default function Message({ placeholder }: WriteTagProps) {
  const { user } = useContext(User);
  const authToken: string | undefined = Cookies.get('auth_token');
  const [inputValue, setInputValue] = useState<string>('');
  const [audience, setAudience] = useState<number[]>([]);
  const [filteredTags, setFilteredTags] = useState<Tags[]>([]);
  const [active, setActive] = useState<boolean>(false);

  // API
  const [allTags, setAllTags] = useState<Tags[]>([]);
  const [error, setError] = useState<string | null>(null);

  // GET TAGS
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const userTags = await GetUserTags();

          const combinedTags = [
            ...userTags.myTags.map(tag => ({ ...tag, className: 'my-tag-class' })),
            ...userTags.suggTags.map(tag => ({ ...tag, className: 'suggested-tag-class' })),
            ...userTags.refusedTags.map(tag => ({ ...tag, className: 'refused-tag-class' })),
          ];
          setAllTags(combinedTags);
        } catch (error) {
          console.error('Erreur lors de la récupération tags :', error);
        }
      }
    };

    fetchData();
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

    const lastHashtagIndex = inputValue.lastIndexOf('#');
    if (lastHashtagIndex !== -1) {
      const wordsBeforeLastHashtag = inputValue.substring(0, lastHashtagIndex);
      const replacedInputValue = wordsBeforeLastHashtag + '#' + word[0];

      setInputValue(replacedInputValue);
      setActive(false);
    }
    // AUDIENCE
    const audienceNumber = parseInt(word[1]);
    if (!audience.includes(audienceNumber)) {
      setAudience([...audience, audienceNumber]);
    }
  };

  // Poster le hashtag ici dans l'API si il n'existe pas déjà

  // On stock les tags dans une variable
  const wordsAfterHashtag: string[] = [];
  const words: string[] = inputValue.split(' ');

  words.forEach((word: string) => {
    if (word.startsWith('#') && !wordsAfterHashtag.includes(word.substring(1))) {
      wordsAfterHashtag.push(word.substring(1));
    }
  });

  // Poster le hashtag ici dans l'API si il n'existe pas déjà

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.includes('#')) {
      const filter = value.substring(value.lastIndexOf('#') + 1).toLowerCase();
      const filteredTags = allTags.filter((tag: any) => tag.name.toLowerCase().startsWith(filter));
      setFilteredTags(filteredTags);
    } else {
      setFilteredTags([]);
    }

    if (filteredTags.length === 0) {
      setActive(false);
    }

    if (value.endsWith('#')) {
      setActive(true);
    } else if (!value.includes('#')) {
      setActive(false);
    }

    if (value === '') {
      setAudience([]);
      setFilteredTags([]);
      setActive(false);
      return;
    }
  };

  // Calcul de l'audience, les audiences sont disponibles dans audience
  const audienceCalcul: number = audience.reduce((acc, number) => acc + number, 0);

  // POST MESSAGE
  const handlePostMessage = (event: any) => {
    console.log(inputValue);
  };

  return (
    <>
      <div className="msg">
        <input
          type="text"
          name="message"
          id="SkillShaker-Send-Message"
          placeholder={placeholder}
          onChange={handleInputChange}
          value={inputValue}
        />
        <div
          id="SearchBar"
          className={active ? 'allTagsSearchBar active' : 'allTagsSearchBar'}
        >
          {active
            ? filteredTags.map((tag: any) => (
                <div
                  onClick={handleSuggestionClick}
                  key={tag.id}
                  className={tag.className}
                >
                  <p>
                    <span className="tagName">{tag.name}</span>
                  </p>
                  <div className="audience">{tag.audience}</div>
                </div>
              ))
            : error}
        </div>
        <MdSend onClick={handlePostMessage} />
      </div>
      <div className="audience-bloc">Audience potentiel total : {audience.length > 0 ? audienceCalcul : 0}</div>
    </>
  );
}
