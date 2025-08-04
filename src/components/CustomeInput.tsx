import { Label } from "./ui/label";
import { Input } from "./ui/input";

function CustomeInput({ text }: { text: string }) {
  return (
    <div className="grid w-full items-center gap-3 my-4">
      <Label htmlFor={text}>
        {text.charAt(0).toUpperCase() + text.slice(1)}
      </Label>
      <Input
        type={text}
        id={text}
        placeholder={`Enter ${text.charAt(0).toUpperCase() + text.slice(1)}...`}
      />
    </div>
  );
}

export default CustomeInput;
