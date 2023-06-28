import List from './conversationsList';
import SearchInput from '../tags/searchInput';

export default function Conversations() {
  return (
    <>
      <SearchInput placeholder={'Conversation'} />
      <List />
    </>
  );
}
