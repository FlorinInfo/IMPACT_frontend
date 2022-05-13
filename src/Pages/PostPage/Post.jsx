import "./PostStyles.scss";

import Post from "../../components/Post/Post";
import { useEffect, useState, useContext } from "react";
import { ImpactStore } from "../../store/ImpactStore";
import axios from "../../assets/axios/axios.js";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Comments from "../../components/Comments/Comments";

const PostPage = ()=> {
	const navigate = useNavigate();
	const [post, setPost] = useState(null);
	const {id} = useParams();

	const fetchData = ()=> {
		axios
		.get(
		  `/articles/${id}`,
		  {
			headers: {
			  accept: "application/json",
			  Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		  }
		)
		.then((response) => {
		  // handle success
		  if(response.data.errors) navigate("/");
		  else setPost(response.data);
		  console.log(response);
		})
		.catch((error) => {
		  // handle error
		  console.log(error);
		})
		.then(() => {
		  // always executed
		});
	}

	useEffect(()=> {
		fetchData();
	}, [])

	const deleteArticle = ()=> {
		navigate("/"); 
	}
	const updateArticle = ()=> {
		fetchData();
	}

	return (
		<div className="post-page">
			<div className="post-page__container">
				<div className="post-page__left"> 
					{post ? <Post className="post-page__post-component" comments={<Comments updateArticle={updateArticle}/>} updateArticle={updateArticle}  deleteArticle={deleteArticle} article={post}/> : ""}
				</div>
				<div className="post-page__right"></div>
			</div>
		</div>
	)
}

export default PostPage;