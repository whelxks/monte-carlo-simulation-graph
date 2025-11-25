import { ErrorContainer } from "./styles";
import ErrorLogo from "../../assets/ErrorLogo.png";

const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <ErrorContainer>
      <img src={ErrorLogo} alt="Error Logo" />
      <div className="text-3xl font-bold text-red-500">
        Error: {error.message}
      </div>
    </ErrorContainer>
  );
};

export default ErrorPage;
