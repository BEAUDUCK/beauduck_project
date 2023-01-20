import './Single.style.scss';
import SingleListItem from './SingleListItem';

const SingleList = ({ modeList }) => {
  return (
    <div className="modeList">
      {modeList.map((item) => (
        <SingleListItem key={item.id} modeItem={item} />
      ))}
    </div>
  );
};

export default SingleList;
