import { isContentPage, isContentComponent } from "@/utils/validators";

const handleSubmit = (content: Json) => {
  if (isContentPage(content)) {
    // Logic for page content
  } else if (isContentComponent(content)) {
    // Logic for component content
  } else {
    toast.error("Invalid content structure");
    return;
  }
};
