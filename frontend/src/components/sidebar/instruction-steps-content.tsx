import { AppStateStore } from "@/stores/app-state-store";

export const instructionStepsContent = [
  {
    key: "1️⃣ Upload Voter Records",
    content: (
      <ul className="list-disc list-inside">
        <li>CSV format required</li>
        <li>Must include:</li>
        <ul className="list-disc list-inside ml-4">
          <li>First_Name</li>
          <li>Last_Name</li>
          <li>Street_Number</li>
          <li>Street_Name</li>
          <li>Street_Type</li>
          <li>Street_Dir_Suffix</li>
        </ul>
        <i>Example: Download a sample of fake voter records here.</i>
      </ul>
    ),
    selector: (state: AppStateStore) => state.voterFileUploaded,
  },
  {
    key: "2️⃣ Upload Signatures",
    content: (
      <ul className="list-disc list-inside">
        <li>PDF format only</li>
        <li>Clear, legible scans</li>
        <li>One signature per line</li>
        <i>Example: Download a sample of fake signed petitions here.</i>
      </ul>
    ),

    selector: (state: AppStateStore) => state.signatureFileUploaded,
  },
  {
    key: "3️⃣ Process & Review",
    content: (
      <ul className="list-disc list-inside">
        <li>Click 'Process Files'</li>
        <li>Review matches</li>
        <li>Download CSV results</li>
        <i>Note: Moving to the 'Home' page will restart processing.</i>
      </ul>
    ),
    selector: (state: AppStateStore) => state.hasRunMatching,
  },
  {
    key: "4️⃣ Clear Files",
    content: "Clear temporary files when done",
    selector: (state: AppStateStore) => state.tempFilesCleared,
  },
];
