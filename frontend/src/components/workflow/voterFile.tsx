// import { useVoterStore } from "@/stores/voterStore";

import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/fileinput";
import { useRef } from "react";

function VoterFilePicker() {
  // const voterFile = useVoterStore((state) => state.voterFile);
  // const setVoterFile = useVoterStore((state) => state.setVoterFile);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    // setVoterFile(file);
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
      {/* {voterFile && <p>Selected: {voterFile.name}</p>} */}
    </div>
  );
}


export default VoterFilePicker;