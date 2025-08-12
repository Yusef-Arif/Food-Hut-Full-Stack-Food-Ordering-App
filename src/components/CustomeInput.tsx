import { Label } from "./ui/label";
import { Input } from "./ui/input";

function CustomeInput({ title, placeholder }: { title: string, placeholder: string }) {
  return (
    <div className="grid w-full items-center gap-3 my-4">
      <Label htmlFor={title}>
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </Label>
      <Input
        type={title}
        id={title}
        placeholder={placeholder}
      />
    </div>
  );
}

export default CustomeInput;
