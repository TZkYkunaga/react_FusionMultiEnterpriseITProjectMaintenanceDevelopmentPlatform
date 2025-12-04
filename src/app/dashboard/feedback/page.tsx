import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function FeedbackPage() {
  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-2xl">Feedback</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Customer Feedback</CardTitle>
          <CardDescription>
            Review and analyze feedback from your users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Feedback summary and analysis tools will go here.</p>
        </CardContent>
      </Card>
    </>
  );
}
