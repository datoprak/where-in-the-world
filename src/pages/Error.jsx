import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex min-h-screen flex-col items-center gap-4 p-32"
    >
      <h1 className="text-5xl font-extrabold">Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p>
        {error.status} {error.statusText || error.message}
      </p>
      <button className="btn">
        <Link to="/">Return to Homepage</Link>
      </button>
    </div>
  );
};
export default Error;
