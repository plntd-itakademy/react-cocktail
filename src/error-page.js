import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oups !</h1>
      <p>Désolé, une erreur s'est produite.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
