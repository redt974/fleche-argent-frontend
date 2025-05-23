import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ type, data, options }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chart = new Chart(ctx, { type, data, options });

    return () => chart.destroy(); // Nettoyage
  }, [type, data, options]);

  return <canvas ref={canvasRef}></canvas>;
};

export default ChartComponent;
