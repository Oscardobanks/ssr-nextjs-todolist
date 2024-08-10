import Image from "next/image";

export default function ToggleButton({ toggleModes }) {
  return (
    <div>
      <input
        type="checkbox"
        id="darkmode-toggle"
        className="input"
        onClick={toggleModes}
      />
      <label htmlFor="darkmode-toggle" className="label"></label>
    </div>
  );
}
