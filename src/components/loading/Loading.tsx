import { MoonLoader } from "react-spinners";
import "./loading.css";
import { useLoading } from "../../contexts/LoadingContext";

export const Loading = () => {
  const { loading } = useLoading();
  return (
    loading.state && (
      <div id="loading">
        <div id="loadingBox">
          <MoonLoader color="#777" speedMultiplier={0.5} />
          {loading.content}
        </div>
      </div>
    )
  );
};
