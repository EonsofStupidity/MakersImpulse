import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;