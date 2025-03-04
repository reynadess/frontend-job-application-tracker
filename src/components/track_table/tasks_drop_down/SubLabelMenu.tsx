import {
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Tag } from "lucide-react";
import { LABEL_OPTIONS } from "./constants";
interface LabelSubMenuProps {
  value: string;
  onValueChange: (value: string) => void;
  onClickedLabelItem: (value: string) => void; //update to accept the selected label
}
const SubLabelMenu = ({
  value,
  onValueChange,
  onClickedLabelItem,
}: LabelSubMenuProps) => {
  const handleValueChange = (newValue:string) => {
    onValueChange(newValue);
    onClickedLabelItem(newValue);
  }
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Tag className="mr-2 h-4 w-4" />
        <span>Label</span> 
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={value} onValueChange={handleValueChange}>
            {LABEL_OPTIONS.map((option) => (
              <DropdownMenuRadioItem key={option} value={option}>
                {option}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

export default SubLabelMenu;
