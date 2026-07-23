type Props = {
  image: any;
};

export default function ImageCard({ image }: Props) {
  if (!image) return <p>No image available.</p>;

  return (
    <div>
      <img
        width={700}
        // src={`http://192.168.0.105:5000${image.imageUrl}?t=${Date.now()}`}
        src={`${image.imageUrl}?t=${Date.now()}`}
      />

      <p>{new Date(image.capturedAt).toLocaleString()}</p>
    </div>
  );
}
