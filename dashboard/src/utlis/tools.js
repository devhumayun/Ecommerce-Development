export const photoChange = (setInput, e) => {
    setInput((prev) => ({
      ...prev,
      logo: e.target.files[0],
      photo: URL.createObjectURL(e.target.files[0]),
    }));
};