import "./CommentsStyles.scss";
import Comment from "../Comment/Comment";
import { useEffect, useState } from "react";
import axios from "../../assets/axios/axios";
import { useParams } from "react-router-dom";
const x = [1,2,3,4];
const Comments = ({updateArticle})=> {
    const {id} = useParams();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const addComment = ()=> {
        axios
        .post(
          `/articles/${id}/comments`,
          {
              text:comment
          },
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          // handle success
          setComment("");
          getComments();
          updateArticle(id);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    }

    const getComments = ()=> {
        axios
        .get(
          `/articles/${id}/comments`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          // handle success
        //   setComment("");
        setComments(response.data)
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
            getComments();
        },[])

    return (
        <div className="comments">
            <textarea className="comments__textarea input-default" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Ce parere ai?"></textarea>
            <button className="comments__add-btn button-default-form" onClick={addComment}>Adauga</button>
            <div className="comments__h-line"></div>
            <div className="comments__cnt">
            {
                comments.length>0 ? comments.map((comment)=> <Comment 
                                                            key={comment.id}
                                                            updateArticle={updateArticle}
                                                            updateComments={getComments} 
                                                            data={comment} 
                                                            replies={comment.replies.map((r)=><Comment key={comment.id} updateComments={getComments}  updateArticle={updateArticle} data={r} />)}/>) : ""
            }
            </div>
        </div>
    )
}

export default Comments;