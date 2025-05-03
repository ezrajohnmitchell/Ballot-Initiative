import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

import PetitionFiles from "@/components/workflow/petitionFiles";
import VoterFilePicker from "@/components/workflow/voterFile";

export const Route = createFileRoute("/petition")({
  component: Petition,
});

function Petition() {
  return (
    <div className="mb-8 text-left">
      <h1 className="text-3xl">Petition Validation</h1>
      <p className="text-gray-300">
        Automated signature verification for ballot initiatives
      </p>
      <div className="border-blue-600 border-t-2 my-5" />

      <h3 className="text-xl font-semibold mb-2">Upload Files</h3>
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="text-lg font-semibold mb-1">📄 Voter Records</h4>
          <p className="text-gray-400 mb-2">
            Upload your CSV file containing voter registration data.
            <br />
            Required columns: <code>First_Name</code>, <code>Last_Name</code>, <code>Street_Number</code>,
            <code>Street_Name</code>, <code>Street_Type</code>, <code>Street_Dir_Suffix</code>
          </p>
        </div>

        <VoterFilePicker />

        <div>
          <h4 className="text-lg font-semibold mb-1">✍️ Petition Signatures</h4>
          <p className="text-gray-400 mb-2">
            Upload your files containing petition pages with signatures.
            Each file will be cropped to focus on the section where the signatures are located.
            Ensure these sections have the printed name and address of the voter.
          </p>
        </div>

        <PetitionFiles />
      </div>
      <div className="border-gray-600 border-t-2 my-5">
        <h3 className="text-xl font-semibold mb-2">Process Files</h3>
        <div className="text-center">
          <Button variant="destructive" className="w-1/2">
            🚀 Process Files
          </Button>
        </div>
      </div>

      <div className="border-gray-600 border-t-2 my-5">
        <h3 className="text-xl font-semibold mb-2">Maintenance</h3>
        <div className="text-center">
          <Button variant="outline" className="w-1/2">
            🗑️ Clear All Files
          </Button>
        </div>
      </div>
    </div>

  );
}
