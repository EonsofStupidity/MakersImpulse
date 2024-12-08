export const layoutStyles = {
  container: {
    horizontal: "w-full transition-all duration-300",
    vertical: "fixed left-0 top-20 bottom-0 w-64 transition-all duration-300",
    floating: "fixed right-4 top-20 w-64 transition-all duration-300"
  },
  inner: {
    horizontal: "container mx-auto px-4",
    vertical: "h-full p-4",
    floating: "p-4 bg-background rounded-lg border shadow-lg"
  },
  content: {
    horizontal: "py-2",
    vertical: "h-full",
    floating: ""
  },
  controls: {
    horizontal: "flex items-center gap-4",
    vertical: "flex flex-col gap-4",
    floating: "flex flex-col gap-4"
  },
  toggleGroup: {
    horizontal: "",
    vertical: "w-full",
    floating: "w-full"
  }
};