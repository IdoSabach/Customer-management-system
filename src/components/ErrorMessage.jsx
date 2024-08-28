// components/ErrorMessage.jsx
export default function ErrorMessage({ message, onStay, onDisconnect }) {
  if (!message) return null;

  return (
    <main className="main flex flex-col gap-2 w-96 text-center border-black border-solid">
      <div className="msg text-2xl p-4">{message}</div>
      <section className=" flex items-center justify-around p-2">
        <button className="stay p-2 bg-green-400 rounded-lg text-lg" onClick={onStay}>
          Want to stay?
        </button>
        <button className="dis p-2 bg-red-200 rounded-lg text-lg" onClick={onDisconnect}>
          Want to disconnect?
        </button>
      </section>
    </main>
  );
}
