const ConsultingListItem = ({ consultingItem }) => {

  return (
    <div className='consulting-list-item'>
      <div className="consulting-list-item-child">
        <div className='consulting-list-item-color'>
          color
        </div>
        <div className='consulting-list-item-title'>
          { consultingItem.title }
        </div>
      </div>
    </div>
  )
};

export default ConsultingListItem;
