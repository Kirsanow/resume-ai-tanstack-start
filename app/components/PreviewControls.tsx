import { useState } from "react";

export function PreviewControls() {
  const [zoom, setZoom] = useState(100);
  const [spacing, setSpacing] = useState(1);

  return (
    <div className="flex items-center gap-4">
      <button onClick={() => setZoom((z) => z - 10)}>-</button>
      <span>{zoom}%</span>
      <button onClick={() => setZoom((z) => z + 10)}>+</button>

      <div className="h-6 w-px bg-gray-300" />

      <button onClick={() => setSpacing((s) => s - 0.1)}>-</button>
      <span>Spacing: {spacing}</span>
      <button onClick={() => setSpacing((s) => s + 0.1)}>+</button>
    </div>
  );
}
