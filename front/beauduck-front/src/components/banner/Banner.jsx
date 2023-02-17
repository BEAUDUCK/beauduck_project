import './Banner.style.scss';

const Banner = ({bannerStyle}) => {
  return (
    <div className={["banner", `${bannerStyle}`].join(" ")}></div>
  )
};

export default Banner;