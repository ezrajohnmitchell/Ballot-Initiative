import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/fileinput";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { type Crop, PercentCrop, PixelCrop, ReactCrop } from "react-image-crop"

export const Route = createFileRoute("/petition")({
  component: Petition,
});

interface CroppedImage {
  image: File,
  crop?: Crop
}

function Petition() {
  const [petitionFiles, setPetitionFiles] = useState<CroppedImage[]>([]);
  const [selectedPetition, setSelectedPetition] = useState(-1); //-1 meaning nothing is selected

  const handlePetitionFilesAdded = (files: FileList) => {
    let existingNames = petitionFiles.map(file => file.image.name);
    let newFiles: CroppedImage[] = Array.from(files).filter(file => existingNames.indexOf(file.name) === -1).map(file => ({ image: file }))
    //need to convert pdfs to images here
    if (newFiles.length > 0) {
      setPetitionFiles(petitionFiles.concat(newFiles))
      if (selectedPetition === -1) {
        setSelectedPetition(0);
      }
    }
  };

  return (
    <div className="mb-8 text-left">
      <h1 className="text-3xl">Petition Validation</h1>
      <p className="text-gray-300">
        Automated signature verification for ballot initiatives
      </p>
      <div className="border-blue-600 border-t-2 my-5" />

      <h3 className="text-xl font-semibold mb-2">Upload Files</h3>
      <div className="grid grid-cols-1 grid-rows-4 grid-flow-col gap-4">
        <div>
          <h4 className="text-lg font-semibold mb-1">📄 Voter Records</h4>
          <p className="text-gray-400 mb-2">
            Upload your CSV file containing voter registration data.
            <br />
            Required columns: <code>First_Name</code>, <code>Last_Name</code>, <code>Street_Number</code>, 
            <code>Street_Name</code>, <code>Street_Type</code>, <code>Street_Dir_Suffix</code>
          </p>
        </div>
        <div className="row-span-1">
          <Button>
            <Label htmlFor="voter-records">Choose CSV file:</Label>
            <FileInput id="voter-records" />
          </Button>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-1">✍️ Petition Signatures</h4>
          <p className="text-gray-400 mb-2">
            Upload your files containing petition pages with signatures. 
            Each file will be cropped to focus on the section where the signatures are located. 
            Ensure these sections have the printed name and address of the voter.
          </p>
        </div>
        <div className="row-span-1">
          <Button>
            <Label htmlFor="petition-signatures">+ Add Signature files</Label>
            <FileInput id="petition-signatures" multiple onFilesAdded={handlePetitionFilesAdded} style={{ display: 'none' }} />
          </Button>
          <ul>
            {petitionFiles.map(file => (
              <li key={file.image.name}>{file.image.name}</li>
            ))}
          </ul>
        </div>
      </div>
        {selectedPetition !== -1 && petitionFiles[selectedPetition] && (
          <ReactCrop
            crop={petitionFiles[selectedPetition].crop}
            onChange={ c => {
              let oldCrop = petitionFiles[selectedPetition];
              let files = [...petitionFiles];
              files[selectedPetition] = {
                image: oldCrop.image,
                crop: c
              }
              setPetitionFiles(files);
            }}>
            <img src={URL.createObjectURL(petitionFiles[selectedPetition].image)} />
          </ReactCrop>
          )}
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
