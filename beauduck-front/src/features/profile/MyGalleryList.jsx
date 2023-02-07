import MyGalleryListItem from "./MyGalleryListItem";

const MyGalleryList = ({ myGalleryList }) => {
  return (
    <div>
      <h1>내 갤러리</h1>
      <div style={{ display: "flex" }}>
        {myGalleryList.map((it) => (
          <MyGalleryListItem 
            key={it.id}
            img={it.img}
          />
        ))}
      </div>
    </div>
  )
};

export default MyGalleryList;

