import React from "react";
import "../styles/NutrientCard.css";

import iconCalories from "../assets/icon-calories.svg";
import iconProteines from "../assets/icon-proteines.svg";
import iconGlucides from "../assets/icon-glucides.svg";
import iconLipides from "../assets/icon-lipides.svg";

const ICONS = {
  energy: iconCalories,
  chicken: iconProteines,
  apple: iconGlucides,
  burger: iconLipides,
};

export default function NutrientCard({ type, value, label, icon }) {
  const iconSrc = ICONS[icon] || ICONS.energy;
  const unit = type === "calorie" ? "kCal" : "g";

  return (
    <div className="nutrient-card">
      <div className="nutrient-icon">
        <img src={iconSrc} alt={label} />
      </div>
      <div className="nutrient-info">
        <p className="nutrient-value">
          {value}
          {unit}
        </p>
        <p className="nutrient-label">{label}</p>
      </div>
    </div>
  );
}
