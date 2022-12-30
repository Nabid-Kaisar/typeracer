import { Link, useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main>
      <header>OOPS..</header>
      <h2>page not found</h2>
      <footer>
        <Link to={"/"} onClick={handleGoBack}>
          {`<`}-- Go Back..
        </Link>
      </footer>
    </main>
  );
}
