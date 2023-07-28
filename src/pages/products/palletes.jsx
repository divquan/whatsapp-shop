import React, { useState } from "react";

const ColorPicker = () => {
  const colors = [
    { name: "Red", value: "#FF0000" },
    { name: "Green", value: "#00FF00" },
    { name: "Blue", value: "#0000FF" },
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="flex gap-2">
      {colors.map((color, index) => (
        <div
          key={index}
          onClick={() => handleColorClick(color)}
          className={
            color.value === selectedColor.value
              ? "cursor-pointer w-8 h-8  border-2 border-black border-spacing-4"
              : "cursor-pointer w-8 h-8  border-2 border-gray-300 border-spacing-2"
          }
          style={{ backgroundColor: color.value }}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
