import MyGalleryListItem from "./MyGalleryListItem";

const MyGalleryList = ({ gallery }) => {
  return (
    <div>
      <h1>내 갤러리</h1>
      <div style={{ display: "flex" }}>
        {gallery.map((it) => (
          <MyGalleryListItem 
            id={it.id}
            img={it.img}
          />
        ))}
      </div>
    </div>
  )
};

export default MyGalleryList;

