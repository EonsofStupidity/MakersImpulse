import { Card } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <Card className="p-6 space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing and using MakersImpulse, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. User Responsibilities</h2>
          <p className="text-muted-foreground">
            Users are responsible for maintaining the security of their account and for all activities that occur under their account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Content Guidelines</h2>
          <p className="text-muted-foreground">
            Users agree to post content that is appropriate, relevant, and respectful of other community members.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Intellectual Property</h2>
          <p className="text-muted-foreground">
            Users retain their intellectual property rights for content they post, while granting MakersImpulse a license to use and display that content.
          </p>
        </section>
      </Card>
    </div>
  );
};

export default Terms;