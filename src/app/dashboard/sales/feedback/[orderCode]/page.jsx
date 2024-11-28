"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function FeedbackPage() {
  const params = useParams();
  const [supportNote, setSupportNote] = React.useState('');
  const [feedback, setFeedback] = React.useState({
    quality: '',
    delivery: '',
    packaging: '',
    comments: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    // Add your submission logic here
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    console.log('Support note submitted:', supportNote);
    // Add your support note submission logic here
  };

  const ratingOptions = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Add Order Feedback</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Feedback Form */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="text-sm">Sale Code: #{params.orderCode || '20241137679'}</div>
                <div className="text-sm">Customer Name: Maitri</div>
                <div className="text-sm">Customer Phone: +919925241945</div>
              </div>

              {/* Rating Sections */}
              {['quality', 'delivery', 'packaging'].map((field) => (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field} className="capitalize">
                    {field}
                  </Label>
                  <Select
                    value={feedback[field]}
                    onValueChange={(value) => 
                      setFeedback((prev) => ({ ...prev, [field]: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {ratingOptions.map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          {rating}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}

              {/* Comments Section */}
              <div className="space-y-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  value={feedback.comments}
                  onChange={(e) =>
                    setFeedback((prev) => ({ ...prev, comments: e.target.value }))
                  }
                  className="min-h-[100px]"
                />
              </div>

              <Button type="submit">Submit</Button>
            </form>
          </CardContent>
        </Card>

        {/* Support Note Form */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSupportSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="supportNote">Support Note</Label>
                <Textarea
                  id="supportNote"
                  value={supportNote}
                  onChange={(e) => setSupportNote(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>

              <div className="space-x-2">
                <Button type="submit">Submit</Button>
                <Button variant="secondary" type="button">
                  Close Review
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}