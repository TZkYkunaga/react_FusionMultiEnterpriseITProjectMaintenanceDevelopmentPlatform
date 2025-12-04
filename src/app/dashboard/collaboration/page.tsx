import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function CollaborationPage() {
  return (
    <div className="flex flex-col flex-1 gap-4 md:gap-8">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-2xl">Partnerships</h1>
        <Button className="ml-auto gap-1">
          <PlusCircle className="h-4 w-4" />
          New Partner
        </Button>
      </div>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Strategic Partnerships</CardTitle>
          <CardDescription>
            Manage your collaborations with external partners.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Partnership management tools will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
