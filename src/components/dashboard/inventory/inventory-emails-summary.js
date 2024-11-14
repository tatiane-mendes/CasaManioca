import { useState, useCallback, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { inventoryApi } from '../../../__fake-api__/inventory-api';
import { useMounted } from '../../../hooks/use-mounted';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';

const emailOptions = [
  'Resend last invoice',
  'Send password reset',
  'Send verification'
];

export const InventoryEmailsSummary = (props) => {
  const isMounted = useMounted();
  const [emailOption, setEmailOption] = useState(emailOptions[0]);
  const [emails, setEmails] = useState([]);

  const getEmails = useCallback(async () => {
    try {
      const data = await inventoryApi.getInventoryEmails();

      if (isMounted()) {
        setEmails(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getEmails();
  }, [getEmails]);

  return (
    <Card {...props}>
    </Card>
  );
};
