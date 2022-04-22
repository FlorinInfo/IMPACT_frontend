import "./UploadPostMediaStyles.scss";
import {IoAdd} from "react-icons/io5";
import {IoIosClose} from "react-icons/io"
import image from "../../assets/images/default_profile_pic1.jpg";
import { createRef, useState } from "react";


const UploadPostMedia = ()=> {
	const [previews, setPreviews] = useState([]);
	const fileInput = createRef();
	const openUploadMedia = () => {
		fileInput.current.click();
	}

	return (
		<div className="media-post">
			<input className="media-post__input-upload" type="file" ref={fileInput} />
			<div className="media-post__grid">
				<div className="media-post__preview" style={{ backgroundImage: `url(${image})` }}>
					<div className="media-post__preview-remove">
						<IoIosClose className="media-post__preview-remove-icon"/>
					</div>
				</div>
				<div className="media-post__preview" style={{ backgroundImage: `url(${image})` }}>
					<div className="media-post__preview-remove">
						<IoIosClose className="media-post__preview-remove-icon"/>
					</div>
				</div>
				<div className="media-post__preview" style={{ backgroundImage: `url(${image})` }}>
					<div className="media-post__preview-remove">
						<IoIosClose className="media-post__preview-remove-icon"/>
					</div>
				</div>
				<div className="media-post__preview" style={{ backgroundImage: `url(${image})` }}>
					<div className="media-post__preview-remove">
						<IoIosClose className="media-post__preview-remove-icon"/>
					</div>
				</div>
				<div className="media-post__preview" style={{ backgroundImage: `url(${image})` }}>
					<div className="media-post__preview-remove">
						<IoIosClose className="media-post__preview-remove-icon"/>
					</div>
				</div>
				<div className="media-post__preview" style={{ backgroundImage: `url(${image})` }}>
					<div className="media-post__preview-remove">
						<IoIosClose className="media-post__preview-remove-icon"/>
					</div>
				</div>
				<div className="media-post__preview" style={{ backgroundImage: `url(${image})` }}>
					<div className="media-post__preview-remove">
						<IoIosClose className="media-post__preview-remove-icon"/>
					</div>
				</div>
				
				<div className="media-post__add-btn" onClick={openUploadMedia}>
					<IoAdd className="media-post__add-icon"/>
				</div>
			</div>
			
		</div>
	)
}

export default UploadPostMedia;