import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/fileinput";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Markdown from "react-markdown";

export const Route = createFileRoute("/petition")({
  component: Petition,
});

function Petition() {
  const [petitionFiles, setPetitionFiles] = useState<File[]>([]);

  const handlePetitionFilesAdded = (files: FileList) => {
    let existingNames = petitionFiles.map(file => file.name);
    let newFiles = Array.from(files).filter(file => existingNames.indexOf(file.name) === -1);
    setPetitionFiles([
      ...newFiles,
      ...petitionFiles
    ])
  };

  return (
    <div className="mb-8 text-left">
      <h1 className="text-3xl">Petition Validation</h1>
      <p className="text-gray-300">
        Automated signature verification for ballot initiatives
      </p>
      <div className="border-blue-600 border-t-2 my-5" />
      <Markdown>### Upload Files</Markdown>
      <div className="grid grid-cols-1 grid-rows-4 grid-flow-col gap-4">
        <div>
          <Markdown>{`
#### 📄 Voter Records
Upload your CSV file containing voter registration data.

Required columns: \`First_Name\`, \`Last_Name\`, \`Street_Number\`, 
\`Street_Name\`, \`Street_Type\`, \`Street_Dir_Suffix\`
`}</Markdown>
        </div>
        <div className="row-span-1">
          <Label htmlFor="voter-records">Choose CSV file:</Label>
          <FileInput id="voter-records" />
        </div>
        <div>
          <Markdown>{`
#### ✍️ Petition Signatures
Upload your files containing petition pages with signatures. Each file will be cropped to focus on the section where the signatures are located. 
Ensure these sections have the printed name and address of the voter. 
`}</Markdown>
        </div>
        <div className="row-span-1">
          <Label htmlFor="petition-signatures">+ Add Signature files</Label>
          <FileInput id="petition-signatures" multiple onFilesAdded={handlePetitionFilesAdded} style={{ display: 'none' }} />
          <ul>
            {petitionFiles.map(file => (
              <li>{file.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-gray-600 border-t-2 my-5">
        <h3>Process Files</h3>
        <div className="text-center">
          <Button variant="destructive" className="w-1/2">
            🚀 Process Files
          </Button>
        </div>
      </div>
      <div className="border-gray-600 border-t-2 my-5">
        <h3>Maintenance</h3>
        <div className="text-center">
          <Button variant={"outline"} className="w-1/2">
            🗑️ Clear All Files
          </Button>
        </div>
      </div>
    </div>
  );
}
