import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import springlight from "../assets/consultresult/springlight.png"
import springbright from "../assets/consultresult/springbright.png"
import summerlight from "../assets/consultresult/summerlight.png"
import summerbright from "../assets/consultresult/summerbright.png"
import summermute from "../assets/consultresult/summermute.png"
import fallmute from "../assets/consultresult/fallmute.png"
import falldeep from "../assets/consultresult/falldeep.png"
import fallstrong from "../assets/consultresult/fallstrong.png"
import winterbright from "../assets/consultresult/winterbright.png"
import winterdeep from "../assets/consultresult/winterdeep.png"

const InfoDetailPage = () => {
  const location = useLocation()
  const { state } = location
  const [nowResult, setNowResult] = useState(null)
  useEffect(() => {
    switch (state) {
      case 1:
        setNowResult(springlight)
        break
      case 2:
        setNowResult(springbright)
        break
      case 3:
        setNowResult(summerlight)
        break
      case 4:
        setNowResult(summerbright)
        break
      case 5:
        setNowResult(summermute)
        break
      case 6:
        setNowResult(fallmute)
        break
      case 7:
        setNowResult(falldeep)
        break
      case 8:
        setNowResult(fallstrong)
        break
      case 9:
        setNowResult(winterbright)
        break
      case 10:
        setNowResult(winterdeep)
        break
      default:
        break
    }

  }, [])
  return (
    <div className="info-detail-page">
      <img
        className="personal-detail"
        src={nowResult}
        alt="personal-detail"
      />
    </div>
  )
};

export default InfoDetailPage;