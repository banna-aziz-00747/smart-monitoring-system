type Props = {
  online: boolean;
};

export default function StatusBadge({ online }: Props) {
  return (
    <span
      style={{
        color: "white",
        background: online ? "green" : "red",
        padding: "5px 10px",
        borderRadius: 5,
      }}
    >
      {online ? "ONLINE" : "OFFLINE"}
    </span>
  );
}
