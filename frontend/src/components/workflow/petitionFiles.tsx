import { useEffect, useRef, useState } from "react";
import { type PercentCrop, PixelCrop, ReactCrop } from "react-image-crop"

import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/fileinput";
import { Paginator } from "../ui/paginator";
import { OcrProvider, TesseractOcr } from "@/lib/ocr";
import { usePetitionStore, ImageState } from "@/stores/petition-store";
import { useAppStateStore } from "@/stores/app-state-store";

function PetitionFiles({ }) {

  const [selectedPetition, setSelectedPetition] = useState(-1); //-1 meaning nothing is selected

  const petitionFiles = usePetitionStore((state) => state.petitionFiles);
  const setPetitionFiles = usePetitionStore((state) => state.setPetitionFiles);
  const setPetitionFileUploaded = useAppStateStore((state) => state.setPetitionFileUploaded);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const [ocr, setOcr] = useState<OcrProvider>()

  useEffect(() => {
    //TODO add timeout for tesseract, docs say it should be periodically refreshed
    let tesseractOcr = new TesseractOcr();
    tesseractOcr.initializeWorker().then(() => {
      setOcr(tesseractOcr);
    })

    return () => {
      tesseractOcr.terminateWorker();
    };
  }, [])

  const handlePetitionFilesAdded = (files: FileList) => {
    let existingNames = petitionFiles.map(file => file.image.name);
    let newFiles: ImageState[] = Array.from(files).filter(
      file => existingNames.indexOf(file.name) === -1).map(file => ({ image: file })
      );

    //need to convert pdfs to images here
    if (newFiles.length > 0) {
      setPetitionFiles(petitionFiles.concat(newFiles))
      if (selectedPetition === -1) {
        setSelectedPetition(0);
      }
      setPetitionFileUploaded(true);
    }
    else setPetitionFileUploaded(false);
  };

  const submitOcr = async (crop: PercentCrop, imageIndex: number) => {
    if (petitionFiles.length <= imageIndex) return;
    const { image } = petitionFiles[imageIndex];
    if (!image || !ocr || crop.width === 0 || crop.height === 0) return; //TODO hide add file button until OCR is ready or add a queue here

    const fullImage = await createImageBitmap(image);
    const width = fullImage.width;
    const height = fullImage.height;
    const croppedImage = await createImageBitmap(image, crop.x / 100 * width, crop.y / 100 * height, crop.width / 100 * width, crop.height / 100 * height);
    const canvas = new OffscreenCanvas(croppedImage.width, croppedImage.height);
    canvas.getContext('bitmaprenderer')?.transferFromImageBitmap(croppedImage);
    const imageBlob = await canvas.convertToBlob({ type: 'image/png' });
    // saveAs(imageBlob, 'cropped.png');

    ocr.getSignatures(imageBlob);
  };

  return (
    <div className="flex flex-col">
      <Button className="self-start" type="button" onClick={handleButtonClick}>
        + Add Signature Files
      </Button>
      <FileInput
        ref={inputRef}
        id="petition-signatures"
        type="file"
        accept=".pdf,image/*"
        multiple
        onFilesAdded={handlePetitionFilesAdded}
        style={{ display: "none" }}
      />

      <ul>
        {petitionFiles.map(file => (
          <li key={file.image.name}>{file.image.name}</li>
        ))}
      </ul>
      {selectedPetition !== -1 && petitionFiles[selectedPetition] && (
        <>
          <Paginator page={selectedPetition} max={petitionFiles.length - 1} min={0} onPageChange={setSelectedPetition} />
          <ReactCrop
            className="self-center"
            crop={petitionFiles[selectedPetition].crop}
            onChange={
              c => {
                let oldCrop = petitionFiles[selectedPetition];
                let files = [...petitionFiles];

                //debouncing so we don't process image cropping to often
                files[selectedPetition] = {
                  image: oldCrop.image,
                  crop: c,
                }
                setPetitionFiles(files);
              }
            }
            onComplete={(_: PixelCrop, crop: PercentCrop) => { submitOcr(crop, selectedPetition) }}
          >
            <img src={URL.createObjectURL(petitionFiles[selectedPetition].image)} className="w-screen h-auto md:h-screen md:w-auto" />
          </ReactCrop>
        </>)}
    </div>
  );
}

export default PetitionFiles;