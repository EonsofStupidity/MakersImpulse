import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const RedisFeatureToggles = () => {
  return (
    <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Feature Enablement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TooltipProvider>
          <div className="flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-2">
                <span>Session Management</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Store user sessions in Redis for better performance</p>
              </TooltipContent>
            </Tooltip>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-2">
                <span>Caching</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cache frequently accessed data to improve response times</p>
              </TooltipContent>
            </Tooltip>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-2">
                <span>Real-Time Updates</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Enable Redis pub/sub for real-time features</p>
              </TooltipContent>
            </Tooltip>
            <Switch />
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};