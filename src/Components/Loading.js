export default function Loading(props) {
  const { status } = props;
  if (status) {
    return (
      <div className="loading-overlay">
        <div className="cm-spinner"></div>
      </div>
    );
  } else {
    return null;
  }
}
