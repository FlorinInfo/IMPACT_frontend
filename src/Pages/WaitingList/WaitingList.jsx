import "./WaitingListStyles.scss";

import buletin from "../../assets/images/buletine-840x500.jpg";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';



const WaitingList = ()=> {
    return (
        <div className="waiting-list">
            <InnerImageZoom src={buletin} zoomScale={2} zoomSrc={buletin} />

        </div> 
    )
}

export default WaitingList;