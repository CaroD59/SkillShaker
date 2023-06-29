import { useContext } from 'react';
import Accepted from './accepted';
import Refused from './refused';
import Header from '@components/templates/header';
import SearchTags from './searchInput';
import { DeletedTagsProvider, UpdateDeletedTagsContext } from '../../../contexts/tagsContext';

export default function Tags() {
  const updateDeletedTags = useContext(UpdateDeletedTagsContext);

  return (
    <>
      <Header />
      <h2>Gérer les tags</h2>
      <div className="tags-gestion">
        <SearchTags placeholder={'Recherche #tag'} />
        <DeletedTagsProvider>
          <Accepted />
          {/* updateDeletedTags={updateDeletedTags}  */}
          <Refused />
          {/* updateDeletedTags={updateDeletedTags} */}
        </DeletedTagsProvider>
      </div>
    </>
  );
}
