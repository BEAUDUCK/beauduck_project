const MyGalleryListItem = ({ id, img }) => {
  return (
    <div>
      <img
        src={img}
        alt="갤러리 아이템"
        style={{ width: "200px", height: "200px" }}
      />
    </div>
  )
};

export default MyGalleryListItem