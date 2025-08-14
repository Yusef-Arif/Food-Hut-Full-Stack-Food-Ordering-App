const getImageURL = async (image: File, path: string) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("pathName", `${path}_images`);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const image = (await res.json()) as { url: string };
    return image.url;
  } catch (error) {
    console.log("something went wrong on uploading image", error);
  }
};

export default getImageURL;
