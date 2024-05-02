const ProfileUpdateProgress = ({
  personalInfoDone=false,
  institutionDone=false,
  documentsDone=false,
}) => {
  // Calculate the total number of steps
  const totalSteps = 3;

  // Calculate the number of completed steps
  const completedSteps = [
    personalInfoDone,
    institutionDone,
    documentsDone,
  ].filter((step) => step).length;

  // Calculate the progress percentage
  const progress = (completedSteps / totalSteps) * 100;

  return (
    <div className="w-full my-8 bg-slate-100 p-4">
      <div className="flex justify-between">
        <StepIndicator step='Personal Info' completed={personalInfoDone} />
        <StepIndicator step='Institution Info' completed={institutionDone} />
        <StepIndicator
          step='Identification Documents'
          completed={documentsDone}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <ProgressBar progress={progress} />
      </div>
    </div>
  );
};

const StepIndicator = ({ step, completed }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span>{step}</span>
      <span style={{ marginLeft: "10px", color: completed ? "green" : "red" }}>
        {completed ? "✓" : "○"}
      </span>
    </div>
  );
};

const ProgressBar = ({ progress }) => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#ddd",
        borderRadius: "4px",
        height: "10px",
        marginTop: "5px",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          backgroundColor: "green",
          borderRadius: "4px",
          height: "100%",
        }}
      ></div>
    </div>
  );
};

export default ProfileUpdateProgress;
