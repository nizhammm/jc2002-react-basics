import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
  CardText,
  Button,
} from "reactstrap";
import { FaRegThumbsUp } from "react-icons/fa";
import newyork from "./newyork.jpeg";

const username = "seto";
const location = "BSD";
let numberOfLikes = 13523;
const caption =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi totam laboriosam culpa accusamus? Corrupti fugit libero alias facere eaque magni dolore maiores perspiciatis, ullam ipsam similique repellat, odit, architecto placeat officiis rem voluptatem fuga corporis tempora labore? Mollitia praesentium, eveniet maxime officia laudantium enim. Fugiat eum ut quasi mollitia tenetur, labore praesentium? Neque obcaecati sapiente quis hic. Fugiat vitae et error cumque enim magni, voluptatibus autem nesciunt quos aperiam laborum!";

const ContentCard = () => {
  const likePost = (amount) => {
    numberOfLikes += 1;
    alert(`Liked post ${numberOfLikes}`);
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5" className="fw-bold">
          {username}
        </CardTitle>
        <CardSubtitle tag="h6" className="text-muted mb-4">
          {location}
        </CardSubtitle>

        <img
          style={{
            width: "100%",
          }}
          className="rounded"
          src={newyork}
          alt="user's content"
        />

        <CardText tag="h6" className="fw-bold mt-3">
          {numberOfLikes.toLocaleString()} likes
        </CardText>
        <CardText>
          <span className="fw-bold">{username}</span>{" "}
          {caption.length > 140 ? caption.slice(0, 140) + "..." : caption}
        </CardText>

        <Button
          onClick={() => likePost(14)}
          color="danger"
          className="d-flex justify-content-center align-items-center"
        >
          Like &nbsp;&nbsp;
          <FaRegThumbsUp />
        </Button>
      </CardBody>
    </Card>
  );
};

export default ContentCard;
