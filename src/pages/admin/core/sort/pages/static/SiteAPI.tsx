import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Code } from "lucide-react";

const SiteAPI = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold mb-6">API Documentation</h1>
      
      <Alert>
        <Code className="h-4 w-4" />
        <AlertTitle>API Access</AlertTitle>
        <AlertDescription>
          To use our API, you'll need to generate an API key from your account settings.
          Different access levels are available based on your subscription status.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">API Overview</h2>
            <p className="text-muted-foreground mb-4">
              Our API provides programmatic access to printer builds, components, and community data.
              You can use it to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Fetch printer build configurations</li>
              <li>Search components and their compatibility</li>
              <li>Access community resources and guides</li>
              <li>Manage your builds and wishlists</li>
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="authentication">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                All API requests must include your API key in the Authorization header:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                Authorization: Bearer your-api-key
              </pre>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints">
          <Card className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold">Available Endpoints</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Printer Builds</h3>
                <pre className="bg-muted p-4 rounded-lg">
                  GET /api/builds
                  GET /api/builds/:id
                  POST /api/builds
                </pre>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Components</h3>
                <pre className="bg-muted p-4 rounded-lg">
                  GET /api/components
                  GET /api/components/:type
                  GET /api/components/:type/:id
                </pre>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Compatibility</h3>
                <pre className="bg-muted p-4 rounded-lg">
                  GET /api/compatibility/check
                  POST /api/compatibility/validate
                </pre>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <Card className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold">Code Examples</h2>
            
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Fetch Printer Builds</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`fetch('https://api.example.com/api/builds', {
  headers: {
    'Authorization': 'Bearer your-api-key'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
              </pre>

              <h3 className="text-xl font-medium">Check Component Compatibility</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`fetch('https://api.example.com/api/compatibility/check', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    component1: 'component-id-1',
    component2: 'component-id-2'
  })
})
.then(response => response.json())
.then(data => console.log(data));`}
              </pre>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteAPI;