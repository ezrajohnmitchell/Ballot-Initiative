import { useState } from "react";
import { type Crop, PercentCrop, PixelCrop, ReactCrop } from "react-image-crop"

import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/fileinput";
import { Label } from "@/components/ui/label";

interface CroppedImage {
  image: File,
  crop?: Crop
}

function PetitionFiles({}){

  const [petitionFiles, setPetitionFiles] = useState<CroppedImage[]>([]);
  const [selectedPetition, setSelectedPetition] = useState(-1); //-1 meaning nothing is selected

  const handlePetitionFilesAdded = (files: FileList) => {
    let existingNames = petitionFiles.map(file => file.image.name);
    let newFiles: CroppedImage[] = Array.from(files).filter(
      file => existingNames.indexOf(file.name) === -1).map(file => ({ image: file })
    );

    //need to convert pdfs to images here
    if (newFiles.length > 0) {
      setPetitionFiles(petitionFiles.concat(newFiles))
      if (selectedPetition === -1) {
        setSelectedPetition(0);
      }
    }
  };

  return (<>
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

    {selectedPetition !== -1 && petitionFiles[selectedPetition] && (
      <ReactCrop
        crop={petitionFiles[selectedPetition].crop}
        onChange={
          c => {
            let oldCrop = petitionFiles[selectedPetition];
            let files = [...petitionFiles];
            files[selectedPetition] = {
              image: oldCrop.image,
              crop: c
            }
            setPetitionFiles(files);
          }
        }
      >
        <img src={URL.createObjectURL(petitionFiles[selectedPetition].image)} />
      </ReactCrop>
    ) }

  </>);
}

export default PetitionFiles;