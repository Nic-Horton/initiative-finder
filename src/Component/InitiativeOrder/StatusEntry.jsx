import React from "react";

export default function StatusEntry({ status, severityValues, index }) {
  const severity = severityValues[index];
  console.log(status)
  console.log(index)
  console.log(severity)
  console.log(severity.stage)
  return (
    <div>
      {status} stage {severity && severity.stage}
    </div>
  );
}
