export default function DocumentTracker({ currentStatus }) {
  const stages = [
    { id: 1, name: "Submitted" },
    { id: 2, name: "Reviewed by HOD" },
    { id: 3, name: "Reviewed by OS" },
    { id: 4, name: "Reviewed by Registrar" },
    { id: 5, name: "Approved by Principal" },
    { id: 6, name: "At storekeeper" },
  ];

  // Find the current stage index
  const currentStageIndex = stages.findIndex(
    (stage) => stage.name === currentStatus
  );

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="flex space-x-4 w-full max-w-4xl">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex-1">
            <div
              className={`flex items-center justify-center ${
                index <= currentStageIndex
                  ? "text-white bg-green-500"
                  : "text-gray-500 bg-gray-300"
              } rounded-full w-12 h-12 mx-auto`}
            >
              {index + 1}
            </div>
            <p
              className={`text-center mt-2 ${
                index <= currentStageIndex
                  ? "font-semibold text-green-600"
                  : "text-gray-500"
              }`}
            >
              {stage.name}
            </p>
            {/* Connectors */}
            {index !== stages.length - 1 && (
              <div
                className={`h-1 w-full mt-2 ${
                  index < currentStageIndex ? "bg-green-500" : "bg-gray-500"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
