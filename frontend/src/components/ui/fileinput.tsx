import * as React from "react";

import { cn } from "@/lib/utils";

interface FileInputProps extends React.ComponentPropsWithoutRef<"input"> {
  onFilesAdded?: (event: FileList) => void;
}

function FileInput({
  onFilesAdded,
  className,
  type,
  ...props
}: React.ComponentProps<"input"> & FileInputProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFilesAdded?.(event.target.files);
      event.target.value = ""
    }
  };

  return (
    <>
      <input
        type="file"
        data-slot="input"
        className={cn(className)}
        onChange={handleFileChange}
        {...props}
      />
    </>
  );
}

export { FileInput };
