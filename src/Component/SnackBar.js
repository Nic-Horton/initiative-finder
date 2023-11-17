import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import Stack from '@mui/material/Stack';

export default function SimpleSnackbar({
	open,
	alertSeverity,
	handleShowAlertClickO,
	handleShowAlertClickC,
	alert,
}) {
	return (
		<div>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={handleShowAlertClickC}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert
					size="large"
					onClose={handleShowAlertClickC}
					severity={alertSeverity}
					sx={{ fontSize: 15 }}
				>
					{alert}
				</Alert>
			</Snackbar>
		</div>
	);
}
