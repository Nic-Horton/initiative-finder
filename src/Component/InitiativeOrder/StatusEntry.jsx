import React from "react";

export default function StatusEntry({ status, severityValues, index }) {
  const severity = severityValues[index];
  return (
    <div>
      {status} stage {severity && severity.stage}
    </div>
  );
}
