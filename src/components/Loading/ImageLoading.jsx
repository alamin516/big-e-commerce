import { useState} from "react";

const ImageLoading = ({ src="", alt, classes }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);


  const handleImageLoad = () => {
    setLoaded(true);
  };

  const handleImageError = () => {
    setError(true);
  };

  return (
    <div style={{ position: "relative" }}>
      {!loaded && !error && (
        <div
          style={{
            filter: "blur(20px)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "416",
            height: "416",
            backgroundSize: "cover",
            backgroundImage: `url('${src}')`,
          }}
        />
      )}
      {error && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f0f0",
          }}
        >
          <p style={{ color: "red" }}>Failed to load image</p>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={classes}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease-in" }}
      />
    </div>
  );
};

export default ImageLoading;
