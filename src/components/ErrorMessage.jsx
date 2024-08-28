// components/ErrorMessage.jsx
export default function ErrorMessage({ message, onStay, onDisconnect }) {
  if (!message) return null;

  return (
    <>
      <div style={{ color: 'green', padding: '10px', border: '1px solid green', borderRadius: '5px' }}>
        {message}
      </div>
      <section>
        <button className="stay" onClick={onStay}>Want to stay?</button>
        <button className="dis" onClick={onDisconnect}>Want to disconnect?</button>
      </section>
    </>
  );
}
