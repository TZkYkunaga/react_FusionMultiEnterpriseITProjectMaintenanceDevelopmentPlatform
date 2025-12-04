
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const invoices = [
    { id: 'INV-2023-001', date: 'June 23, 2023', amount: '$150.00', status: 'Paid' },
    { id: 'INV-2023-002', date: 'July 23, 2023', amount: '$150.00', status: 'Paid' },
    { id: 'INV-2023-003', date: 'August 23, 2023', amount: '$150.00', status: 'Due' },
]

export default function BillingPage() {
  return (
    <div className="flex flex-col flex-1 gap-4 md:gap-8">
        <div className="flex items-center gap-4">
            <h1 className="font-semibold text-lg md:text-2xl">Billing</h1>
        </div>
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Subscription Plan</CardTitle>
                    <CardDescription>You are currently on the <strong>Business</strong> plan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-6 bg-muted/50 rounded-lg">
                        <div className="flex items-baseline justify-center">
                            <span className="text-4xl font-bold">$150</span>
                            <span className="ml-1 text-muted-foreground">/month</span>
                        </div>
                        <p className="text-center text-muted-foreground text-sm mt-2">Billed monthly. Your next bill is on August 23, 2023.</p>
                    </div>
                </CardContent>
                <CardHeader>
                     <Button className="w-full sm:w-auto">Upgrade Plan</Button>
                </CardHeader>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Manage your payment methods.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                   <div className='flex items-center gap-4'>
                     <div className="text-2xl">💳</div>
                     <div>
                        <p className='font-medium'>Visa ending in 1234</p>
                        <p className='text-muted-foreground text-sm'>Expires 12/2025</p>
                     </div>
                   </div>
                   <Button variant="outline">Edit</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>View and download your past invoices.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map(invoice => (
                                <TableRow key={invoice.id}>
                                    <TableCell className='font-mono'>{invoice.id}</TableCell>
                                    <TableCell>{invoice.date}</TableCell>
                                    <TableCell>{invoice.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={invoice.status === 'Paid' ? 'secondary' : 'default'}>{invoice.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">Download</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
