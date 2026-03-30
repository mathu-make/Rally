import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateActivityInput } from '@/types';
import { createActivity, useCurrentMember } from '@/lib/data';

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Add a bit more detail to the description"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  location: z.string().min(2, "Location is required"),
});

interface CreateActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateActivityModal({ isOpen, onClose }: CreateActivityModalProps) {
  const currentMember = useCurrentMember();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateActivityInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: '2026-04-10', // Defaulting to the trip month for convenience
      startTime: '10:00',
      endTime: '12:00',
    }
  });

  const onSubmit = (data: CreateActivityInput) => {
    if (currentMember) {
      createActivity(data, currentMember.id);
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-6 sm:p-8 rounded-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-display font-bold">Plan something epic 🎯</DialogTitle>
          <DialogDescription className="text-base mt-2">
            Got a great idea? Add it to the board so others can join in.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" data-testid="create-activity-form">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold">Title</Label>
            <Input id="title" {...register('title')} placeholder="e.g. Robot Restaurant Show" className="h-11 bg-muted/50" />
            {errors.title && <p className="text-xs text-destructive font-medium">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-semibold">Date</Label>
              <Input id="date" type="date" {...register('date')} className="h-11 bg-muted/50" />
              {errors.date && <p className="text-xs text-destructive font-medium">{errors.date.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-semibold">Location</Label>
              <Input id="location" {...register('location')} placeholder="Shinjuku" className="h-11 bg-muted/50" />
              {errors.location && <p className="text-xs text-destructive font-medium">{errors.location.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-sm font-semibold">Start Time</Label>
              <Input id="startTime" type="time" {...register('startTime')} className="h-11 bg-muted/50" />
              {errors.startTime && <p className="text-xs text-destructive font-medium">{errors.startTime.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-sm font-semibold">End Time</Label>
              <Input id="endTime" type="time" {...register('endTime')} className="h-11 bg-muted/50" />
              {errors.endTime && <p className="text-xs text-destructive font-medium">{errors.endTime.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
            <textarea 
              id="description"
              {...register('description')} 
              placeholder="What are we doing? Any tips on what to bring?"
              className="flex min-h-[100px] w-full rounded-xl border border-input bg-muted/50 px-3 py-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
            {errors.description && <p className="text-xs text-destructive font-medium">{errors.description.message}</p>}
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose} className="font-semibold">Cancel</Button>
            <Button type="submit" className="font-bold px-6 shadow-md hover:shadow-lg transition-all" data-testid="btn-submit-activity">
              Publish to Board
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
