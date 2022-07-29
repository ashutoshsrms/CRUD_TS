import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "./../redux/features/PostSlice";
import Spinner from "./Spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreatePost = () => {
  const notify = () => toast("Data Added successfully!");
  const [values, setValues] = useState({ title: "", body: "" });
  const [showPost, setShowPost] = useState(false);
  const { loading, post } = useSelector((state) => ({ ...state.app }));
  const { title, body } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle post function
  const handleSubmit = (e:any) => {
    e.preventDefault();
    dispatch(createPost( {values} ));
    setValues({ title: "", body: "" });
    setShowPost(true);
  };

  //show created pos function
  const showCreatedPost = () => {
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">{post[0].title}</h5>
              <p className="card-text">{post[0].body}</p>
            </div>
         
           <div>
           <button onClick={notify} style={{backgroundColor:"green"}}>Click Me</button>
           <ToastContainer />
         </div>
        </div>
        )}
      </>
    );
  };
  return (
    <div>
      <h1 className="text-center bg-dark text-white p-2">Create Post </h1>
      <form action="">
        <div className="mb-3 mt-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            placeholder="Enter Post Title"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            value={body}
            onChange={(e) => setValues({ ...values, body: e.target.value })}
            placeholder="add post description"
            id="floatingTextarea"
          />
          <label htmlFor="floatingTextarea">add post description</label>
        </div>
        <div className="mt-4 d-flex align-items-end justify-content-end">
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Home
          </button>
          <button
            className="btn btn-success ms-4"
            type="submit"
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
      </form>
      <div className="mt-4">{showPost && <div>{showCreatedPost()}</div>}</div>
    </div>
  );
};

export default CreatePost;