import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AlertComponent = () => {
  return (
    <Alert>
      {/** <Terminal className='h-4 w-4' /> */}
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
  );
};

export default AlertComponent;
