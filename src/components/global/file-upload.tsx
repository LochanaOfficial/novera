import { FileIcon, X, XCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

type Props = {
    apiEndpoint: "agencyLogo" | "avatar" | "subaccountLogo";
    onChange: (url?: string) => void;
    value?: string;
    formType?: "Create" | "Edit"
}

const FileUpload = ({
    apiEndpoint,
    onChange,
    value,
    formType,
} : Props) => {
    const type = value?.split(".").pop();
    const editMode = formType === "Edit";

    if (value) {
        return <div className="flex flex-col justify-center items-center">
            {type !== "pdf" ? ( 
                <div className="relative w-40 h-40">
                    <Image src={value} alt="Uploaded Image" className={cn("object-contain", editMode && "")} fill />
                </div> 
            ) : (
                <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                    <FileIcon />
                    <a
                        href={value}
                        target="_blank"
                        rel="noopener_noreferrer"
                        className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                    >
                    View PDF
                    </a>
                </div>
            )}
            <Button onClick={() => onChange("")} variant="ghost" type="button" className="mt-2" >
                Remove Logo
            </Button>
        </div>
    }

  return (
    <div className="w-full bg-muted/30 rounded-lg cursor-pointer">
        <UploadDropzone
          endpoint={apiEndpoint}
          onClientUploadComplete={(res) => {
            onChange(res?.[0].url)
          }}
          onUploadError={(error: Error) => {
            console.log(error)
          }}
        />
    </div>
  )
}

export default FileUpload;