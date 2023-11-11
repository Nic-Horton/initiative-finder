import React from "react";

export default function StatusEntry({ status, severityValues, index }) {
  return (
    <div>
      {status} stage {severityValues[index]}
    </div>
  );
}
