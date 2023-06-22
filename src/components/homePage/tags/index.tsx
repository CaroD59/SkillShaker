import Accepted from './accepted';
import Refused from './refused';
import Suggested from './suggested';

export default function Tags() {
  return (
    <div>
      <div className="tags">
        <h2>Gérer les tags</h2>
        <Suggested />
        <Accepted />
        <Refused />
      </div>
    </div>
  );
}
