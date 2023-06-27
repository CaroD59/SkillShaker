import Accepted from './accepted';
import Refused from './refused';
import Header from '@components/templates/header';
import SearchTags from './searchInput';

export default function Tags() {
  return (
    <>
      <Header />
      <h2>Gérer les tags</h2>
      <div className="tags-gestion">
        <SearchTags placeholder={'Recherche #tag'} />
        <Accepted />
        <Refused />
      </div>
    </>
  );
}
