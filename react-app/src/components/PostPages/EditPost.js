import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOnePostThunk } from "../../store/post";

function EditPost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  // grab post from redux state
  const currPost = useSelector((state) => state.posts.post);

  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    const controller = new AbortController();

    if (currPost) {
      await dispatch(getOnePostThunk(postId));
      setIsLoaded(true);
    } else {
      history.push(`/posts/${postId}`);
      return () => controller.abort();
    }
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    history.push(`/posts/${postId}`);
  };

  if (!isLoaded) {
    return <h1>Loading...</h1>;

  } else {
      
    return <h1>Edit Post!!!!</h1>;
  }
}

export default EditPost;
