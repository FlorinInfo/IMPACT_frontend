import "./PostStyles.scss";
import { Link } from "react-router-dom";
import {BiDownvote, BiUpvote} from "react-icons/bi";
import profileImage from "../../assets/images/default_profile_pic1.jpg";
const Post = ()=> {

	return(
		<div className="post">
			<div className="post__votes">
				<BiUpvote className={`post__votes-action post__votes-action--up ${true==true ? "post__votes-action--active-1" : ""}`} />
				<span className="post__votes-number">123</span>
				<BiDownvote className="post__votes-action post__votes-action--down"/>
			</div>
			<div className="post__main">
				<div className="post__author">
					<img src={profileImage} alt="" />
					<Link to="#" className="post__author-name">Florin Bucataru</Link>
				</div>
				<span className="post__title">Banca deteriorata</span>
				<p className="post__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quo libero consequuntur blanditiis quam quidem saepe minus voluptate pariatur esse?</p>
			</div>
		</div>
	)
}

export default Post;