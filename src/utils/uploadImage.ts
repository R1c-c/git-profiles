const uploadImage = async (file: Blob): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "profiles");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dxj6wjjt6/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const { url } = await response.json();

      return url;
    }

    console.error("Upload não realizado devido ao erro: ", response.statusText);
    return null;
  } catch (e) {
    console.error("Houve um erro durante o upload da imagem");

    return null;
  }
};

export default uploadImage;
