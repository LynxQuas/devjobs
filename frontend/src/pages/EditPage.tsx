import { useParams } from "react-router-dom";
import PostJob from "../components/PostJob";

const EditPage = () => {
  const { id } = useParams();
  return <PostJob id={id} />;
};

export default EditPage;
