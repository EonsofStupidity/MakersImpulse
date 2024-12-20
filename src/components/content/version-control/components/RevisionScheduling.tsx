import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from 'lucide-react';
import { DateTimeSelector } from './scheduling/DateTimeSelector';
import { SchedulePreview } from './scheduling/SchedulePreview';
import { QueueProcessor } from './scheduling/QueueProcessor';
import { useScheduling } from '@/hooks/scheduling/useScheduling';
import { addMinutes, addDays } from 'date-fns';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface RevisionSchedulingProps {
  contentId?: string;
  revisionId?: string;
}

export const RevisionScheduling: React.FC<RevisionSchedulingProps> = ({
  contentId,
  revisionId
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');

  const { schedulePublication, isScheduling } = useScheduling(contentId);

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime || !revisionId) {
      toast.error("Please select both date and time");
      return;
    }

    const [hours, minutes] = selectedTime.split(':');
    const scheduledFor = new Date(selectedDate);
    scheduledFor.setHours(parseInt(hours), parseInt(minutes));

    await schedulePublication.mutateAsync({
      revisionId,
      scheduledFor,
    });

    setIsOpen(false);
  };

  const minDate = addMinutes(new Date(), 5);
  const maxDate = addDays(new Date(), 30);

  if (!contentId || !revisionId) {
    return (
      <div className="text-center p-4 text-white/60">
        Please select content to schedule publication
      </div>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="text-white/70 border-white/10 hover:bg-white/5 hover:text-neon-cyan hover:border-neon-cyan/50"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Schedule
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-black/90 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Schedule Publication</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <DateTimeSelector
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
              minDate={minDate}
              maxDate={maxDate}
            />

            {selectedDate && selectedTime && (
              <SchedulePreview
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
            )}

            <Button
              onClick={handleSchedule}
              disabled={!selectedDate || !selectedTime || isScheduling}
              className="w-full bg-neon-cyan/20 text-white border border-neon-cyan/50 hover:bg-neon-cyan/30"
            >
              {isScheduling ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                'Schedule Publication'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};