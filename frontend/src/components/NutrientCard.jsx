import React from "react";
import "../styles/NutrientCard.css";

function NutrientCard({ icon, value, label, unit, color }) {
  return (
    <div className="nutrient-card">
      <div className="nutrient-icon" style={{ backgroundColor: color }}>
        <img src={icon} alt={label} />
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

export default NutrientCard;
