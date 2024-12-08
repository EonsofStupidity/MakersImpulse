import { Card } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Welcome</h1>
      <Card className="p-6">
        <p className="text-lg text-muted-foreground">
          Welcome to our 3D printer builder community. Get started by exploring builds or creating your own.
        </p>
      </Card>
    </div>
  );
};

export default Home;
