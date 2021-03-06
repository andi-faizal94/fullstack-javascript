import "./App.css";
import { useState } from "react";
function App() {
  const [image, setImage] = useState("https://fakeimg.pl/350x200/");
  const [saveImage, setSaveImage] = useState(null);

  function handleUploadChange(e) {
    console.log(e.target.files[0]);
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
    console.log(saveImage);
  }
  function uploadImage() {
    if (!saveImage) {
      alert("upload gambar");
    } else {
      let formData = new FormData();
      formData.append("photo", saveImage);
      fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            window.location.href = data.image;
          }
        });
    }
  }
  return (
    <div className="App">
      <div
        style={{ height: "80vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="w-25 mt-5 mx-auto">
          <img src={image} className="img-thumbnail" alt="" />
          <div className="mb-3">
            <label
              htmlFor="formFile"
              for="exampleFormControlInput1"
              className="form-label"
            >
              Upload image here
            </label>
            <input
              type="file"
              className="form-control mb-2"
              id="formFile"
              onChange={handleUploadChange}
              accept="image/"
            />

            <button onClick={uploadImage} className="btn btn-danger w-100">
              Save my image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
