// import { useVoterStore } from "@/stores/voterStore";

import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/fileinput";
import { useAppStateStore } from "@/stores/app-state-store";
import { useVoterStore } from "@/stores/voter-store";
import { useRef } from "react";

function VoterFilePicker() {
  // retrieve voter file state variables from global store
  const voterFile = useVoterStore((state) => state.voterFile);
  const setVoterFile = useVoterStore((state) => state.setVoterFile);
  const setVoterFileUploaded = useAppStateStore((state) => state.setVoterFileUploaded);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setVoterFile(file);
    setVoterFileUploaded(!!file);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="row-span-1">
      <Button type="button" onClick={handleButtonClick}>
        Choose Voter File
      </Button>
      <FileInput
        ref={inputRef}
        id="voter-records"
        type="file"
        accept=".csv"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {voterFile && <p>Selected: {voterFile.name}</p>}
    </div>
  );
}


export default VoterFilePicker;